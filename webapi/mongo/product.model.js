//kết nối collection product

//Kết nối collection category
const mongoose = require('mongoose')
const Schema = mongoose.Schema
const ObjectId =Schema.ObjectId


//khai báo các field
const productSchema = new Schema({
    name:{type:String, require: true},
    image:{type:String, require: true},
    price_1:{type:Number, require: true},
    price_2:{type:Number, require: true},
    mota_1:{type:String, require: true},
    mota_2:{type:String, require: true},
    // quantity:{type:Number, require: true},
    view: {type: Number, require:true},
    ngaytao: {type: Date, require: true},
    category:{
        type:{
            categoryId:{type:ObjectId, require: true},
            categoryName:{type:String, require: true}
        },
        require: true
    },


})

module.exports = mongoose.models.product || mongoose.model('product',productSchema) //kiểm tra xem có product chưa
