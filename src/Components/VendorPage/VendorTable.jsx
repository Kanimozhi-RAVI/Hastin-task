import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { vendorUpdateRequest } from '../Action_file/VendorAction';
import './VendorTable.css';
import { FaEdit } from "react-icons/fa";
import { useNavigate } from 'react-router'; 

const VendorTable = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate(); 

  const { vendors = [], loading, error } = useSelector(state => state.vendor || {});

  useEffect(() => {
    dispatch(vendorUpdateRequest()); 
  }, [dispatch]);

  return (
    <div className="vendor-container">
      <div className="vendor-header">
        <div className="tabs">
          <button className="tab active">ACTIVE</button>
          <button className="tab">INACTIVE</button>
        </div>
        <button className="btn-new" onClick={() => navigate('/vendorcreate')}>+ New Vendor</button>

      </div>

      <div className="vendor-toolbar">
        <input type="text" placeholder="Search" className="search-input" />
        {/* <button className="btn-export">📥</button> */}
      </div>

      {loading && <p className="status-msg">Loading...</p>}
      {error && <p className="status-msg error-msg">{error}</p>}

      <div className="table-scroll">
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
            {vendors.length > 0 ? (
              vendors.map((vendor, index) => (
                <tr key={vendor.id}>
                  <td>{index + 1}</td>
                  <td>{vendor.vendorName}</td>
                  <td>{vendor.vendorCode}</td>
                  <td>{vendor.vendorType}</td>
                  <td title={vendor.dispAddress}>
                    {vendor.dispAddress?.length > 25
                      ? vendor.dispAddress.slice(0, 25) + '...'
                      : vendor.dispAddress}
                  </td>
                  <td>{vendor.country}</td>
                  <td>
                    <span className="badge badge-active">ACTIVE</span>
                  </td>
                  <td>
                    <button
                      className="btn-edit"
                      title="Edit"
                      onClick={() => navigate(`/vendoredit/${vendor.id}`)} 
                    >
                      <FaEdit />
                    </button>
                  </td>
                </tr>
              ))
            ) : (
              <tr><td colSpan="8" className="no-data">No data found</td></tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default VendorTable;
