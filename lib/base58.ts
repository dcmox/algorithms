const base58: string = '123456789ABCDEFGHJKLMNPQRSTUVWXYZabcdefghijkmnopqrstuvwxyz'
// tslint:disable no-bitwise
export const base58Encode = (str: string) => {
    let hex: number = parseInt(str.split('').map((s: string) => s.charCodeAt(0).toString(16)).join(''), 16)
    const bytes = []
    while (hex) {
        bytes.push(hex % 58)
        hex = Math.floor(hex /= 58)
    }
    return bytes.reverse().map((b) => base58[b]).join('')
}

export const base58Decode = (s: string) => {
    let hex: any = 0
    for (let i: number = 0; i < s.length; i++) {
        if (base58.indexOf(s[i]) === -1) { throw new Error('Not a valid base58 string!') }
        hex += base58.indexOf(s[i]) * (Math.pow(58, s.length - i - 1))
    }
    hex = hex.toString(16)
    let result: string = ''
    for (let n = 0; n < hex.length; n += 2) {
        result += String.fromCharCode(parseInt(hex.slice(n, n + 2), 16))
    }
    return result
}
