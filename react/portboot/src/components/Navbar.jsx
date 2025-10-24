import React from "react";

export default function Navbar() {
  return (
    <nav
      className="navbar navbar-expand-lg fixed-top"
      style={{ backgroundColor: "#f4511e" }}
    >
      <div className="container-fluid">
        <a className="navbar-brand" href="#">
          LOGO
        </a>
        <button
          className="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarNav"
          aria-controls="navbarNav"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon"></span>
        </button>
        <div className="collapse navbar-collapse" id="navbarNav">
          <div className="navbar-nav ms-auto">
            <a className="nav-link active" aria-current="page" href="#about">
              About
            </a>

            <a className="nav-link" href="#service">
              SERVICE
            </a>

            <a className="nav-link" href="#portfolio">
              PORTFOLIO
            </a>

            <a className="nav-link" href="#pricing">
              PRICING
            </a>
            <a className="nav-link" href="#contact">
              CONTACT
            </a>
          </div>
        </div>
      </div>
    </nav>
  );
}
