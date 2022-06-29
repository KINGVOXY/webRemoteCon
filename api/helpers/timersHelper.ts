import * as dt from "https://deno.land/std@0.95.0/datetime/mod.ts";
import * as handler from "../handlers/mods.ts";
import { ConfigReader } from "../../deps.ts";

const enum MODE {
    ONLY = 1,
    WEEK = 2
}

export async function shapeQuery(d: string, c: string, m: string, iV: string) {
    let date:     Date    = new Date();
    let command:  string  = "light:on";
    let mode:     number  = (Number(m) <= MODE.WEEK) ? Number(m): 1;
    let isValid:  boolean = Boolean(iV);

    try {
        date = dt.parse(d, "yyyy-MM-dd HH:mm")
    } catch (error) {}

    const commands = await ConfigReader.read("./config/commands.json")
    for (let i = 0; i < commands.length; i++) {
        if(commands[i].command == c) command = commands[i].command;
    }

    return {
        date:       date,
        command:    command,
        mode:       mode,
        isValid:    isValid
    }
}

export function set(data: {date: Date, command: string, mode: number, isValid: boolean}) {
    switch (data.mode) {
        case MODE.ONLY:
            return setOnlyTimer(data.date, data.command, data.isValid);

        case MODE.WEEK:
            return setWeeklyTimer(data.date, data.command, data.isValid);
            
        default:
            break;
    }
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
    const result = handler.timers.insert({date: dateForSet, isValid: isValid, mode: numOfMode, command: command});
    return result;
}

export function switchTimer(id:number, isValid:boolean = true) {
    const result = handler.timers.update(id, isValid);
    return result;
}

export function deleteTimer(id:number) {
    const result = handler.timers.remove(id);
    return result;
}
