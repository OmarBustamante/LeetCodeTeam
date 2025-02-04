class Solution:
    def shortestPalindrome(self, s: str) -> str:
        p = 31
        mod = int(1e9 + 7)
        length = len(s)

        powers = [1] * length
        for i in range(1, length):
            powers[i] = (powers[i - 1] * p) % mod

        hashes_left = [0] * length
        hashes_right = [0] * length

        for i in range(length):
            hashes_left[i] = ((ord(s[i]) - ord('a') + 1) * powers[i]) % mod
            hashes_right[length - i - 1] = ((ord(s[length - i - 1]) - ord('a') + 1) * powers[i]) % mod

            if i > 0:
                hashes_left[i] = (hashes_left[i] + hashes_left[i - 1]) % mod
                hashes_right[length - i - 1] = (hashes_right[length - i - 1] + hashes_right[length - i]) % mod

        k = 0
        for k in range(length):
            hash_prefix = hashes_left[length - k - 1]
            hash_inv_suffix = hashes_right[0]

            if k > 0:
                hash_prefix = (hash_prefix * powers[k]) % mod
                hash_inv_suffix = (hash_inv_suffix - hashes_right[length - k] + mod) % mod

            if hash_prefix == hash_inv_suffix:
                is_palindrome = True
                for i in range((length - k) // 2):
                    if s[i] != s[length - k - i - 1]:
                        is_palindrome = False
                        break
                if is_palindrome:
                    break

        result = s[length - k:][::-1] + s 
        return result

        