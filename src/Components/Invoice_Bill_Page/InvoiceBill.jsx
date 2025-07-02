import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {
  getInvoiceBillRequest,
  getInvoicePartydetailsRequest,
} from '../Action_file/HclBookingAction';
import { useParams, useNavigate } from 'react-router-dom';
import '../Invoice_Bill_Page/InvoiceBill.css';
import { fetchCurrenciesRequest } from '../Action_file/VendorAction';

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
  const [tabCurrecyRate, settabCurrecyRate] = useState("")

  useEffect(() => {
    dispatch(fetchCurrenciesRequest())
    if (id){ dispatch(getInvoiceBillRequest(id));}
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
      // navigate(`/invoice/${invId}`);
    }
  };
 
  
  const handleCurrencyChange = (e) => {
    const id = e.target.value;
    setSelectedCurrencyId(id);

    const selected = currencies.find(c => c.id.toString() === id);
    if (selected) {
      setConversionRate(selected.conversionRate);
    } else {
      setConversionRate('');
    }
  };
  const tableCurrencyChange = (e) =>{
    const id = e.target.value;
    setSelectedCurrencyId(id);
    const currselected = currencies.find(c =>c.id.toString() === id);
    if(currselected){
      settabCurrecyRate(currselected.conversionRate);
    
    }else{
      settabCurrecyRate("")
    }
  }

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
        <button onClick={handleAddClick} className='add-button'>Add</button>
      </div>

      {mode === 'add' && (
        <div className="invoice-box expanded">
          <div className="invoice-grid">
            <div className="left-section input ">
              <label>Bill To</label>
              <input placeholder="Enter Customer" />
              <label>Issuing Agent</label>
              <input placeholder="Enter Agent" />
              <label>Invoice Type</label>
              <input placeholder="Enter Type" />
              {/* <label>Currency</label>
              <input placeholder="Enter Currency" /> */}
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
        placeholder="Enter Conversion Rate"
        value={conversionRate}
        readOnly // prevents user from editing manually
      />
            </div>
            <div className="right-section input">
              <label>Invoice #</label>
              <input placeholder="Auto-generated or enter" />
              <label>Invoice Date</label>
              <input type="date" />
              <label>Issue Date</label>
              <input type="date" />
              <label>Due Date</label>
              <input type="date" />
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
            <tbody className='table-edit'>
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
      <div className=''>
        <select value={selectedCurrencyId} onChange={tableCurrencyChange}> 
        <option value="">Select</option>
        {currencies.map((c) => (
          <option key={c.id} value={c.id}>
            {c.code}
          </option>
        ))}
      </select>
      </div>
      </td>
<td>
      <input
        value={conversionRate}
        readOnly
      />
                  </td>
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

          <div style={{display:"flex",justifyContent:"space-between"}}>
            <textarea className="notes-text" placeholder="Notes" />
           {/* <div className="totals-right">
            <p><strong>Sub Total({invoice.currency || '0.00'}) : {invoice.subTotal }  </strong></p>
            <p><strong>Grand Total:  {invoice.amount } {invoice.currency}</strong></p>
          </div> */}
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
                    <label>Invoice Date</label>
                    <input value={invoice.invDateStr || ''} readOnly />
                    <label>Issue Date</label>
                    <input value={invoice.issueDateStr || ''} readOnly />
                    <label>Due Date</label>
                    <input value={invoice.dueDateStr || ''} readOnly />
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
                   <div style={{display:"flex",justifyContent:"space-between"}}>
            <textarea className="notes-text" placeholder="Notes" />
           <div className="totals-right">
            <p><strong>Sub Total({invoice.currency || '0.00'}) : {invoice.subTotal }  </strong></p>
            <p><strong>Grand Total:  {invoice.amount } {invoice.currency}</strong></p>
          </div>
            </div>
          <div style={{justifyContent:"flex-end" ,display:"flex"}}>
            <button className='btn-up'>Update</button>
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
