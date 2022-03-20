import React from "react";
import { Link } from "react-router-dom";

const HomePage = () => (
  <div className="p-5 mb-4 bg-light rounded-3">
    <h1>PluralSight Admin</h1>
    <p>React, Redux and React Router for ultra responsive web apps.</p>
    <Link to="about" className="button btn-primary btn-lg">
      Learn more
    </Link>
  </div>
);

export default HomePage;
