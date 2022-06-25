import {
    SystemRequest,
    SystemResponse,
} from "../deps.ts";
import {
    helpers,
    qs
} from "../api/mods.ts";

/**
 * topページの表示
 * [/top => "./views/home/top.html"]
 * @param req リクエスト(SystemRequest)
 * @param res レスポンス(SystemResponse)
 */
export async function get_new(req: SystemRequest, res: SystemResponse): Promise<void> {
    if(helpers.sessions.isNotAlreadyLoggedIn(req, res)) {
        await res.setFile("./views/sessions/new.html");
    }
}

export async function post_new(req: SystemRequest, res: SystemResponse): Promise<void> {
    const body = await req.readBody();
    let query;
    try {
        query = qs.parse(body);
    } catch (error) {
        res.redirect(`/?message=${encodeURI("形式エラー")}&status=1`);
        res.send(res.response);
    }
    console.log(query);
    
    const result = await helpers.sessions.isSuccess(query);
    console.log(result);
    
    //const result = true;
    if (result) {
        const cookie = helpers.sessions.setCookie(result);
        await res.setCookie({
            name: "session", 
            value: cookie, 
            secure: false, 
            path: "/", 
            sameSite: "Lax",
            maxAge: 30*24*60*60
        });
        res.redirect("/top");
    } else {
        res.redirect(`/?message=${encodeURI("メールアドレス・パスワードが違います")}&status=1`);
    }
}
