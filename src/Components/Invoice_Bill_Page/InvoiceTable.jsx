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
  accountHeads = [],
  onChargeChange = () => {},
}) {
  const [selectedCharge, setSelectedCharge] = useState(null);
  const [showModal, setShowModal] = useState(false);

  const dispatch = useDispatch();

  const chargeDetails = useSelector((state) => state.bookinginvoice?.chargeNames || []);
  const taxMasters = useSelector((state) => state.bookinginvoice?.taxMasters || []);

  useEffect(() => {
    if (selectedCharge?.id && chargeDetails.length > 0) {
      const matched = chargeDetails.find((c) => c.id === selectedCharge.id);
      if (matched) {
        setSelectedCharge(matched);
      }
    }
  }, [chargeDetails, selectedCharge?.id]);

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
        taxAmountStr: '',
        netAmount: '',
      },
    ]);
  };

  const handleChargeClick = (chargeItem) => {
    setSelectedCharge(chargeItem);
    dispatch(fetchChargeRequest({ id: chargeItem.id }));
    setShowModal(true);
  };

  const handleRemoveChargeRow = (index) => {
    const updated = [...chargeItems];
    updated.splice(index, 1);
    setChargeItems(updated);
  };

  const handleChargeChange = (index, field, value) => {
    const updated = [...chargeItems];
    const item = { ...updated[index], [field]: value };

    // Recalculate if any of the key fields are changed
    if (['unit', 'unitAmount', 'taxPerStr'].includes(field)) {
      const unit = parseFloat(item.unit) || 0;
      const unitAmount = parseFloat(item.unitAmount) || 0;
      const total = unit * unitAmount;
      const taxPer = parseFloat(item.taxPerStr) || 0;
      const taxAmt = (total * taxPer) / 100;
      const net = total + taxAmt;

      item.totalAmount = total.toFixed(2);
      item.taxAmountStr = taxAmt.toFixed(2);
      item.netAmount = net.toFixed(2);
    }

    updated[index] = item;
    setChargeItems(updated);
    onChargeChange(index, field, value);
  };

  const handleChargeCurrencyChange = (index, currencyId) => {
    const updated = [...chargeItems];
    const found = currencies.find((c) => c.id.toString() === currencyId);
    updated[index] = {
      ...updated[index],
      currency: currencyId,
      usdConversion: found?.conversionRate || '',
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
            {mode === 'add' && <th>NET AMOUNT</th>}
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
                taxMasters={taxMasters}
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

      {showModal && selectedCharge && (
        <ChargeModal
          isOpen={showModal}
          chargeData={selectedCharge}
          currencies={currencies}
          accountHeads={accountHeads}
          chargeNames={chargeDetails}
          taxMasters={taxMasters}
          onClose={() => setShowModal(false)}
          onUpdate={handleModalSave}
        />
      )}
    </>
  );
}

export default InvoiceTable;
