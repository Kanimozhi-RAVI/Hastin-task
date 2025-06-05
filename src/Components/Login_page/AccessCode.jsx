import React, { useEffect, useState } from 'react';
import { Modal, Button, Form } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import { accesscodeRequest } from '../Action_file/Action'; // Your redux action
import { useNavigate } from 'react-router-dom';

const AccessCodeModal = ({ show, onHide, opaque }) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [accessCode, setAccessCode] = useState('');
  const [timer, setTimer] = useState(60); // 60 seconds timer

  const { loading, accessCodeResult, error } = useSelector((state) => state.user || {});

  // Timer countdown logic
  useEffect(() => {
    if (show && timer > 0) {
      const countdown = setInterval(() => {
        setTimer((prev) => prev - 1);
      }, 1000);

      return () => clearInterval(countdown);
    } else if (!show) {
      setTimer(60); // reset timer when modal closes
      setAccessCode(''); // clear input when modal closes
    }
  }, [show, timer]);

  // When access code is validated successfully
  useEffect(() => {
    if (accessCodeResult?.data?.isValidAccessCode) {
      onHide(); // close modal
      navigate('/dashboard'); // redirect to dashboard or any page
    }
  }, [accessCodeResult, navigate, onHide]);

  const handleSubmit = () => {
    dispatch(accesscodeRequest({ opaque, accessCode: Number(accessCode) }));
  };

  return (
    <Modal show={show} onHide={onHide} centered>
      <Modal.Header closeButton>
        <Modal.Title>Enter Access Code</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form.Group controlId="accessCodeInput">
          <Form.Label>Access Code</Form.Label>
          <Form.Control
            type="number"
            value={accessCode}
            onChange={(e) => setAccessCode(e.target.value)}
            placeholder="Enter code"
            autoFocus
          />
        </Form.Group>
        <div className="mt-2 text-muted">Time remaining: {timer} sec</div>
        {error && <div className="text-danger mt-2">{error}</div>}
      </Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={onHide}>
          Cancel
        </Button>
        <Button
          variant="primary"
          onClick={handleSubmit}
          disabled={timer === 0 || !accessCode || loading}
        >
          {loading ? 'Validating...' : 'Submit'}
        </Button>
      </Modal.Footer>
    </Modal>
  );
};

export default AccessCodeModal;
