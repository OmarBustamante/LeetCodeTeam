class Solution:
    def minPatches(nums, n):
        reach = 1   #Maximum sum we can achieve with the current numbers
        patches = 0 #Number of numbers added
        i = 0   #nums index

        while reach <= n:
            if i < len(nums) and nums[i] <= reach:
                reach += nums[i]    #Expand the reachable sum by adding the current number
                i += 1
            else:
                reach += (reach + 1)    #Add a new number to extend the range
                patches += 1    #Increase the count of added numbers

        return patches

    print(minPatches([1,3], 6))
    print(minPatches([1,5,10], 20))
    print(minPatches([1,2, 2], 5))