import React from 'react';
import { Link } from 'react-router-dom';

const PageNotFound = () => {
  return (
    <>
      <div className="container p-5">
        <h1 className="display-6 text-danger text-center my-2">
          404 Page Not Found
        </h1>
        <Link
          to={'/'}
          className="btn btn-dark btn-sm"
        >
          Go Back
        </Link>
      </div>
    </>
  );
};

export default PageNotFound;
