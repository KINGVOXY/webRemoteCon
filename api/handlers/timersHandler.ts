import { TIMER } from "../../models/timer.ts";

export function insert(data: {date: string, isValid: boolean, mode: number, command: string}) {
    const result = TIMER.INSERT(data);
    return result;
}

export function update(id: number, isValid: boolean) {
    const result = TIMER.SELECT({id: id}).UPDATE({isValid: isValid});
    return result;
}

export function remove(id: number) {
    const result = TIMER.SELECT({id: id}).REMOVE();
    return result;
}
