import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom';
import { reset } from '../features/car/carSlice';

const Home = () => {
  const { user, isLoading } = useSelector((state) => state.auth);

  const navigate = useNavigate();
  const dispatch = useDispatch();

  useEffect(() => {
    if (!user) {
      navigate('/login');
    }

    dispatch(reset());
  }, [user]);

  if (user?.isAdmin) {
    return (
      <div className="container p-5">
        <h1 className="text-center ">
          WellCome To LR AutoMovies
          <p className="text-danger">{user?.name.toUpperCase()}</p>
        </h1>

        <div className="card my-5 p-3 shadow  ">
          <h5 className="text-center">Please Select An Option</h5>
          <Link
            to={'/admin/users'}
            className="btn btn-dark my-1"
          >
            View All User
          </Link>
          <Link
            to={'/admin/cars'}
            className="btn btn-secondary my-1"
          >
            View All Complaint
          </Link>
          <Link
            to={'/admin/notes'}
            className="btn btn-secondary my-1"
          >
            View All Notes
          </Link>
        </div>
      </div>
    );
  }
  return (
    <>
      <div className="container p-5">
        <h1 className="text-center">
          WellCome To LR AutoMovies
          <p className="text-dark fw-bold">{user?.name.toUpperCase()}</p>
        </h1>

        <div className="card my-5 p-3 shadow  ">
          <h5 className="text-center">Please Select An Option</h5>
          <Link
            to={'/raise'}
            className="btn btn-dark my-1"
          >
            Raise Complaint
          </Link>
          <Link
            to={'/cars'}
            className="btn btn-secondary my-1"
          >
            view Complaint
          </Link>
        </div>
      </div>
    </>
  );
};

export default Home;
