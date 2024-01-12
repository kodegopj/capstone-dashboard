// Sample product data structure
let products = [];

// Function to create or update a product
function createOrUpdateProduct(productName, quantity, cost, sellingPrice) {
    // Check if the product already exists
    const existingProductIndex = products.findIndex(product => product.name === productName);

    if (existingProductIndex !== -1) {
        // Product already exists, update its information
        products[existingProductIndex] = {
            name: productName,
            quantity: quantity,
            cost: cost,
            sellingPrice: sellingPrice
        };
        console.log(`Product "${productName}" updated successfully.`);
    } else {
        // Product does not exist, create a new one
        const newProduct = {
            name: productName,
            quantity: quantity,
            cost: cost,
            sellingPrice: sellingPrice
        };
        products.push(newProduct);
        console.log(`Product "${productName}" created successfully.`);
    }
}

// Function to handle product purchase
function purchaseProduct(productName, purchasedQuantity) {
    // Check if the product exists
    const existingProductIndex = products.findIndex(product => product.name === productName);

    if (existingProductIndex !== -1) {
        // Subtract purchased quantity from existing quantity
        if (products[existingProductIndex].quantity >= purchasedQuantity) {
            products[existingProductIndex].quantity -= purchasedQuantity;
            console.log(`Purchase of ${purchasedQuantity} units of "${productName}" successful.`);
        } else {
            console.log(`Error: Insufficient quantity for "${productName}" to fulfill the purchase.`);
        }
    } else {
        console.log(`Error: Product "${productName}" not found.`);
    }
}

// Example usage
createOrUpdateProduct("Laptop", 10, 800, 1200);
createOrUpdateProduct("Phone", 20, 300, 500);

// Purchase 3 units of Laptop
purchaseProduct("Laptop", 3);

// Print the updated list of products
console.log(products);
