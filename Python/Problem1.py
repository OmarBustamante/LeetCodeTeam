def maxProfit(prices):
    bigProfit = 0 # Reset the biggest profit
    buy = False # false = no having a stock bought, true =  have a stock
    sells = 0 # Number of sells performe
    stock = 0 # Value of the stock bought
    profit = 0 # current profit
    index = 0 # Index of stock on the array prices

    # function to buy or sell stock
    def buySell(prices, index, buy, sells, stock, profit):
        nonlocal bigProfit # makes bigProfit a global variable
        # Check if 2 sells have been done
        if(sells >= 2):
            if(profit > bigProfit):
                bigProfit = profit
            return
        
        # While there still index in prices the program check the alternative in which do nothing and the one were it buy/sell the stock
        if(index < len(prices)):
            # No action
            buySell(prices, index+1, buy, sells, stock, profit)

            # Action
            if(buy == False):
                # Buy
                if((index == 0 or prices[index-1] >= prices[index]) and (index < len(prices)-1 and prices[index+1] > prices [index])):
                    stock = prices[index]
                    buy = True
                    buySell(prices, index+1, buy, sells, stock, profit)
            else:
                # Sell
                if(index == len(prices)-1 or prices[index+1] < prices[index]):
                    profit += prices[index] - stock
                    stock = 0
                    buy = False
                    sells += 1
                    buySell(prices, index+1, buy, sells, stock, profit)

        # if finish but no two transactions performed
        if(profit > bigProfit):
            bigProfit = profit
        
        return
    
    buySell(prices, index, buy, sells, stock, profit)

    return bigProfit