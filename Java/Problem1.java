public class Problem1 {
    public static int bigProfit = 0; // Global to store the biggest profit

    public static int maxProfit(int[] prices){
        bigProfit = 0; // Reset the biggest profit
        boolean buy = false; // false = no having a stock bought, true =  have a stock
        int sells = 0; // Number of sells performe
        int stock = 0; // Value of the stock bought
        int profit = 0; // current profit
        int index = 0; // Index of stock on the array prices

        buySell(prices, index, buy, sells, stock, profit);

        return bigProfit;
    }

    // function to buy or sell stock
    public static void buySell(int[] prices, int index, boolean buy, int sells, int stock, int profit){
        //Check if 2 sells have been done
        if(sells >= 2){
            if(profit > bigProfit){
                bigProfit = profit;
            }
            return;
        }
        // While there still index in prices the program check the alternative in which do nothing and the one were it buy/sell the stock
        if(index < prices.length){
            // No action
            buySell(prices, index+1, buy, sells, stock, profit);
            //Action
            if(buy == false){
                //Buy
                if((index == 0 || prices[index-1] >= prices[index]) && (index < prices.length -1 && prices[index+1] > prices[index])){
                    stock = prices[index];
                    buy = true;
                    buySell(prices, index+1, buy, sells, stock, profit);
                } 
            } else{
                //Sell
                if(index == prices.length -1 || prices[index+1] < prices[index]){
                    profit += prices[index] - stock;
                    stock = 0;
                    buy = false;
                    sells++;
                    buySell(prices, index+1, buy, sells, stock, profit);
                }
            }
        }
        // if finish but no two transactions performed
        if(profit > bigProfit){
            bigProfit = profit;
        }
        return;
    }
}