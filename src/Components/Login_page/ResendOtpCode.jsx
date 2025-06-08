import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { resendOtpRequest } from '../Action_file/Action';

const AccessCodeComponent = () => {
  const dispatch = useDispatch();
  const [otp, setOtp] = useState('');
  const [countdown, setCountdown] = useState(90);
  const [showResend, setShowResend] = useState(false);

  const resendState = useSelector((state) => state.resendOtp); // Adjust to your reducer key

  // When resend OTP success received, update OTP and reset timer
  useEffect(() => {
    if (resendState?.data?.accessCode) {
      setOtp(resendState.data.accessCode.toString());
      setCountdown(90);
      setShowResend(false);
    }
  }, [resendState.data]);
// 
  const handleResendClick = () => {
    dispatch(resendOtpRequest());
  };

  // countdown timer logic here (optional)...

  return (
    <div>
      <input value={otp} readOnly />
      {showResend ? (
        <button onClick={handleResendClick}>Resend OTP</button>
      ) : (
        <span>Wait {countdown} seconds</span>
      )}
    </div>
  );
};

export default AccessCodeComponent;
