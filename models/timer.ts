import { PuddleJSON } from "../deps.ts";

/**
 * USERモデルのテーブルデータ
 */
export const TIMER = PuddleJSON.USE("./models/timer.json", {
    id: ["AUTO INCREMENT"],
    date: ["NOT NULL"],
    isValid: ["NOT NULL"],
    command: ["NOT NULL"],
    mode: ["NOT NULL"],
    hash: ["NOT NULL"]
})