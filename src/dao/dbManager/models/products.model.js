import mongoose from "mongoose";
const productsCollecion = "products";
const productsSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true //por default es false//
    },
    description: {
        type: String,
        required: true
    },
    price: {
        type: Number,
        required: true
    },
    thumbanil: {
        type: String
    },

    code: {
        type: String,
        required: true
    },
    category: {
        type: String,
        required: true
    },
    stock: {
        type: Number,
        required: true
    },
    status: {
        type: Boolean,
        default: true
    }
});

export const productsModel = mongoose.model(productsCollecion,productsSchema);
