import { useContext } from 'react';
import { ChallengesContext } from '../contexts/ChallengesContext';
import styles from '../styles/components/ExperienceBar.module.css';

export function ExperienceBar() {
    const { currentExperience, experienceToNextLevel } =  useContext(ChallengesContext);
     
    const percentToNextLevel = Math.round(currentExperience * 100) / experienceToNextLevel;
    const minValue = 0;
    return (
        <header className={styles.experienceBar}>
            <span>{minValue}xp</span>
            <div>
                <div style={{ width: `${percentToNextLevel}%`}}></div>
                <span className={styles.currentExperience} style={{ left: `${percentToNextLevel}%`}}>
                    {currentExperience}xp
                </span>
            </div>
            <span>{experienceToNextLevel}xp</span>
        </header>
    )
}

// #rumoaoproximonivel
// #jornadainfinita
// #focopraticagrupo
// #neverstoplearning
