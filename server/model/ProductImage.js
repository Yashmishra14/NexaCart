import mongoose from "mongoose";


const ProductImageSchema = new mongoose.Schema({
    product:{
        type:mongoose.Schema.Types.ObjectId,
        ref:'Product',
        required:true,
    
    },
    image:{
        type:String,
        required:true,
    }

},
{
    timestamps:true,
});

const ProductImage = mongoose.model('ProductImage', ProductImageSchema);

export default ProductImage;