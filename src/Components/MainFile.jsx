import React from 'react';
import { useNavigate } from 'react-router';
import { FaUserCircle } from 'react-icons/fa';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min.js'; // Ensure Bootstrap JS is loaded

const MainFile = () => {
  const navigate = useNavigate();


const handleLogout = () => {
  // Clear all auth data
  localStorage.removeItem('authToken');
  localStorage.removeItem('opaque');
  localStorage.removeItem('accessCode');

  // Replace history so user can't go back
  navigate('/', { replace: true });
};

  

  return (
    <nav className="navbar navbar-expand-lg navbar-dark bg-dark px-4">
      <span className="navbar-brand text-white fs-4">🔒 SecureApp</span>

      <div className="ms-auto dropdown">
        <button
          className="btn btn-dark dropdown-toggle d-flex align-items-center"
          type="button"
          id="userDropdown"
          data-bs-toggle="dropdown"
          aria-expanded="false"
        >
          <FaUserCircle className="me-2" size={20} />
          <span>User</span>
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
