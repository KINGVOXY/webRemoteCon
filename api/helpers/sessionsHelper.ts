import {
    SystemRequest,
    SystemResponse
} from "../../deps.ts";
import { USERS } from "../../models/users.ts";
import { bcrypt } from "../mods.ts";
import { utils } from "./mods.ts";

/**
 * メールアドレスとパスワードがあっているか
 * @param query 
 * @returns 
 */
export async function isSuccess(query: any): Promise<number> {
    if (!(query.email&&query.password)) return 0;
    // console.log("AAA");
    
    const user = (USERS.SELECT({ email: query.email }).RESULT())[0];
    if(!user || !user.password || !user.id) return 0;
    // console.log("AAAAAA",user);
    
    const res = await bcrypt.compare(query.password, user.password.toString());
    
    if (!res) return 0;
    // console.log("AAAAAAAAA",res);

    return Number(user.id);
}

/**
 * ログイン情報をpjに登録
 * @param e email
 * @param c 登録するcookie
 * @returns 登録できたか
 */
export function setCookie(userId: number): string {
    const user = (USERS.SELECT({ id: userId.toString() }).RESULT())[0];
    if (!user.cookie) return "-1";
    const cookie = (user.cookie.toString().length == 21)?user.cookie.toString(): utils.genHash(21);
    
    USERS.SELECT({ id: userId.toString() }).UPDATE({ cookie: cookie });

    return cookie;
}

/**
 * ログイン状態かどうかを確認する
 * ログイン状態で無いとき、topにリダイレクト
 * @param req 
 * @param res 
 * @returns ログイン状態の時、true
 */
export function isLoggedIn(req: SystemRequest, res:SystemResponse): Boolean {
    if(!checkSession(req.getCookie("session"))) {
        // console.log("sH: 未ログイン")
        res.redirect("/")
        return false;
    } else {
        // console.log("sH: ログイン");
        return true;
    }
}

/**
 * Top画面で、すでにログイン状態にあるかを確認する
 * ログイン状態だったときはtopにリダイレクト
 * @param req 
 * @param res 
 * @returns ログイン状態で無いとき、true
 */
 export function isNotAlreadyLoggedIn(req: SystemRequest, res:SystemResponse): Boolean {
    const cookie: string|undefined = req.getCookie("session");
    if(!checkSession(cookie)) {
        return true;
    } else {
        res.redirect("/top");
        return false;
    }
}

/**
 * 現在、正常なログイン状態かを確認する
 * @param c ログインしようとしているcookie
 * @returns cookie値
 */
function checkSession(c: string|undefined): boolean {
    if(!c) return false;
    const user_data = USERS.SELECT({ cookie: c });
    if (!user_data.list.length) return false;
    return true;
}
