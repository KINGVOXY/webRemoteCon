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

export async function test_timer(req: SystemRequest, res: SystemResponse): Promise<void> {
    if(helpers.sessions.isLoggedIn(req, res)) {
        const now = new Date();
        const ftr = now.setSeconds(now.getSeconds() + 1);
        const result = helpers.timer.setOnlyTimer(new Date(ftr), "light:on", true);
        console.log(result);
        

        res.status = 200;
        res.send(res.response);
    }
}

export async function post_setTimer(req: SystemRequest, res: SystemResponse): Promise<void> {
    if(helpers.sessions.isLoggedIn(req, res)) {
        const body = await req.readBody();

        // write here.

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
