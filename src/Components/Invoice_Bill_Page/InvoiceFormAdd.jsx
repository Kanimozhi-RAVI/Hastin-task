// 📁 components/InvoiceBill/InvoiceFormAdd.js
import React, { useState, useEffect } from 'react';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import InvoiceTable from './InvoiceTable';

function InvoiceFormAdd({ currencies, setMode, invoiceData,accountHeads = {} }) {
  const [invoiceDate, setInvoiceDate] = useState(new Date());
  const [issueDate, setIssueDate] = useState(null);
  const [dueDate, setDueDate] = useState(new Date());

  const [referenceNo, setReferenceNo] = useState('');
  const [issuingAgent, setIssuingAgent] = useState('');
//   const [invoiceType, setInvoiceType] = useState('');
//   const [invoiceNo, setInvoiceNo] = useState('');

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
    }
  ]);

  useEffect(() => {
    if (invoiceData) {
      setReferenceNo(invoiceData.transactionRef || '');
      setIssuingAgent(invoiceData.issuingAgent || '');
    //   setInvoiceType(invoiceData.invoiceCategory || '');
    //   setInvoiceNo(invoiceData.invoiceNo || '');

    //   if (invoiceData.currencyId) {
    //     setSelectedCurrencyId(invoiceData.currencyId.toString());
    //     const selected = currencies.find(c => c.id === invoiceData.currencyId);
    //     setConversionRate(selected?.conversionRate || '');
    //   }
    }
  }, [invoiceData, currencies]);

  const handleCurrencyChange = (e) => {
    const id = e.target.value;
    setSelectedCurrencyId(id);
    const selected = currencies.find(c => c.id.toString() === id);
    setConversionRate(selected ? selected.conversionRate : '');
  };

  const handleCancel = () => {
    setMode('view');
  };

  return (
    <div className="invoice-box expanded">
      <div className="invoice-grid">
        <div className="left-section input">
          <label>Bill To</label>
          <input placeholder="Enter Customer" />

          <label>Issuing Agent</label>
          <input
            placeholder="Enter Issuing Agent"
            value={issuingAgent}
            onChange={(e) => (e.target.value)}
          />

          <label>Invoice Type</label>
          <input
            placeholder="Enter Type"
            
          />

          <label>Currency</label>
<select
  value={selectedCurrencyId}
  onChange={handleCurrencyChange}
>
  <option value="">Select</option>
  {currencies.map((c) => (
    <option key={c.id} value={c.id}>
      {c.code}
    </option>
  ))}
</select>

{/* Conversion Rate - auto-fills when currency selected */}
<label>Currency Conv.Rate</label>
<input
  value={conversionRate}
  readOnly
  placeholder="Conversion rate will appear after selecting currency"
/>
</div>

        {/* 📅 RIGHT SIDE */}
        <div className="right-section input">
          <label>Invoice #</label>
          <input
            placeholder="Auto-generated or enter"
            
          />

          <label>Invoice Date</label>
          <DatePicker
            selected={invoiceDate}
            onChange={(date) => setInvoiceDate(date)}
            dateFormat="yyyy-MM-dd"
            className="form-control"
          />

          <label>Issue Date</label>
          <DatePicker
            selected={issueDate}
            onChange={(date) => setIssueDate(date)}
            dateFormat="yyyy-MM-dd"
            className="form-control"
          />

          <label>Due Date</label>
          <DatePicker
            selected={dueDate}
            onChange={(date) => setDueDate(date)}
            dateFormat="yyyy-MM-dd"
            className="form-control"
          />

          <label>Reference No</label>
          <input
            value={referenceNo}
            onChange={(e) => setReferenceNo(e.target.value)}
          />
        </div>
      </div>

      {/* 💵 Charge Items Table */}
    <InvoiceTable
  mode="add"
  chargeItems={chargeItems}
  setChargeItems={setChargeItems}
  currencies={currencies}
  accountHeads={accountHeads}
/>

      {/* ✅ Action Buttons */}
      <div className="action-buttons-ui">
        <button className="btn-save">Save</button>
        <button className="btn-cancel" onClick={handleCancel}>
          Cancel
        </button>
      </div>
    </div>
  );
}

export default InvoiceFormAdd;
