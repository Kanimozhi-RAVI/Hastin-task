import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { postloginRequest, accesscodeRequest } from '../Action_file/Action';
import AccessCodeModal from '../Login_page/AccessCode';
import { useNavigate } from 'react-router';
import '../Login_page/Login.css';
import { FaUserCircle } from "react-icons/fa";

const Login = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { loading, error, loginData, accessCodeStatus } = useSelector(state => state.user || {});

  const [userName, setUserName] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [userOtp, setUserOtp] = useState('');

  useEffect(() => {
    if (loginData) {
      setIsModalOpen(true);
    }
  }, [loginData]);

  useEffect(() => {
    if (accessCodeStatus?.data?.isValidAccessCode) {
      // alert('Access code verified! Redirecting...');
      setIsModalOpen(false);
      navigate('/nextpage');
    }
  }, [accessCodeStatus, navigate]);

  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(postloginRequest({
      userName,
      password,
      recaptcha: '',
      origin: 'AGENT',
    }));
  };

  const handleOtpSubmit = () => {
    if (!userOtp) {
      alert('Please enter the OTP');
      return;
    }
    dispatch(accesscodeRequest({
      opaque: loginData?.opaque,
      accessCode: Number(userOtp),
    }));
  };

  return (
    <div className="body-text">
      <div className="extra-login-wrapper">
        <div className="extra-container glass">

          {/* Left side with background image, title, text, and Register button */}
          <div className="extra-left">
            <h2>Welcome Back!</h2>
            <p>Sign in to your account and manage your tasks easily.</p>
          </div>

          {/* Right side login form */}
          <div className="extra-right">
            <div className='right-header'> 
              <FaUserCircle style={{fontSize:"50px"}} />
            <h3>Sign In</h3>
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

        {/* OTP Modal */}
        <AccessCodeModal
          isOpen={isModalOpen}
          onClose={() => setIsModalOpen(false)}
          opaque={loginData?.opaque}
          backendAccessCode={loginData?.accessCode}
          userOtp={userOtp}
          setUserOtp={setUserOtp}
          onSubmit={handleOtpSubmit}
          loading={loading}
          error={error}
        />
      </div>
    </div>
  );
};

export default Login;
