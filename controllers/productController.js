import Product from "../models/Product.js";
import jwt from "jsonwebtoken";
import getTokenFrom from "../utils/getTokenFrom.js";
import config from "../utils/config.js";
import User from "../models/User.js";



async function getProductsInfo(_, res, next) {
    try {
        const products = await Product.find({});
        const productsCount = await products.length;
    return res.send(`<p>Total number of products: ${productsCount}</p>`);
    } catch (error) {
        next(error);
    }
};

async function getProducts(_, res, next) {
   try {
     const products = await Product.find({}).populate("userId", {username: 1, name: 1});   
     return res.json(products);
   } catch(error) {
    next(error)
   }
};

async function getTotalNumOfPurchase(_, res, next) {
    try {
        const products = await Product.find({});
        let sum = 0;
    
        for (let i = 0; i < products.length; i++) {
            sum += products[i].purchasedQuantity || 0;
        }
    
        return res.send(`${sum}`);
    } catch(error) {
    next(error)
    }
}

async function getRevenue(_, res, next) {
    try {
        const products = await Product.find({});
        let sum = 0;
    
        for (let i = 0; i < products.length; i++) {
            sum += products[i].price * products[i].purchasedQuantity || 0;
        }
    
        return res.send(`${sum}`);
    } catch(error) {
    next(error)
    }
}

async function getProfit(_, res, next) {
    try {
        const products = await Product.find({});
        let sum = 0;
    
        for (let i = 0; i < products.length; i++) {
            sum += (products[i].price - products[i].cost) * products[i].purchasedQuantity || 0;
        }
    
        return res.send(`${sum}`);
    } catch(error) {
    next(error)
    }
}

async function getExpenses(_, res, next) {
    try {
        const products = await Product.find({});
        let sum = 0;
    
        for (let i = 0; i < products.length; i++) {
            sum += products[i].cost * products[i].purchasedQuantity || 0;
        }
    
        return res.send(`${sum}`);
    } catch(error) {
    next(error)
    }
}

async function getProduct(req, res, next) {
    const id = req.params.id;

    try {
        const product = await Product.findById(id);
        if (!product) return res.status(404).json({ message: "No items found!" });
        return res.json(note);
    } catch(error) {
        next(error);
    }
};

async function deleteProduct(req, res, next) {
    const id = req.params.id;
    
    try {
        await Product.findByIdAndDelete(id);
    
        return res.status(204).end();
    } catch (error) {
        next(error);
    }
};

async function createProduct(req, res, next) {
    const body = req.body;
    try {
        const decodedToken = jwt.verify(getTokenFrom(req), config.JWT_SECRET);

        if (!decodedToken.id) {
            return res.status(401).json({ error: "token invalid" });
        }

        const user = await User.findById(decodedToken.id);

        if (!body.title) {
            return res.status(400).json({error: "product missing"});
        }

        const product = new Product({
            title: body.title,
            description: body.description,
            qty: body.qty || 0,
            cost: body.cost || 0,
            price: body.price || 0,
            userId: user.id,
        });

        const savedProduct = await product.save().then((result) => result);
        user.products = user.products.concat(savedProduct._id);
        await user.save();  
        
        return res.status(201).json(savedProduct);
    } catch (error) {
        next(error)}
};

async function updateProduct(req, res, next) {
    const id = req.params.id;
    const { title, description, qty, cost, price } = req.body;
    const product = {
        title,
        description,
        qty,
        cost,
        price,
    };

    try {
        const updatedProduct = await Product.findByIdAndUpdate(id, product, {
            new: true, 
            runValidators: true,
            context: "query",  
        });

        if (!updateProduct) return res.status(404).send({error: "Item not found"})
    
        return res.status(200).json(updatedProduct);
    } catch (error) {
    next(error);
    }

}

async function productPurchase(req, res, next) {
    const id = req.params.id;
    const { title, purchasedQuantity } = req.body;

    try {
        // Find and update the product
        const updatedProduct = await Product.findByIdAndUpdate(id, {
            $inc: { qty: -purchasedQuantity,
                purchasedQuantity: purchasedQuantity }, // Compute the quantity by purchasedQuantity
        }, {
            new: true,
            runValidators: true,
            context: "query",
        });

        // Check if the product was found
        if (updatedProduct) {
            console.log(`Purchase of ${purchasedQuantity} units of "${title}" successful.`);
            return res.status(200).json(updatedProduct);
        } else {
            return res.status(404).send({ error: `Product ${title} not found.` });
        }
    } catch (error) {
        next(error);
    }
}


export default {
    getProductsInfo,
    getProducts,
    getTotalNumOfPurchase,
    getRevenue,
    getProfit,
    getExpenses,
    getProduct,
    deleteProduct,
    createProduct,
    updateProduct,
    productPurchase,
};