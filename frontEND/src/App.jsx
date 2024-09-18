import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Navbar from './components/Navbar';
import PageNotFound from './components/PageNotFound';
import Home from './pages/Home';
import Login from './pages/Login';
import AllComplaints from './pages/AllComplaints';
import Regi from './pages/Regi';
import RaiseComplaits from './pages/RaiseComplaits';
import SingleComplaints from './pages/SingleComplaints';
import AllUsers from './pages/AllUsers';
import AllAdminComplaint from './pages/AllAdminComplaint';
import AllAdminNotes from './pages/AllAdminNotes';

const App = () => {
  return (
    <Router>
      <Navbar />
      <Routes>
        <Route
          path="/"
          element={<Home />}
        />

        <Route
          path="*"
          element={<PageNotFound />}
        />

        <Route
          path="/login"
          element={<Login />}
        />
        <Route
          path="/register"
          element={<Regi />}
        />

        <Route
          path="/cars"
          element={<AllComplaints />}
        />

        <Route
          path="/cars/:id"
          element={<SingleComplaints />}
        />
        <Route
          path="/raise"
          element={<RaiseComplaits />}
        />
        <Route
          path="/admin/users"
          element={<AllUsers />}
        />
        <Route
          path="/admin/cars"
          element={<AllAdminComplaint />}
        />
        <Route
          path="/admin/notes"
          element={<AllAdminNotes />}
        />
      </Routes>
      <ToastContainer />
    </Router>
  );
};

export default App;
