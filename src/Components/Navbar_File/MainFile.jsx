import React, { useState, useEffect } from 'react';
import { FaUserCircle } from 'react-icons/fa';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min.js';
import { NavLink, useNavigate, Outlet } from 'react-router-dom'; 
import '../Navbar_File/MainFile.css';
import Loader from '../Loader_File/Loader';

const MainFile = () => {
  const [isLoading, setIsLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 2000);
    return () => clearTimeout(timer);
  }, []);

  const handleLogout = () => {
    localStorage.clear();
    window.location.replace('/');
  };

  return (
    <>
      {isLoading && <Loader />}

      {/* Top Navbar */}
      <nav className="navbar navbar-expand-lg navbar-dark px-4 bg-light">
        <span className="navbar-brand fs-4" style={{ fontFamily: 'algeria', fontWeight: 'bold', color: '#6c63ff' }}>
          HASTIN
        </span>

        <div className="ms-auto dropdown">
          <button
            className="btn btn-dark dropdown-toggle d-flex align-items-center"
            type="button"
            id="userDropdown"
            data-bs-toggle="dropdown"
            aria-expanded="false"
          >
            <FaUserCircle className="me-2" size={24} />
          </button>

          <ul className="dropdown-menu dropdown-menu-end" aria-labelledby="userDropdown">
            <li>
              <button className="dropdown-item text-danger fw-bold" onClick={handleLogout}>
                🚪 Logout
              </button>
            </li>
          </ul>
        </div>
      </nav>

      {/* Second Navbar */}
      <nav className="navbar navbar-expand-lg px-3 mt-4 second-navbar bg-light" >
        <ul className="d-flex gap-5 nav list">
          <li><NavLink to="/nextpage" end>INDICATOR</NavLink></li>
          <li><NavLink to="/nextpage/hcl-booking">HCL</NavLink></li>
          <li><NavLink to="/nextpage/fwd">FWD</NavLink></li>
          <li><NavLink to="/nextpage/filemanager">FILE MANAGER</NavLink></li>
          <li><NavLink to="/nextpage/shedule">SHEDULE</NavLink></li>
          <li><NavLink to="/nextpage/inventory">INVENTORY</NavLink></li>
          <li><NavLink to="/nextpage/accounts">ACCOUNTS</NavLink></li>
          <li><NavLink to="/nextpage/soa">SOA</NavLink></li>
          <li><NavLink to="/nextpage/tab">MASTERS</NavLink></li>
          <li><NavLink to="/nextpage/dashboard">DASHBOARD</NavLink></li>
        </ul>
      </nav>

      {/* Page content */}
      <div className=" mt-4" >
        <Outlet />
      </div>
    </>
  );
};

export default MainFile;
