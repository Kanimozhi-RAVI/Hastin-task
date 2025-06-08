import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { accesscodeRequest, resendOtpRequest , clearAccessCodeStatus } from '../Action_file/Action';

import './AccessCodeModal.css';

const AccessCodeModal = ({ isOpen, onClose }) => {
  const dispatch = useDispatch();

  const { accessCodeStatus, loading, error } = useSelector(state => state.accessCode || {});
  const finalOpaque = localStorage.getItem('opaque') || '';
  const finalAccessCode = localStorage.getItem('accessCode') || '';

  const [countdown, setCountdown] = useState(90);
  const [showResend, setShowResend] = useState(false);


  // Reset timer when modal opens
  useEffect(() => {
    if (isOpen) {
      setCountdown(90);
      setShowResend(false);
    }
  }, [isOpen]);

  // Timer logic
  useEffect(() => {
    if (!isOpen) return;
    if (countdown > 0) {
      const timer = setTimeout(() => setCountdown(prev => prev - 1), 1000);
      return () => clearTimeout(timer);
    } else {
      setShowResend(true);
    }
  }, [countdown, isOpen]);

  // Manual submit OTP
  const handleSubmit = () => {
    if (finalOpaque && finalAccessCode) {
      dispatch(accesscodeRequest({ opaque: finalOpaque, accessCode: Number(finalAccessCode) }));
    }
  };

// Inside your AccessCodeModal component
const handleClose = () => {
  dispatch(clearAccessCodeStatus());
  onClose();
};

  // Manual resend
  const handleResend = () => {
    dispatch(resendOtpRequest());
    setCountdown(90);
    setShowResend(false);
  };

  if (!isOpen) return null;

  return (
    <div className="custom-backdrop">
      <div className="otp-modal  rounded">
        <button className="btn-close float-end" onClick={onClose}></button>
        <h5 className="text-center fw-bold mb-3">OTP Verification</h5>

        <p className="text-center text-muted">
          Please enter the OTP sent to your registered number.
        </p>

        <div className="d-flex justify-content-center gap-2 my-3">
          <input
            className="form-control text-center"
            value={finalOpaque}
            readOnly
            style={{ width: 150 }}
          />
          <input
            className="form-control text-center"
            value={finalAccessCode}
            readOnly
            style={{ width: 100 }}
          />
        </div>

        <div className="text-center text-muted mb-3">
          ⏳{' '}
          {showResend
            ? '00:00'
            : `0${Math.floor(countdown / 60)}:${(countdown % 60)
                .toString()
                .padStart(2, '0')}`}
        </div>

        {/* Button logic */}
        <button
          className={`btn w-100 ${showResend ? 'btn-warning' : 'btn-primary'}`}
          onClick={showResend ? handleResend : handleSubmit}
          disabled={loading}
        >
          {loading ? (
            <span className="spinner-border spinner-border-sm me-2" />
          ) : showResend ? (
            'Resend OTP'
          ) : (
            'Submit'
          )}
        </button>


        {/* Success message */}
        {accessCodeStatus?.data?.message && (
          <div className="alert alert-success mt-3 text-center">
            {accessCodeStatus.data.message}
          </div>
        )}

        {/* Error message */}
        {error && (
          <div className="alert alert-danger mt-3 text-center">{error}</div>
        )}
      </div>
    </div>
  );
};

export default AccessCodeModal;



// import React, { useEffect, useState } from 'react';
// import { useDispatch, useSelector } from 'react-redux';
// import { accesscodeRequest, resendOtpRequest } from '../Action_file/Action';
// import './AccessCodeModal.css';

// const AccessCodeModal = ({ isOpen, onClose }) => {
//   const dispatch = useDispatch();

//   // Get access code state from redux
//   const { accessCodeStatus, loading, error } = useSelector(state => state.accessCode || {});

//   // Access opaque and accessCode from redux or localStorage fallback
//   const finalOpaque = accessCodeStatus?.data?.opaque || localStorage.getItem('opaque') || '';
//   const finalAccessCode = accessCodeStatus?.data?.accessCode || localStorage.getItem('accessCode') || '';

//   const [countdown, setCountdown] = useState(90);
//   const [showResend, setShowResend] = useState(false);

//   // Reset countdown and resend button when modal opens
//   useEffect(() => {
//     if (isOpen) {
//       setCountdown(90);
//       setShowResend(false);
//     }
//   }, [isOpen]);

//   // Countdown timer logic
//   useEffect(() => {
//     if (!isOpen) return;

//     if (countdown > 0) {
//       const timer = setTimeout(() => setCountdown((prev) => prev - 1), 1000);
//       return () => clearTimeout(timer);
//     } else {
//       setShowResend(true);
//     }
//   }, [countdown, isOpen]);

//   // Auto-submit OTP validation when modal opens and opaque + accessCode exist
//   useEffect(() => {
//     if (isOpen && finalOpaque && finalAccessCode) {
//       dispatch(accesscodeRequest({ opaque: finalOpaque, accessCode: Number(finalAccessCode) }));
//     }
//   }, [isOpen, finalOpaque, finalAccessCode, dispatch]);

//   // Handle manual resend OTP click
//   const handleResend = () => {
//     dispatch(resendOtpRequest());
//     setCountdown(90);
//     setShowResend(false);
//   };

//   if (!isOpen) return null;

//   return (
//     <div className="modal-backdrop">
//       <div className="otp-modal shadow-lg p-4 bg-white rounded">
//         <button className="btn-close float-end" onClick={onClose}></button>
//         <h5 className="text-center fw-bold mb-3">OTP Verification</h5>

//         <p className="text-center text-muted">
//           Please enter the OTP sent to your registered number.
//         </p>

//         {/* Show opaque and access code (readonly) */}
//         <div className="d-flex justify-content-center gap-2 my-3">
//           <input
//             className="form-control text-center"
//             value={finalOpaque}
//             readOnly
//             style={{ width: 150 }}
//           />
//           <input
//             className="form-control text-center"
//             value={finalAccessCode}
//             readOnly
//             style={{ width: 100 }}
//           />
//         </div>

//         <div className="text-center text-muted mb-3">
//           ⏳{' '}
//           {showResend
//             ? '00:00'
//             : `0${Math.floor(countdown / 60)}:${(countdown % 60)
//                 .toString()
//                 .padStart(2, '0')}`}
//         </div>

//         {/* Button changes based on countdown */}
//         <button
//           className={`btn w-100 ${showResend ? 'btn-warning' : 'btn-primary'}`}
//           onClick={showResend ? handleResend : undefined}
//           disabled={loading}
//         >
//           {loading ? (
//             <span className="spinner-border spinner-border-sm me-2" />
//           ) : showResend ? (
//             'Resend OTP'
//           ) : (
//             'Verifying...'
//           )}
//         </button>

//         {/* Show success message */}
//         {accessCodeStatus?.data?.message && (
//           <div className="alert alert-success mt-3 text-center">
//             {accessCodeStatus.data.message}
//           </div>
//         )}

//         {/* Show error message */}
//         {error && (
//           <div className="alert alert-danger mt-3 text-center">{error}</div>
//         )}
//       </div>
//     </div>
//   );
// };

// export default AccessCodeModal;
