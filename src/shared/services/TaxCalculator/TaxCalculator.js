export const calculateTotal = async (price, quantity, discountPercentage, salesTaxRate) => {
    // Step 1: Calculate the total price before discount
    const totalPrice = price * quantity;
    
    // Step 2: Apply the discount to the total price
    const discountAmount = (totalPrice * discountPercentage) / 100;
    const discountedPrice = totalPrice - discountAmount;
    
    // Step 3: Calculate the sales tax
    const salesTax = (discountedPrice * salesTaxRate) / 100;
    
    // Step 4: Calculate the total price after tax
    const totalAmount = discountedPrice + salesTax;
    
    return {
        totalPriceBeforeDiscount: totalPrice,
        discountAmount: discountAmount,
        discountedPrice: discountedPrice,
        salesTax: salesTax,
        totalAmount: totalAmount
    };
}