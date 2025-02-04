function shortestPalindrome(s: string): string {
    const p = 31;
    const mod = 999331;
    const len = s.length;

    if (len === 0) return s;

    const powers: number[] = new Array(len);
    let currentPower = 1;

    for (let i = 0; i < len; i++) {
        powers[i] = currentPower;
        currentPower = (currentPower * p) % mod;
    }

    const hashesLeft: number[] = new Array(len).fill(0);
    const hashesRight: number[] = new Array(len).fill(0);

    for (let i = 0; i < len; i++) {
        hashesLeft[i] = ((s.charCodeAt(i) - 'a'.charCodeAt(0) + 1) * powers[i]) % mod;
        hashesRight[len - i - 1] = ((s.charCodeAt(len - i - 1) - 'a'.charCodeAt(0) + 1) * powers[i]) % mod;

        if (i > 0) {
            hashesLeft[i] = (hashesLeft[i] + hashesLeft[i - 1]) % mod;
            hashesRight[len - i - 1] = (hashesRight[len - i - 1] + hashesRight[len - i]) % mod;
        }
    }

    let k: number;
    for (k = 0; k < len; k++) {
        let hashPrefix = hashesLeft[len - k - 1];
        let hashInvSuffix = hashesRight[0];

        if (k > 0) {
            hashPrefix = (hashPrefix * powers[k]) % mod;

            if (len - k < len) {
                hashInvSuffix = (hashInvSuffix - hashesRight[len - k] + mod) % mod;
            }
        }

        if (hashPrefix === hashInvSuffix) {
            let isPalindrome = true;
            for (let i = 0; i < Math.floor((len - k) / 2); i++) {
                if (s[i] !== s[len - k - i - 1]) {
                    isPalindrome = false;
                    break;
                }
            }
            if (isPalindrome) break;
        }
    }

    const suffix = s.substring(len - k).split('').reverse().join('');
    return suffix + s;
}