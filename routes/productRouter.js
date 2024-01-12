import express from "express";
import productController from "../controllers/productController.js";


const productRouter = express.Router();

productRouter.get("/info", productController.getProductsInfo);
productRouter.get("/", productController.getProducts);
productRouter.get("/purchase", productController.getTotalNumOfPurchase);
productRouter.get("/revenue", productController.getRevenue);
productRouter.get("/profit", productController.getProfit);
productRouter.get("/expenses", productController.getExpenses);
productRouter.get("/:id", productController.getProduct);
productRouter.delete("/:id", productController.deleteProduct);
productRouter.post("/", productController.createProduct);
productRouter.put("/:id", productController.updateProduct);
productRouter.put("/purchase/:id", productController.productPurchase);


export default productRouter;