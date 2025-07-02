import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { postloginRequest, } from '../Action_file/Action';
import AccessCodeModal from '../Login_page/AccessCode';
import { useNavigate } from 'react-router';
import '../Login_page/Login.css';
import { FaUserCircle } from "react-icons/fa";
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Loader from '../Loader_File/Loader';

const Login = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { loading, error, loginData, accessCodeStatus } = useSelector(state => state.user || {});
  const [userName, setUserName] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);

  useEffect(() => {
  if (loginData) {
    toast.success("Login successful!.", {
      position: "top-right",
      autoClose: 3000,
      pauseOnHover: true,
      theme: "colored",
    });
    setIsModalOpen(true);
  }
}, [loginData]);

useEffect(() => {
  if (accessCodeStatus?.data?.isValidAccessCode) {
  
    setIsModalOpen(false);
    navigate('/nextpage');
  }
}, [accessCodeStatus, navigate]);

useEffect(() => {
  if (error) {
    toast.error(error, {
      position: "top-right",
      autoClose: 3000,
      pauseOnHover: true,
      theme: "colored",
    });
  }
}, [error]);

 
  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(postloginRequest({
      userName,
      password,
    
    }));
  };

  return (
    <div className="body-text">
      <div className="extra-login-wrapper">
        <div className="extra-container glass">
          <div className="extra-right">
            <div className='right-header'> 
              <FaUserCircle style={{fontSize:"50px", display:"flex"}}  />
            <h3>LOGIN</h3>
            </div>
            <form onSubmit={handleSubmit}>
              <input
                type="text"
                placeholder="Username"
                value={userName}
                onChange={(e) => setUserName(e.target.value)}
                required
                autoComplete="username"
                style={{width:"100%"}}

              />
              <input
                type={showPassword ? 'text' : 'password'}
                placeholder="Password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                autoComplete="current-password"
                style={{width:"100%"}}
              />
                  <input
                  type="checkbox"
                  checked={showPassword}
                  onChange={() => setShowPassword(!showPassword)}
                  style={{ marginRight: '8px' }}
                />
                <span>Show Password</span><br/>
              <button
                type="submit"
                className="extra-login-btn"
                disabled={loading}
              >
                Login
              </button>
            </form>

            {error && <p style={{ color: '#d9534f', marginTop: '20px', textAlign: 'center', fontWeight: 'bold' }}>{error}</p>}
          </div>
        </div>
   {loading && <Loader />}

        <AccessCodeModal
          isOpen={isModalOpen}
          onClose={() => setIsModalOpen(false)}
        />
      </div>
      <ToastContainer />

    </div>
  );
};

export default Login;
