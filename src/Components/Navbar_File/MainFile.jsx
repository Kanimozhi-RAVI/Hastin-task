import React, { useState, useEffect } from 'react';
import { FaUserCircle } from 'react-icons/fa';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min.js'; 
import VendorTable from '../VendorPage/VendorTable';
import Loader from '../Loader_File/Loader';

const MainFile = () => {
  const [isLoading, setIsLoading] = useState(true); 

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoading(false); 
    }, 2000);
    return () => clearTimeout(timer);
  }, []);

  const handleLogout = () => {
    localStorage.clear();
    window.location.replace("/"); 
  };

  return (
    <>
      {isLoading && <Loader />} 

      <nav className="navbar navbar-expand-lg navbar-dark px-4" style={{ backgroundColor: "white" }}>
        <span className="navbar-brand fs-4" style={{fontFamily:"algeria", fontWeight:"bold", color:"purple"}}>HASTIN</span>

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

      <VendorTable />
    </>
  );
};

export default MainFile;
