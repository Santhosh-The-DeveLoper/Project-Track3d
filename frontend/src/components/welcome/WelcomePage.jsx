import React from "react";
import videoFile from "../Assets/video.mp4";
import { Link } from "react-router-dom";
import "./Welcome.css";

const WelcomePage = () => {
  return (
    <div className="container57">
      <video autoPlay muted loop id="myVideo">
        <source src={videoFile} type="video/mp4" />
      </video>
      <h1>Welcome!</h1>
      <h1>Construction Material Recommendation System</h1>
      <div className="button">
        <Link to="/adminlogin">
        <button className="blob-btn">
          Admin Login
          <span className="blob-btn__inner">
            <span className="blob-btn__blobs">
              <span className="blob-btn__blob"></span>
              <span className="blob-btn__blob"></span>
              <span className="blob-btn__blob"></span>
              <span className="blob-btn__blob"></span>
            </span>
          </span>
        </button>
        </Link>
        <Link to="/login">
        <button className="blob-btn">
          User Login
          <span className="blob-btn__inner">
            <span className="blob-btn__blobs">
              <span className="blob-btn__blob"></span>
              <span className="blob-btn__blob"></span>
              <span className="blob-btn__blob"></span>
              <span className="blob-btn__blob"></span>
            </span>
          </span>
          </button>
          </Link>
        <br />
        <svg xmlns="http://www.w3.org/2000/svg" version="1.1">
          <defs>
            <filter id="goo">
              <feGaussianBlur in="SourceGraphic" result="blur" stdDeviation="10" />
              <feColorMatrix
                in="blur"
                mode="matrix"
                values="1 0 0 0 0 0 1 0 0 0 0 0 1 0 0 0 0 0 21 -7"
                result="goo"
              />
              <feBlend in2="goo" in="SourceGraphic" result="mix" />
            </filter>
          </defs>
        </svg>
      </div>
    </div>
  );
};

export default WelcomePage;
