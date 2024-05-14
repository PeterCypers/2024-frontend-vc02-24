import React from 'react';

const Footer = () => {
  return (
    <footer className="footer">
      <div className="waves">
        <div className="wave" id="wave1"></div>
        <div className="wave" id="wave2"></div>
        <div className="wave" id="wave3"></div>
        <div className="wave" id="wave4"></div>
      </div>
      <div>
        <p className="flex justify-center"><img className="h-12" src="/images/Delaware-logo.png" alt="Delaware-logo"  /></p>
        <p className="text-center">&copy;2024 Delaware All rights reserved</p>
        <p className="text-center">Privacy policy</p>
      </div>
    </footer>
  );
};

export default Footer;


