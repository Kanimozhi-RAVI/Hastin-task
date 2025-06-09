import React from 'react';
import { FaUserCircle } from 'react-icons/fa';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min.js'; 

const MainFile = () => {
const handleLogout = () => {
  localStorage.clear();
  window.location.replace("/"); 
};
  

  return (
    <nav className="navbar navbar-expand-lg navbar-dark  px-4 " style={{backgroundColor:"#812990"}}>
      <span className="navbar-brand text-white fs-4">🔒 SecureApp</span>

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
  );
};

export default MainFile;
