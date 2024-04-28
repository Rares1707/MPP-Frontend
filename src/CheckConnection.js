import Axios from 'axios';
import { useState } from 'react';

export function CheckConnection() {
    const checkInterval = 5000;

    const [isOffline, setIsOffline] = useState(false);

    async function checkConnection() {
        console.log('Checking connection');
        try {
            await Axios.get('http://localhost:5000/ping');
            //if(isOffline === true)
                //window.location.reload();
            setIsOffline(false);
        } catch (error) {
            setIsOffline(true);
        }
    }

    setInterval(checkConnection, checkInterval);

    return (
        <>
            {isOffline && <h2>You are offline. Retrying in 5 seconds</h2>}
        </>
    );
}