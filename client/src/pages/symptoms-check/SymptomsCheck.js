import React from "react";
import { Link } from "react-router-dom";
import Page4 from "../symptoms-check/pages/page4/Page4.style.css";

const SymptomsCheck = ({ imageUrl }) => {
  return (
    <div className="page-wrapper">
      <div className="content-wrapper">
        <input type="radio" name="toggle" id="toggle2" />

        <section id="section-1">
          <div className="image-container">
            <img src="https://unsplash.it/500/600?image=939" alt="" />
          </div>

          <div className="info-container">
            <h1> Welcome </h1>
            <p>Help Answer this few questions</p>
            <Link
              to="/page2"
              className="btn btn-outline-success mr-4 text-center"
            >
              Next Page
            </Link>
          </div>
        </section>
      </div>
    </div>
  );
};

export default SymptomsCheck;
