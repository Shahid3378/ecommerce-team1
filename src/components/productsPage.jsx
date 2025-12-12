import React, { useState } from "react";
import ProductCard from "./productCard";
import productsData from "../data/products.json";

const ProductsPage = () =>{

  const [products, _setProducts] = useState(productsData.products); 
  const [sortType, setSortType] = useState("");

  // FILTER STATES
  const [category, setCategory] = useState("All");
  const [size, setSize] = useState("");
  const [color, setColor] = useState("");
  const [price, setPrice] = useState(2000);
  
  const filteredProducts = products.filter((product) => {

    if (category !== "All" && product.category !== category) 
      return false;

    if (size && !product.sizes.includes(size)) 
      return false;

    if (color && !product.colors.some((c) => c.hex === color)) 
      return false;

    if (product.price > price) 
      return false;
    return true;
  });
  

  // useEffect(() => {
  //   setProducts(productsData.products); 
  // }, []);


  // SORTING LOGIC
  const sortedProducts = [...filteredProducts].sort((a, b) => {
    if (sortType === "low-high") return a.price - b.price;
    if (sortType === "high-low") return b.price - a.price;
    if (sortType === "rating") return b.rating - a.rating;
    return 0;
  });

  const resetFilters = () => {
    setCategory("All");
    setSize("");
    setColor("");
    setPrice(2000);
  };

  return (
    <div className="max-w-7xl mx-auto p-5 flex flex-row-cols-1 lg:grid-cols-4 gap-10">

      <aside className="hidden lg:block border-none rounded-xl p-6 h-fit sticky top-5">

        <div className="mb-10">
        <h1 className="text-5xl font-semibold mb-4">All Products</h1>
        <span className="text-base text-gray-500">
          {filteredProducts.length} products found
        </span>
        </div>

        {/* CATEGORY FILTER */}
        <div className="mb-6">
          <h3 className="font-medium text-xl mb-2">Categories</h3>
          {["All", "Essentials", "Graphic Tees"].map((categoryType) => (
            <p  key={categoryType} 
                onClick={() => setCategory(categoryType)} 
                className={`cursor-pointer  border-none rounded-lg mb-1 p-2  ${ category === categoryType ? "font-semibold  bg-black text-white" : "text-gray-600 hover:bg-gray-200"
              }`}
            >
              {categoryType}
            </p>

          ))}
        </div>

        {/* SIZE FILTER */}
        <div className="mb-6">
          <h3 className="font-medium mb-2">Size</h3>
          <div className="flex flex-wrap gap-2">
            {["S", "M", "L", "XL", "XXL"].map((sizeType) => (
              <button
                key={sizeType}
                onClick={() => setSize(sizeType)}
                className={`px-3 py-1 h-10 w-15 rounded border text-sm ${
                  size === sizeType ? "bg-black text-white" : "bg-gray-100"
                }`}
              >
                {sizeType}
              </button>
            ))}
          </div>
        </div>

        {/* COLOR FILTER */}
        <div className="mb-6">
          <h3 className="font-medium mb-2">Color</h3>
          <div className="flex gap-3 flex-wrap">
            {productsData.products
              .flatMap((productType) => productType.colors)
              .filter(
                (colorType, index, self) =>
                  index === self.findIndex((idx) => idx.hex === colorType.hex)
              )
              .map((colorType) => (
                <div
                  key={colorType.hex}
                  onClick={() => setColor(colorType.hex)}
                  className={`w-8 h-8 rounded-full cursor-pointer border ${
                    color === colorType.hex ? "border-black scale-110" : "border-gray-400"
                  }`}
                  style={{ backgroundColor: colorType.hex }}
                ></div>
              ))}
          </div>
        </div>

        <div className="mb-6">
          <h3 className="font-medium mb-2">Price Range</h3>
          <input
            type="range"
            min="0"
            max="2000"
            value={price}
            onChange={(e) => setPrice(Number(e.target.value))}
            className="w-full"
          />
          <p className="text-gray-700">Up to ₹{price}</p>
        </div>

        <button
          onClick={resetFilters}
          className="w-full mt-3 py-2 border rounded-lg hover:bg-black hover:text-white transition"
        >
          Reset Filters
        </button>
      </aside>

      <div className="mt-10">

      <div className="flex justify-end mb-5">
        <select
          className="border p-2 rounded-lg"
          value={sortType}
          onChange={(e) => setSortType(e.target.value)}
        >
          <option value="">Newest</option>
          <option value="low-high">Price: Low → High</option>
          <option value="high-low">Price: High → Low</option>
          <option value="rating">Rating: High → Low</option>
        </select>
      </div>

      <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-2 gap-6">
        {sortedProducts.map((p) => (
          <ProductCard key={p.id} product={p} />
        ))}
      </div>
      </div>

    </div>
  );
}

export default ProductsPage;