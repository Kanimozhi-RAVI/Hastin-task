import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { vendorUpdateRequest, fetchInactiveVendorsRequest } from '../Action_file/VendorAction';
import { useNavigate } from 'react-router';
import { Tooltip } from 'react-tooltip';
import '../VendorPage/VendorTable.css';

const ROWS_PER_PAGE = 15;

const VendorTable = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { vendors = [], inactiveVendors = [], loading, error } = useSelector(state => state.vendor || {});
  const [searchTerm, setSearchTerm] = useState('');
  const [activeTab, setActiveTab] = useState('ACTIVE');
  const [actionMenu, setActionMenu] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);

  // Fetch vendors based on tab
  useEffect(() => {
    if (activeTab === 'INACTIVE') {
      dispatch(fetchInactiveVendorsRequest());
    } else {
      dispatch(vendorUpdateRequest());
    }
  }, [activeTab, dispatch]);

  const dataToDisplay = activeTab === 'ACTIVE' ? vendors : inactiveVendors;

  const filteredVendors = dataToDisplay.filter(v =>
    v.vendorName?.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const totalPages = Math.ceil(filteredVendors.length / ROWS_PER_PAGE);
  const paginatedVendors = filteredVendors.slice(
    (currentPage - 1) * ROWS_PER_PAGE,
    currentPage * ROWS_PER_PAGE
  );

  const toggleActionMenu = (id) => {
    setActionMenu(prev => (prev === id ? null : id));
  };

  const handleOutsideClick = (e) => {
    if (!e.target.closest('.action-dropdown') && !e.target.closest('.btn-action')) {
      setActionMenu(null);
    }
  };

  useEffect(() => {
    document.addEventListener('click', handleOutsideClick);
    return () => document.removeEventListener('click', handleOutsideClick);
  }, []);

  return (
    <div className="vendor-container">
      <div className="vendor-header">
        <div className="tabs">
          {['ACTIVE', 'INACTIVE'].map(status => (
            <button
              key={status}
              className={`tab ${activeTab === status ? 'active' : ''}`}
              onClick={() => {
                setActiveTab(status);
                setCurrentPage(1);
              }}
            >
              {status}
            </button>
          ))}
        </div>
        <button className="btn-new" onClick={() => navigate('/vendorcreate')}>
          + New Vendor
        </button>
      </div>

      <div className="vendor-toolbar">
        <input
          type="text"
          placeholder="Search..."
          className="search-input"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
      </div>

      <div className="table-scroll">
        {loading ? (
          <div className="status-msg">Loading...</div>
        ) : (
          <table className="vendor-table">
            <thead>
              <tr>
                <th>S.NO</th>
                <th>NAME</th>
                <th>VENDOR CODE</th>
                <th>TYPE</th>
                <th>ADDRESS</th>
                <th>COUNTRY</th>
                <th>STATUS</th>
                <th>ACTION</th>
              </tr>
            </thead>
            <tbody>
              {error ? (
                <tr>
                  <td colSpan="8" className="error-msg">{error}</td>
                </tr>
              ) : filteredVendors.length === 0 ? (
                <tr>
                  <td colSpan="8" className="no-data">No vendors found.</td>
                </tr>
              ) : (
                paginatedVendors.map((vendor, index) => (
                  <tr key={vendor.id}>
                    <td>{(currentPage - 1) * ROWS_PER_PAGE + index + 1}</td>
                    <td>{vendor.vendorName}</td>
                    <td>{vendor.vendorCode}</td>
                    <td>{vendor.vendorType}</td>
                    <td>
                      <span
                        id={`tooltip-${vendor.id}`}
                        data-tooltip-content={vendor.dispAddress}
                        style={{ cursor: 'help' }}
                      >
                        {vendor.dispAddress?.length > 25
                          ? vendor.dispAddress.slice(0, 25) + '...'
                          : vendor.dispAddress}
                      </span>
                      <Tooltip anchorSelect={`#tooltip-${vendor.id}`} place="top" className="custom-tooltip" />
                    </td>
                    <td>{vendor.country || '-'}</td>
                    <td>
                      <span className={`badge badge-${vendor.status?.toLowerCase()}`}>
                        {vendor.status}
                      </span>
                    </td>
                    <td style={{ position: 'relative' }}>
                      <button className="btn-action" onClick={() => toggleActionMenu(vendor.id)}>
                        &#8942;
                      </button>
                      {actionMenu === vendor.id && (
                        <div className="action-dropdown">
                          <div
                            onClick={() => navigate(`/vendoredit/${vendor.id}`)}
                            style={{ backgroundColor: "seagreen", color: "white" }}
                          >
                            Edit
                          </div>
                          <div style={{ backgroundColor: "ActiveCaption", color: "white" }}>
                            {vendor.status === 'ACTIVE' ? 'Mark as Inactive' : 'Mark as Active'}
                          </div>
                        </div>
                      )}
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        )}
      </div>

<div className="pagination">
  <button onClick={() => setCurrentPage(prev => Math.max(prev - 1, 1))} disabled={currentPage === 1}>
    &lt;
  </button>

  {/* First Page */}
  {currentPage > 3 && (
    <>
      <button onClick={() => setCurrentPage(1)}>1</button>
      {currentPage > 4 && <span className="dots">...</span>}
    </>
  )}

  {/* Middle Pages (current ±2) */}
  {[...Array(5)].map((_, i) => {
    const page = currentPage - 2 + i;
    if (page > 0 && page <= totalPages) {
      return (
        <button
          key={page}
          className={page === currentPage ? 'active' : ''}
          onClick={() => setCurrentPage(page)}
        >
          {page}
        </button>
      );
    }
    return null;
  })}

  {currentPage < totalPages - 2 && (
    <>
      {currentPage < totalPages - 3 && <span className="dots">...</span>}
      <button onClick={() => setCurrentPage(totalPages)}>{totalPages}</button>
    </>
  )}

  <button onClick={() => setCurrentPage(prev => Math.min(prev + 1, totalPages))} disabled={currentPage === totalPages}>
    &gt;
  </button>
</div>

    </div>
  );
};

export default VendorTable;
