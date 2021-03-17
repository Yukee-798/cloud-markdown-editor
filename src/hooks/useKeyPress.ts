import { useEffect, useState } from "react";
import { KeyTypes } from "../types";



/**
 * 
 * @param targetKey judge targetKey isPress
 * @returns boolean
 * @description 
 * 1. 按下的按键匹配 targetKey 则返回 true
 * 2. 按下的按键弹起来后返回 false
 */
const useKeyPress = (targetKey: KeyTypes): boolean => {

    // 
    const [isPressed, setIsPressed] = useState(false);

    const handleKeyUp = () => {
        setIsPressed(false)
    }

    const handleKeyDown = (ev: KeyboardEvent) => {
        const { key } = ev;
        if (key === targetKey) {
            setIsPressed(true);
        }
    }

    useEffect(() => {
        document.addEventListener('keyup', handleKeyUp);
        document.addEventListener('keydown', handleKeyDown)
        return () => {
            document.removeEventListener('keyup', handleKeyUp);
            document.removeEventListener('keydown', handleKeyDown);
        }
    }, []);

    return isPressed;
}

export default useKeyPress;