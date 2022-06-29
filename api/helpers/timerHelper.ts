import { TIMER } from "../../models/timer.ts";
import * as dt from "https://deno.land/std@0.95.0/datetime/mod.ts";

const enum MODE {
    ONLY = 1,
    WEEK = 2
}

export function setOnlyTimer(bookTime:Date, command:string, isValid:boolean) {
    return setTimer(bookTime, command, MODE.ONLY, isValid);
}

export function setWeeklyTimer(bookTime:Date, command:string, isValid:boolean) {
    return setTimer(bookTime, command, MODE.WEEK, isValid);
}

function setTimer(ftr:Date, command:string, mode:MODE, isValid:boolean = true) {
    const numOfMode: number = Number(mode);
    const dateForSet: string = dt.format(ftr,"yyyy-MM-dd HH:mm:ss")
    const result = TIMER.INSERT({date: dateForSet, isValid: isValid, mode: numOfMode, command: command});
    return result;
}

export function switchTimer(id:number, isValid:boolean = true) {
    const result = TIMER.SELECT({id: id}).UPDATE({isValid: isValid});
    return result;
}

export function deleteTimer(id:number) {
    const result = TIMER.SELECT({id: id}).REMOVE();
    return result;
}
