import { useEffect, useState } from "react";
import { KeyTypes } from "../types";
import { judgeSetEqual } from "../utils";



/**
 * 
 * @param targetKeys hope to be listened keys
 * @returns when all keys are pressed return true
 */
const useKeyPress = (targetKeys: KeyTypes[]): boolean => {

    // 数组去重
    targetKeys = Array.from(new Set([...targetKeys]));

    // 实现思路
    // 1. keydown 的时候将往 pressedKeys 里面装 KeyTypes 类型的按键
    // 2. keyup 的时候就从 pressedKeys 弹出对应的按键
    const [isPressed, setIsPressed] = useState(false);
    const [pressedKeys, setPressedKeys] = useState<KeyTypes[]>([]);

    console.log('pressKeys',pressedKeys);


    const handleKeyUp = (ev: KeyboardEvent) => {
        const { key } = ev;
        
        if (pressedKeys.includes(<KeyTypes>key)) {
            setPressedKeys(pressedKeys.filter((value) => value !== key));
        }
    }

    const handleKeyDown = (ev: KeyboardEvent) => {
        const { key } = ev;
        // console.log(ev.key);

        if (key in KeyTypes) {
            const mKey = key as KeyTypes;
            setPressedKeys(Array.from(new Set([...pressedKeys, mKey])));
        }

        // 判断 pressedKeys 含有的元素与 targetKeys 相同
        if (judgeSetEqual(new Set([...pressedKeys]), new Set([...targetKeys]))) {
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