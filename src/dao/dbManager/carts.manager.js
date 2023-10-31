import {cartsModel} from "../dbManager/models/carts.model.js";
        
export default class Carts {
constructor (){
console.log ("Working with carts from DB");
}

getAll = async ()=>{
const carts = await cartsModel.find().lean();
// el .lean() pasa de BSON a POJO:
return carts;
}

getCartById = async (id) => {
    const cart = await cartsModel.findOne({_id:id}).lean();
    return cart;
}

update = async (cid,products) =>{
    const result = await cartsModel.updateOne({_id:cid},products);
    return result;
}

save = async () => {
const result = await cartsModel.create({"products":[]});
return result;
}


}