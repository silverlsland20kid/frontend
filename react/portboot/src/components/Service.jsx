import React from "react";

export default function Service() {
  return (
    <div id="service" className="container-fluid text-center py-5">
      <h2 className="mb-3">SERVICES</h2>
      <h4 className="mb-5">What we offer</h4>

      <div className="row slideanim">
        <div className="col-sm-4 mb-4">
          <i className="fa fa-power-off logo-small text-primary"></i>
          <h4>POWER</h4>
          <p>Lorem ipsum dolor sit amet..</p>
        </div>
        <div className="col-sm-4 mb-4">
          <i className="fa fa-heart logo-small text-danger"></i>
          <h4>LOVE</h4>
          <p>Lorem ipsum dolor sit amet..</p>
        </div>
        <div className="col-sm-4 mb-4">
          <i className="fa fa-lock logo-small text-success"></i>
          <h4>JOB DONE</h4>
          <p>Lorem ipsum dolor sit amet..</p>
        </div>
      </div>

      <div className="row slideanim mt-4">
        <div className="col-sm-4 mb-4">
          <i className="fa fa-leaf logo-small text-success"></i>
          <h4>GREEN</h4>
          <p>Lorem ipsum dolor sit amet..</p>
        </div>
        <div className="col-sm-4 mb-4">
          <i className="fa fa-certificate logo-small text-warning"></i>
          <h4>CERTIFIED</h4>
          <p>Lorem ipsum dolor sit amet..</p>
        </div>
        <div className="col-sm-4 mb-4">
          <i className="fa fa-wrench logo-small text-secondary"></i>
          <h4>HARD WORK</h4>
          <p>Lorem ipsum dolor sit amet..</p>
        </div>
      </div>
    </div>
  );
}
