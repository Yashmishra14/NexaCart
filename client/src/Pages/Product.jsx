import React, { useEffect, useState } from 'react'
import ProductCard from '../Components/Productcard'
import axios from 'axios'
import { Search, ListFilter, ChevronDown, Star } from 'lucide-react'

const Product = () => {
    const [productdata, setProductdata] = useState([])

    const fetchproductdata = async () => {
        try {
            const response = await axios.get("http://localhost:3000/userapi/allproduct")
            setProductdata(response.data.product)
        } catch (error) {
            console.log(error)
        }
    }

    useEffect(() => {
        fetchproductdata()
    }, [])

    return (
        <div className='min-h-screen bg-gradient-to-br from-[#eff3f8] via-white to-[#e8eef6] p-4 md:p-8 font-sans relative overflow-hidden'>

            {/* Soft background decor */}
            <div className="absolute top-[-10%] left-[-10%] w-[500px] h-[500px] bg-blue-400/10 rounded-full blur-[100px] pointer-events-none"></div>
            <div className="absolute bottom-[-10%] right-[-10%] w-[600px] h-[600px] bg-purple-400/10 rounded-full blur-[120px] pointer-events-none"></div>

            {/* Header Section */}
            <div className="flex flex-col items-center mb-12 relative z-10 w-full mt-4">
                <h1 className="text-4xl font-extrabold text-slate-800 mb-3 tracking-tight text-center">
                    Find Your Perfect Product
                </h1>
                <p className="text-slate-500 mb-8 text-center text-lg max-w-2xl">
                    Explore top-rated and recommended products just for you.
                </p>

                {/* Search Bar */}
                <div className="w-full max-w-2xl flex items-center bg-white/80 backdrop-blur-md rounded-2xl shadow-sm border border-white/50 p-2 transistion-all hover:shadow-md">
                    <Search className="text-slate-400 ml-3" size={20} />
                    <input
                        type="text"
                        placeholder="Search products..."
                        className="flex-1 bg-transparent px-4 outline-none text-slate-700 font-medium placeholder:font-normal placeholder-slate-400"
                    />
                    <button className="bg-blue-500 hover:bg-blue-600 text-white rounded-xl px-4 py-2 flex items-center gap-2 transition-colors shadow-sm">
                        <ListFilter size={18} />
                    </button>
                </div>
            </div>

            {/* Main Content Area */}
            <div className="w-full mx-auto flex flex-col lg:flex-row gap-8 relative z-10">

                {/* Left Sidebar - Filters */}
                <div className="w-full lg:w-[280px] shrink-0 space-y-6">
                    <div className="bg-white/70 backdrop-blur-xl border border-white rounded-3xl p-6 shadow-sm">

                        <div className="flex items-center justify-between mb-8">
                            <h2 className="text-xl font-bold text-slate-800">Filters</h2>
                            <div className="w-6 h-6 rounded-full bg-blue-100 flex items-center justify-center pointer-events-none">
                                <div className="w-2 h-2 rounded-full bg-blue-400"></div>
                            </div>
                        </div>

                        {/* Category */}
                        <div className="mb-8">
                            <div className="flex items-center justify-between mb-4 cursor-pointer text-slate-800">
                                <h3 className="font-semibold">Category</h3>
                                <ChevronDown size={18} className="text-slate-400" />
                            </div>
                            <div className="space-y-3">
                                {['All Products', 'Smartphones', 'Smartwatches', 'Headphones', 'Laptops'].map((category, idx) => (
                                    <label key={idx} className="flex items-center gap-3 cursor-pointer group">
                                        <div className={`w-4 h-4 rounded-sm flex items-center justify-center border transition-colors ${idx === 0 ? 'bg-blue-500 border-blue-500 text-white' : 'border-slate-300 group-hover:border-blue-400'}`}>
                                            {idx === 0 && <svg className="w-3 h-3" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" /></svg>}
                                        </div>
                                        <span className={`text-sm ${idx === 0 ? 'text-slate-800 font-medium' : 'text-slate-500 hover:text-slate-700'}`}>{category}</span>
                                    </label>
                                ))}
                            </div>
                        </div>

                        {/* Price */}
                        <div className="mb-8">
                            <div className="flex items-center justify-between mb-4 cursor-pointer text-slate-800">
                                <h3 className="font-semibold">Price</h3>
                                <ChevronDown size={18} className="text-slate-400" />
                            </div>
                            <p className="text-sm font-semibold text-slate-600 mb-4">₹5,000 - ₹1,50,000</p>

                            {/* Fake Slider visual */}
                            <div className="relative w-full h-2 rounded-full bg-slate-200 mt-2 mb-6">
                                <div className="absolute top-0 left-[5%] right-[20%] h-full bg-blue-500 rounded-full"></div>
                                {/* Thumbs */}
                                <div className="absolute top-1/2 -translate-y-1/2 left-[5%] w-4 h-4 bg-white border-[3px] border-blue-500 rounded-full shadow cursor-pointer ring-4 ring-blue-500/20"></div>
                                <div className="absolute top-1/2 -translate-y-1/2 right-[20%] w-4 h-4 bg-white border-[3px] border-blue-500 rounded-full shadow cursor-pointer ring-4 ring-blue-500/20"></div>
                            </div>

                            <div className="flex justify-between text-xs text-slate-500 font-medium">
                                <span>₹7,000</span>
                                <span>₹1,50,000</span>
                            </div>
                        </div>

                        {/* Rating */}
                        <div className="mb-8">
                            <div className="flex items-center justify-between mb-4 cursor-pointer text-slate-800">
                                <h3 className="font-semibold">Rating</h3>
                                <ChevronDown size={18} className="text-slate-400" />
                            </div>
                            <div className="flex items-center gap-2">
                                <div className="flex">
                                    {[1, 2, 3, 4].map(i => <Star key={i} size={16} className="text-yellow-400 fill-yellow-400" />)}
                                    <Star size={16} className="text-slate-300 fill-slate-300" />
                                </div>
                                <span className="text-sm font-semibold text-slate-600">4.0 & up</span>
                            </div>
                        </div>

                        {/* Clear Filters */}
                        <button className="w-full py-3 rounded-xl bg-white/50 border border-slate-200 text-blue-500 font-medium text-sm hover:bg-white transition-colors">
                            Clear Filters
                        </button>
                    </div>
                </div>

                {/* Right Area - Products */}
                <div className="flex-1 pb-16">
                    {/* Top Bar inside products */}
                    <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between mb-6 gap-4">
                        <p className="text-slate-500 font-medium text-sm">
                            Showing 1-{Math.min(8, productdata.length)} of {productdata.length} products
                        </p>

                        <div className="flex items-center gap-2">
                            <span className="text-slate-400 text-sm">Sort by:</span>
                            <div className="flex items-center gap-2 bg-white/80 border border-white rounded-xl px-4 py-2 text-sm font-semibold text-slate-700 cursor-pointer hover:shadow-sm transition-all shadow-sm">
                                Sort by: Featured
                                <ChevronDown size={16} className="text-slate-400 ml-1" />
                            </div>
                        </div>
                    </div>

                    {/* Products Grid */}
                    <div className='grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-6'>
                        {productdata.map((product) => (
                            <ProductCard
                                key={product._id}
                                image={product.Product_image}
                                title={product.product_name}
                                price={product.Product_price}
                                rating={4.5}
                            />
                        ))}
                    </div>

                    {/* Pagination */}
                    <div className="flex items-center justify-center gap-2 mt-12 mb-8">
                        <button className="px-4 py-2 rounded-xl text-slate-400 bg-white/50 text-sm font-semibold border border-transparent cursor-not-allowed">Previous</button>
                        <button className="w-10 h-10 rounded-xl bg-blue-500 text-white font-semibold flex items-center justify-center shadow-sm shadow-blue-500/30">1</button>
                        <button className="w-10 h-10 rounded-xl bg-white border border-white text-slate-700 font-semibold flex items-center justify-center hover:shadow-sm transition-all shadow-sm">2</button>
                        <button className="w-10 h-10 rounded-xl bg-white border border-white text-slate-700 font-semibold flex items-center justify-center hover:shadow-sm transition-all shadow-sm">3</button>
                        <button className="w-10 h-10 rounded-xl bg-white border border-white text-slate-400 flex items-center justify-center hover:shadow-sm transition-all shadow-sm">›</button>
                        <button className="w-10 h-10 rounded-xl bg-white border border-white text-slate-400 flex items-center justify-center hover:shadow-sm transition-all shadow-sm">»</button>
                    </div>
                </div>

            </div>
        </div>
    )
}

export default Product