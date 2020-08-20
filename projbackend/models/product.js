const mongoose= require("mongoose");

const {ObjectId} = mongoose.Schema;

const productSchema = new mongoose.Schema({
    name: {
        type: String,
        maxlength: 32,
        trim: true,
        required: true
    },
    description: {
        type: String,
        maxlength: 32,
        trim: true,
        required: true
    },
    price: {
        type: Number,
        maxlength: 32,
        trim: true,
        required: true
    },
    category: {
        type: ObjectId,
        ref: "category",
        required: true,
    },
    stock: {
        type: Number,
    },
    sold: {
        type: Number,
        default: 0
    },
    photo: {
        data: Buffer,
        contentType: String
    }
},
    {TimeStamp: true}
)

module.exports = mongoose.model("Product",productSchema);