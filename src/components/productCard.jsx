import React, { useState } from "react";
import { Link } from 'react-router-dom';

const ProductCard = ({ product }) => {
  const [selectedSize, setSelectedSize] = useState(null);

  const handleSizeClick = (size) => {
    setSelectedSize(size);
  };

  return (
    <div className="group cursor-pointer border rounded-xl w-full flex flex-col hover:shadow-lg transition-shadow duration-300 overflow-hidden">

      <Link to={`/product-detail/${product.id}`}>

      <div className="h-[600px] w-full overflow-hidden">

        {/*Product Image */}
        <img
          src={product.images[0]}
          alt={product.name}
          className=" w-full h-full object-cover transition-transform duration-500 ease-out group-hover:scale-110"
        />
      </div>

      {/* Product Details */}
      <div className="flex-1 w-full px-4 pt-4 text-xl">

        {/* Product Name */}
        <h3 className="text-lg font-medium text-gray-900">{product.name}</h3>

        {/* Product Category */}
        <p className="text-sm text-brand-terracotta">{product.category}</p>

        {/* Product Rating & Review */}
        <p className="text-sm text-gray-600 mt-1">
          <span className="text-yellow-500">★</span> {product.rating}
          <span className="text-gray-400"> ({product.reviewCount} reviews)</span>
        </p>

        {/* Price & Sizes */}
        <div className="mt-2 text-2xl mb-5 flex items-center justify-between font-semibold text-gray-900">
          ₹{product.price}
          <div className="flex gap-1">
            {product.sizes.slice(0, 4).map((size) => (
              <span
                key={size}
                onClick={() => handleSizeClick(size)}
                className={`px-2 py-1 text-xs rounded cursor-pointer ${
                  selectedSize === size ? "bg-black text-white" : "bg-gray-100"
                }`}
              >
                {size}
              </span>
            ))}
          </div>
        </div>

        <button className="invisible group-hover:visible cursor-default bg-black text-white w-full p-1 mb-5">
          Quick View
        </button>
      </div>
        </Link>
    </div>
  );
};

export default ProductCard;
