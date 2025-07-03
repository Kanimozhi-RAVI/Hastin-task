import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {
  getInvoiceBillRequest,
  getInvoicePartydetailsRequest,
} from '../Action_file/HclBookingAction';
import { useParams, useNavigate } from 'react-router-dom';
import '../Invoice_Bill_Page/InvoiceBill.css';
import { fetchCurrenciesRequest } from '../Action_file/VendorAction';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import { format, parse } from 'date-fns';

function InvoiceBill() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { id, invoiceId } = useParams();

  const [activeInvoiceId, setActiveInvoiceId] = useState(invoiceId || null);
  const [mode, setMode] = useState('view');
  const [chargeItems, setChargeItems] = useState([]);

  const invoiceList = useSelector((state) => state.bookinginvoice?.invoice?.invoices || []);
  const invoicePartyData = useSelector((state) => state.bookinginvoice?.invoiceDetail || {});
  const invoice = invoicePartyData.invoice || {};
  const invoiceItems = invoicePartyData.invoicesComponents || [];
  const currencies = useSelector((state) => state.vendor.currencies || []);

  const [selectedCurrencyId, setSelectedCurrencyId] = useState('');
  const [conversionRate, setConversionRate] = useState('');
  const [invoiceDate, setInvoiceDate] = useState(null);
const [issueDate, setIssueDate] = useState(null);
const [dueDate, setDueDate] = useState(null);

// const parseDate = (dateStr) => {
//   if (!dateStr) return null;
//   const [dd, mm, yyyy] = dateStr.split('/');
//   return new Date(`${yyyy}-${mm}-${dd}`);
// };
  
// useEffect(() => {
//   if (invoice?.invDateStr) setInvoiceDate(parseDate(invoice.invDateStr));
//   if (invoice?.issueDateStr) setIssueDate(parseDate(invoice.issueDateStr));
//   if (invoice?.dueDateStr) setDueDate(parseDate(invoice.dueDateStr));
// }, [invoice]);


const formatToYMD = (dateStr) => {
  if (!dateStr) return '';
  try {
    const parsed = parse(dateStr, 'dd/MM/yyyy', new Date());
    return format(parsed, 'yyyy-MM-dd');
  } catch {
    return dateStr; // fallback
  }
};

  useEffect(() => {
    dispatch(fetchCurrenciesRequest());
    if (id) dispatch(getInvoiceBillRequest(id));
  }, [dispatch, id]);

  useEffect(() => {
    if (invoiceId) {
      setActiveInvoiceId(invoiceId);
      dispatch(getInvoicePartydetailsRequest({ id: invoiceId }));
    }
  }, [dispatch, invoiceId]);

  const handleInvoiceClick = (invId) => {
    if (activeInvoiceId === invId) {
      setActiveInvoiceId(null);
    } else {
      setActiveInvoiceId(invId);
      setMode('view');
      dispatch(getInvoicePartydetailsRequest({ id: invId }));
    }
  };

  const handleCurrencyChange = (e) => {
    const id = e.target.value;
    setSelectedCurrencyId(id);
    const selected = currencies.find(c => c.id.toString() === id);
    setConversionRate(selected ? selected.conversionRate : '');
  };

  const handleChargeCurrencyChange = (rowIdx, currencyId) => {
    const updated = [...chargeItems];
    updated[rowIdx].currency = currencyId;
    const found = currencies.find(c => c.id.toString() === currencyId);
    updated[rowIdx].usdConversion = found ? found.conversionRate : '';
    setChargeItems(updated);
  };

  const handleAddClick = () => {
    setMode('add');
    setActiveInvoiceId(null);
    setChargeItems([
      {
        chargeName: '',
        currency: '',
        usdConversion: '',
        unit: '',
        unitAmount: '',
        totalAmount: '',
        taxPerStr: '',
        taxAmountStr: '',
      },
    ]);
  };

  const handleChargeChange = (index, field, value) => {
    const updated = [...chargeItems];
    updated[index][field] = value;
    setChargeItems(updated);
  };

  const handleAddChargeRow = () => {
    setChargeItems([
      ...chargeItems,
      {
        chargeName: '',
        currency: '',
        usdConversion: '',
        unit: '',
        unitAmount: '',
        totalAmount: '',
        taxPerStr: '',
        taxAmountStr: '',
      },
    ]);
  };

  const handleRemoveChargeRow = (index) => {
    const updated = [...chargeItems];
    updated.splice(index, 1);
    setChargeItems(updated);
  };

  const handleCancelAdd = () => {
    setMode('view');
    setChargeItems([]);
  };

  return (
    <div className="invoice-wrapper">
      <div className="invoice-header-bar">
        <button onClick={handleAddClick} className="add-button">Add</button>
      </div>

      {mode === 'add' && (
        <div className="invoice-box expanded">
          <div className="invoice-grid">
            <div className="left-section input">
              <label>Bill To</label>
              <input placeholder="Enter Customer" />
              <label>Issuing Agent</label>
              <input placeholder="Enter Agent" />
              <label>Invoice Type</label>
              <input placeholder="Enter Type" />

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
              <input value={conversionRate} readOnly placeholder="Enter Conversion Rate" />
            </div>

            <div className="right-section input">
              <label>Invoice #</label>
              <input placeholder="Auto-generated or enter" />
              <label>Invoice Date</label>
<DatePicker
  selected={invoiceDate}
  onChange={(date) => setInvoiceDate(date)}
  dateFormat="yyyy-MM-dd"
  placeholderText="Select Invoice Date"
  className="form-control w-100"
  
/>

<label>Issue Date</label>
<DatePicker
  selected={issueDate}
  onChange={(date) => setIssueDate(date)}
  dateFormat="yyyy-MM-dd"
  placeholderText="Select Issue Date"
  className="form-control"
/>

<label>Due Date</label>
<DatePicker
  selected={dueDate}
  onChange={(date) => setDueDate(date)}
  dateFormat="yyyy-MM-dd"
  placeholderText="Select Due Date"
  className="form-control"
/>

              <label>Reference No</label>
              <input placeholder="Enter Reference" />
            </div>
          </div>

          <table className="invoice-table-ui">
            <thead>
              <tr>
                <th>S.NO</th>
                <th>CHARGE</th>
                <th>CURRENCY</th>
                <th>CONV.RATE</th>
                <th>UNIT</th>
                <th>AMOUNT</th>
                <th>TOTAL</th>
                <th>TAX %</th>
                <th>TAX</th>
                <th>ACTION</th>
              </tr>
            </thead>
            <tbody className="table-edit">
              {chargeItems.map((item, index) => (
                <tr key={index}>
                  <td>{index + 1}</td>
                  <td>
                    <input
                      value={item.chargeName}
                      onChange={(e) => handleChargeChange(index, 'chargeName', e.target.value)}
                    />
                  </td>
                  <td>
                    <select
                      value={item.currency}
                      onChange={(e) => handleChargeCurrencyChange(index, e.target.value)}
                    >
                      <option value="">Select</option>
                      {currencies.map((c) => (
                        <option key={c.id} value={c.id}>{c.code}</option>
                      ))}
                    </select>
                  </td>
                  <td><input value={item.usdConversion} readOnly /></td>
                  <td>
                    <input
                      value={item.unit}
                      onChange={(e) => handleChargeChange(index, 'unit', e.target.value)}
                    />
                  </td>
                  <td>
                    <input
                      value={item.unitAmount}
                      onChange={(e) => handleChargeChange(index, 'unitAmount', e.target.value)}
                    />
                  </td>
                  <td>
                    <input
                      value={item.totalAmount}
                      onChange={(e) => handleChargeChange(index, 'totalAmount', e.target.value)}
                    />
                  </td>
                  <td>
                    <input
                      value={item.taxPerStr}
                      onChange={(e) => handleChargeChange(index, 'taxPerStr', e.target.value)}
                    />
                  </td>
                  <td>
                    <input
                      value={item.taxAmountStr}
                      onChange={(e) => handleChargeChange(index, 'taxAmountStr', e.target.value)}
                    />
                  </td>
                  <td>
                    <button onClick={() => handleRemoveChargeRow(index)}>🗑️</button>
                  </td>
                </tr>
              ))}
              <tr>
                <td colSpan="10">
                  <button onClick={handleAddChargeRow}>➕ Add Row</button>
                </td>
              </tr>
            </tbody>
          </table>

          <div style={{ display: "flex", justifyContent: "space-between" }}>
            <textarea className="notes-text" placeholder="Notes" />
          </div>

          <div className="action-buttons-ui">
            <button className="btn-save">Save</button>
            <button className="btn-cancel" onClick={handleCancelAdd}>Cancel</button>
          </div>
        </div>
      )}

      <div className="invoice-tab-header">
        {invoiceList.map((inv) => (
          <div key={inv.id} className="invoice-section">
            <div
              className={`invoice-tab ${inv.id === activeInvoiceId ? 'active' : ''}`}
              onClick={() => handleInvoiceClick(inv.id)}
            >
              <div className="tab-label">INVOICE #: {inv.invoiceNo}</div>
              <div className="tab-subtext">Customer: {inv.custName}</div>
            </div>

            {inv.id === activeInvoiceId && mode === 'view' && (
              <div className="invoice-box expanded">
                <div className="invoice-grid">
                  <div className="left-section input">
                    <label>Bill To</label>
                    <input value={invoice.custName || ''} readOnly />
                    <label>Issuing Agent</label>
                    <input value={invoice.issuingAgent || ''} readOnly />
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
                    <label>Invoice #</label>
<input className="form-control" value={invoice.invoiceNo || ''} readOnly />

<label>Invoice Date</label>
<input
  className="form-control"
  value={formatToYMD(invoice.invDateStr)}
  readOnly
/>

<label>Issue Date</label>
<input
  className="form-control"
  value={formatToYMD(invoice.issueDateStr)}
  readOnly
/>

<label>Due Date</label>
<input
  className="form-control"
  value={formatToYMD(invoice.dueDateStr)}
  readOnly
/>

                    <label>Reference No</label>
                    <input value={invoice.transactionRef || ''} readOnly />
                  </div>
                </div>

                <div className='invoice-header-bar'>
                  <button className='add-button'>Add charge</button>
                </div>

                <table className="invoice-table-ui">
                  <thead>
                    <tr>
                      <th>S.NO</th>
                      <th>CHARGE</th>
                      <th>CURRENCY</th>
                      <th>CONV.RATE</th>
                      <th>UNIT</th>
                      <th>AMOUNT</th>
                      <th>TOTAL</th>
                      <th>TAX %</th>
                      <th>TAX</th>
                      <th>ACTION</th>
                    </tr>
                  </thead>
                  <tbody>
                    {invoiceItems.length > 0 ? (
                      invoiceItems.map((item, index) => (
                        <tr key={index}>
                          <td>{index + 1}</td>
                          <td>{item.chargeName}</td>
                          <td>{item.currency}</td>
                          <td>{item.usdConversion}</td>
                          <td>{item.unit}</td>
                          <td>{item.unitAmount}</td>
                          <td>{item.totalAmount}</td>
                          <td>{item.taxPerStr}</td>
                          <td>{item.taxAmountStr}</td>
                          <td>
                            <button className="icon-btn edit">✎</button>
                            <button className="icon-btn delete">🗑️</button>
                          </td>
                        </tr>
                      ))
                    ) : (
                      <tr>
                        <td colSpan="10" className="no-data">No charges found</td>
                      </tr>
                    )}
                  </tbody>
                </table>

                <div style={{ display: "flex", justifyContent: "space-between" }}>
                  <textarea className="notes-text" placeholder="Notes" />
                  <div className="totals-right">
                    <p><strong>Sub Total ({invoice.currency || '0.00'}): {invoice.subTotal}</strong></p>
                    <p><strong>Grand Total: {invoice.amount} {invoice.currency}</strong></p>
                  </div>
                </div>

                <div style={{ justifyContent: "flex-end", display: "flex" }}>
                  <button className="btn-up">Update</button>
                </div>
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}

export default InvoiceBill;
