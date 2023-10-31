import {Router} from "express";
const router = Router();
import { productPath } from '../utils.js';
import ProductManager from '../dao/dbManager/products.manager.js';
import ChatManager from "../dao/dbManager/chat.manager.js";

const productManager= new ProductManager(productPath);
const chatManager= new ChatManager();

router.get("/realtimeproducts",async(req,res)=>{
   try{
    const products = await productManager.getAll();
    res.render("realTimeProducts",{products:products});}
    catch(error) {return res.send({ status: 'error', error: error })}
})
router.get("/",async (req,res)=>{
    try{
        const products = await productManager.getAll();
        res.render("home",{products:products});}
        catch(error) {return res.send({ status: 'error', error: error })}
    });

router.get("/products-view",async(req,res)=>{
        try{
            const products = await productManager.getAll();
            res.render("products",{products});
        }
        catch(error){
            console.error(error.message);
        }
    });

router.get("/chat",async(req,res)=>{
    const messages = await chatManager.getAll();
    res.render("chat",{messages});
})

export default router;