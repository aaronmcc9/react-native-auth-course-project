import { createContext, useState } from "react";
import AsyncStorage from '@react-native-async-storage/async-storage';


export const AuthContext = createContext({
    token: '',
    isAuthenticated: false,
    authenticate: () => { },
    logOut: () => { },
})

function AuthContextProvider({ children }) {
    const [authToken, setAuthToken] = useState();

    async function authenticate(token) {
        setAuthToken(token);
        await AsyncStorage.setItem(
            'token',
            token,
        );
    }

    function logOut() {
        setAuthToken(null);
        AsyncStorage.removeItem('token');
    }

    const value = {
        token: authToken,
        isAuthenticated: !!authToken,
        authenticate: authenticate,
        logOut: logOut
    }

    return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>
}

export default AuthContextProvider;