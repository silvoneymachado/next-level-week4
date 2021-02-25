import { createContext, ReactNode, useState} from 'react';
import challenges from  '../../challenges.json';

interface ChallengeProviderProps {
    children: ReactNode;
}

interface Challenge {
    type: 'body' | 'eye',
    description: string;
    amount: number;
}

interface ChallengeContextData {
    activeChallenge: Challenge;
    challengesCompleted: number;
    currentExperience: number;
    experienceToNextLevel: number;
    level: number;
    levelUp: () => void;
    resetChallenge: () => void;
    startNewChallenge: () => void;
}

export const ChallengesContext =  createContext({} as ChallengeContextData);

export function ChallengesProvier(props: ChallengeProviderProps)  {
    const [level, setLevel] = useState(1);
    const [currentExperience, setCurrentExperience] =  useState(0);
    const [challengesCompleted, setChallengesCompleted] = useState(0);

    const [activeChallenge,  setActiveChallenge] = useState(null);

    const experienceToNextLevel = Math.pow((level + 1) * 4, 2);

    function levelUp() {
        setLevel(level + 1);
    }

    function startNewChallenge() {
        const randomChallengeIndex = Math.floor(Math.random() * challenges.length);
        const challenge = challenges[randomChallengeIndex]

        setActiveChallenge(challenge);
    }

    function resetChallenge() { 
        setActiveChallenge(null);
    }

    return (
        <ChallengesContext.Provider value={{
            activeChallenge,
            challengesCompleted,
            currentExperience,
            experienceToNextLevel,
            level,
            levelUp,
            resetChallenge,
            startNewChallenge}}
        >
            {props.children}
        </ChallengesContext.Provider>
    )
}