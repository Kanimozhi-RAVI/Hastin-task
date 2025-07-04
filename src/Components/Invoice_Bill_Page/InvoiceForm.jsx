// components/InvoiceBill/InvoiceForm.js
import React, { useState } from 'react';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';

const InvoiceForm = ({ currencies }) => {
  const today = new Date();
  const [invoiceDate, setInvoiceDate] = useState(today);
  const [dueDate, setDueDate] = useState(today);
  const [issueDate, setIssueDate] = useState(null);
  const [currencyId, setCurrencyId] = useState('');
  const [conversionRate, setConversionRate] = useState('');

  const handleCurrencyChange = (e) => {
    const selected = currencies.find(c => c.id.toString() === e.target.value);
    setCurrencyId(e.target.value);
    setConversionRate(selected?.conversionRate || '');
  };

  return (
    <div className="invoice-box expanded">
      <div className="invoice-grid">
        <div className="left-section input">
          <label>Customer</label>
          <input placeholder="Enter Customer" />
          <label>Currency</label>
          <select value={currencyId} onChange={handleCurrencyChange}>
            <option value="">Select</option>
            {currencies.map(c => (
              <option key={c.id} value={c.id}>{c.code}</option>
            ))}
          </select>
          <label>Conversion Rate</label>
          <input value={conversionRate} readOnly />
        </div>

        <div className="right-section input">
          <label>Invoice Date</label>
          <DatePicker selected={invoiceDate} onChange={setInvoiceDate} dateFormat="yyyy-MM-dd" />
          <label>Issue Date</label>
          <DatePicker selected={issueDate} onChange={setIssueDate} dateFormat="yyyy-MM-dd" />
          <label>Due Date</label>
          <DatePicker selected={dueDate} onChange={setDueDate} dateFormat="yyyy-MM-dd" />
        </div>
      </div>
    </div>
  );
};

export default InvoiceForm;
