import React, { useEffect, useState } from 'react';
import Backbutton from '../components/Backbutton';
import { useParams } from 'react-router-dom';
import Loading from '../components/Loading';
import { useDispatch, useSelector } from 'react-redux';
import { toast } from 'react-toastify';
import { closeComplaint, getComplaint } from '../features/car/carSlice';
import { createNote, getNotes } from '../features/notes/noteSlice';
import punch from '../assets/punch.jpeg';
import safari from '../assets/safari-dark.png';
import tiago from '../assets/tiago-white.png';
import curvv from '../assets/Curvv new.webp';
import nexon from '../assets/nexon.png';

const SingleComplaints = () => {
  const { car, isLoading, isError, message } = useSelector(
    (state) => state.car
  );

  const { user } = useSelector((state) => state.auth);
  const { notes } = useSelector((state) => state.note);

  const { id } = useParams();
  const dispatch = useDispatch();

  const [text, setText] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(createNote({ id, text }));
    setText('');
  };
  const handleClosed = () => {
    dispatch(closeComplaint(id));
    toast.success('close');
  };

  useEffect(() => {
    dispatch(getComplaint(id));
    dispatch(getNotes(id));

    if (isError && message) {
      toast.error(message);
    }
  }, [isError, message]);

  if (isLoading || !car) {
    return <Loading />;
  }

  const carImage = {
    safari: safari,
    punch: punch,
    tiago: tiago,
    curvv: curvv,
    nexon: nexon,
  };

  function getImages(item) {
    return carImage[item] || punch;
  }

  return (
    <div className="container p-5">
      <h1 className="text-center">SingleComplain</h1>

      <div className="card shadow p-4 my-3">
        <div className="d-flex align-items-center justify-content-between">
          <div>
            <h1 className="display-6">Car : {car.car}</h1>
            <p className="text-secondary">Registration : {car.registration}</p>
            <p>
              Status :
              <span
                className={
                  car.status === 'closed'
                    ? 'badge text-bg-danger'
                    : 'badge text-bg-success'
                }
              >
                {car.status}
              </span>
            </p>
            <p className="text-secondary">
              Date :{new Date(car.createdAt).toLocaleDateString('en-IN')}
            </p>
            <p className="text-secondary">Issue :{car.description} </p>
          </div>
          <div>
            <img
              src={getImages(car.car)}
              alt={car.car}
              style={{ width: '30vw' }}
            />
          </div>
        </div>
      </div>

      <div className="card shadow my-3 p-3">
        <form onSubmit={handleSubmit}>
          <input
            type="text"
            className="form-control"
            placeholder="Eter Note Here"
            value={text}
            onChange={(e) => setText(e.target.value)}
          />

          <button className="btn btn-sm btn-dark my-3 ">Add Note</button>
        </form>
        <ul className="list-group my-2">
          {notes?.map((note) => {
            return (
              <li
                key={note?._id}
                className={
                  note ? 'list-group-item' : 'list-group-item bg-secondary'
                }
              >
                <h1>{note?.note}</h1>
                {note.isStaff ? <p>from-staff</p> : <p>{user?.name}</p>}
              </li>
            );
          })}
        </ul>

        <div className="d-flex align-items-center justify-content-between">
          <button
            className="btn btn-sm w-30 btn-danger"
            disabled={car?.status === 'close' ? true : false}
            onClick={handleClosed}
          >
            Close
          </button>
          <Backbutton url={'/cars'} />
        </div>
      </div>
    </div>
  );
};

export default SingleComplaints;
