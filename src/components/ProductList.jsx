import React from "react";
import ProductCard from "./ProductCard";
import { products } from "../data/products";

const ProductList = () => {
  const handleShortList = (productName) => {
    alert(`Added to shortlist: ${productName}`);
  };

  return (
    <div className="row">
      {products.map((product) => (
        <div className="col-md-4 mb-4" key={product.id}>
          <ProductCard product={product} onShortList={handleShortList} />
        </div>
      ))}
    </div>
  );
};

export default ProductList;
