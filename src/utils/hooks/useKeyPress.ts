import { useEffect, useRef, useState } from "react";
import { KeyTypes } from "../../types";
import { judgeSetEqual } from "..";



/**
 * 
 * @param targetKeys hope to be listened keys
 * @returns when all keys are pressed return true
 */
const useKeyPress = (targetKeys: KeyTypes[]): boolean => {


    // 实现思路
    // 1. keydown 的时候将往 pressedKeys 里面装 KeyTypes 类型的按键
    // 2. keyup 的时候就从 pressedKeys 弹出对应的按键
    const [isPressed, setIsPressed] = useState(false);
    const pressedKeysRef = useRef<Set<string>>(new Set());



    const handleKeyUp = (ev: KeyboardEvent) => {
        // console.log(ev.key);
        pressedKeysRef.current.delete(ev.key);
    }

    const handleKeyDown = (ev: KeyboardEvent) => {
        pressedKeysRef.current.add(ev.key);

        if (judgeSetEqual(pressedKeysRef.current, new Set(targetKeys))) {
            setIsPressed(true);
        } else {
            setIsPressed(false);
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