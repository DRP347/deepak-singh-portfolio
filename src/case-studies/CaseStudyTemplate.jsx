import React from "react";
import { Link } from "react-router-dom";
import "./case-study.css";

const CaseStudyTemplate = ({ title, subtitle, heroImage, content }) => {
  return (
    <div className="case-study-page">
      <div
        className="case-study-hero"
        style={{ backgroundImage: `url(${heroImage})` }}
      >
        <div className="case-study-hero-overlay">
          <h1>{title}</h1>
          <p>{subtitle}</p>
        </div>
      </div>

      <div className="case-study-body">{content}</div>

      <div className="case-study-back">
        <Link to="/">← Back to Portfolio</Link>
      </div>
    </div>
  );
};

export default CaseStudyTemplate;
