import React, { useEffect, useState } from 'react';
import ChargeRowEditable from './ChargeRowEditable';
import ChargeRowReadOnly from './ChargeRowReadOnly';
import ChargeModal from './ChargeModal';
import { useDispatch, useSelector } from 'react-redux';
import { fetchChargeRequest } from '../Action_file/HclBookingAction';

function InvoiceTable({
  mode = 'view',
  chargeItems = [],
  setChargeItems = () => {},
  currencies = [],
  accountHeads = []
}) {
  const [selectedCharge, setSelectedCharge] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const [loading, setLoading] = useState(false);

  const dispatch = useDispatch();

  const chargeDetails = useSelector((state) => state.bookinginvoice?.chargeNames || []);
  const chargeLoading = useSelector((state) => state.bookinginvoice?.taxMasters || []);

  useEffect(() => {
    if (selectedCharge?.id && chargeDetails.length > 0) {
      const matched = chargeDetails.find((c) => c.id === selectedCharge.id);
      if (matched) {
        setSelectedCharge(matched);
      }
    }
  }, [chargeDetails, selectedCharge?.id]);

  // ➕ Add a new row
  const handleAddChargeRow = () => {
    setChargeItems([
      ...chargeItems,
      {
        chargeName: '',
        accountHeadId: '',
        currency: '',
        usdConversion: '',
        unit: '',
        unitAmount: '',
        totalAmount: '',
        taxPerStr: '',
        taxAmountStr: ''
      }
    ]);
  };

  // 📥 Modal open
  const handleChargeClick = async (chargeItem) => {
    setSelectedCharge(chargeItem);
    setLoading(true);
    dispatch(fetchChargeRequest({ id: chargeItem.id }));
    setShowModal(true);
    setLoading(false);
  };

  // 🗑️ Delete row
  const handleRemoveChargeRow = (index) => {
    const updated = [...chargeItems];
    updated.splice(index, 1);
    setChargeItems(updated);
  };

  // 📝 Change handler with auto-fill
  const handleChargeChange = (index, field, value) => {
    const updated = [...chargeItems];
    updated[index] = {
      ...updated[index],
      [field]: value
    };

    // If charge selected, auto-fill
    if (field === 'chargeName') {
      const selected = chargeDetails.find((c) => c.name === value);
      if (selected) {
        updated[index] = {
          ...updated[index],
          chargeName: selected.name,
          unit: selected.unit || '',
          unitAmount: selected.amount || '',
          totalAmount: selected.amount || '',
          taxPerStr: selected.taxPercentage || '',
          taxAmountStr: selected.taxAmount || ''
        };
      }
    }

    // If tax % updated, auto-calc tax amount
    if (field === 'taxPerStr') {
      const unitAmt = parseFloat(updated[index].unitAmount || 0);
      const taxPer = parseFloat(value || 0);
      const taxAmt = ((unitAmt * taxPer) / 100).toFixed(2);
      updated[index].taxAmountStr = taxAmt;
    }

    setChargeItems(updated);
  };

  // 💱 Currency change handler
  const handleChargeCurrencyChange = (index, currencyId) => {
    const updated = [...chargeItems];
    const found = currencies.find((c) => c.id.toString() === currencyId);
    updated[index] = {
      ...updated[index],
      currency: currencyId,
      usdConversion: found?.conversionRate || ''
    };
    setChargeItems(updated);
  };

  const handleModalSave = (updatedCharge) => {
    const updatedCharges = chargeItems.map((item) =>
      item.id === updatedCharge.id ? updatedCharge : item
    );
    setChargeItems(updatedCharges);
    setShowModal(false);
    setSelectedCharge(null);
  };

  const totalColumns = mode === 'add' ? 12 : 11;

  return (
    <>
      <table className="invoice-table-ui">
        <thead>
          <tr>
            <th>S.NO</th>
            <th>CHARGE</th>
            {mode === 'add' && <th>ACCOUNT HEAD</th>}
            <th>CURRENCY</th>
            <th>CONV.RATE</th>
            <th>UNIT</th>
            <th>AMOUNT</th>
            <th>TOTAL</th>
            <th>TAX %</th>
            <th>TAX</th>
            {mode === 'add' && <th>TAX AMOUNT</th>}
            <th>ACTION</th>
          </tr>
        </thead>
        <tbody>
          {chargeItems.map((item, index) =>
            mode === 'add' ? (
              <ChargeRowEditable
                key={item.id || index}
                index={index}
                item={item}
                currencies={currencies}
                accountHeads={accountHeads}
                chargeNames={chargeDetails}
                taxMasters={chargeLoading}
                handleChargeChange={handleChargeChange}
                handleChargeCurrencyChange={handleChargeCurrencyChange}
                handleRemoveChargeRow={handleRemoveChargeRow}
              />
            ) : (
              <ChargeRowReadOnly
                key={item.id || index}
                index={index}
                item={item}
                currencies={currencies}
                onChargeClick={() => handleChargeClick(item)}
              />
            )
          )}

          {mode === 'add' && (
            <tr>
              <td colSpan={totalColumns}>
                <button className="btn-up" onClick={handleAddChargeRow}>
                  ➕ Add Row
                </button>
              </td>
            </tr>
          )}
        </tbody>
      </table>

      {/* Modal */}
      {showModal && selectedCharge && (
        <ChargeModal
          isOpen={showModal}
          chargeData={selectedCharge}
          char
          currencies={currencies}
          accountHeads={accountHeads}
          loading={loading}
          onClose={() => setShowModal(false)}
          onUpdate={handleModalSave}
        />
      )}
    </>
  );
}

export default InvoiceTable;
