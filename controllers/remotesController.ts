import {
    SystemRequest,
    SystemResponse,
} from "../deps.ts";
import {
    helpers,
    qs
} from "../api/mods.ts";

export async function get_create(req: SystemRequest, res: SystemResponse): Promise<void> {
    if(helpers.sessions.isLoggedIn(req, res)) {
        await res.setFile("./views/home/create.html");
    }
}

export async function get_automations(req: SystemRequest, res: SystemResponse): Promise<void> {
    if(helpers.sessions.isLoggedIn(req, res)) {
        const atms = helpers.timer.get();
        res.body = JSON.stringify(atms);
        
        await res.send(res.response);
    }
}

export async function post_lightOn(req: SystemRequest, res: SystemResponse): Promise<void> {
    if(helpers.sessions.isLoggedIn(req, res)) {
        const result = await helpers.utils.remoCon("light", "on");
        if (result.indexOf("done") == -1) {
            res.status = 500;
            res.send(res.response);
        }
        res.status = 200;
        res.send(res.response);
    }
}

export async function post_lightOff(req: SystemRequest, res: SystemResponse): Promise<void> {
    if(helpers.sessions.isLoggedIn(req, res)) {
        const result = await helpers.utils.remoCon("light", "off");
        if (result.indexOf("done") == -1) {
            res.status = 500;
            res.send(res.response);
        }
        res.status = 200;
        res.send(res.response);
    }
}

export async function post_coolerOn(req: SystemRequest, res: SystemResponse): Promise<void> {
    if(helpers.sessions.isLoggedIn(req, res)) {
        const result = await helpers.utils.remoCon("cooler", "on");
        if (result.indexOf("done") == -1) {
            res.status = 500;
            res.send(res.response);
        }
        res.status = 200;
        res.send(res.response);
    }
}

export async function post_airconOff(req: SystemRequest, res: SystemResponse): Promise<void> {
    if(helpers.sessions.isLoggedIn(req, res)) {
        const result = await helpers.utils.remoCon("aircon", "off");
        if (result.indexOf("done") == -1) {
            res.status = 500;
            res.send(res.response);
        }
        res.status = 200;
        res.send(res.response);
    }
}

export async function post_setTimer(req: SystemRequest, res: SystemResponse): Promise<void> {
    if(helpers.sessions.isLoggedIn(req, res)) {
        const body = await req.readBody();
        // console.log(body);
         console.log(qs.parse(body));
        
        const query = qs.parse(body);

        if (!query.date || !query.command || !query.mode) {
            res.status = 500;
            res.send(res.response);
            return;
        }
        let isValid;
        if (!query.isValid) isValid = "0";
        else isValid = "1";
        let week;
        if (!query.week) week = ["0"];
        else week = query.week;

        const shapeQuery = await helpers.timer.shapeQuery(query.date.toString(), query.command.toString(), query.mode.toString(), isValid, week);
        console.log(shapeQuery);
        const result = helpers.timer.set(shapeQuery);

        res.status = 200;
        res.redirect("/top")
    }
}

export async function post_updateTimer(req: SystemRequest, res: SystemResponse): Promise<void> {
    if(helpers.sessions.isLoggedIn(req, res)) {
        const body = await req.readBody();
        const query = JSON.parse(body);

        if (!query.id || !query.isValid) {
            res.status = 500;
            res.send(res.response);
        }

        helpers.timer.switchTimer(query.id, query.isValid);

        res.status = 200;
        res.send(res.response);
    }
}

export async function post_deleteTimer(req: SystemRequest, res: SystemResponse): Promise<void> {
    if(helpers.sessions.isLoggedIn(req, res)) {
        const body = await req.readBody();
        const query = JSON.parse(body);

        if (!query.id) {
            res.status = 500;
            res.send(res.response);    
        }

        helpers.timer.deleteTimer(query.id);

        res.status = 200;
        res.send(res.response);
    }
}
