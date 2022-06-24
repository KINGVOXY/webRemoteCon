import {
    System, 
    Config,
    SystemResponse,
    SystemRequest,
    PuddleJSON
 } from "./deps.ts";
import { routes } from "./config/routes.ts";

/*
export const USERS = PuddleJSON.USE("./pj/users.json", {
    name: ["NOT NULL"],
    email: ["NOT NULL", "UNIQUE"]
})
*/
// ルーティング
// routing
System.createRoutes(...routes);

// 素材の読み込み
// assets importing
System.createRoutes("./views/assets/*");

/*
System.createRoute("wei1").GET(async (req: SystemRequest, res: SystemResponse) => {
    USERS.INSERT({name: "daruo", email: "neko@neko.neko"});
    //USERS.SELECT({name: "a"}).UPDATE({email: "aaaaaa"});
    
    await res.setFile("./views/home/welcome.html");
})
System.createRoute("wei2").GET(async (req: SystemRequest, res: SystemResponse) => {
    //USERS.INSERT({name: "daruo", email: "neko@neko.neko"});
    USERS.SELECT({name: "a"}).UPDATE({email: "aaaaaa"});
    
    await res.setFile("./views/home/welcome.html");
})
*/

System.listen("./config/.env", (conf: Config)=>{
    console.log(`The server running on http://${conf.SERVER.HOSTNAME}:${conf.SERVER.PORT}`);
});
