import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom"; 
import productsData from "../data/products.json";

const ProductDetail = () => {
    const { id } = useParams(); // URL se id pick karega
    const [product, setProduct] = useState(null);
    const [selectedImage, setSelectedImage] = useState("");
    const [selectedSize, setSelectedSize] = useState("");
    const [selectedColor, setSelectedColor] = useState(null);
    // const [reviews, setReviews] = useState([]);



    const productReviews = productsData.reviews.filter(review => review.productId === id);


    useEffect(() => {
        const foundProduct = productsData.products.find((p) => p.id === id);
        if (foundProduct) {
            setProduct(foundProduct);
            setSelectedImage(foundProduct.images[0]);
            setSelectedColor(foundProduct.colors[0]); 
        }

    }, [id]);

    if (!product) {
        return <p className="p-10 text-center">Product Not Found</p>;
    }

    return (
        <div className="max-w-7xl mx-auto px-6 py-10 grid grid-cols-1 lg:grid-cols-2 gap-10">

            <div>
                <div className="group relative overflow-hidden">
                    <img
                        src={selectedImage}
                        alt={product.name}
                        className="cursor-zoom-in h-[700px] w-full object-cover rounded-xl shadow-md transition-transform duration-300 ease-out transform group-hover:scale-110"
                    />
                </div>

                <div className="flex gap-4 mt-10">
                    {product.images.map((img, index) => (
                        <img
                            key={index}
                            src={img}
                            onClick={() => setSelectedImage(img)}
                            className={`w-30 h-30 object-cover rounded-lg cursor-pointer border-2 ${
                                selectedImage === img ? "border-black" : "border-transparent"
                            }`}
                        />
                    ))}
                </div>
            </div>

            <div>
                <p className="text-yellow-700 text-lg mt-1">{product.category}</p>
                <h1 className="text-4xl font-semibold text-gray-900">{product.name}</h1>

                <p className="mt-3 text-gray-700 text-lg">
                    <span className="text-yellow-500">★★★★</span>★ {product.rating}
                    <span className="text-gray-400"> ({product.reviewCount} reviews)</span>
                </p>

                <p className="text-4xl font-semibold text-gray-900 mt-5">
                    ₹{product.price}
                </p>

                <div className="mt-6">
                    <h3 className="font-light text-black text-base">Select Size</h3>
                    <div className="flex gap-3 mt-2">
                        {product.sizes.map((size) => (
                            <button
                                key={size}
                                onClick={() => setSelectedSize(size)}
                                className={`h-15 w-18 cursor-pointer px-4 py-2 border rounded-lg text-sm ${
                                    selectedSize === size
                                        ? "bg-black text-white"
                                        : "border-gray-400"
                                }`}
                            >
                                {size}
                            </button>
                        ))}
                    </div>
                </div>

                <div className="mt-6">
                    <h3 className="font-light text-black text-base">Select Color - {selectedColor?.name}</h3>
                    <div className="flex gap-3 mt-2">
                        {product.colors.map((color) => (
                            <div
                                key={color.hex}
                                onClick={() => setSelectedColor(color)}
                                className={`w-15 h-15 rounded-full cursor-pointer border ${
                                    selectedColor?.hex === color.hex
                                        ? "border-black scale-110"
                                        : "border-gray-300"
                                }`}
                                style={{ backgroundColor: color.hex }}
                            ></div>
                        ))}
                    </div>
                </div>

                <button className="mt-8 w-full py-3 bg-black text-white text-lg font-semibold rounded-lg hover:bg-gray-800">
                    Add to Cart
                </button>

                <div className="mt-10 border-t border-gray-300 pt-6 space-y-3">
                    <span className="mt-2 font-medium">Material</span>
                    <p className="mt-2 text-gray-400">{product.material}</p>
                    <span className="mt-2 font-medium">Fit</span>
                    <p className="mt-2 text-gray-400">{product.fit}</p>
                    <span className="mt-2 font-medium">Wash Care</span>
                    <p className="mt-2 text-gray-400">{product.washCare}</p>
                </div>
            </div>

            <div className="max-w-[100%] lg:max-w-[100%] mx-auto mt-10 lg:mt-0 col-span-2">

                <h3 className="text-4xl font-extralight font-semibold pb-5">Description</h3>
                <p className="text-gray-700 pb-5 text-lg ">{product.description}</p>

                <h1 className="text-4xl font-extralight font-semibold pb-5">Customer Reviews</h1>

                <div>
                    {productReviews.map((review) => {
                        return (
                            <div key={review.id} className="mb-6 border-b border-gray-400 pb-4">
                                <div className="flex items-center justify-between ">
                                    <p className="text-2xl m-2">{review.author} <span className="bg-green-600 text-sm rounded text-white pl-2 pr-2 pt-1 pb-1 m-2" >
                                        Verified Purchase
                                    </span>
                                    </p>
                                    <span className="text-base text-gray-500 ">
                                        {review.date}
                                    </span>
                                </div>
                                <span className="text-base text-yellow-500 ml-2"> Rating -
                                {" ★".repeat(review.rating)}{"☆".repeat(5 - review.rating)}
                                </span>
                            <p className="m-2">{review.comment}</p>
                            {/* <hr className="mt-4 mb-4"/> */}
                            </div>
                        )
                    })}
                </div>

            </div>

            <div>
            </div>
        </div>
    );
};

export default ProductDetail;
