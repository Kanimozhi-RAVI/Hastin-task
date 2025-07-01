import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getInvoiceBillRequest, getInvoicePartydetailsRequest } from '../Action_file/HclBookingAction';
import { useParams, useNavigate } from 'react-router-dom';
import '../Invoice_Bill_Page/InvoiceBill.css';

function InvoiceBill() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { id, invoiceId } = useParams();

  const [activeInvoiceId, setActiveInvoiceId] = useState(invoiceId);

  const invoiceList = useSelector(state => state.bookinginvoice?.invoice?.invoices || []);
  const invoicePartyData = useSelector(state => state.bookinginvoice?.invoiceDetail || {});
  const invoice = invoicePartyData.invoice || {};
  const invoiceItems = invoicePartyData.invoicesComponents || [];

  useEffect(() => {
    if (id) dispatch(getInvoiceBillRequest(id));
  }, [dispatch, id]);

  useEffect(() => {
    if (invoiceId) {
      setActiveInvoiceId(invoiceId);
      dispatch(getInvoicePartydetailsRequest({ id: invoiceId }));
    }
  }, [dispatch, invoiceId]);

  const handleInvoiceClick = (invId) => {
    setActiveInvoiceId(prev => (prev === invId ? null : invId));
    navigate(`/invoice/${id}/${invId}`);
  };

  return (
    <div className="invoice-wrapper">
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

            {/* Only show invoice details if this tab is active */}
            {inv.id === activeInvoiceId && (
              <div className="invoice-box expanded">
                <div className="invoice-grid">
                  <div className="left-section">
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

                  <div className="right-section">
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
                            <button className="icon-btn edit">✎</button>
                            <button className="icon-btn delete">🗑️</button>
                          </td>
                        </tr>
                      ))
                    ) : (
                      <tr><td colSpan="10" className="no-data">No charges found</td></tr>
                    )}
                  </tbody>
                </table>

                <textarea className="notes-text" placeholder="Notes" />

                <div className="totals-right">
                  <p><strong>Sub Total (BZD):</strong> {invoice.subTotal || '0.00'}</p>
                  <p><strong>Grand Total:</strong> {invoice.amount || '0.00'} BZD</p>
                </div>

                <div className="action-buttons-ui">
                  <button className="btn update">Update</button>
                  <button className="btn receipt">Payment Receipt</button>
                  <button className="btn print">Print</button>
                  <button className="btn email">Send Email</button>
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
