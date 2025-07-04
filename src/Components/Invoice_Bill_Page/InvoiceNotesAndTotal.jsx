// 📁 InvoiceNotesAndTotal.js
import React from 'react';

function InvoiceNotesAndTotal({ invoice, mode = 'view' }) {
  return (
    <div style={{ display: 'flex', justifyContent: 'space-between' }}>
      <textarea
        className="notes-text"
        placeholder="Notes"
        readOnly={mode === 'view'}
      />

      <div className="totals-right">
        <p><strong>Sub Total ({invoice.currency || '0.00'}): {invoice.subTotal}</strong></p>
        <p><strong>Grand Total: {invoice.amount} {invoice.currency}</strong></p>
      </div>
    </div>
  );
}

export default InvoiceNotesAndTotal;