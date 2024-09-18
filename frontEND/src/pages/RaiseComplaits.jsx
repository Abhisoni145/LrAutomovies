import React, { useEffect, useState } from 'react';
import Backbutton from '../components/Backbutton';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { reaiseComplaint } from '../features/car/carSlice';
import Loading from '../components/Loading';
import { toast } from 'react-toastify';

const RaiseComplaits = () => {
  const { user, isLoading, isError, isSuccess, message } = useSelector(
    (state) => state.auth
  );

  const { car } = useSelector((state) => state.car);

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    car: '',
    registration: '',
    description: '',
  });

  const { carName, registration, description } = formData;

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(reaiseComplaint(formData));
  };

  useEffect(() => {
    if (isError && message) {
      toast.error(message);
    }

    if (car) {
      navigate('/cars');
    }
  }, [isError, message, car]);

  if (isLoading) {
    return <Loading />;
  }

  return (
    <div className="container p-5">
      <h1 className="text-center">Raise Complains</h1>
      <Backbutton url={'/'} />

      <div className="card p-3 my-3 ">
        <form onSubmit={handleSubmit}>
          <input
            className="form-control my-2"
            type="text"
            placeholder="Enter Your Name"
            value={user?.name}
            disabled={true}
          />
          <input
            className="form-control my-2"
            type="email"
            placeholder="Enter Your email"
            value={user?.email}
            disabled={true}
          />
          <input
            className="form-control my-2"
            type="text"
            placeholder="Enter Registration"
            onChange={handleChange}
            value={registration.toUpperCase()}
            name="registration"
            required
          />
          <select
            className="form-select my-2"
            name="car"
            value={carName}
            onChange={handleChange}
          >
            <option value="#"> Please Select Your Car Model</option>
            <option value="punch">Punch</option>
            <option value="tiaogo">Tiaogo</option>
            <option value="nexon">Nexon</option>
            <option value="curvv">Curvv</option>
            <option value="safari">Safari</option>
          </select>
          <textarea
            className="form-control"
            name="description"
            value={description}
            onChange={handleChange}
            required
            placeholder="Descibe Your Issue Here!"
          ></textarea>
          <button className="btn btn-dark w-100 my-2">Raise Complaint</button>
        </form>
      </div>
    </div>
  );
};

export default RaiseComplaits;
