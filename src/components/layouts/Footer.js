import React from "react";
import settings from "../../settings.png";

const Footer = () => {
  const footerYear = new Date().getFullYear();
  return (
    <footer className="footer p-5 bg-gray-700 text-primary-content footer-center">
      <div>
        <img src={settings} className="w-10" alt="Grigor Cresnar" />
        <p>Copyright &copy; {footerYear}. All rights reserved</p>
      </div>
    </footer>
  );
};

export default Footer;
