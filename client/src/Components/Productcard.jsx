import React from "react";
import { Star, ShoppingCart } from "lucide-react";

const ProductCard = ({ image, title, price, rating }) => {
    // Generate an array for the 5 stars based on rating
    const stars = Array(5).fill(0).map((_, i) => i < Math.floor(rating) ? 1 : 0);

    // Format price with commas
    const formattedPrice = new Intl.NumberFormat('en-IN').format(price);

    return (
        <div className="w-[300px] bg-white/80 backdrop-blur-xl border border-white rounded-[28px] p-3 shadow-sm hover:shadow-lg transition-all duration-300 mx-auto">

            {/* Image Container */}
            <div className="w-full h-44 bg-gradient-to-b from-[#f0f4f9] to-white rounded-2xl flex items-center justify-center p-4">
                <img
                    src={image}
                    alt={title}
                    className="w-full h-full object-contain mix-blend-multiply transition-transform duration-500 hover:scale-105"
                />
            </div>

            {/* Content */}
            <div className="mt-4 px-2 pb-1">
                <h2 className="text-[16px] font-bold text-slate-800 line-clamp-1 mb-3">{title}</h2>

                <div className="flex items-center justify-between mt-2">
                    {/* Rating and Price Group */}
                    <div className="flex items-center gap-2">
                        {/* Rating */}
                        <div className="flex items-center gap-1">
                            <div className="flex items-center">
                                {stars.map((isFilled, index) => (
                                    <Star
                                        key={index}
                                        size={12}
                                        className={isFilled ? "text-yellow-400 fill-yellow-400" : "text-gray-300 fill-gray-300"}
                                    />
                                ))}
                            </div>
                            <span className="text-[11px] font-semibold text-slate-500">{rating}</span>
                        </div>

                        {/* Price */}
                        <span className="text-sm font-bold text-slate-800 mt-[1px]">
                            ₹{formattedPrice}
                        </span>
                    </div>

                    {/* Add Button */}
                    <button
                        className="flex items-center justify-center gap-1.5 bg-black text-white px-4 py-2 rounded-xl hover:bg-gray-800 transition shadow-sm text-xs font-semibold whitespace-nowrap"
                    >
                        <ShoppingCart size={14} />
                        Add
                    </button>
                </div>
            </div>
        </div>
    );
};

export default ProductCard;