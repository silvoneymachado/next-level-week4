import { createContext, ReactNode, useContext, useEffect, useState } from "react";
import { ChallengesContext } from "./ChallengesContext";

interface CountdownContextData {
    minutes: number;
    seconds: number;
    isActive: boolean;
    hasFinished: boolean;
    startCountdown: () => void;
    resetCountDown: () => void;
}

interface CountdownProviderProps {
    children: ReactNode;
}

export const CountdownContext = createContext({} as CountdownContextData);

let countdownTimeout: NodeJS.Timeout;
export function CountdownProvider(props: CountdownProviderProps) {
    const { startNewChallenge } = useContext(ChallengesContext);
    
    const defaultTime = 0.1 * 60
    const [ time, setTime ] = useState(defaultTime);
    const [ isActive, setIsActive ] = useState(false);
    const [ hasFinished, setHasFinished ] = useState(false);

    const minutes = Math.floor(time / 60);
    const seconds = time % 60;

    function startCountdown(){
        setIsActive(!isActive);
    }

    function  resetCountDown(){
        setIsActive(false);
        clearTimeout(countdownTimeout);
        setHasFinished(false);
        setTime(defaultTime);
    }

    useEffect(() => {
        if(isActive && time > 0) {
            countdownTimeout = setTimeout(() => {
                setTime(time - 1);
            }, 1000);
        } else if(isActive && time === 0) {
            setHasFinished(true);
            setIsActive(false);
            startNewChallenge()
        }
    }, [isActive, time])

    return (
        <CountdownContext.Provider
            value={{
                isActive,
                hasFinished,
                minutes,
                resetCountDown,
                seconds,
                startCountdown,
            }}
        >
            {props.children}
        </CountdownContext.Provider>
    )
}
