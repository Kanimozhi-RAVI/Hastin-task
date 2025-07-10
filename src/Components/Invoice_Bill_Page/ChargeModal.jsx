import React, { useEffect, useState } from 'react';
import './ChargeModal.css';

function ChargeModal({
  isOpen,
  chargeData = {},
  currencies = [],
  // accountHeads = [],
  chargeNames = [],
  taxMasters = [],
  onClose,
  onUpdate,
}) {
  const [formData, setFormData] = useState({});

  useEffect(() => {
    if (isOpen && chargeData) {
      setFormData(chargeData);
    }
  }, [isOpen, chargeData]);

  const handleChange = (field, value) => {
    const updated = {
      ...formData,
      [field]: value,
    };

    // Currency change → update conversion
    if (field === 'currencyId') {
      const selected = currencies.find((c) => c.id.toString() === value);
      updated.usdConversion = selected?.conversionRate || '';
    }

    // Tax % change → recalculate tax amount
    if (field === 'taxPerStr') {
      const unitAmt = parseFloat(updated.unitAmount || 0);
      const taxPer = parseFloat(value || 0);
      const taxAmt = ((unitAmt * taxPer) / 100).toFixed(2);
      updated.taxAmountStr = taxAmt;
    }

    setFormData(updated);
  };

  const handleSave = () => {
    if (onUpdate) onUpdate(formData);
  };

  if (!isOpen) return null;

  return (
    <div className="modal-backdrop">
      <div className="charge-modal">
        <div className="modal-header">
          <h3>Edit Charge</h3>
          <button onClick={() => onClose(false)}>✖</button>
        </div>

        <div className="modal-body">
          {/* Charge Name */}
          <div className="modal-field">
            <label>Charge Name</label>
            <select
              value={formData.chargeName || ''}
              onChange={(e) => handleChange('chargeName', e.target.value)}
            >
              <option value="">Select Charge</option>
              {chargeNames.map((c) => (
                <option key={c.id} value={c.name}>{c.name}</option>
              ))}
            </select>
          </div>

          {/* Account Head */}
          {/* <div className="modal-field">
            <label>Account Head</label>
            <select
              value={formData.accountHeadId || ''}
              onChange={(e) => handleChange('accountHeadId', e.target.value)}
            >
              <option value="">Select Account Head</option>
              {accountHeads.map((a) => (
                <option key={a.id} value={a.id}>{a.name}</option>
              ))}
            </select>
          </div> */}

          {/* Currency */}
          <div className="modal-field">
            <label>Currency</label>
            <select
              value={formData.currencyId || ''}
              onChange={(e) => handleChange('currencyId', e.target.value)}
            >
              <option value="">Select Currency</option>
              {currencies.map((c) => (
                <option key={c.id} value={c.id}>{c.code}</option>
              ))}
            </select>
          </div>

          {/* Conversion Rate */}
          <div className="modal-field">
            <label>Conv. Rate</label>
            <input value={formData.usdConversion || ''} readOnly />
          </div>

          {/* Unit */}
          <div className="modal-field">
            <label>Unit</label>
            <input
              value={formData.unit || ''}
              onChange={(e) => handleChange('unit', e.target.value)}
            />
          </div>

          {/* Unit Amount */}
          <div className="modal-field">
            <label>Amount</label>
            <input
              value={formData.unitAmount || ''}
              onChange={(e) => handleChange('unitAmount', e.target.value)}
            />
          </div>

          {/* Total Amount */}
          <div className="modal-field">
            <label>Total Amount</label>
            <input
              value={formData.totalAmount || ''}
              onChange={(e) => handleChange('totalAmount', e.target.value)}
            />
          </div>

          {/* Tax % */}
          <div className="modal-field">
            <label>Tax %</label>
            <select
              value={formData.taxPerStr || ''}
              onChange={(e) => handleChange('taxPerStr', e.target.value)}
            >
              <option value="">Select Tax</option>
              {taxMasters.map((t) => (
                <option key={t.id} value={t.percentage}>
                  {t.name} - {t.percentage}%
                </option>
              ))}
            </select>
          </div>

          {/* Tax Amount */}
          <div className="modal-field">
            <label>Tax Amount</label>
            <input
              value={formData.taxAmountStr || ''}
              onChange={(e) => handleChange('taxAmountStr', e.target.value)}
            />
          </div>

          {/* Notes */}
          <div className="modal-field">
            <label>Notes</label>
            <textarea
              value={formData.notes || ''}
              onChange={(e) => handleChange('notes', e.target.value)}
            />
          </div>
        </div>

        <div className="modal-footer">
          <button onClick={() => onClose(false)}>Cancel</button>
          <button onClick={handleSave}>Save</button>
        </div>
      </div>
    </div>
  );
}

export default ChargeModal;
