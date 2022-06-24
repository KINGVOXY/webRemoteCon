import {
    SystemRequest,
    SystemResponse,
} from "../deps.ts";
import {
    helpers
} from "../api/mods.ts";

/**
 * topページの表示
 * [/top => "./views/home/top.html"]
 * @param req リクエスト(SystemRequest)
 * @param res レスポンス(SystemResponse)
 */
export async function get_top(req: SystemRequest, res: SystemResponse): Promise<void> {
    if(helpers.sessions.isLoggedIn(req, res)) {
        await res.setFile("./views/home/top.html");
    }
}
