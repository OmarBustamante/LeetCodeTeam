let bigProfit = 0 // Global variable that save the biggest profit

const maxProfit = (prices: number[]) => {
    bigProfit = 0 // Reset the biggest profit
    let buy = false // false = no having a stock bought, true =  have a stock
    let sells = 0 // Number of sells performe
    let stock = 0 // Value of the stock bought
    let profit = 0 // current profit
    let index = 0 // Index of stock on the array prices

    buySell(prices, index, buy, sells, stock, profit)

    return bigProfit
} 

const buySell = (prices: number[], index: number, buy: boolean, sells: number, stock: number, profit: number) => {
    // Check if 2 sells have been done
    if(sells >= 2){
        if(profit > bigProfit){
            bigProfit = profit
        }
        return
    }

    // While there still index in prices the program check the alternative in which do nothing and the one were it buy/sell the stock
    if(index < prices.length){
        // No action
        buySell(prices, index + 1, buy, sells, stock, profit)

        // Action
        if(buy == false){
            // Buy
            if((index === 0 || prices[index-1] >= prices[index]) && ((index < prices.length -1) && (prices[index+1] > prices[index]))){
                stock = prices[index]
                buy = true
                buySell(prices, index + 1, buy, sells, stock, profit)
            }
        } else{
            // Sell
            if(index == prices.length -1 || prices[index+1] < prices[index]){
                profit += prices[index] - stock
                stock = 0
                buy = false
                sells++
                buySell(prices, index + 1, buy, sells, stock, profit)
            }
        }
    }

    // if finish but no two transactions perfome
    if(profit > bigProfit){
        bigProfit = profit
    }

    return
}