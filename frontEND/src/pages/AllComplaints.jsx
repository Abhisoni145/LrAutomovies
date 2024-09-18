import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import Backbutton from '../components/Backbutton';
import Loading from '../components/Loading';
import { useDispatch, useSelector } from 'react-redux';
import { getComplaints } from '../features/car/carSlice';
import { toast } from 'react-toastify';

const AllComplaints = () => {
  const { cars, isLoading, isError, message } = useSelector(
    (state) => state.car
  );

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getComplaints());

    if (isError && message) {
      toast.error(message);
    }
  }, [isError, message]);

  if (isLoading) {
    return <Loading />;
  }

  return (
    <div className="container p-4">
      <Backbutton url={'/'} />
      <h1 className="text-center">All Complains</h1>

      <div className="card display my-3">
        <table className="table">
          <thead>
            <tr>
              <th scope="col">#</th>
              <th scope="col">Date</th>
              <th scope="col">Car</th>
              <th scope="col">Registration</th>
              <th scope="col">Status</th>
              <th></th>
            </tr>
          </thead>
          <tbody>
            {cars.map((car, index) => {
              return (
                <tr key={index}>
                  <th scope="row">{index + 1}</th>
                  <td>{new Date(car.createdAt).toLocaleDateString('en-IN')}</td>
                  <td>{car.car}</td>
                  <td>{car.registration}</td>
                  <td>
                    <span
                      className={
                        car.status === 'open'
                          ? 'badge text-bg-success'
                          : 'badge text-bg-danger'
                      }
                    >
                      {car.status}
                    </span>
                  </td>
                  <td>
                    <Link
                      to={`/cars/${car._id}`}
                      className="btn btn-sm btn-dark rounded-5"
                    >
                      view
                    </Link>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default AllComplaints;
