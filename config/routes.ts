import * as home from "../controllers/homeController.ts";
import * as sessions from "../controllers/sessionsController.ts";
import * as remote from "../controllers/remoteController.ts";

export const routes = 
[
    {
        PATH: "./views/sessions/new.html",
        URL: ["/"],
        GET: sessions.get_new
    },
    {
        PATH: "./views/sessions/new.post",
        URL: ["/sessions/new"],
        POST: sessions.post_new
    },
    {
        PATH: "./views/home/top.html",
        URL: ["/top"],
        GET: home.get_top
    },
    {
        PATH: "light/on.api",
        URL: ["/api/controller/light/on"],
        POST: remote.light_on
    },
    {
        PATH: "light/off.api",
        URL: ["/api/controller/light/off"],
        POST: remote.light_off
    },
    {
        PATH: "cooler/on.api",
        URL: ["/api/controller/cooler/on"],
        POST: remote.cooler_on
    },
    {
        PATH: "aircon/off.api",
        URL: ["/api/controller/aircon/off"],
        POST: remote.aircon_off
    },

];