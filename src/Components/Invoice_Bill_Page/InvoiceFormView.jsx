import React, { useEffect, useState } from 'react';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import { parseISO, isValid } from 'date-fns';
import InvoiceTable from './InvoiceTable';
import './ChargeModal.css';

function InvoiceFormView({
  invoice = {},
  invoiceItems = [],
  currencies = [],
  bookinguser = {},
  accountHeads = [],
  suggestions = [],
  customerDetail = null,
  onBillToSearch = () => {},
  onCustomerSelect = () => {},
}) {
  const safeParse = (dateStr) => {
    if (!dateStr) return null;
    const parsed = parseISO(dateStr);
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

  const [showSuggestions, setShowSuggestions] = useState(false);

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

  useEffect(() => {
    if (customerDetail?.custName) {
      setFormData((prev) => ({
        ...prev,
        custName: customerDetail.custName,
      }));
    }
  }, [customerDetail]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));

    if (name === 'custName') {
      setShowSuggestions(true);
      onBillToSearch(value);
    }
  };

  const handleDateChange = (date, name) => {
    setFormData((prev) => ({ ...prev, [name]: date }));
  };

  const handleSuggestionClick = (item) => {
    setFormData((prev) => ({ ...prev, custName: item.customerName }));
    setShowSuggestions(false);
    onCustomerSelect(item.id);
  };

  return (
    <div className="invoice-box expanded">
      <div className="invoice-grid">
        {/* Left Section */}
        <div className="left-section input">
          <label>Bill To</label>
          <div className="autocomplete-wrapper" style={{ position: 'relative' }}>
            <input
              name="custName"
              value={formData.custName}
              onChange={handleChange}
              autoComplete="off"
              placeholder="Enter customer name"
              onFocus={() => setShowSuggestions(true)}
              onBlur={() => setTimeout(() => setShowSuggestions(false), 150)}
            />
            {showSuggestions && suggestions?.length > 0 && (
              <ul className="suggestions-list">
                {suggestions.map((item) => (
                  <li key={item.id} onClick={() => handleSuggestionClick(item)}>
                    {item.customerName || 'No Name'}
                  </li>
                ))}
              </ul>
            )}
          </div>

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

        {/* Right Section */}
        <div className="right-section input">
          <label>Invoice #</label>
          <input value={invoice.invoiceNo || ''} readOnly />

          <label>Invoice Date</label>
          <DatePicker
            selected={formData.invDateStr}
            onChange={(date) => handleDateChange(date, 'invDateStr')}
            dateFormat="yyyy-MM-dd"
            className="form-control"
          />

          <label>Issue Date</label>
          <DatePicker
            selected={formData.issueDateStr}
            onChange={(date) => handleDateChange(date, 'issueDateStr')}
            dateFormat="yyyy-MM-dd"
            className="form-control"
          />

          <label>Due Date</label>
          <DatePicker
            selected={formData.dueDateStr}
            onChange={(date) => handleDateChange(date, 'dueDateStr')}
            dateFormat="yyyy-MM-dd"
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

      <div style={{ textAlign: 'end' }}>
        <button className="add-button">Add charge</button>
      </div>

      <br />

      {/* Charges Table */}
      <InvoiceTable
        mode="view"
        chargeItems={invoiceItems}
        currencies={currencies}
      />

      {/* Notes + Totals */}
      <div style={{ display: 'flex', justifyContent: 'space-between' }}>
        <textarea className="notes-text" placeholder="Notes" readOnly />
        <div className="totals-right">
          <p>
            <strong>
              Sub Total ({invoice.currency || '0.00'}): {invoice.subTotal}
            </strong>
          </p>
          <p>
            <strong>
              Grand Total: {invoice.amount} {invoice.currency}
            </strong>
          </p>
        </div>
      </div>

      <div style={{ justifyContent: 'flex-end', display: 'flex' }}>
        <button className="btn-up">Update</button>
      </div>
    </div>
  );
}

export default InvoiceFormView;
