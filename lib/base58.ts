const base58: string = '123456789ABCDEFGHJKLMNPQRSTUVWXYZabcdefghijkmnopqrstuvwxyz'
// tslint:disable no-bitwise
export const base58Encode = (str: string) => {
    const buffer: number[] = str.split('').map((s: string) => s.charCodeAt(0))
    const bytes: number[] = [0]
    // tslint:disable-next-line: prefer-for-of
    for (let i: number = 0; i < buffer.length; i++) {
        for (let j = 0; j < bytes.length; j++) {
            bytes[j] <<= 8
        }
        bytes[0] += buffer[i]
        let remainder: number = 0
        for (let j = 0; j < bytes.length; j++) {
            bytes[j] += remainder
            remainder = (bytes[j] / 58) | 0
            bytes[j] %= 58
        }

        while (remainder) {
            bytes.push(remainder % 58)
            remainder = (remainder / 58) | 0
        }
    }
    let i: number = 0
    while (buffer[i] === 0 && i < buffer.length - 1 && i++) { bytes.push(0) }
    return bytes.reverse().map((b) => base58[b]).join('')
}

export const base58Decode = (s: string) => {
    const bytes: number[] = [0]
    // tslint:disable-next-line: prefer-for-of
    for (let i = 0; i < s.length; i++) {
        const c: string = s[i]
        if (base58.indexOf(c) === -1) { throw new Error('Invalid Base58 string!') }
        for (let j = 0; j < bytes.length; j++) { bytes[j] *= 58 }
        bytes[0] += base58.indexOf(c)
        let remainder: number = 0
        for (let j = 0; j < bytes.length; j++) {
            bytes[j] += remainder
            remainder = bytes[j] >> 8
            bytes[j] &= 255
        }
        while (remainder) {
            bytes.push(remainder & 255)
            remainder >>= 8
        }
    }
    let i: number = 0
    while (s[i] === '1' && i < s.length - 1 && i++) { bytes.push(0) }
    return bytes.reverse().map((b) => String.fromCharCode(b)).join('')
}
