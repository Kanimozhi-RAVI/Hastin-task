import React, { useEffect, useState } from 'react';
import './BookingTable.css'; // Make sure this file exists

function BookingTable() {
  const [formData, setFormData] = useState([]);

  useEffect(() => {
    // simulate fetch
  }, []);

  return (
    <div className="container mt-5">
      <h3 className="booking-heading mb-4">Booking List</h3>
      <div className="table-responsive">
        <table className="table table-bordered table-striped align-middle shadow booking-table">
          <thead className="theme-header">
            <tr>
              <th>BOOKING NO</th>
              <th>REF NO</th>
              <th>BOL</th>
              <th>VOLUME</th>
              <th>SHIPPER</th>
              <th>POL</th>
              <th>FPOD</th>
              <th>PRE-CARR</th>
              <th>SOB</th>
              <th>MOV</th>
              <th>SOB</th>
              <th>ON-CARR</th>
              <th>SOB</th>
              <th>STATUS</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>BK12345</td>
              <td>REF001</td>
              <td>BOL001</td>
              <td>20T</td>
              <td>Shipper A</td>
              <td>Chennai</td>
              <td>New York</td>
              <td>Carrier X</td>
              <td>12-Jun</td>
              <td>Air</td>
              <td>12-Jun</td>
              <td>Carrier Y</td>
              <td>13-Jun</td>
              <td><span className="badge-active">Active</span></td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default BookingTable;
