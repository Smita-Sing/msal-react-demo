import React from 'react';
import ReactDOM from 'react-dom/client';

import { ThemeProvider } from '@mui/material/styles';
import { theme } from "./styles/theme";

import { BrowserRouter } from "react-router-dom";

import App from './App';

import { PublicClientApplication, EventType } from '@azure/msal-browser';

const pca= new PublicClientApplication ({
    auth: {
        clientId:'7ca85254-007b-4341-b179-7802597c4f23',
        authority: 'https://login.microsoftonline.com/51ecbc2a-b275-4f06-96ef-b7512fe0fad0',
        redirectUri: '/'
    },
    cache:{
        cacheLocation: 'localStorage',
        storeAuthStateInCookie: false,

    },
    system: {
        loggerOptions:{
            loggerCallback:(level, message, containsPii)=>{
                console.log(message)
            },
            logLevel:'info',
        } 
    }
});

pca.addEventCallback(event=>{
    if (event.eventType=== EventType.LOGIN_SUCCESS){
        console.log(event);
        pca.setActiveAccount(event.payload.account);
    }
});

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
    <React.StrictMode>
        <BrowserRouter>
            <ThemeProvider theme={theme}>
                <App msalInstance= {pca} />
            </ThemeProvider>
        </BrowserRouter>
    </React.StrictMode>
);
