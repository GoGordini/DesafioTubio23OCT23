import express from "express";
import handlebars from "express-handlebars";
import {__dirname} from "./utils.js";
import viewsRouter from "./routes/views.router.js";
import productsRouter from './routes/products.router.js';
import cartsRouter from "./routes/carts.router.js";
import { Server } from "socket.io";
import mongoose from "mongoose";
import ChatManager from "./dao/dbManager/chat.manager.js";
const chatManager= new ChatManager();
import ProductManager from "./dao/dbManager/products.manager.js";
const productManager= new ProductManager();

const app = express ();

app.use(express.json());
app.use(express.urlencoded({extended: true}));
app.engine("handlebars",handlebars.engine()); //qué motor de plantillas uso//
app.set('views', `${__dirname}/views`); //donde están las vistas, con path abs//
app.set("view engine", "handlebars"); 
app.use(express.static(`${__dirname}/public`));    
app.use("/", viewsRouter);
app.use("/api/products",productsRouter);
app.use("/api/carts",cartsRouter);
try{
    await mongoose.connect("mongodb+srv://eleonoratubio:jT0Z0SKpSILu6qvz@cluster0.4gfsjbp.mongodb.net/ecommerce?retryWrites=true&w=majority");
    console.log("Connected to DB");
}
catch(error){console.log(error.message)};
const server= app.listen(8080, ()=>console.log("Server running"));
//const socketServer = new Server(server);
const io = new Server(server);
app.set("socketio",io);

//const messages = [];

io.on("connection",async(socket) =>{
    const messages = await chatManager.getAll();
    console.log("Nuevo cliente conectado");
//lee el evento authenticated; el frontend es index.js. Leemos la data (lo que envío desde index.js)
    socket.on("authenticated",data=>{
    socket.emit("messageLogs",messages); //Enviamos todos los mensajes hasta el momento, únicamnete a quien se acaba de conectar.
});
//lee el evento message
    socket.on("message",async(data)=>{
    //messages.push(data);
    await chatManager.save(data);
    const newMessage = await chatManager.getAll();
    io.emit("messageLogs",newMessage) //envío a todos lo que hay almacenado.
})

})