import React from 'react';
import '../Invoice_Bill_Page/InvoiceBill.css';

function ChargeRowEditable({
  index,
  item,
  currencies,
  accountHeads,
  handleChargeChange,
  handleChargeCurrencyChange,
  handleRemoveChargeRow
}) {
  return (
    <tr>
      <td>{index + 1}</td>

      <td>
        <input
          value={item.chargeName}
          onChange={(e) =>
            handleChargeChange(index, 'chargeName', e.target.value)
          }
        />
      </td>

      {/* 👇 Account Head Dropdown */}
      <td>
        <select
          value={item.accountHeadId || ''}
          onChange={(e) =>
            handleChargeChange(index, 'accountHeadId', e.target.value)
          }
        >
          <option value="">Select</option>
          {Array.isArray(accountHeads) &&
  accountHeads.map((head) => (
    <option key={head.id} value={head.id}>
      {head.name}
    </option>
  ))}
        </select>
      </td>

      <td>
        <select
          value={item.currency}
          onChange={(e) =>
            handleChargeCurrencyChange(index, e.target.value)
          }
        >
          <option value="">Select</option>
          {currencies.map((c) => (
            <option key={c.id} value={c.id}>
              {c.code}
            </option>
          ))}
        </select>
      </td>

      <td>
        <input value={item.usdConversion} readOnly />
      </td>

      <td>
        <input
          value={item.unit}
          onChange={(e) => handleChargeChange(index, 'unit', e.target.value)}
        />
      </td>

      <td>
        <input
          value={item.unitAmount}
          onChange={(e) =>
            handleChargeChange(index, 'unitAmount', e.target.value)
          }
        />
      </td>

      <td>
        <input
          value={item.totalAmount}
          onChange={(e) =>
            handleChargeChange(index, 'totalAmount', e.target.value)
          }
        />
      </td>

      <td>
        <input
          value={item.taxPerStr}
          onChange={(e) =>
            handleChargeChange(index, 'taxPerStr', e.target.value)
          }
        />
      </td>

      <td>
        <input
          value={item.taxAmountStr}
          onChange={(e) =>
            handleChargeChange(index, 'taxAmountStr', e.target.value)
          }
        />
      </td>

      <td>
        <button
          className="icon-btn delete"
          onClick={() => handleRemoveChargeRow(index)}
        >
          🗑️
        </button>
      </td>
    </tr>
  );
}

export default ChargeRowEditable;
