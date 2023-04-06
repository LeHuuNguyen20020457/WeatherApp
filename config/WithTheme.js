import { useContext } from "react";
import { ThemeContext } from "./ThemeContext";

const WithTheme = Component => ({...props}) => {
    const theme = useContext(ThemeContext)

    return <Component theme={theme} {...props}></Component>
}
export default  WithTheme;
