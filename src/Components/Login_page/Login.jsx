import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { postloginRequest } from '../Action_file/Action';
import { FaUserCircle } from "react-icons/fa";
import { accesscodeRequest } from '../Action_file/ValidateAction';
import AccessCodeModal from '../Login_page/AccessCode';

const Login = () => {
  const dispatch = useDispatch();
  const { loading, error, accessCodeStatus } = useSelector((state) => state.user || {});

  const [userName, setUserName] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [opaqueValue, setOpaqueValue] = useState('Pdov');

  const handleSubmit = (e) => {
    e.preventDefault();

    const payload = {
      userName,
      password,
      recaptcha: '',
      origin: 'AGENT'
    };

    dispatch(postloginRequest(payload));
    setTimeout(() => {
      setIsModalOpen(true);
    }, 500); // Short delay to simulate login before OTP modal
  };

  const closeAccessCodeModal = () => {
    setIsModalOpen(false);
  };

  const handleAccessCodeSubmit = (accessCode) => {
    dispatch(accesscodeRequest({ opaque: opaqueValue, accessCode: Number(accessCode) }));
  };

  useEffect(() => {
    if (accessCodeStatus?.data?.isValidAccessCode) {
      alert('Access code verified! Redirecting...');
      setIsModalOpen(false);
      // Navigate if needed
      // navigate('/dashboard');
    }
  }, [accessCodeStatus]);

  return (
    <div className='body-text'>
      <div className="extra-login-wrapper">
        <div className="extra-container">
          <div className="extra-left">
            <h2>Welcome Back!</h2>
            <p>Experience the best platform with stunning design.</p>
          </div>

          <div className="extra-right glass">
            <div className='logo'><FaUserCircle /></div>
            <h3>Sign In</h3>
            <form onSubmit={handleSubmit}>
              <input
                type="text"
                name="username"
                placeholder="Username"
                value={userName}
                onChange={(e) => setUserName(e.target.value)}
                required
                style={{ width: "100%" }}
              />

              <input
                type={showPassword ? 'text' : 'password'}
                name="password"
                placeholder="Password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                style={{ width: "100%" }}
              />

              <div className="extra-options">
                <input type="checkbox" onChange={() => setShowPassword(!showPassword)} />
                <span> Show Password</span>
              </div>

              <button type="submit" className="extra-login-btn" disabled={loading}>
                {loading ? 'Logging in...' : 'Login'}
              </button>
            </form>

          </div>
        </div>
      </div>
      {error && <p className="text-danger mt-2">{error}</p>}

      <AccessCodeModal
        isOpen={isModalOpen}
        onClose={closeAccessCodeModal}
        onSubmit={handleAccessCodeSubmit}
        loading={loading}
        error={error}
        success={accessCodeStatus?.data?.message}
      />
    </div>
  );
};

export default Login;
