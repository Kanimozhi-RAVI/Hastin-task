import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {
  getInvoiceBillRequest,
  getInvoicePartydetailsRequest,
} from '../Action_file/HclBookingAction';
import { useNavigate, useParams } from 'react-router';
import '../Invoice_Bill_Page/InvoiceBill.css'

function InvoiceBill() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { id } = useParams();

  const invoice = useSelector(state => state.bookinginvoice?.invoice || {});

  useEffect(() => {
    dispatch(getInvoiceBillRequest(id));
    dispatch(getInvoicePartydetailsRequest());
  }, [dispatch, id]);

  return (
    <div className="invoice-container">
      <h4>INVOICE # {invoice.invoiceNo || '---'}</h4>

      <div className="invoice-details-grid">
        <div className="left-box">
          <div className="field">
            <label>Bill To</label>
            <div>{invoice.custName || '-'}</div>
          </div>
          <div className="field">
            <label>Issuing Agent</label>
            <div>{invoice.issuingAgent || '-'}</div>
          </div>
          <div className="field">
            <label>Invoice Type</label>
            <div>{invoice.invoiceCategory || '-'}</div>
          </div>
          <div className="field">
            <label>Currency</label>
            <div>{invoice.currency || '-'}</div>
          </div>
          <div className="field">
            <label>Currency Conv.Rate</label>
            <div>2.01</div>
          </div>
        </div>

        <div className="right-box">
          <div className="field">
            <label>Invoice #</label>
            <div>{invoice.invoiceNo || '-'}</div>
          </div>
          <div className="field">
            <label>Invoice Date</label>
            <div>{invoice.invDate || '-'}</div>
          </div>
          <div className="field">
            <label>Issue Date</label>
            <div className="required">Required ✖</div>
          </div>
          <div className="field">
            <label>Due Date</label>
            <div>{invoice.dueDate || '-'}</div>
          </div>
          <div className="field">
            <label>Reference No</label>
            <div>77</div>
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
          <tr>
            <td>1</td>
            <td className="link">PORT SECURITY</td>
            <td>{invoice.currency || ''}</td>
            <td>2.01</td>
            <td>23</td>
            <td>11.44</td>
            <td>{invoice.amount}</td>
            <td>0.00</td>
            <td>0.00</td>
            <td>
              <button className="edit-btn">✎</button>
              <button className="delete-btn">🗑️</button>
            </td>
          </tr>
        </tbody>
      </table>

      <div className="notes-actions">
        <textarea className="notes-text" placeholder="Notes" />
        <div className="totals-right">
          <p><strong>Sub Total (BZD):</strong> 263.12</p>
          <p><strong>Grand Total:</strong> 263.12 BZD</p>
        </div>
      </div>

      <div className="action-buttons-ui">
        <button className="btn update">Update</button>
        <button className="btn receipt">Payment Receipt</button>
        <button className="btn print">Print</button>
        <button className="btn email">Send Email</button>
      </div>
    </div>
  );
}

export default InvoiceBill;
