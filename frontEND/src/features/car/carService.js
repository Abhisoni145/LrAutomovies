import axios from 'axios';

const addCar = async (formData, token) => {
  const options = {
    headers: {
      authorization: `Bearer ${token}`,
    },
  };
  const response = await axios.post('/api/service', formData, options);
  return response.data;
};

// get cars
const getCars = async (token) => {
  const options = {
    headers: {
      authorization: `Bearer ${token}`,
    },
  };
  const response = await axios.get('/api/service', options);
  return response.data;
};

// single complains get

const getCar = async (id, token) => {
  const options = {
    headers: {
      authorization: `Bearer ${token}`,
    },
  };
  const response = await axios.get(`/api/service/${id}`, options);
  return response.data;
};
// close
const updateComplaint = async (id, token) => {
  const options = {
    headers: {
      authorization: `Bearer ${token}`,
    },
  };
  const response = await axios.put(
    `/api/service/${id}`,
    { status: 'closed' },
    options
  );
  return response.data;
};
const carService = {
  addCar,
  getCars,
  getCar,
  updateComplaint,
};

export default carService;
