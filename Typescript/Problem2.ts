class Solution{
    minPatches(nums: number[], n: number): number{
        let reach = 0 ;  //Max number we can form so far
        let count = 0; //Number of patches added
        let index = 0; //nums index

        while(reach < n){
            if(index < nums.length && nums[index] <= reach + 1){
                // IF the current number in nums can be used to extend reach
                reach += nums[index];
                index++;
            }else{
                // If we can't extend reach using nums, we must patch it with (reach + 1)
                reach += (reach + 1);
                count ++;
            }
        }
    return count; //Minimum patches needed
    }
}

const solution = new Solution();
console.log(solution.minPatches([1,3], 3));
console.log(solution.minPatches([1,5, 10], 20));
console.log(solution.minPatches([1,2,2], 5));