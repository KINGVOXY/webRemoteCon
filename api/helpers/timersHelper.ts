import * as dt from "https://deno.land/std@0.95.0/datetime/mod.ts";
import * as handler from "../handlers/mods.ts";
import { ConfigReader } from "../../deps.ts";
import { utils } from "./mods.ts";
import { TIMER } from "../../models/timer.ts";

const enum MODE {
    ONLY = 1,
    WEEK = 2
}

export async function shapeQuery(d: string, c: string, m: string, iV: string, w:any) {
    let date:Date   = new Date();
    let command     = "light:on";
    const week: number[]    = (w)? w.map(Number) : [0];
    const mode: number      = (Number(m) <= MODE.WEEK) ? Number(m): 1;
    const isValid           = Boolean(Number(iV));
    console.log(w);
    console.log(week);
    

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
        week:       week,
        mode:       mode,
        isValid:    isValid
    }
}

export function set(data: {date: Date, command: string, mode: number, isValid: boolean, week: number[]}) {
    switch (data.mode) {
        case MODE.ONLY:
            return setOnlyTimer(data.date, data.command, data.isValid);

        case MODE.WEEK:
            console.log("WEEK");
            
            return setWeeklyTimer(data.date, data.command, data.isValid, data.week);
            
        default:
            break;
    }
}

type ATMDATA = { isValid:boolean, mode:number, hash:string, command:string[], time:string, date?:string, week?:number[] };
export function get(): ATMDATA[] {
    const result: ATMDATA[] = []
    // 重複を取り除いてHashを取得
    const hash = handler.timers.selectHash().filter((element, index, self) => 
    self.findIndex(e => 
                e.hash === element.hash) === index
    );

    for (const h of hash) {
        if (!h.hash) continue;
        const data = handler.timers.selectByHash(h.hash.toString());

        if (!data[0].mode || !data[0].command || !data[0].date) continue;
        const iV = Boolean(data[0].isValid);
        const mode = Number(data[0].mode);
        const command = data[0].command.toString().split(":");
        const bt = dt.parse(data[0].date.toString(), "yyyy-MM-dd HH:mm:ss");
        const t = `${bt.getHours()}:${bt.getMinutes()}`;
        
        if (mode == MODE.ONLY) {
            const d = dt.format(bt, "yyyy/MM/dd")
            result.push({isValid:iV, mode:mode, hash:h.hash.toString(), command:command, time:t, date:d});
        } else {
            const days = [];
            for (const d of data) {
                if (!d.date) continue;
                const day = dt.parse(d.date.toString(), "yyyy-MM-dd HH:mm:ss").getDay();
                days.push(day);
            }
            result.push({isValid:iV, mode:mode, hash:h.hash.toString(), command:command, time:t, week:days});
        }
    }
    
    return result;
}

export function setOnlyTimer(bookTime:Date, command:string, isValid:boolean) {
    const hash = utils.genHash(4);
    setTimer(bookTime, command, MODE.ONLY, hash, isValid);
    return hash;
}

export function setWeeklyTimer(bookTime:Date, command:string, isValid:boolean, week:number[]) {
    const nowWD = bookTime.getDay();
    const hash = utils.genHash(4);
    for (const wd of week) {
        const bt = new Date(bookTime.getTime());
        const newBook = new Date(bt.setDate(bt.getDate()+(wd - nowWD)))
        console.log(newBook);
        
        setTimer(newBook, command, MODE.WEEK, hash, isValid);   
    }
    return hash;
}

function setTimer(ftr:Date, command:string, mode:MODE, hash: string, isValid = true) {
    const numOfMode = Number(mode);
    const dateForSet: string = dt.format(ftr,"yyyy-MM-dd HH:mm:ss")
    const result = handler.timers.insert({date: dateForSet, isValid: isValid, mode: numOfMode, command: command, hash: hash});
    return result;
}

export function switchTimer(id:number, isValid = true) {
    const result = handler.timers.update(id, isValid);
    return result;
}

export function deleteTimer(hash: string) {
    const result = handler.timers.remove(hash);
    return result;
}

export function checkTimer() {
    setInterval(async () => {
        const now = new Date();
        const books = TIMER.SELECT().RESULT();
        
        for (const b of books) {
            if (!b.id || !b.date || !b.isValid || !b.mode || !b.command) continue;
            const bd = dt.parse(b.date.toString(), "yyyy-MM-dd HH:mm:ss");
            const com = b.command.toString().split(":");
    
            switch (b.mode) {
                // 一度の予約実行
                case MODE.ONLY:
                    if (bd <= now) {
                        TIMER.SELECT({id: b.id}).REMOVE();
                        if (!b.isValid) break;
                        await utils.remoCon(com[0], com[1]);
                    }
                break;
    
                // 曜日実行
                case MODE.WEEK:
                    if (!b.isValid) break;
                    if (bd.getDay() != now.getDay()) break;
                    const bookTime: Date = new Date(now.getFullYear(), now.getMonth(), now.getDate(), bd.getHours(),bd.getMinutes());
                    const bt = new Date(bookTime.getTime());
                    bt.setSeconds(bt.getSeconds() + 11);
                    if (bookTime <= now && now <= bt) {
                        await utils.remoCon(com[0], com[1]);
                    }
                break;
            
                default:
                    break;
            }
        }
    
    }, 10 * 1000);
}
