import { useContext, useEffect, useState } from 'react';
import { ChallengesContext } from '../contexts/ChallengesContext';
import { CountdownContext } from '../contexts/CountdownContext';
import styles from '../styles/components/Countdown.module.css';
export function Countdown() {
    const {
        minutes,
        seconds,
        hasFinished,
        isActive,
        startCountdown,
        resetCountDown
    } = useContext(CountdownContext);

    const [ minuteLeft, minuteRight ] = String(minutes).padStart(2, '0').split('');
    const [ secondLeft, secondRight ] = String(seconds).padStart(2, '0').split('');

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
                        Ciclo encerrado ✅
                </button>
            ) : (
                <button
                    onClick={() => (isActive ? resetCountDown() : startCountdown())} 
                    type='button' 
                    className={`${styles.countdownButton} ${isActive ? styles.countdownButtonActive : ''}`}>
                        {isActive ? 'Abandonar ' : 'Iniciar '} o ciclo {!isActive ? '▶' : '✕'}
                </button>
            )}
       </div>
    )
}
