import React from 'react';
import ChargeRowEditable from './ChargeRowEditable';
import ChargeRowReadOnly from './ChargeRowReadOnly';

function InvoiceTable({
  mode = 'view',
  chargeItems = [],
  setChargeItems = () => {},
  currencies = [],
  accountHeads = []
}) {
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

  const handleRemoveChargeRow = (index) => {
    const updated = [...chargeItems];
    updated.splice(index, 1);
    setChargeItems(updated);
  };

  const handleChargeChange = (index, field, value) => {
    const updated = [...chargeItems];
    updated[index] = {
      ...updated[index],
      [field]: value
    };
    setChargeItems(updated);
  };

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

  return (
    <table className="invoice-table-ui">
      <thead>
        <tr>
          <th>S.NO</th>
          <th>CHARGE</th>
          <th>ACCOUNT HEAD</th>
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
        {chargeItems.map((item, index) =>
          mode === 'add' ? (
            <ChargeRowEditable
              key={index}
              index={index}
              item={item}
              currencies={currencies}
              accountHeads={accountHeads}
              handleChargeChange={handleChargeChange}
              handleChargeCurrencyChange={handleChargeCurrencyChange}
              handleRemoveChargeRow={handleRemoveChargeRow}
            />
          ) : (
            <ChargeRowReadOnly
              key={index}
              index={index}
              item={item}
              currencies={currencies}
              accountHeads={accountHeads}
            />
          )
        )}

        {mode === 'add' && (
          <tr>
            <td colSpan="11">
              <button className="btn-up" onClick={handleAddChargeRow}>
                ➕ Add Row
              </button>
            </td>
          </tr>
        )}
      </tbody>
    </table>
  );
}

export default InvoiceTable;
