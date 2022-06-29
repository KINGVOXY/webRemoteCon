import {
    System, 
    Config,
 } from "./deps.ts";
import { routes } from "./config/routes.ts";

// ルーティング
// routing
System.createRoutes(...routes);

// 素材の読み込み
// assets importing
System.createRoutes("./views/assets/*");

System.listen("./config/.env", (conf: Config)=>{
    console.log(`The server running on http://${conf.SERVER.HOSTNAME}:${conf.SERVER.PORT}`);
});
