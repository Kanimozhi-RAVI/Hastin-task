import React, { useEffect } from 'react';
import './InvoiceBill.css';
import { useDispatch, useSelector } from 'react-redux';
import { getInvoiceBillRequest } from '../Action_file/HclBookingAction';

function InvoiceBill() {
    const dispatch = useDispatch();
    const users = useSelector(state => state.bookinguser || []);

    useEffect(()=>{
        dispatch(getInvoiceBillRequest());
    },[]);

  return (
    <div className="invoice-page">
      <h2>INVOICE ENTRY</h2>

      <div className="invoice-header">
        <div className="left-section">
          <div className="form-group">
            
            <label>Bill To:</label>
            <input type="text" placeholder="Enter customer name" />
          </div>
          <div className="form-group">
            <label>Issuing Agent:</label>
            <input type="text" placeholder="Enter issuing agent" />
          </div>
          <div className="form-group">
            <label>Invoice Type:</label>
            <input type="text" placeholder="e.g., EXPORT" />
          </div>
          <div className="form-group">
            <label>Currency:</label>
            <input type="text" placeholder="e.g., USD" />
          </div>
          <div className="form-group">
            <label>Conv. Rate:</label>
            <input type="number" step="0.01" placeholder="e.g., 2.01" />
          </div>
        </div>

        <div className="right-section">
          <div className="form-group">
            <label>Invoice #:</label>
            <input type="text" placeholder="e.g., INV 24-00723" />
          </div>
          <div className="form-group">
            <label>Invoice Date:</label>
            <input type="date" />
          </div>
          <div className="form-group">
            <label>Issue Date:</label>
            <input type="date" />
          </div>
          <div className="form-group">
            <label>Due Date:</label>
            <input type="date" />
          </div>
          <div className="form-group">
            <label>Reference No:</label>
            <input type="text" placeholder="e.g., 77" />
          </div>
        </div>
      </div>

      <button className="add-charge-btn">Add Charge</button>

      <table className="invoice-table">
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
            <td>BZD</td>
            <td>2.01</td>
            <td>23</td>
            <td>11.44</td>
            <td>263.12</td>
            <td>0.00</td>
            <td>0.00</td>
            <td>
              <button className="edit-btn">✎</button>
              <button className="delete-btn">🗑️</button>
            </td>
          </tr>
        </tbody>
      </table>

      {/* Notes and Totals */}
      <textarea className="notes-box" placeholder="Notes"></textarea>

      <div className="totals">
        <p><strong>Sub Total (BZD):</strong> 263.12</p>
        <p><strong>Grand Total:</strong> 263.12 BZD</p>
      </div>

      {/* Bottom Action Buttons */}
      <div className="action-buttons">
        <button className="update-btn">Update</button>
        <button className="receipt-btn">Payment Receipt</button>
        <button className="print-btn">Print</button>
        <button className="email-btn">Send Email</button>
      </div>
    </div>
  );
}

export default InvoiceBill;
