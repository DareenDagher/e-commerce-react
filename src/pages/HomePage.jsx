import React from "react";
import Navbar from "../components/Navbar";
import ProductList from "../components/ProductList";
import Footer from "../components/Footer";

const HomePage = () => {
  return (
    <>
      <Navbar />
      <main className="container my-5">
        <ProductList />
      </main>
      <Footer />
    </>
  );
};

export default HomePage;
