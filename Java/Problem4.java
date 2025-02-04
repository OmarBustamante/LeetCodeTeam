class Solution {
    public String shortestPalindrome(String s) {
        int p = 31;
        int mod = (int) 1e9 + 7;
        int length = s.length();

        long[] powers = new long[length];
        long currentPower = 1;

        for (int i = 0; i < length; i++) {
            powers[i] = currentPower;
            currentPower = (currentPower * p) % mod;
        }

        long[] hashesLeft = new long[length];
        long[] hashesRight = new long[length];

        for (int i = 0; i < length; i++) {
            hashesLeft[i] = ((s.charAt(i) - 'a' + 1) * powers[i]) % mod;
            hashesRight[length - i - 1] = ((s.charAt(length - i - 1) - 'a' + 1) * powers[i]) % mod;

            if (i > 0) {
                hashesLeft[i] = (hashesLeft[i] + hashesLeft[i - 1]) % mod;
                hashesRight[length - i - 1] = (hashesRight[length - i - 1] + hashesRight[length - i]) % mod;
            }
        }

        int k;
        for (k = 0; k < length; k++) {
            long hashPrefix = hashesLeft[length - k - 1];
            long hashInvSuffix = hashesRight[0];

            if (k > 0) {
                hashPrefix = (hashPrefix * powers[k]) % mod;
                hashInvSuffix = (hashInvSuffix - hashesRight[length - k] + mod) % mod;
            }

            if (hashPrefix == hashInvSuffix) {
                boolean isPalindrome = true;
                for (int i = 0; i < (length - k) / 2; i++) {
                    if (s.charAt(i) != s.charAt(length - k - i - 1)) {
                        isPalindrome = false;
                        break;
                    }
                }
                if (isPalindrome) break;
            }
        }

        StringBuilder result = new StringBuilder(s.substring(length - k)).reverse();
        result.append(s);

        return result.toString();
    }
}