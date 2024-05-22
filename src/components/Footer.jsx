import React from "react";

const Footer = () => {
  return (
    <footer className="bg-red-600 mt-5">
      <div className="p-5 text-white">
        <p className="flex justify-center">
          <img
            className="h-12"
            src="/images/Delaware-logo.png"
            alt="Delaware-logo"
          />
        </p>
        <p className="text-center">&copy;2024 Delaware All rights reserved</p>
        <p className="text-center">Privacy policy</p>
      </div>
    </footer>
  );
};

export default Footer;
