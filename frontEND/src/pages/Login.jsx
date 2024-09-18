import React, { useEffect, useState } from 'react';

import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { loginUser } from '../features/auth/authSlice';
import Loading from '../components/Loading';
import { toast } from 'react-toastify';

const Login = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { user, isLoading, isError, isSuccess, message } = useSelector(
    (state) => state.auth
  );

  const [formData, setFormData] = useState({
    email: '',
    password: '',
  });

  const { email, password } = formData;

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    dispatch(loginUser(formData));
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
      <h1 className="text-center">Login Here</h1>
      <div className="card p-3 rounded-0 my-3">
        <form onSubmit={handleSubmit}>
          <input
            value={email}
            name="email"
            onChange={handleChange}
            type="email"
            placeholder="Enter Your Emailid"
            className="form-control  my-2 rounded-0"
          />
          <input
            value={password}
            name="password"
            onChange={handleChange}
            type="password"
            placeholder="Enter Password"
            className="form-control  my-2 rounded-0"
          />

          <button className="btn btn-sm btn-primary my-2 w-100 text-center">
            LogiIn
          </button>
        </form>
      </div>
    </div>
  );

  // return (
  //   <div className="form-wrapper">
  //     <form className="p-4 rounded shadow-sm bg-white form-container">
  //       <h2 className="text-center mb-4">Login</h2>
  //       <div className="form-group mb-3">
  //         <label
  //           htmlFor="email"
  //           className="form-label"
  //         >
  //           Email:
  //         </label>
  //         <div className="input-group">
  //           <input
  //             id="email"
  //             name="email"
  //             type="email"
  //             placeholder="Enter Your Email"
  //             className="form-control rounded-0 input-animation"
  //             required
  //           />
  //         </div>
  //       </div>
  //       <div className="form-group mb-4">
  //         <label
  //           htmlFor="password"
  //           className="form-label"
  //         >
  //           Password:
  //         </label>
  //         <div className="form-group mb-4">
  //           <div className="input-group">
  //             <input
  //               id="email"
  //               name="email"
  //               type="email"
  //               placeholder=" "
  //               className="form-control input-animation"
  //               required
  //             />
  //             <label
  //               htmlFor="email"
  //               className="floating-label"
  //             >
  //               Email
  //             </label>
  //           </div>
  //         </div>
  //       </div>

  //       <button
  //         className="btn btn-primary w-100 button-animation"
  //         type="submit"
  //       >
  //         Login
  //       </button>

  //       <div className="text-center mt-3">
  //         <a
  //           href="#"
  //           className="text-muted"
  //         >
  //           Forgot Password?
  //         </a>
  //       </div>
  //     </form>
  //   </div>
  // );
};

export default Login;
