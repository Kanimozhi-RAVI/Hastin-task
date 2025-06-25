import React, { useState, useEffect } from 'react';
import { FaUserCircle } from 'react-icons/fa';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min.js'; 
import VendorTable from '../VendorPage/VendorTable';
import Loader from '../Loader_File/Loader';
import { Link, useNavigate } from 'react-router';
import '../Navbar_File/MainFile.css'

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
    window.location.replace("/"); 
  };
//   const masterhandle = () => {
// // same page la ithulaye enaku open aaganum
// navigate('/tab')
//   }

  return (
    <>
      {isLoading && <Loader />} 

      <nav className="navbar navbar-expand-lg navbar-dark px-4  bg-light">
        <span className="navbar-brand fs-4" style={{fontFamily:"algeria", fontWeight:"bold", color:"#6c63ff"}}>HASTIN</span>

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
            <nav className="navbar navbar-expand-lg  px-3 mt-4 " style={{ backgroundColor:"whitesmoke", textDecoration:"none"}}>
              <ul className='d-flex gap-5 nav list' style={{fontSize:"14px" ,color:"black"}} >
                <li><Link to='/' style={{textDecoration:"none",color:"darkblue"}}>INDICATOR</Link></li>
                <li> <Link to='/hcl-booking'  style={{textDecoration:"none" ,color:"darkblue"}}>HCL</Link></li>
                <li> <Link to='/fwd'  style={{textDecoration:"none" ,color:"darkblue"}}>FWD</Link></li>
                <li ><Link to='/filemanager'  style={{textDecoration:"none" ,color:"darkblue"}}>FILE MANAGER</Link></li>
                <li><Link to='/shedule'  style={{textDecoration:"none" ,color:"darkblue"}}>SHEDULE</Link></li>
                <li><Link to='/inventory'  style={{textDecoration:"none" ,color:"darkblue"}}>INVENTORY</Link></li>
                <li><Link to='/accounts'  style={{textDecoration:"none" ,color:"darkblue"}}>ACCOUNTS</Link></li>
                <li><Link to='/soa'  style={{textDecoration:"none" ,color:"darkblue"}}>SOA</Link></li>
                <li><Link to='/tab'  style={{textDecoration:"none" ,color:"darkblue"}}>MASTERS</Link></li>
                {/* <li><button onClick={masterhandle}>Mastres</button></li> */}
                <li><Link to='/dashboard'  style={{textDecoration:"none" ,color:"darkblue"}}>DASHBOARD</Link></li>
              </ul>


      </nav>

      <VendorTable />
    </>
  );
};

export default MainFile;
