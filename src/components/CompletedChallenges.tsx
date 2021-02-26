import { useContext } from 'react';
import { ChallengesContext } from '../contexts/ChallengesContext';
import styles from '../styles/components/CompletedChallenges.module.css';

export function CompletedChallenges(){
    const { challengesCompleted, totalExperience } = useContext(ChallengesContext);

    return (
        <>
            <div className={`${styles.completedChallengesContainer} ${styles.completedChallenges}`}>
                <span>Desafios completos</span>
                <span>{challengesCompleted}</span>
            </div>
            <div className={styles.completedChallengesContainer}>
                <span>Total</span>
                <span>{totalExperience}xp</span>
            </div>
        </>
    )
}