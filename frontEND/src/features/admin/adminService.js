import axios from 'axios';

const fetchAllUsers = async (token) => {
  const options = {
    headers: {
      authorization: `Bearer ${token}`,
    },
  };
  const response = await axios.get('/api/admin/users', options);
  const witdoutAdminResponse = response.data.filter(
    (user) => user.name !== 'Admin'
  );
  return witdoutAdminResponse;
  // return response.data;
};

// admin complaints see
const fetchAllComplaints = async (token) => {
  const options = {
    headers: {
      authorization: `Bearer ${token}`,
    },
  };
  const response = await axios.get('/api/admin/complaints', options);
  return response.data;
};

const fetchAllNotes = async (token) => {
  const options = {
    headers: {
      authorization: `Bearer ${token}`,
    },
  };
  const response = await axios.get('/api/admin/notes', options);
  console.log(response.data);
  return response.data;
};

const adminService = {
  fetchAllUsers,
  fetchAllComplaints,
  fetchAllNotes,
};

export default adminService;
