
/**
 * ハッシュ作成
 * @param length 
 * @returns 
 */
export function genHash(length = 21):string {
    let hash = "";
    const base = "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789";
    const base_len = base.length;
    
    for(let i = 0;i < length;i++)
        hash += base[Math.floor(Math.random() * base_len)].toString()
    
    return hash;
}

/**
 * リモコンの操作
 * @param furniture 
 * @param status 
 * @returns 
 */
export async function remoCon(furniture: string, status: string): Promise<string> {
    const res = Deno.run({
        cmd: ["./remote/remoCon.sh", furniture, status],
        stdout: "piped"
    })
    const o = await res.output();
    const text = new TextDecoder().decode(o);
    return text
}
