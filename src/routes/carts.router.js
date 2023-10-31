import { Router } from 'express';
import { cartPath } from '../utils.js';
import fs from 'fs';

//import CartManager from '../dao/fileManager/cart.manager.js';
import CartManager from "../dao/dbManager/carts.manager.js"
import { pid } from 'process';
const router = Router();

const cartManager = new CartManager(cartPath);

router.get("/:cid", async(req,res)=>{
    try{
        const {cid} =req.params;
        const cart = await cartManager.getCartById(cid)
        //console.log(cart)
        if (!cart){
            return res.status(400).send({status:"error",message:"Cart not found"})
        }
        res.send({status:"success",payload:cart});
    }
    catch(error){

        console.log(error.message);
        res.status(500).send({error:error.message});}
})

router.post('/', async (req, res) => {
    try {
    const result = await cartManager.save();
    res.status(201).send({ status: 'success', message: "cart created", payload: result });}
    catch (error){
        console.log(error.message);
        res.status(500).send({error:error.message});}
        
});

router.post('/:cid/product/:pid', async (req,res)=>{
try{
    const cid =req.params.cid;
    const pid =req.params.pid;
    const cart = await cartManager.getCartById(cid);
    if (!cart){
            return res.status(400).send({status:"error",message:"Cart not found"})
        }
    const indexProductInCart = cart.products.findIndex(product=>product.id===pid)
        if (indexProductInCart!==-1){
            cart.products[indexProductInCart].quantity++;
                } else {
                    cart.products.push({"id":pid,"quantity":1});
                };

    const result = await cartManager.update(cid,{"products": cart.products});
    res.status(201).send({status:"success",payload:result});
    
        // const result = await cartManager.update(cid,{"products": cart.products});
        //         res.status(201).send({status:"success",payload:result});
        }
catch(error){
    console.log(error.message);
    res.status(500).send({error:error.message});}
})
// router.get('/:cid', async (req, res) => {
//     try {
//     const cartId = Number(req.params.cid);
//     const cart = await cartManager.getCartById(cartId);
//     if (!cart){return res.status(400).send({status:"error", message: "cart not found"});}
//     res.status(200).send({status:"success", payload: cart});} 
//     catch (error){
//         return res.send({ status: 'error', error: error })
//     }
// });

// router.post('/', async (req, res) => {
//     try {
//     const carts = await cartManager.getCarts();
//     const carrito = {"products":[]};
//     if (carts.length===0){
//         carrito.id=1;
//     } else {
//         carrito.id=carts[carts.length-1].id+1;
//     }  
//     carts.push(carrito);
//     cartManager.saveCarts(carts);
//     res.status(200).send({ status: 'success', message: "cart created", payload: carrito });}
//     catch (error){
//             return res.send({ status: 'error', error: error })
//         }
// });
// router.post('/:cid/product/:pid', async (req,res)=>{
//     try{
//     const carts = await cartManager.getCarts();
//     const cartId = Number(req.params.cid);
//     const productId = Number(req.params.pid);
//     const cartById = carts.find(cart => cart.id === cartId);
//     if (!cartById){ return res.status(400).send({ status: 'error', message: "cart not found" })}; 
//     const indexProductInCart = cartById.products.findIndex(product=>product.id===productId);
//     console.log("indexProductInCart",indexProductInCart);
//     if (indexProductInCart!==-1){
//         cartById.products[indexProductInCart].quantity++;
//     } else {
//         cartById.products.push({"id":productId,"quantity":1});
//     };
//     console.log("cartById",cartById);
//     console.log(carts);
//     await cartManager.saveCarts(carts);
//     res.status(200).send({ status: 'success', message: "cart updated"});
//     } catch(error){
//         return res.send({ status: 'error', error: error })
//     }   
// });

export default router;