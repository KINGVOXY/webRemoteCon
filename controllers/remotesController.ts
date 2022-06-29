import {
    SystemRequest,
    SystemResponse,
} from "../deps.ts";
import {
    helpers
} from "../api/mods.ts";

export async function post_lightOn(req: SystemRequest, res: SystemResponse): Promise<void> {
    if(helpers.sessions.isLoggedIn(req, res)) {
        const result = await remoCon("light", "on");
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
        const result = await remoCon("light", "off");
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
        const result = await remoCon("cooler", "on");
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
        const result = await remoCon("aircon", "off");
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
        const query = JSON.parse(body);

        if (!query.date || !query.command || !query.mode || !query.isValid) {
            res.status = 500;
            res.send(res.response);
        }

        const shapeQuery = await helpers.timer.shapeQuery(query.date, query.command, query.mode, query.isValid);
        const result = helpers.timer.set(shapeQuery);

        res.status = 200;
        res.send(res.response);
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

async function remoCon(furniture: string, status: string): Promise<string> {
    const res = Deno.run({
        cmd: ["./remote/remoCon.sh", furniture, status],
        stdout: "piped"
    })
    const o = await res.output();
    const text = new TextDecoder().decode(o);
    return text
}
