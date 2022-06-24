import { PuddleJSON } from "../deps.ts";

/**
 * USERモデルのテーブルデータ
 */
export const USERS = PuddleJSON.USE("./models/users.json", {
    id: ["AUTO INCREMENT"],
    name: ["NOT NULL"],
    email: ["NOT NULL", "UNIQUE"],
    password: ["NOT NULL"],
    cookie: ["UNIQUE"],
})