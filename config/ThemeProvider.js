import { useEffect, useState, } from "react"
import { useColorScheme } from 'react-native'

import { themes } from "./themes"
import { ThemeContext } from "./ThemeContext"
import {Appearance} from 'react-native';

const ThemeProvider = ({children, ...props}) => {
    const [theme, setTheme] = useState(themes(''))
   
    // const colorScheme = useColorScheme()
    // useEffect(()=> {
    //     setTheme(themes(colorScheme))
    // }, [colorScheme])
   
    
    return (
        <ThemeContext.Provider value={theme}>
            {children}
        </ThemeContext.Provider>
    )
    
}

export default ThemeProvider;