import { createContext, ReactNode, useEffect, useState} from 'react';
import Cookie from 'js-cookie';
import challenges from  '../../challenges.json';
import { LevelUpModal } from '../components/LevelUpModal';

interface ChallengeProviderProps {
    children: ReactNode;
    level: number;
    currentExperience: number;
    challengesCompleted: number;
    totalExperience: number;
}

interface Challenge {
    type: 'body' | 'eye',
    description: string;
    amount: number;
}

interface ChallengeContextData {
    activeChallenge: Challenge;
    challengesCompleted: number;
    closeLevelUpModal: () => void;
    completeChallenge: () => void;
    currentExperience: number;
    experienceToNextLevel: number;
    level: number;
    levelUp: () => void;
    resetChallenge: () => void;
    startNewChallenge: () => void;
    totalExperience: number;
}

export const ChallengesContext =  createContext({} as ChallengeContextData);

export function ChallengesProvier(props: ChallengeProviderProps)  {
    const [level, setLevel] = useState(props.level ?? 1);
    const [currentExperience, setCurrentExperience] =  useState(props.currentExperience ?? 0);
    const [totalExperience, setTotalExperience] =  useState(props.totalExperience ?? 0);
    const [challengesCompleted, setChallengesCompleted] = useState(props.challengesCompleted ?? 0);

    const [activeChallenge,  setActiveChallenge] = useState(null);
    const [isLevelUpModalOpen, setIsLevelUpModalOpen] = useState(false);

    const experienceToNextLevel = Math.pow((level + 1) * 4, 2);

    useEffect(() => {
        Notification.requestPermission();
    }, []);

    useEffect(() => {
        Cookie.set('level', String(level));
        Cookie.set('currentExperience', String(currentExperience));
        Cookie.set('challengesCompleted', String(challengesCompleted));
        Cookie.set('totalExperience', String(totalExperience));
    }, [level, currentExperience, challengesCompleted]);

    function levelUp() {
        setLevel(level + 1);
        setIsLevelUpModalOpen(true);
    };

    function startNewChallenge() {
        const randomChallengeIndex = Math.floor(Math.random() * challenges.length);
        const challenge = challenges[randomChallengeIndex];

        setActiveChallenge(challenge);

        new Audio('/notification.mp3').play();

        if(Notification.permission == 'granted'){
            new Notification('Novo desafio 🎉', {
                body: `Valendo ${challenge.amount}xp!`,
            })
        }
    };

    function resetChallenge() { 
        setActiveChallenge(null);
    };

    function completeChallenge(){
        if(!activeChallenge){
            return;
        }

        const { amount } = activeChallenge;

        let finalExperience = currentExperience + amount;

        if(finalExperience >= experienceToNextLevel) {
            finalExperience = finalExperience - experienceToNextLevel;
            levelUp();
        }

        setCurrentExperience(finalExperience);
        setTotalExperience(totalExperience + amount);
        setActiveChallenge(null);
        setChallengesCompleted(challengesCompleted + 1);
    };

    function closeLevelUpModal() {
        setIsLevelUpModalOpen(false);
    }

    return (
        <ChallengesContext.Provider value={{
            activeChallenge,
            completeChallenge,
            challengesCompleted,
            closeLevelUpModal,
            currentExperience,
            experienceToNextLevel,
            level,
            levelUp,
            resetChallenge,
            startNewChallenge,
            totalExperience}}
        >
            {props.children}

            { isLevelUpModalOpen && <LevelUpModal />}
        </ChallengesContext.Provider>
    );
}