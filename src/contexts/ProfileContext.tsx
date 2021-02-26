import { createContext, ReactNode, useContext, useEffect, useState } from "react";
import Cookie from 'js-cookie';
import { ProfileConfigModal } from "../components/ProfileConfigModal";
import { type } from "os";
import { CountdownContext } from "./CountdownContext";

interface ProfileProviderProps {
    avatarUrl: string;
    children: ReactNode;
    isProfileConfigOpen: boolean;
    username: string
}

interface ProfileContextData {
    avatarUrl: string;
    cicleTime: string;
    closeProfileConfigModal: () => void;
    openProfileConfigModal: () => void;
    changeAvatarUrl: (url: string) => void;
    changeUserName: (newUsername: string) => void;
    changeTime: (time: string) => void;
    defaultAvatarUrl: string;
    defaultUsername: string;
    saveCustomPreferences: () => void;
    username: string;
}

export const ProfileContext = createContext({} as ProfileContextData);

export function ProfileProvider(props: ProfileProviderProps) {
    const defaultAvatarUrl = '/favicon.png';
    const defaultUsername = 'nome de usuário';
    const initialDefaultTime = '25';

    const { changeCicleTime, defaultTime } = useContext(CountdownContext);
    const [avatarUrl, setAvatarUrl] = useState(props.avatarUrl ?? defaultAvatarUrl);
    const [username, setUsername] = useState(props.username ?? defaultUsername);
    const [isProfileConfigOpen, setIsProfileConfigOpen] = useState(props.isProfileConfigOpen ?? true);
    const [cicleTime, setCicleTime] = useState(String(defaultTime / 60) ?? initialDefaultTime);

    const [prevAvatarUrl, setPrevAvatarUrl] = useState('');
    const [prevUsername, setPrevUsername] = useState('');
    const [prevCicleTime, setPrevCicleTime] = useState('');

    useEffect(() => {
        Cookie.set('avatarUrl', avatarUrl);
        Cookie.set('username', username);
        Cookie.set('isProfileConfigOpen', String(isProfileConfigOpen));
    }, [])

    function changeAvatarUrl (url: string) {
        setAvatarUrl(url);
    }

    function changeUserName (newUsername: string) {
        setUsername(newUsername);
    }

    function changeTime (time: string) {
        setCicleTime(time);
    }

    function closeProfileConfigModal(){
        setAvatarUrl(prevAvatarUrl !== '' ? prevAvatarUrl : defaultAvatarUrl);
        setUsername(prevUsername !== '' ? prevUsername : defaultUsername);
        setCicleTime(prevCicleTime !== '' ? prevCicleTime : initialDefaultTime);
        setIsProfileConfigOpen(false);
        Cookie.set('isProfileConfigOpen', String(false));
    }

    function openProfileConfigModal(){
        setPrevAvatarUrl(avatarUrl);
        setPrevUsername(username);
        setPrevCicleTime(cicleTime);
        setIsProfileConfigOpen(true);
        Cookie.set('isProfileConfigOpen', String(true));
    }

    function saveCustomPreferences(){
        if(avatarUrl && avatarUrl !== ''){
            Cookie.set('avatarUrl', avatarUrl)
        }

        if(username && username !== '') {
            Cookie.set('username', username);;
        }

        if(cicleTime && typeof Number(cicleTime) === 'number'){
            changeCicleTime(Number(cicleTime));
        }

        setIsProfileConfigOpen(false);
        Cookie.set('isProfileConfigOpen', String(false));
        window.location.reload();
    }

    return(
        <ProfileContext.Provider
            value={{
                avatarUrl,
                cicleTime,
                changeAvatarUrl,
                changeUserName,
                changeTime,
                closeProfileConfigModal,
                defaultAvatarUrl,
                defaultUsername,
                openProfileConfigModal,
                saveCustomPreferences,
                username,
            }}
        >
            {props.children}
            { isProfileConfigOpen && <ProfileConfigModal />}
        </ProfileContext.Provider>
    )
}
