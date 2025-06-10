import React, { useEffect, useState, useCallback } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams, useNavigate } from 'react-router-dom';
import {
  fetchVendorByIdRequest,
  fetchCountriesRequest,
  fetchCurrenciesRequest,
  fetchCitiesRequest,
} from '../Action_file/VendorAction';
// import { Button } from '@mui/material';

const VendorEdit = () => {
  const { id } = useParams();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [formData, setFormData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const vendor = useSelector((state) => state.vendor.singleVendor || {});
  const countries = useSelector((state) => state.vendor.countries || []);
  const currencies = useSelector((state) => state.vendor.currencies || []);
  const cities = useSelector((state) => state.vendor.cities || []);

  const fetchVendorDetails = useCallback(async () => {
    try {
      setLoading(true);
       dispatch(fetchVendorByIdRequest(id));
       dispatch(fetchCountriesRequest());
       dispatch(fetchCurrenciesRequest());
       dispatch(fetchCitiesRequest());
    } catch (err) {
      setError('Failed to fetch vendor details');
      console.error('Fetch error:', err);
    } finally {
      setLoading(false);
    }
  }, [dispatch, id]);

  useEffect(() => {
    fetchVendorDetails();
  }, [fetchVendorDetails]);

  useEffect(() => {
    if (vendor && Object.keys(vendor).length > 0) {
      setFormData(vendor);
    }
  }, [vendor]);

  const handleChange = (e) => {
    setFormData(prev => ({ 
      ...prev, 
      [e.target.name]: e.target.value 
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Submit Updated Data: ", formData);
    // dispatch(updateVendorRequest(formData));
  };

  if (loading) return <div className="p-8">Loading vendor details...</div>;
  if (error) return <div className="p-8 text-red-500">{error}</div>;
  if (!formData) return <div className="p-8">No vendor data found</div>;

  return (
    <div className="p-8 bg-gray-50 min-h-screen">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-bold text-blue-800">Vendor View & Edit</h2>
        {/* <Button 
          variant="contained" 
          color="primary"
          onClick={() => navigate(-1)}
        >
          Back
        </Button> */}
        </div>

      <form onSubmit={handleSubmit}>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {/* Section 1: Basic Details */}
          <div className="bg-white p-6 shadow rounded-xl border">
            <h3 className="text-blue-700 text-lg font-semibold mb-4">BASIC DETAILS</h3>
            {[
              { label: 'Vendor Name', name: 'vendorName', value: formData.vendorName },
              { label: 'Vendor Code', name: 'vendorCode', value: formData.vendorCode },
              { label: 'Vendor Type', name: 'vendorType', value: formData.vendorType },
              { label: 'Tax Registration No', name: 'taxRegistrationNo', value: formData.taxRegistrationNo },
              { label: 'Company Registration No', name: 'companyRegistrationNo', value: formData.companyRegistrationNo },
            ].map((item, idx) => (
              <div className="mb-3" key={idx}>
                <label className="text-sm font-medium">{item.label}</label>
                <input 
                  name={item.name}
                  className="w-full p-2 border rounded" 
                  value={item.value || ''} 
                  onChange={handleChange}
                />
              </div>
            ))}
            <div className="mb-3">
              <label className="text-sm font-medium">Currency</label>
              <select 
                name="defaultCurrencyId"
                className="w-full p-2 border rounded" 
                value={formData.defaultCurrencyId || ''}
                onChange={handleChange}
              >
                {currencies.map((cur) => (
                  <option key={cur.id} value={cur.id}>
                    {cur.name}
                  </option>
                ))}
              </select>
            </div>
          </div>

          {/* Section 2: Address Details */}
          <div className="bg-white p-6 shadow rounded-xl border">
            <h3 className="text-blue-700 text-lg font-semibold mb-4">ADDRESS DETAILS</h3>
            <div className="mb-3">
              <label className="text-sm font-medium">Address 1</label>
              <input 
                name="address1"
                className="w-full p-2 border rounded" 
                value={formData.address1 || ''} 
                onChange={handleChange}
              />
            </div>
            <div className="mb-3">
              <label className="text-sm font-medium">Address 2</label>
              <input 
                name="address2"
                className="w-full p-2 border rounded" 
                value={formData.address2 || ''} 
                onChange={handleChange}
              />
            </div>
            <div className="mb-3">
              <label className="text-sm font-medium">Country</label>
              <select 
                name="country"
                className="w-full p-2 border rounded" 
                value={formData.country || ''}
                onChange={handleChange}
              >
                {countries.map((c) => (
                  <option key={c.id} value={c.id}>
                    {c.name}
                  </option>
                ))}
              </select>
            </div>
            <div className="mb-3">
              <label className="text-sm font-medium">City</label>
              <select
                name="cityId"
                className="w-full p-2 border rounded"
                value={formData.cityId || ''}
                onChange={handleChange}
              >
                {cities.map(city => (
                  <option key={city.id} value={city.id}>
                    {city.name}
                  </option>
                ))}
              </select>
            </div>
            <div className="mb-3">
              <label className="text-sm font-medium">Zip Code</label>
              <input 
                name="zipCode"
                className="w-full p-2 border rounded" 
                value={formData.zipCode || ''} 
                onChange={handleChange}
              />
            </div>
          </div>

          {/* Section 3: Bank Details */}
          <div className="bg-white p-6 shadow rounded-xl border">
            <h3 className="text-blue-700 text-lg font-semibold mb-4">BANK DETAILS</h3>
            {[
              { label: 'Bank Account Name', name: 'bankAccountName', value: formData.bankAccountName },
              { label: 'Bank Account No', name: 'bankAccountNo', value: formData.bankAccountNo },
              { label: 'Bank Name', name: 'bankName', value: formData.bankName },
              { label: 'Branch', name: 'branch', value: formData.branch },
              { label: 'Swift Code', name: 'swiftCode', value: formData.swiftCode },
            ].map((item, idx) => (
              <div className="mb-3" key={idx}>
                <label className="text-sm font-medium">{item.label}</label>
                <input 
                  name={item.name}
                  className="w-full p-2 border rounded" 
                  value={item.value || ''} 
                  onChange={handleChange}
                />
              </div>
            ))}
          </div>
        </div>

        <div className="mt-6 flex justify-end">
          <button 
            type="submit" 
            className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
          >
            Save Changes
          </button>
        </div>
      </form>
    </div>
  );
};

export default VendorEdit;