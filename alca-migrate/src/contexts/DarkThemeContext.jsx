import React, { createContext } from "react";

export const DarkThemeContext = createContext(null);

/**
 * Provides the ability to go dark
 * @param {*} props
 * @returns - Wrapped component with the respective context provider
 */
export const DarkThemeProvider = (props) => {
    const [isDark, toggle] = React.useState(false);

    return <DarkThemeContext.Provider value={{ isDark, toggle }}>{props.children}</DarkThemeContext.Provider>;
};
