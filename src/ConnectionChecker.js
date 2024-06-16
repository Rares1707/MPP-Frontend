import axios from 'axios';
import {useContext, useEffect, useState} from 'react';
import {GlobalContext} from './Context';

const ConnectionChecker = () => {
    const checkInterval = 5000;

    const {connectionOffline, setConnectionOffline} = useContext(GlobalContext)

    async function checkConnection() {
        try {
            await axios.get('http://localhost:5000/ping');
            if(connectionOffline === true)
                window.location.reload();
            setConnectionOffline(false);
        } catch (error) {
            setConnectionOffline(true);
        }
    }

    useEffect(() => {
        setInterval(checkConnection, checkInterval);
    })

    return (
        <>
            {connectionOffline && <h2>You are offline. Retrying connection in 5 seconds.</h2>}
        </>
    );
}

export default ConnectionChecker;