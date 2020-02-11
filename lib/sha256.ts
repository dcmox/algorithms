// tslint:disable: no-bitwise
export const ROTR = (value: number, amount: number) =>
	(value >>> amount) | (value << (32 - amount))

// Credit to https://geraintluff.github.io/sha256/ for some of the bit-wise logic
export const sha256 = (text: string) => {
	const limit: number = 4294967296 // 2^32
	let result = ''

	const words: number[] = []
	const bitLength = text.length * 8

	let hash: number[] = [
		1779033703,
		-1150833019,
		1013904242,
		-1521486534,
		1359893119,
		-1694144372,
		528734635,
		1541459225,
		-876896931,
		1654270250,
		-1856437926,
		355462360,
		1731405415,
		-1900787065,
		-619958771,
		1203062813,
		-1369468586,
		-814971437,
		796084093,
		1830299338,
		-1958489001,
		-480201322,
		474308610,
		1863934769,
		-649150799,
		214214161,
		639484402,
		1477814206,
		1891102055,
		-1588511639,
		1157183029,
		1913507325,
		-1268304226,
		-902689931,
		887149614,
		1237834173,
		-2018788878,
		-1000103172,
		-331365389,
		656899949,
		1628171250,
		1948300446,
		-771913165,
		-461949548,
		153196534,
		458427541,
		-2036505790,
		-286970289,
		285697673,
		570139515,
		1135321014,
		1974073629,
		-2043654119,
		-674397837,
		134086911,
		933187903,
		1723224488,
		1984608322,
		-1531941919,
		-1017672683,
		-761910701,
		503553856,
		-2055504914,
		-1566838050,
	]

	const k: number[] = [
		1116352408,
		1899447441,
		-1245643825,
		-373957723,
		961987163,
		1508970993,
		-1841331548,
		-1424204075,
		-670586216,
		310598401,
		607225278,
		1426881987,
		1925078388,
		-2132889090,
		-1680079193,
		-1046744716,
		-459576895,
		-272742522,
		264347078,
		604807628,
		770255983,
		1249150122,
		1555081692,
		1996064986,
		-1740746414,
		-1473132947,
		-1341970488,
		-1084653625,
		-958395405,
		-710438585,
		113926993,
		338241895,
		666307205,
		773529912,
		1294757372,
		1396182291,
		1695183700,
		1986661051,
		-2117940946,
		-1838011259,
		-1564481375,
		-1474664885,
		-1035236496,
		-949202525,
		-778901479,
		-694614492,
		-200395387,
		275423344,
		430227734,
		506948616,
		659060556,
		883997877,
		958139571,
		1322822218,
		1537002063,
		1747873779,
		1955562222,
		2024104815,
		-2067236844,
		-1933114872,
		-1866530822,
		-1538233109,
		-1090935817,
		-965641998,
	]

	text += '\x80' // add delimiter
	text = text.padEnd(Math.floor(text.length / 64) * 64 + 56, '\x00')

	for (let i: number = 0; i < text.length; i++) {
		const j: number = text.charCodeAt(i)
		if (j > 255) {
			break
		}
		words[Math.floor(i / 4)] |= j << (((3 - i) % 4) * 8)
	}

	words[words.length] = (bitLength / limit) | 0
	words[words.length] = bitLength

	for (let j: number = 0; j < words.length; j += 16) {
		const w = words.slice(j, j + 16)
		const prevHash: number[] = hash

		hash = hash.slice(0, 8)

		// Generate words
		for (let i: number = 0; i < 64; i++) {
			const w2 = w[i - 2]
			const w15 = w[i - 15]
			const h0: number = hash[0]
			const h4: number = hash[4]

			if (i > 15) {
				w[i] =
					w[i - 16] +
					(ROTR(w15, 7) ^ ROTR(w15, 18) ^ (w15 >>> 3)) +
					w[i - 7] +
					(ROTR(w2, 17) ^ ROTR(w2, 19) ^ (w2 >>> 10))
			}

			const word1: number =
				hash[7] +
				(ROTR(h4, 6) ^ ROTR(h4, 11) ^ ROTR(h4, 25)) +
				((h4 & hash[5]) ^ (~h4 & hash[6])) +
				k[i] +
				w[i]

			const word2: number =
				(ROTR(h0, 2) ^ ROTR(h0, 13) ^ ROTR(h0, 22)) +
				((h0 & hash[1]) ^ (h0 & hash[2]) ^ (hash[1] & hash[2]))

			hash = [(word1 + word2) | 0].concat(hash)
			hash[4] = (hash[4] + word1) | 0
		}
		for (let i: number = 0; i < 8; i++) {
			hash[i] = (hash[i] + prevHash[i]) | 0
		}
	}

	for (let i: number = 0; i < 8; i++) {
		for (let j: number = 3; j + 1; j--) {
			const b = (hash[i] >> (j * 8)) & 255
			result += (b < 16 ? 0 : '') + b.toString(16)
		}
	}

	return result
}
