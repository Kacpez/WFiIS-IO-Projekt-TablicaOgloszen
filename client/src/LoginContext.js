import React, {useState, createContext} from 'react';

export const LoginContext = createContext();

export const LoginProvider = props => {
    const [uid, setUid] = useState(18);

    return (
        <LoginContext.Provider value={[uid, setUid]}>
            {props.children}
        </LoginContext.Provider>
    );
}