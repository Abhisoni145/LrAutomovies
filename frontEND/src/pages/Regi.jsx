import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { toast } from 'react-toastify';
import { registerUser } from '../features/auth/authSlice';
import Loading from '../components/Loading';
import { useNavigate } from 'react-router-dom';

const Regi = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { user, isLoading, isError, isSuccess, message } = useSelector(
    (state) => state.auth
  );

  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    password2: '',
  });

  const { name, email, password, password2 } = formData;

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (password !== password2) {
      toast.error('Password Not Match!');
    }
    dispatch(registerUser(formData));
  };

  useEffect(() => {
    if (user) {
      navigate('/');
    }
    if (isError && message) {
      toast.error(message);
    }
  }, [user, isError, isSuccess, message]);

  if (isLoading) {
    return <Loading />;
  }

  return (
    <div className="container p-5">
      <h1 className="text-center">Register</h1>

      <div className="card p-3 rounded-0 my-3">
        <form onSubmit={handleSubmit}>
          <input
            onChange={handleChange}
            value={name}
            name="name"
            type="text"
            placeholder="Enter Your Name"
            className="form-control  my-2 rounded-0"
          />
          <input
            onChange={handleChange}
            value={email}
            name="email"
            type="email"
            placeholder="Enter Your Email"
            className="form-control  my-2 rounded-0"
          />
          <input
            onChange={handleChange}
            value={password}
            name="password"
            type="password"
            placeholder="Enter Password"
            className="form-control  my-2 rounded-0"
          />
          <input
            onChange={handleChange}
            value={password2}
            name="password2"
            type="password"
            placeholder="Enter Re-Password"
            className="form-control  my-2 rounded-0"
          />
          <button className="btn btn-sm btn-success my-2 w-100 text-center">
            Registration
          </button>
        </form>
      </div>
    </div>
  );
};

export default Regi;
