import * as home from "../controllers/homeController.ts";
import * as sessions from "../controllers/sessionsController.ts";
import * as remote from "../controllers/remotesController.ts";

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
        POST: remote.post_lightOn
    },
    {
        PATH: "light/off.api",
        URL: ["/api/controller/light/off"],
        POST: remote.post_lightOff
    },
    {
        PATH: "cooler/on.api",
        URL: ["/api/controller/cooler/on"],
        POST: remote.post_coolerOn
    },
    {
        PATH: "aircon/off.api",
        URL: ["/api/controller/aircon/off"],
        POST: remote.post_airconOff
    },
    {
        PATH: "aircon/timer.api",
        URL: ["/api/controller/timer/test"],
        POST: remote.test_timer
    },

];