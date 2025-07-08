import React, { useState, useEffect } from 'react';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import InvoiceTable from './InvoiceTable';
import { parse, isValid } from 'date-fns';

function InvoiceFormView({ invoice, invoiceItems, currencies, bookinguser = {} }) {
  const safeParse = (dateStr) => {
    if (!dateStr) return null;
    const parsed = parse(dateStr, 'dd/MM/yyyy', new Date());
    return isValid(parsed) ? parsed : null;
  };

  const [formData, setFormData] = useState({
    custName: '',
    issuingAgent: '',
    transactionRef: '',
    invDateStr: null,
    issueDateStr: null,
    dueDateStr: null,
  });

  useEffect(() => {
    if (invoice) {
      setFormData({
        custName: invoice.custName || '',
        issuingAgent: invoice.issuingAgent || '',
        transactionRef: invoice.transactionRef || '',
        invDateStr: safeParse(invoice.invDateStr),
        issueDateStr: safeParse(invoice.issueDateStr),
        dueDateStr: safeParse(invoice.dueDateStr),
      });
    }
  }, [invoice]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleDateChange = (date, name) => {
    setFormData(prev => ({ ...prev, [name]: date }));
  };

  return (
    <div className="invoice-box expanded">
      <div className="invoice-grid">
        <div className="left-section input">
          <label>Bill To</label>
          <input
            name="custName"
            value={formData.custName}
            onChange={handleChange}
          />

          <label>Issuing Agent</label>
          <select
            name="issuingAgent"
            value={formData.issuingAgent}
            onChange={handleChange}
          >
            <option value="">Select Agent</option>
            {Array.isArray(bookinguser.data) &&
              bookinguser.data.map((agent) => (
                <option key={agent.id} value={agent.agentName}>
                  {agent.agentName}
                </option>
              ))}
          </select>

          <label>Invoice Type</label>
          <input value={invoice.invoiceCategory || ''} readOnly />

          <label>Currency</label>
          <input value={invoice.currency || ''} readOnly />

          <label>Currency Conv.Rate</label>
          <input value={invoice.usdConversion || ''} readOnly />
        </div>

        <div className="right-section input">
          <label>Invoice #</label>
          <input value={invoice.invoiceNo || ''} readOnly />

          <label>Invoice Date</label>
          <DatePicker
            selected={formData.invDateStr}
            onChange={(date) => handleDateChange(date, 'invDateStr')}
            dateFormat="yyyy-MM-dd"
            showMonthDropdown
            showYearDropdown
            dropdownMode="select"
            className="form-control"
          />

          <label>Issue Date</label>
          <DatePicker
            selected={formData.issueDateStr}
            onChange={(date) => handleDateChange(date, 'issueDateStr')}
            dateFormat="yyyy-MM-dd"
            showMonthDropdown
            showYearDropdown
            dropdownMode="select"
            className="form-control"
          />

          <label>Due Date</label>
          <DatePicker
            selected={formData.dueDateStr}
            onChange={(date) => handleDateChange(date, 'dueDateStr')}
            dateFormat="yyyy-MM-dd"
            showMonthDropdown
            showYearDropdown
            dropdownMode="select"
            className="form-control"
          />

          <label>Reference No</label>
          <input
            name="transactionRef"
            value={formData.transactionRef}
            onChange={handleChange}
          />
        </div>
      </div>

      <InvoiceTable
        mode="view"
        chargeItems={invoiceItems}
        currencies={currencies}
      />

      <div style={{ display: 'flex', justifyContent: 'space-between' }}>
        <textarea className="notes-text" placeholder="Notes" readOnly />
        <div className="totals-right">
          <p><strong>Sub Total ({invoice.currency || '0.00'}): {invoice.subTotal}</strong></p>
          <p><strong>Grand Total: {invoice.amount} {invoice.currency}</strong></p>
        </div>
      </div>

      <div style={{ justifyContent: 'flex-end', display: 'flex' }}>
        <button className="btn-up">Update</button>
      </div>
    </div>
  );
}

export default InvoiceFormView;
