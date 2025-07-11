import React, { useState, useEffect } from 'react';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import InvoiceTable from './InvoiceTable';

function InvoiceFormAdd({
  currencies = [],
  setMode,
  invoiceData,
  accountHeads = [],
  bookinguser = {},
  suggestions = [],
  customerDetail = null,
  onBillToSearch = () => {},
  onCustomerSelect = () => {},
}) {
  const [invoiceDate, setInvoiceDate] = useState(new Date());
  const [issueDate, setIssueDate] = useState(null);
  const [dueDate, setDueDate] = useState(new Date());

  const [custName, setCustName] = useState('');
  const [showSuggestions, setShowSuggestions] = useState(false);

  const [referenceNo, setReferenceNo] = useState('');
  const [issuingAgent, setIssuingAgent] = useState('');
  const [selectedCurrencyId, setSelectedCurrencyId] = useState('');
  const [conversionRate, setConversionRate] = useState('');

  const [chargeItems, setChargeItems] = useState([
    {
      chargeName: '',
      currency: '',
      usdConversion: '',
      unit: '',
      unitAmount: '',
      totalAmount: '',
      taxPerStr: '',
      taxAmountStr: '',
      netAmount: '',
    }
  ]);

  // Prefill if editing
  useEffect(() => {
    if (invoiceData) {
      setReferenceNo(invoiceData.transactionRef || '');
      setIssuingAgent(invoiceData.issuingAgent || '');
    }
  }, [invoiceData]);

  // Prefill customer on selection
  useEffect(() => {
    if (customerDetail?.customerName) {
      setCustName(customerDetail.customerName);
    }
  }, [customerDetail]);

  const handleCurrencyChange = (e) => {
    const id = e.target.value;
    setSelectedCurrencyId(id);
    const selected = currencies.find((c) => c.id.toString() === id);
    setConversionRate(selected?.conversionRate || '');
  };

  const handleBillToChange = (e) => {
    const value = e.target.value;
    setCustName(value);
    setShowSuggestions(true);
    onBillToSearch(value);
  };

  const handleSuggestionClick = (item) => {
    setCustName(item.customerName);
    setShowSuggestions(false);
    onCustomerSelect(item.id);
  };

  const handleCancel = () => {
    setMode('view');
  };

  const handleChargeChange = (index, field, value) => {
    const updated = [...chargeItems];
    const item = { ...updated[index], [field]: value };

    const unit = parseFloat(item.unit) || 0;
    const unitAmount = parseFloat(item.unitAmount) || 0;
    const total = unit * unitAmount;

    const taxPer = parseFloat(item.taxPerStr) || 0;
    const taxAmt = (total * taxPer) / 100;
    const net = total + taxAmt;

    item.totalAmount = total.toFixed(2);
    item.taxAmountStr = taxAmt.toFixed(2);
    item.netAmount = net.toFixed(2);

    updated[index] = item;
    setChargeItems(updated);
  };

  const subTotal = chargeItems.reduce((acc, item) => acc + parseFloat(item.totalAmount || 0), 0);
  const totalTax = chargeItems.reduce((acc, item) => acc + parseFloat(item.taxAmountStr || 0), 0);
  const grandTotal = subTotal + totalTax;
  const currencyCode = currencies.find(c => c.id.toString() === selectedCurrencyId)?.code || '';

  return (
    <div className="invoice-box expanded">
      <div className="invoice-grid">
        <div className="left-section input">
          {/* BILL TO */}
          <label>Bill To</label>
          <div className="autocomplete-wrapper" style={{ position: 'relative' }}>
            <input
              value={custName}
              onChange={handleBillToChange}
              placeholder="Enter customer"
              autoComplete="off"
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

          {/* AGENT */}
          <label>Issuing Agent</label>
          <select
            value={issuingAgent}
            onChange={(e) => setIssuingAgent(e.target.value)}
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
          <input placeholder="Enter Type" />

          {/* Currency */}
          <label>Currency</label>
          <select value={selectedCurrencyId} onChange={handleCurrencyChange}>
            <option value="">Select</option>
            {currencies.map((c) => (
              <option key={c.id} value={c.id}>
                {c.code}
              </option>
            ))}
          </select>

          <label>Currency Conv.Rate</label>
          <input
            value={conversionRate}
            readOnly
            placeholder="Auto-filled"
          />
        </div>

        {/* Right Panel */}
        <div className="right-section input">
          <label>Invoice #</label>
          <input placeholder="Auto-generated or enter" />

          <label>Invoice Date</label>
          <DatePicker
            selected={invoiceDate}
            onChange={setInvoiceDate}
            dateFormat="yyyy-MM-dd"
            className="form-control"
            showMonthDropdown
            showYearDropdown
            dropdownMode="select"
          />

          <label>Issue Date</label>
          <DatePicker
            selected={issueDate}
            onChange={setIssueDate}
            dateFormat="yyyy-MM-dd"
            className="form-control"
            showMonthDropdown
            showYearDropdown
            dropdownMode="select"
          />

          <label>Due Date</label>
          <DatePicker
            selected={dueDate}
            onChange={setDueDate}
            dateFormat="yyyy-MM-dd"
            className="form-control"
            showMonthDropdown
            showYearDropdown
            dropdownMode="select"
          />

          <label>Reference No</label>
          <input
            value={referenceNo}
            onChange={(e) => setReferenceNo(e.target.value)}
          />
        </div>
      </div>

      {/* CHARGES TABLE */}
      <InvoiceTable
        mode="add"
        chargeItems={chargeItems}
        setChargeItems={setChargeItems}
        currencies={currencies}
        accountHeads={accountHeads}
        onChargeChange={handleChargeChange}
      />

      {/* TOTALS */}
      <div style={{ display: 'flex', justifyContent: 'space-between', marginTop: '1rem' }}>
        <textarea className="notes-text" placeholder="Notes" />
        <div className="totals-right">
          <p><strong>Sub Total ({currencyCode}):</strong> ₹ {subTotal.toFixed(2)}</p>
          <p><strong>Tax Total:</strong> ₹ {totalTax.toFixed(2)}</p>
          <p><strong>Grand Total:</strong> ₹ {grandTotal.toFixed(2)} {currencyCode}</p>
        </div>
      </div>

      {/* ACTION BUTTONS */}
      <div className="action-buttons-ui" style={{ justifyContent: 'flex-end' }}>
        <button className="btn-save">Save</button>
        <button className="btn-cancel" onClick={handleCancel}>Cancel</button>
      </div>
    </div>
  );
}

export default InvoiceFormAdd;
