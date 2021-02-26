import React, { useContext } from 'react';
import { ProfileContext } from '../contexts/ProfileContext';
import styles from '../styles/components/ProfileConfigModal.module.css';
export function ProfileConfigModal() {
    const {
        avatarUrl,
        changeAvatarUrl,
        changeUserName,
        changeTime,
        cicleTime,
        closeProfileConfigModal,
        defaultAvatarUrl,
        defaultUsername,
        saveCustomPreferences,
        username
    } = useContext(ProfileContext);

    
    function handleAvatarUrl(e: any) {
        changeAvatarUrl(e.target.value);
    }
    
    function handleNewUsername(e: any) {
        changeUserName(e.target.value);
    }

    function handleTimeChange(e: any) {
        changeTime(e.target.value);
    }
    
    function handleSave() {
        saveCustomPreferences()
    }
    
    return(
       <div className={styles.overlay}>
            <div className={styles.container}>
                <header>Preencha as informações </header>
                <form >
                    <label htmlFor="avatarUrl">
                        URL do avatar
                    </label>
                    <input
                        type="text"
                        name="avatarUrl"
                        id="avatarUrl"
                        placeholder='http://site.com/cool_img.png'
                        value={(avatarUrl !== defaultAvatarUrl && avatarUrl !== '' ? avatarUrl : '')}
                        onChange={handleAvatarUrl}
                    />
                    <label htmlFor="username">
                        Usuário 
                    </label>
                    <input
                        type="text"
                        name="username"
                        id="username"
                        placeholder='Digite seu nome de usuário'
                        value={(
                            username !== defaultUsername
                            && username !== '' ? username : ''
                        )}
                        onChange={handleNewUsername}
                    />
                    <label htmlFor="time">
                        Tempo do ciclo (minutos)
                    </label>
                    <input
                        type="text"
                        name="time"
                        id="time"
                        placeholder='Digite o tempo do ciclo em minutos'
                        value={cicleTime}
                        onChange={handleTimeChange}
                    />
                    <button type='button' className={styles.saveButton} onClick={handleSave}>
                        <img src="/icons/diskette.svg" alt="save"/>
                    </button>
                </form>

                <button type='button' onClick={closeProfileConfigModal}>
                    <img src="/icons/close.svg" alt="Close"/>
                </button>
            </div>
       </div>
    )
}