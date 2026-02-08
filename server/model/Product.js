import mongoose from 'mongoose';

const ProductSchema = new mongoose.Schema({
   product_name:{
    type:String,
    required:true,
   },
   Product_Category:{
    type:mongoose.Schema.Types.ObjectId,
    ref:'Category',
    required:true,
    
   },
   Product_description:{
    type:String,
    required:true,
   },
    Product_price:{
        type:Number,
        required:true,
    },
    Product_image:{
        type:String,
        required:true,
    },
},{
    timestamps:true,
});

const Product = mongoose.model('Product', ProductSchema);

export default Product;