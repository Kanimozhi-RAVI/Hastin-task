import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { accesscodeRequest } from '../Action_file/Action';
import { useNavigate } from 'react-router-dom';
import './AccessCodeModal.css';

const AccessCodeModal = ({ isOpen, onClose }) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { loading, error, accessCodeStatus } = useSelector(
    (state) => state.accessCodeReducer || {}
  );

  const [otp, setOtp] = useState('');
  const [captcha, setCaptcha] = useState('');
  const [countdown, setCountdown] = useState(90);
  const [showResend, setShowResend] = useState(false);

  // 🔁 Initialize captcha + timer when modal opens
  useEffect(() => {
    if (isOpen) {
      const token = localStorage.getItem('authToken');
      if (!token) {
        alert('Token missing');
        onClose();
        return;
      }

      setOtp(''); // ✅ Don't generate fake OTP, let user enter
      const newCaptcha = localStorage.getItem('opaque') || 'XXXX';
      setCaptcha(newCaptcha);

      setCountdown(90);
      setShowResend(false);
    }
  }, [isOpen, onClose]);

  // ⏱️ Countdown timer logic
  useEffect(() => {
    if (countdown > 0) {
      const timer = setTimeout(() => setCountdown(countdown - 1), 1000);
      return () => clearTimeout(timer);
    } else {
      setShowResend(true);
    }
  }, [countdown]);

  // ✅ Navigate if access code is verified
  useEffect(() => {
    if (accessCodeStatus?.success) {
      onClose();
      navigate('/nextpage'); // 🔁 Change route as needed
    }
  }, [accessCodeStatus, navigate, onClose]);

  // 🔒 Submit OTP
  const handleVerify = () => {
    dispatch(
      accesscodeRequest({
        opaque: captcha,
        accessCode: Number(otp),
      })
    );
  };

  // 🔁 Resend OTP
  const handleResendApi = async () => {
    const token = localStorage.getItem('authToken');
    if (!token) {
      alert('Token missing. Please login again.');
      return;
    }
    try {
      const response = await fetch(
        'https://hastin-container.com/staging/app/auth/access-code/resend',
        {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            Authorization: `BslogiKey ${token}`,
          },
        }
      );
      const data = await response.json();
      if (data?.accessCode) {
        setOtp(''); // Don't autofill, just let user enter
        setCountdown(90);
        setShowResend(false);
      } else {
        alert('Resend failed. Please try again.');
      }
    } catch (error) {
      console.error('Resend OTP error:', error);
      alert('Network error. Please try again.');
    }
  };

  if (!isOpen) return null;

  return (
    <div className="modal-backdrop">
      <div className="otp-modal shadow-lg p-4 rounded bg-white position-relative">
        <button
          className="btn-close position-absolute top-0 end-0 m-3"
          onClick={onClose}
        />

        <h5 className="text-center fw-bold">OTP VERIFICATION</h5>
        <h6 className="text-center mt-2 fw-semibold">Enter Your OTP</h6>
        <p className="text-center text-muted">
          We've sent an OTP to <strong>+6591495625</strong> to continue the
          application,
          <br />
          Please enter the OTP below
        </p>

        <div className="d-flex justify-content-center align-items-center gap-2 mb-3">
          <div className="captcha-box text-uppercase">{captcha}</div>
          <input
            type="text"
            value={otp}
            onChange={(e) => setOtp(e.target.value)}
            className="form-control text-center otp-box"
            placeholder="Enter OTP"
          />
        </div>

        <div className="text-center text-muted mb-3">
          <i className="bi bi-clock-history me-1"></i>
          {showResend ? (
            <span>00:00</span>
          ) : (
            <span>{`0${Math.floor(countdown / 60)}:${(countdown % 60)
              .toString()
              .padStart(2, '0')}`}</span>
          )}
        </div>

        <button
          className={`w-100 fw-bold ${showResend ? 'btn-warning' : 'btn-danger'}`}
          onClick={showResend ? handleResendApi : handleVerify}
          disabled={loading}
        >
          {showResend ? 'Resend OTP' : 'Submit OTP'}
        </button>

        {error && <p className="text-danger mt-3 text-center">{error}</p>}
        {accessCodeStatus?.data?.message && (
          <p className="text-success mt-3 text-center">{accessCodeStatus.data.message}</p>
        )}
      </div>
    </div>
  );
};

export default AccessCodeModal;
