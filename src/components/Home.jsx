import React from "react";
import "../App.css";
import { useNavigate } from "react-router-dom";

function Home() {
  const navigate = useNavigate();
  const handleClick = () => {
    navigate("/");
  };

  return (
    <div className="home-page">
      <p>HomePage Content Here</p>
      <div className="button-container">
        <div onClick={handleClick} className="btn1">
          Logout
        </div>
      </div>
    </div>
  );
}

export default Home;
