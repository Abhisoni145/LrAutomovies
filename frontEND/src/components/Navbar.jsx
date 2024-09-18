import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { logOutUser } from '../features/auth/authSlice';
import logo from '../assets/car-logo.png';

const Navbar = () => {
  const { user } = useSelector((state) => state.auth);
  const dispatch = useDispatch();

  const handleLogOut = () => {
    dispatch(logOutUser());
  };

  return (
    <>
      <nav className="navbar nav bg-dark">
        <div className="container-fluid">
          <Link to={'/'}>
            <span
              className="navbar-brand text-danger"
              href="#"
            >
              <img
                id="logo"
                src={logo}
              />
            </span>
          </Link>

          <span className="float-end">
            {!user ? (
              <>
                <Link
                  to={'/login'}
                  className="btn btn-sm raouded-1 btn-outline-success"
                >
                  LogIn
                </Link>

                <Link
                  to={'/register'}
                  className="btn btn-sm raouded-1 btn-outline-warning mx-2"
                >
                  register
                </Link>
              </>
            ) : (
              <Link
                to={'/'}
                onClick={handleLogOut}
                className="btn btn-sm raouded-1 btn-outline-danger"
              >
                LogOut
              </Link>
            )}
          </span>
        </div>
      </nav>
    </>
  );
};

export default Navbar;
