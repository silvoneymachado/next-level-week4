import { useContext } from 'react';
import { ChallengesContext } from '../contexts/ChallengesContext';
import { CountdownContext } from '../contexts/CountdownContext';
import { ProfileContext } from '../contexts/ProfileContext';
import styles from '../styles/components/Profile.module.css';
export function Profile() {
    const { level } = useContext(ChallengesContext);
    const { changeCicleTime } = useContext(CountdownContext);
    const { avatarUrl, username, openProfileConfigModal } = useContext(ProfileContext);

    return(
        <div className={styles.profileContainer}>
            <img src={avatarUrl} alt={username} />
            <div>
                <strong>{username}</strong> 
                <button type='button' onClick={openProfileConfigModal}>
                    <img src="/icons/edit.svg" alt="Edit preferences"/>
                </button>
                <p>
                    <img src="icons/level.svg" alt="Level"/>
                    Level {level}
                </p>
            </div>
        </div>
    )
}