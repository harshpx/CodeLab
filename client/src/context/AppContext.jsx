import { createContext, useState } from "react";

const AppContext = createContext({
    user: {},
    setUser: () => {},
    language: '',
    setLanguage: () => {},
    codes: [],
    setCodes: () => {},
    currCode: {},
    setCurrCode: () => {},
});

const prevUser = JSON.parse(localStorage.getItem('currUser'));

export const AppContextProvider = ({ children }) => {
    const [darkMode, setDarkMode] = useState(true);
    const [language, setLanguage] = useState('cpp17');
    const [user, setUser] = useState(prevUser ? prevUser : null);
    const [codes, setCodes] = useState([]);
    const [currCode, setCurrCode] = useState(null);

    return (
        <AppContext.Provider value={{
            user, setUser,
            language, setLanguage,
            codes, setCodes,
            currCode, setCurrCode,
        }}>
            {children}
        </AppContext.Provider>
    );
};

export default AppContext;