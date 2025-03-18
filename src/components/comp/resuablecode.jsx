import React from "react";

// Footer Component
const Footer = () => {
  return (
    <footer className="bg-blue-800 text-white text-sm text-center py-2 flex align-center gap-5 justify-center items-center px-6 md:fixed md:bottom-0 md:w-full">
      <p>&copy; {new Date().getFullYear()} Finova. All rights reserved.</p>
      <p>IPS Technologies Pvt Ltd</p>
    </footer>
  );
};

// LogoText Component
const LogoText = () => {
  return (
    <div>
      <h3 className="text-2xl md:text-2xl font-bold text-black md:text-white">
        Finova
      </h3>
      <span className="text-lg md:text-base font-bold tracking-wide text-black md:text-white">
        Secure your wealth, Elevate your life
      </span>
    </div>
  );
};

// Named Exports
export { Footer, LogoText };