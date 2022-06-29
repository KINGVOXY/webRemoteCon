import { TIMER } from "./models/timer.ts";
import * as dt from "https://deno.land/std@0.95.0/datetime/mod.ts";

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
                    await remoCon(com[0], com[1]);
                }
                break;

            // 曜日実行
            case MODE.WEEK:
                if (!b.isValid) break;
                if (bd.getDay() != now.getDay()) break;
                const bookTime: Date = new Date(now.getFullYear(), now.getMonth(), now.getDate(), bd.getHours(),bd.getMinutes());
                if (bookTime <= now) {
                    await remoCon(com[0], com[1]);
                    TIMER.SELECT({id: b.id}).REMOVE();
                }
                break;
        
            default:
                break;
        }
    }

}, 60 * 1000);

const enum MODE {
    ONLY = 1,
    WEEK = 2
}

async function remoCon(furniture: string, status: string): Promise<string> {
    const res = Deno.run({
        cmd: ["./remote/remoCon.sh", furniture, status],
        stdout: "piped"
    })
    const o = await res.output();
    const text = new TextDecoder().decode(o);
    return text
}
