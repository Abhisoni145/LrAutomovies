import React, { useEffect } from 'react';
import { toast } from 'react-toastify';
import Backbutton from '../components/Backbutton';
import Loading from '../components/Loading';
import { useDispatch, useSelector } from 'react-redux';
import { getComplaint } from '../features/admin/adminSlice';

const AllAdminComplaint = () => {
  const { isLoading, isError, message, cars } = useSelector(
    (state) => state.admin
  );

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getComplaint());

    if (isError && message) {
      toast.error(message);
    }
  }, [isError, message]);

  if (isLoading) {
    return <Loading />;
  }

  return (
    <>
      <div className="container p-4">
        <Backbutton url={'/'} />
        <h1 className="text-center">All users</h1>
        <div>
          <table className="table">
            <thead>
              <tr>
                <th scope="col">#</th>
                <th scope="col">Car</th>
                <th scope="col">Date</th>
                <th scope="col">Registration</th>
                <th scope="col">Status</th>
                <th></th>
              </tr>
            </thead>
            <tbody>
              {cars?.map((car, index) => {
                return (
                  <tr key={index}>
                    <th scope="row">{index + 1}</th>
                    <td>{car.car}</td>

                    <td>
                      {new Date(car.createdAt).toLocaleDateString('en-IN')}
                    </td>
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
                    <td></td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>
    </>
  );
};

export default AllAdminComplaint;
