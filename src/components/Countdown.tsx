import { useContext, useEffect, useState } from 'react';
import { ChallengesContext } from '../contexts/ChallengesContext';
import styles from '../styles/components/Countdown.module.css';

let countdownTimeout: NodeJS.Timeout;
export function Countdown() {
    const { startNewChallenge } = useContext(ChallengesContext);
    
    const defaultTime = 0.1 * 60
    const [time, setTime] = useState(defaultTime);
    const [isActive, setIsActive] = useState(false);
    const [ hasFinished, setHasFinished] = useState(false);

    const minutes = Math.floor(time / 60);
    const seconds = time % 60;

    const [minuteLeft, minuteRight] = String(minutes).padStart(2, '0').split('');
    const [secondLeft, secondRight] = String(seconds).padStart(2, '0').split('');

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

    function startStopCountDown(){
        setIsActive(!isActive);
    }

    function  resetCountDown(){
        setIsActive(false);
        clearTimeout(countdownTimeout);
        setTime(defaultTime);
    }

    return (
       <div>
            <div className={styles.countdownContainer}>
                <div>
                    <span>{minuteLeft}</span>
                    <span>{minuteRight}</span>
                </div>
                <span>:</span>
                <div>
                    <span>{secondLeft}</span>
                    <span>{secondRight}</span>
                </div>
            </div>
            { hasFinished ? (
                <button
                    disabled
                    className={styles.countdownButton}>
                        Ciclo encerrado...
                </button>
            ) : (
                <button
                    onClick={() => (isActive ? resetCountDown() : startStopCountDown())} 
                    type='button' 
                    className={`${styles.countdownButton} ${isActive ? styles.countdownButtonActive : ''}`}>
                        {isActive ? 'Abandonar ' : 'Iniciar '} o ciclo
                </button>
            )}
       </div>
    )
}
