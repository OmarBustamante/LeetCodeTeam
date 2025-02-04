class Solution {
    public int minPatches(int[] nums, int n) {
        long reach = 0;
        int patches = 0, i = 0;

        while (reach < n) {
            if (i < nums.length && nums[i] <= reach + 1) {
                reach += nums[i];
                i++;
            } else {
                reach += (reach + 1);
                patches++;
            }
        }

        return patches;
    }

    public static void main(String[] args) {
        Solution sol = new Solution();
        System.out.println(sol.minPatches(new int[]{1, 3}, 6));
        System.out.println(sol.minPatches(new int[]{1, 5, 10}, 20));
        System.out.println(sol.minPatches(new int[]{1, 2, 2}, 5));
    }
}