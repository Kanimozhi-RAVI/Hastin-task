import React, { useEffect, useState } from 'react';
import './ChargeModal.css';

function ChargeModal({
  isOpen,
  chargeData = {},
  currencies = [],
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

  const calculateAmounts = (data) => {
    const unit = parseFloat(data.unit) || 0;
    const unitAmount = parseFloat(data.unitAmount) || 0;
    const totalAmount = unit * unitAmount;
    const taxPer = parseFloat(data.taxPerStr) || 0;
    const taxAmount = (totalAmount * taxPer) / 100;
    const netAmount = totalAmount + taxAmount;

    return {
      totalAmount: totalAmount.toFixed(2),
      taxAmountStr: taxAmount.toFixed(2),
      netAmount: netAmount.toFixed(2),
    };
  };

  const handleChange = (field, value) => {
    let updated = { ...formData, [field]: value };

    // Update conversion rate if currency changes
    if (field === 'currencyId') {
      const selected = currencies.find((c) => c.id.toString() === value);
      updated.usdConversion = selected?.conversionRate || '';
    }

    // Recalculate if key values change
    if (['unit', 'unitAmount', 'taxPerStr'].includes(field)) {
      const { totalAmount, taxAmountStr, netAmount } = calculateAmounts(updated);
      updated.totalAmount = totalAmount;
      updated.taxAmountStr = taxAmountStr;
      updated.netAmount = netAmount;
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
              type="number"
              value={formData.unit || ''}
              onChange={(e) => handleChange('unit', e.target.value)}
            />
          </div>

          {/* Unit Amount */}
          <div className="modal-field">
            <label>Unit Amount</label>
            <input
              type="number"
              value={formData.unitAmount || ''}
              onChange={(e) => handleChange('unitAmount', e.target.value)}
            />
          </div>

          {/* Total Amount */}
          <div className="modal-field">
            <label>Total Amount</label>
            <input value={formData.totalAmount || ''} readOnly />
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
                <option key={t.id} value={t.taxPercentage}>
                  {t.name} - {t.taxPercentage}%
                </option>
              ))}
            </select>
          </div>

          {/* Tax Amount */}
          <div className="modal-field">
            <label>Tax Amount</label>
            <input value={formData.taxAmountStr || ''} readOnly />
          </div>

          {/* Net Amount */}
          <div className="modal-field">
            <label>Net Amount</label>
            <input value={formData.netAmount || ''} readOnly />
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
