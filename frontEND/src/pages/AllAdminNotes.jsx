import React, { useEffect } from 'react';
import Backbutton from '../components/Backbutton';
import { useDispatch, useSelector } from 'react-redux';
import Loading from '../components/Loading';
import { getAdminNotes } from '../features/admin/adminSlice';
import { toast } from 'react-toastify';

const AllAdminNotes = () => {
  const { isLoading, isError, message, notes, user } = useSelector(
    (state) => state.admin
  );

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getAdminNotes());

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
        <div>
          <table className="table">
            <thead>
              <tr>
                <h3 className=" card text-light bg-primary text-center my-3">
                  ALL NOTES
                </h3>
              </tr>
            </thead>
            <tbody>
              <tr>
                {notes?.map((note, index) => {
                  return (
                    <div className="card bg-dark text-danger my-2">
                      <h3>{note.note}</h3>
                    </div>
                  );
                })}
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </>
  );
};

export default AllAdminNotes;
