import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getInvoiceBillRequest, getInvoicePartydetailsRequest } from '../Action_file/HclBookingAction';
import { useParams, useNavigate } from 'react-router';
import '../Invoice_Bill_Page/InvoiceBill.css';

function InvoiceBill() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { id, invoiceId } = useParams(); // id = bookingId, invoiceId = selected invoice id

  const invoiceList = useSelector(state => state.bookinginvoice?.invoice?.invoices || []);
  const invoiceDetail = invoiceList.find(inv => inv.id === invoiceId) || {};
  // Access party invoice data (from Redux)
// const invoicePartyData = useSelector(state => state.bookinginvoice?.invoiceid || {});
const invoicePartyData = useSelector(state => state.bookinginvoice?.invoiceDetail || {});
const invoiceItems = invoicePartyData?.invoicesComponents || [];
console.log("✅ Invoice Party Data:", invoicePartyData);

  useEffect(() => {
    if (id) {
      dispatch(getInvoiceBillRequest(id));
    }
  }, [dispatch, id]);

  // 👉 Fetch selected invoice party details when invoiceId changes
  useEffect(() => {
    if (invoiceId) {
      dispatch(getInvoicePartydetailsRequest({ id: invoiceId }));
    }
  }, [dispatch, invoiceId]);

  return (
    <div className="invoice-container">
      <h4>INVOICE # {invoiceDetail.invoiceNo || '---'}</h4>

      <div className="invoice-details-grid">
        <div className="left-box">
          <div className="field">
            <label>Bill To</label>
            <input value={invoiceDetail.custName || ''} readOnly />
          </div>
          <div className="field">
            <label>Issuing Agent</label>
            <input value={invoiceDetail.issuingAgent || ''} readOnly />
          </div>
          <div className="field">
            <label>Invoice Type</label>
            <input value={invoiceDetail.invoiceCategory || ''} readOnly />
          </div>
          <div className="field">
            <label>Currency</label>
            <input value={invoiceDetail.currency || ''} readOnly />
          </div>
          <div className="field">
            <label>Currency Conv.Rate</label>
            <input value="2.01" readOnly />
          </div>
        </div>

        <div className="right-box">
          <div className="field">
            <label>Invoice #</label>
            <input value={invoiceDetail.invoiceNo || ''} readOnly />
          </div>
          <div className="field">
            <label>Invoice Date</label>
            <input value={invoiceDetail.invDate || ''} readOnly />
          </div>
          <div className="field">
            <label>Issue Date</label>
            <input value={invoiceDetail.issueDate || 'Required ✖'} readOnly />
          </div>
          <div className="field">
            <label>Due Date</label>
            <input value={invoiceDetail.dueDate || ''} readOnly />
          </div>
          <div className="field">
            <label>Reference No</label>
            <input value="77" readOnly />
          </div>
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
      <tbody>
  {invoiceItems.length > 0 ? (
    invoiceItems.map((item, index) => (
      <tr key={item.id || index}>
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
          <button>✎</button>
          <button>🗑️</button>
        </td>
      </tr>
    ))
  ) : (
    <tr><td colSpan="10" style={{ textAlign: 'center' }}>No charges found</td></tr>
  )}
</tbody>


      </table>

      <div className="notes-actions">
        <textarea className="notes-text" placeholder="Notes" />
        <div className="totals-right">
          <p><strong>Sub Total (BZD):</strong> {invoiceDetail.amount || '0.00'}</p>
          <p><strong>Grand Total:</strong> {invoiceDetail.amount || '0.00'} BZD</p>
        </div>
      </div>

      <div className="action-buttons-ui">
        <button className="btn update">Update</button>
        <button className="btn receipt">Payment Receipt</button>
        <button className="btn print">Print</button>
        <button className="btn email">Send Email</button>
      </div>

      {/* 🔁 Invoice Switcher */}
      <h5 style={{ marginTop: '20px' }}>Other Invoices</h5>
      <div>
        {invoiceList.map(inv => (
          <div key={inv.id}>
            <span
              onClick={() => navigate(`/invoice/${id}/${inv.id}`)}
              style={{ cursor: 'pointer', textDecoration: 'underline', color: 'blue' }}
            >
              {inv.invoiceNo}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
}

export default InvoiceBill;
