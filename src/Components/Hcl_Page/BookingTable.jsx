import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getBookinglistRequest } from '../Action_file/HclBookingAction';
import { useNavigate } from 'react-router-dom';
import '../Hcl_Page/BookingTable.css';
import { FiSearch } from 'react-icons/fi';

const HclBookingTable = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const bookingData = useSelector(state => state.bookinginvoice?.bookinguser || []);
  console.log(bookingData)

  const [searchTerm, setSearchTerm] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const [sortConfig, setSortConfig] = useState({ key: null, direction: 'asc' });
  const rowsPerPage = 15;

  useEffect(() => {
    dispatch(getBookinglistRequest());
  }, [dispatch]);

  const handleBookingClick = (id) => {
    navigate(`/invo/${id}`);
  };

  const handleSort = (key) => {
    let direction = 'asc';
    if (sortConfig.key === key && sortConfig.direction === 'asc') {
      direction = 'desc';
    }
    setSortConfig({ key, direction });
  };

  const columns = [
    { label: 'BOOKING NO', accessor: 'bookingNo', isLink: true },
    { label: 'REF NO', accessor: 'shipperAgentRefNo' },
    { label: 'BOL', accessor: 'blNo' },
    { label: 'VOLUME', accessor: 'volume' },
    { label: 'SHIPPER', accessor: 'forwarderCode' },
    { label: 'POL', accessor: 'polCode' },
    { label: 'FPOD', accessor: 'fdCode' },
    { label: 'PRE-CARR', accessor: 'preCarriageVsl' },
    { label: 'SOB', accessor: 'preCarriageSob' },
    { label: 'MOV', accessor: 'movCarriageVsl' },
    { label: 'SOB', accessor: 'motherVesselSob' },
    { label: 'ON-CARR', accessor: 'onCarriageVsl' },
    { label: 'SOB', accessor: 'onCarriageSob' },
    { label: 'STATUS', accessor: 'bookingStatus' },
  ];

const filteredData = Array.isArray(bookingData)
  ? bookingData.filter(item =>
      Object.values(item).some(val =>
        typeof val === 'string' && val.toLowerCase().includes(searchTerm.toLowerCase())
      )
    )
  : [];

  const sortedData = [...filteredData].sort((a, b) => {
    if (!sortConfig.key) return 0;

    const aVal = a[sortConfig.key];
    const bVal = b[sortConfig.key];

    if (aVal == null || bVal == null) return 0;

    if (aVal < bVal) return sortConfig.direction === 'asc' ? -1 : 1;
    if (aVal > bVal) return sortConfig.direction === 'asc' ? 1 : -1;
    return 0;
  });

  const totalPages = Math.ceil(sortedData.length / rowsPerPage);
  const paginatedData = sortedData.slice(
    (currentPage - 1) * rowsPerPage,
    currentPage * rowsPerPage
  );

  return (
    <div className="themed-table-wrapper">
      <div className="booking-heading">BOOKING LIST</div>

      <div className="search-container">
        <input
          type="text"
          className="search-input-icon"
          placeholder="Search bookings..."
          value={searchTerm}
          onChange={(e) => {
            setSearchTerm(e.target.value);
            setCurrentPage(1);
          }}
        />
        <FiSearch className="search-icon" />
      </div>

      <div className="table-responsive">
        <table className="booking-table">
          <thead className="theme-header">
            <tr>
              {columns.map(col => (
                <th
                  key={col.accessor}
                  onClick={() => handleSort(col.accessor)}
                  style={{ cursor: 'pointer' }}
                >
                  {col.label}
                  {sortConfig.key === col.accessor && (
                    <span style={{ marginLeft: '6px' }}>
                      {sortConfig.direction === 'asc' ? '↑' : '↓'}
                    </span>
                  )}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {paginatedData.map((row, idx) => (
              <tr key={row.id || idx}>
                {columns.map(col => {
                  const value = row[col.accessor];
                  return (
                    <td key={col.accessor}>
                      {col.isLink ? (
                        <span
                          onClick={() => handleBookingClick(row.id)}
                          style={{
                            color: 'blue',
                            cursor: 'pointer',
                            textDecoration: 'underline',
                          }}
                        >
                          {value}
                        </span>
                      ) : typeof value === 'object' && value !== null ? (
                        value?.name || value?.label || JSON.stringify(value)
                      ) : (
                        value || ''
                      )}
                    </td>
                  );
                })}
              </tr>
            ))}
          </tbody>
        </table>
      </div>

   <div className="pagination">
  <button
    onClick={() => setCurrentPage(prev => Math.max(prev - 1, 1))}
    disabled={currentPage === 1}
  >
    ⟨ Prev
  </button>

  {Array.from({ length: totalPages }, (_, i) => (
    <button
      key={i}
      className={currentPage === i + 1 ? 'active' : ''}
      onClick={() => setCurrentPage(i + 1)}
    >
      {i + 1}
    </button>
  ))}

  <button
    onClick={() => setCurrentPage(prev => Math.min(prev + 1, totalPages))}
    disabled={currentPage === totalPages}
  >
    Next ⟩
  </button>
</div>

    </div>
  );
};

export default HclBookingTable;
