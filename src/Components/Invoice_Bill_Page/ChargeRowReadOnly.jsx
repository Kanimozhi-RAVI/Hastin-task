import React from 'react';

function ChargeRowReadOnly({ index, item }) {
  return (
    <tr>
      <td>{index + 1}</td>
      <td>{item.chargeName}</td>
      <td>{item.currency}</td>
      <td>{item.usdConversion}</td>
      <td>{item.unit}</td>
      <td>{item.unitAmount}</td>
      <td>{item.totalAmount}</td>
      <td>{item.taxPerStr}</td>
      <td>{item.taxAmountStr}</td>
      <td>
        <button className="icon-btn edit">✎</button>
        <button className="icon-btn delete">🗑️</button>
      </td>
    </tr>
  );
}

export default ChargeRowReadOnly;