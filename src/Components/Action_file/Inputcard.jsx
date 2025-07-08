import React, { useState } from 'react';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import './FloatingDateCard.css';
import TableContainer from '@mui/material/TableContainer'; // if you're using MUI

const labels2 = [
  { label: 'Invoice Date' },
  { label: 'Due Date' },
  { label: 'Payment Date' }
];

function Inputcard() {
  const [invoiceDetails, setInvoiceDetails] = useState({});
  const [focusedInput, setFocusedInput] = useState('');
  const [submitted, setSubmitted] = useState(false);
  const [errors, setErrors] = useState({});

  const formatDateForInput = (dateStr) => {
    if (!dateStr) return '';
    return dateStr;
  };

  return (
   <div className="col-lg-6 mb-3 pt-3">
  <TableContainer className="card shadow" style={{ marginTop: 4, height: 'auto' }}>
    <div className="card p-4 border-0">
      <h6 className="fw-bold mb-3" style={{ fontSize: '13px' }}>INVOICE DETAIL</h6>
      <table style={{ width: '100%' }}>
        <tbody>
          {labels2.map((item, index) => (
            <tr key={index}>
              <td colSpan="2" style={{ padding: '12px 0', position: 'relative' }}>
                <div className="floating-label-input" style={{ position: 'relative' }}>
                  {/* Border container */}
                  <div
                    style={{
                      border: submitted && errors?.[item.label] && !invoiceDetails[item.label]
                        ? '1px solid red'
                        : '1px solid #CFCFCF',
                      borderRadius: '6px',
                      padding: '0px',
                      backgroundColor: '#fff',
                    }}
                  >
                    <DatePicker
                      selected={
                        invoiceDetails[item.label]
                          ? new Date(formatDateForInput(invoiceDetails[item.label]))
                          : null
                      }
                      onChange={(date) => {
                        if (date && item.label !== 'Invoice No') {
                          const day = String(date.getDate()).padStart(2, '0');
                          const month = String(date.getMonth() + 1).padStart(2, '0');
                          const year = date.getFullYear();
                          const formattedDate = `${day}/${month}/${year}`;
                          setInvoiceDetails((prev) => ({
                            ...prev,
                            [item.label]: formattedDate,
                          }));
                        }
                      }}
                      onFocus={() => setFocusedInput(item.label)}
                      onBlur={() => setFocusedInput(null)}
                      placeholderText=" "
                      dateFormat="yyyy/MM/dd"
                      showMonthDropdown
                      showYearDropdown
                      dropdownMode="select"
                      readOnly={item.label === 'Invoice No'}
                      className="form-control"
                      style={{
                        border: 'none',
                        width: '100%',
                        fontSize: '13px',
                        borderRadius: '6px',
                        color: '#333',
                        backgroundColor: '#fff',
                      }}
                    />
                  </div>

                  {/* Floating Label */}
                  <label
                    style={{
                      position: 'absolute',
                      top:
                        invoiceDetails[item.label] || focusedInput === item.label
                          ? '-8px'
                          : '10px',
                      left: '13px',
                      background: '#fff',
                      padding: '0 10px',
                      fontSize: '13px',
                      color: '#4A4A4A',
                      pointerEvents: 'none',
                      transition: 'all 0.2s ease',
                    }}
                  >
                    {item.label}
                  </label>

                  {/* Validation error */}
                  {submitted && errors?.[item.label] && !invoiceDetails[item.label] && (
                    <div className="text-danger small mt-1">{errors[item.label]}</div>
                  )}
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  </TableContainer>
</div>

  );
}

export default Inputcard;
