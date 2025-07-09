import React, { useEffect, useState } from 'react';
import './ChargeModal.css';
import { useSelector } from 'react-redux';

function ChargeModal({
  isOpen,
  chargeData = {},
  currencies = [],
  accountHeads = [],
  loading = false,
  onClose,
  onUpdate
}) {
  const [formData, setFormData] = useState({});

  // Get dropdowns from Redux state
  const dropdownState = useSelector((state) => state.dropdown) || {};
  const { chargeNames = [], taxMasters = [] } = dropdownState;

  useEffect(() => {
    if (chargeData && isOpen) {
      setFormData(chargeData);
    }
  }, [chargeData, isOpen]);

  const handleChange = (field, value) => {
    let updatedData = {
      ...formData,
      [field]: value
    };

    // Handle USD Conversion automatically when currency changes
    if (field === 'currencyId') {
      const found = currencies.find((c) => c.id.toString() === value);
      updatedData.usdConversion = found?.conversionRate || '';
    }

    setFormData(updatedData);
  };

  const handleSave = () => {
    if (onUpdate) onUpdate(formData);
  };

  if (!isOpen) return null;

  return (
    <div className="modal-backdrop">
      <div className="charge-modal">
        <div className="modal-header">
          <h3>CHARGE</h3>
          <button onClick={() => onClose(false)}>✖</button>
        </div>

        {loading ? (
          <div className="modal-loading">Loading...</div>
        ) : (
          <div className="modal-body">
            {/* CHARGE NAME */}
            <div className="modal-field">
              <label>Charge Name</label>
              <select
                name="chargeName"
                value={formData.chargeName || ''}
                onChange={(e) => handleChange('chargeName', e.target.value)}
              >
                <option value="">Select Charge</option>
                {chargeNames.map((charge) => (
                  <option key={charge.id} value={charge.name}>
                    {charge.name}
                  </option>
                ))}
              </select>
            </div>

            {/* ACCOUNT HEAD */}
            <div className="modal-field">
              <label>Account Head</label>
              <select
                name="accountHeadId"
                value={formData.accountHeadId || ''}
                onChange={(e) => handleChange('accountHeadId', e.target.value)}
              >
                <option value="">Select</option>
                {accountHeads.map((head) => (
                  <option key={head.id} value={head.id}>
                    {head.name}
                  </option>
                ))}
              </select>
            </div>

            {/* CURRENCY */}
            <div className="modal-field">
              <label>Currency</label>
              <select
                name="currencyId"
                value={formData.currencyId || ''}
                onChange={(e) => handleChange('currencyId', e.target.value)}
              >
                <option value="">-- Select --</option>
                {currencies.map((c) => (
                  <option key={c.id} value={c.id}>
                    {c.code}
                  </option>
                ))}
              </select>
            </div>

            {/* CONVERSION RATE */}
            <div className="modal-field">
              <label>Conv. Rate</label>
              <input
                value={formData.usdConversion || ''}
                readOnly
              />
            </div>

            {/* UNIT */}
            <div className="modal-field">
              <label>Unit</label>
              <input
                value={formData.unit || ''}
                onChange={(e) => handleChange('unit', e.target.value)}
              />
            </div>

            {/* AMOUNT */}
            <div className="modal-field">
              <label>Amount</label>
              <input
                value={formData.unitAmount || ''}
                onChange={(e) => handleChange('unitAmount', e.target.value)}
              />
            </div>

            {/* TOTAL AMOUNT */}
            <div className="modal-field">
              <label>Total Amount</label>
              <input
                value={formData.totalAmount || ''}
                onChange={(e) => handleChange('totalAmount', e.target.value)}
              />
            </div>

            {/* TAX % */}
            <div className="modal-field">
              <label>Tax %</label>
              <select
                name="taxPerStr"
                value={formData.taxPerStr || ''}
                onChange={(e) => handleChange('taxPerStr', e.target.value)}
              >
                <option value="">Select Tax</option>
                {taxMasters.map((tax) => (
                  <option key={tax.id} value={tax.percentage}>
                    {tax.name} - {tax.percentage}%
                  </option>
                ))}
              </select>
            </div>

            {/* TAX AMOUNT */}
            <div className="modal-field">
              <label>Tax Amount</label>
              <input
                value={formData.taxAmountStr || ''}
                onChange={(e) => handleChange('taxAmountStr', e.target.value)}
              />
            </div>

            {/* NOTES */}
            <div className="modal-field">
              <label>Notes</label>
              <textarea
                value={formData.notes || ''}
                onChange={(e) => handleChange('notes', e.target.value)}
              />
            </div>
          </div>
        )}

        <div className="modal-footer">
          <button onClick={() => onClose(false)}>Cancel</button>
          <button onClick={handleSave} disabled={loading}>
            Save
          </button>
        </div>
      </div>
    </div>
  );
}

export default ChargeModal;
