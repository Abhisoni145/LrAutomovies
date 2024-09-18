import React from 'react';
import { Link } from 'react-router-dom';

const Backbutton = ({ url }) => {
  return (
    <Link
      to={url}
      className="btn btn-dark btn-sm"
    >
      Go Back
    </Link>
  );
};

export default Backbutton;
