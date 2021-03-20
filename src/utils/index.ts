// 求两个集合的差集
export const difference = (bigArr: string[], smArr: string[]) => {
    const a = new Set(bigArr);
    const b = new Set(smArr);
    return Array.from(new Set(Array.from(a).filter((x => !b.has(x)))));
}

