import React from "react";

const Footer = () => {
  return (
    <footer className="bg-dark text-white py-4 mt-auto">
      <div className="container">
        <div className="text-center mt-3">
          <p className="mb-0">
            &copy; {new Date().getFullYear()} E-Commerce Store
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
