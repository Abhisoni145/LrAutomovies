import React, { useEffect } from 'react';
import { toast } from 'react-toastify';
import { useDispatch, useSelector } from 'react-redux';
import Backbutton from '../components/Backbutton';
import Loading from '../components/Loading';
import { getAllUsers } from '../features/admin/adminSlice';

const AllUsers = () => {
  const { isLoading, isError, message, users } = useSelector(
    (state) => state.admin
  );

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getAllUsers());

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
      <h1 className="text-center">All users</h1>

      <div className="card display my-3">
        <table className="table">
          <thead>
            <tr>
              <th scope="col">#</th>
              <th scope="col">Name</th>
              <th scope="col">Email</th>
            </tr>
          </thead>
          <tbody>
            {users?.map((user, index) => {
              return (
                <tr key={user._id}>
                  <th scope="row">{index + 1}</th>
                  <td>{user.name}</td>
                  <td>{user.email}</td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default AllUsers;
