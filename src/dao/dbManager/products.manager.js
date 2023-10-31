import {productsModel} from "../dbManager/models/products.model.js";

export default class Products {
constructor (){
console.log ("Working with products from DB");
}

getAll = async ()=>{
const products = await productsModel.find();
// De BSON a POJO:
return products.map(product=> product.toObject());
}

getProductById = async (id) => {
    const product = await productsModel.findOne({_id:id}).lean();
    return product;
}

// create = async(product) => {
//     const result = await productsModel.create(product);
//     return result;
// }

update = async (pid,product) =>{
    const result = await productsModel.updateOne({_id:pid},product);
    return result;
}

delete = async (pid) =>{
    const result = await productsModel.deleteOne({_id:pid});
    return result;
}

save = async (product) => {
    const result = await productsModel.create(product);
    return result;
    }
    
};