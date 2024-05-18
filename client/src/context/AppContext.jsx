import { createContext, useState } from "react";

const AppContext = createContext({
    darkMode: true,
    setDarkMode: () => {},
    language: '',
    setLanguage: () => {},
});

export const AppContextProvider = ({ children }) => {
    const [darkMode, setDarkMode] = useState(true);
    const [language, setLanguage] = useState('cpp17');

    return (
        <AppContext.Provider value={{ darkMode, setDarkMode, language, setLanguage }}>
            {children}
        </AppContext.Provider>
    );
};

export default AppContext;