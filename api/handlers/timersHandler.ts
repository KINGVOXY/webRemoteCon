import { TIMER } from "../../models/timer.ts";

export function insert(data: {date: string, isValid: boolean, mode: number, command: string, hash: string}) {
    const result = TIMER.INSERT(data);
    return result;
}

export function update(id: number, isValid: boolean) {
    const result = TIMER.SELECT({id: id}).UPDATE({isValid: isValid});
    return result;
}

export function select() {
    const result = TIMER.SELECT().RESULT();
    return result;
}

export function selectHash() {
    const result = TIMER.SELECT().RESULT("hash");
    return result;
}

export function selectByHash(hash: string) {
    const result = TIMER.SELECT({hash:hash}).RESULT();
    return result;
}

export function remove(hash: string) {
    const result = TIMER.SELECTIF(row=>({ hash: row.hash == hash })).REMOVE();
    return result;
}
