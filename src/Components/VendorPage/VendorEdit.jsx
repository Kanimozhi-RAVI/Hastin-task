import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams, useNavigate } from 'react-router';
import {
  fetchVendorByIdRequest,
  fetchCountriesRequest,
  fetchCurrenciesRequest,
  fetchCitiesRequest,
  updateVendorByIdRequest,
  createVendorRequest,
  // putcontactRequest,
} from '../Action_file/VendorAction';
import VendorContacts from './VendorContacts';

import './VendorEdit.css';

const VendorEdit = () => {
  
  const { id } = useParams();
  const isEdit = Boolean(id);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [form, setForm] = useState({});
  const [contacts, setContacts] = useState([]);

  const vendor = useSelector(state => state.vendor.singleVendor || {});
  const countries = useSelector(state => state.vendor.countries || []);
  const currencies = useSelector(state => state.vendor.currencies || []);
  const cities = useSelector(state => state.vendor.cities || []);

  useEffect(() => {
    dispatch(fetchCountriesRequest());
    dispatch(fetchCurrenciesRequest());
    dispatch(fetchCitiesRequest());
    if (isEdit) {
      dispatch(fetchVendorByIdRequest(id));
    }else{
      alert("Some details missing")
    }
  }, [dispatch, id, isEdit]);

  useEffect(() => {
    if (isEdit && vendor && vendor.id && form.id !== vendor.id) {
      setForm(vendor);
      setContacts(JSON.parse(JSON.stringify(vendor.contactList || [])));
    }
  }, [vendor, isEdit,]);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
  e.preventDefault();

  const defaultCount = contacts.filter(c => c.isDefault === 'YES' || c.isDefault === true).length;
  if (defaultCount !== 1) {
    alert("One contact must be default.");
    return;
  }

  const payload = {
    id,
    ...form,
    contactList: contacts.map(c => ({
      ...c,
      isDefault: c.isDefault === 'YES' || c.isDefault === true,
    })),
  };

  if (isEdit) {
    console.log("Sending payload:", payload);
    dispatch(updateVendorByIdRequest(payload)); 
  } else {
    dispatch(createVendorRequest(payload));
  }
};


  return (
    <div className="vendor-edit-container">
      <h2>{isEdit ? "Edit Vendor" : "Create Vendor"}</h2>

      <form onSubmit={handleSubmit}>
        <div className="form-sections" style={{ justifyItems: "center" }}>
          <div className="form-card">
            <h3>Basic Info</h3>
            <label>
              Vendor Name
              <input name="vendorName" value={form.vendorName || ''} onChange={handleChange} />
            </label>
            <label>
              Vendor Code
              <input name="vendorCode" value={form.vendorCode || ''} onChange={handleChange} />
            </label>
            <label>
              Vendor Type
              <select name="vendorType" value={form.vendorType || ''} onChange={handleChange}>
                <option value="">Select Vendor Type</option>
                <option value="Individual">Individual</option>
                <option value="Company">Company</option>
              </select>
            </label>
            <label>
              Tax Registration Number
              <input name="taxRegNo" value={form.taxRegNo || ''} onChange={handleChange} />
            </label>
            <label>
              Company Registration Number
              <input name="companyRegNo" value={form.companyRegNo || ''} onChange={handleChange} />
            </label>

            <label>
              Default Currency
              <select
                name="defaultCurrencyId"
                value={form.defaultCurrencyId || ''}
                onChange={(e) => {
                  const selectedId = e.target.value;
                  setForm((prev) => ({
                    ...prev,
                    defaultCurrencyId: selectedId,
                    companyRegNo: selectedId, 
                  }));
                }}
              >
                <option value="">Select Currency</option>
                {currencies.map(c => (
                  <option key={c.id} value={c.id}>
                    {c.name}
                  </option>
                ))}
              </select>
            </label>
          </div>

          <div className="form-card">
            <h3>Address</h3>
            <label>
              Address Line 1
              <input name="address1" value={form.address1 || ''} onChange={handleChange} />
            </label>
            <label>
              Address Line 2
              <input name="address2" value={form.address2 || ''} onChange={handleChange} />
            </label>
            <label>
              Postal Code
              <input name="postalCode" value={form.postalCode || ''} onChange={handleChange} />
            </label>
            <label>
              Country
              <select name="country" value={form.country || ''} onChange={handleChange}>
                <option value="">Select Country</option>
                {countries.map(c => (
                  <option key={c.id} value={c.id}>{c.name}</option>
                ))}
              </select>
            </label>
            <label>
              City
              <select name="cityId" value={form.cityId || ''} onChange={handleChange}>
                <option value="">Select City</option>
                {cities.map(c => (
                  <option key={c.id} value={c.id}>{c.name}</option>
                ))}
              </select>
            </label>
          </div>

          <div className="form-card">
            <h3>Bank Info</h3>
            <label>
              Bank Account Name
              <input name="bankAcctName" value={form.bankAcctName || ''} onChange={handleChange} />
            </label>
            <label>
              Bank Account Number
              <input name="bankAccountNum" value={form.bankAccountNum || ''} onChange={handleChange} />
            </label>
            <label>
              Bank Name
              <input name="bankName" value={form.bankName || ''} onChange={handleChange} />
            </label>
            <label>
              Branch
              <input name="bankBranchName" value={form.bankBranchName || ''} onChange={handleChange} />
            </label>
            <label>
              SWIFT Code
              <input name="bankSwiftCode" value={form.bankSwiftCode || ''} onChange={handleChange} />
            </label>
          </div>
        </div>

        <div>
          <h3>Contact Info</h3>
          <VendorContacts
          contacts={contacts}
          setContacts={setContacts}
          ve={id} 
          />

        </div>

        <div className="form-actions">
          <button type="submit">{isEdit ? "Update" : "Save"}</button>
        </div>
      </form>
    </div>
  );
};

export default VendorEdit;
