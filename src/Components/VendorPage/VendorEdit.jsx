import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams, useNavigate } from 'react-router-dom';
import { Formik, Form, Field, ErrorMessage, FieldArray } from 'formik';
import * as Yup from 'yup';
import { toast } from 'react-toastify';

import {
  fetchVendorByIdRequest,
  fetchCountriesRequest,
  fetchCurrenciesRequest,
  fetchCitiesRequest,
  updateVendorByIdRequest,
  createVendorRequest,
} from '../Action_file/VendorAction';

import './VendorEdit.css';
import Loader from '../Loader_File/Loader';

const VendorEdit = () => {
  const { id } = useParams();
  const isEdit = Boolean(id);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [contactList, setContactList] = useState([
    { name: '', email: '', mobileNo: '', isDefault: '' },
  ]);
  const [isLoading, setIsLoading] = useState(true);

  const vendor = useSelector(state => state.vendor.singleVendor || {});
  const countries = useSelector(state => state.vendor.countries || []);
  const currencies = useSelector(state => state.vendor.currencies || []);
  const cities = useSelector(state => state.vendor.cities || []);

  useEffect(() => {
    setTimeout(() => setIsLoading(false), 1000);
  }, []);

  useEffect(() => {
    dispatch(fetchCountriesRequest());
    dispatch(fetchCurrenciesRequest());
    dispatch(fetchCitiesRequest());
    if (isEdit) dispatch(fetchVendorByIdRequest(id));
  }, [dispatch, id, isEdit]);

  const initialValues = {
    vendorName: '',
    vendorCode: '',
    vendorType: '',
    taxRegNo: '',
    companyRegNo: '',
    defaultCurrencyId: '',
    address1: '',
    address2: '',
    postalCode: '',
    country: '',
    cityId: '',
    bankAcctName: '',
    bankAccountNum: '',
    bankName: '',
    bankBranchName: '',
    bankSwiftCode: '',
    contactList: contactList,
  };

  const validationSchema = Yup.object().shape({
    vendorName: Yup.string().required('Vendor name is required'),
    vendorCode: Yup.string().required('Vendor code is required'),
    vendorType: Yup.string().required('Vendor type is required'),
    taxRegNo: Yup.string().required('Tax Registration Number is required'),
    defaultCurrencyId: Yup.string().required('Currency is required'),
    address1: Yup.string().required('Address 1 is required'),
    address2: Yup.string().required('Address 2 is required'),
    country: Yup.string().required('Country is required'),
    cityId: Yup.string().required('City is required'),
    contactList: Yup.array()
      .of(
        Yup.object().shape({
          name: Yup.string().required('Name is required'),
          email: Yup.string().email('Invalid email').required('Email is required'),
          mobileNo: Yup.string().matches(/^\d{10}$/, 'Phone must be 10 digits').required('Phone is required'),
          isDefault: Yup.string().oneOf(['YES', 'NO'], 'Required'),
        })
      )
      .test(
        'one-default',
        'Exactly one contact must be marked as default',
        (arr) => Array.isArray(arr) && arr.filter(c => c.isDefault === 'YES').length === 1
      ),
  });

  useEffect(() => {
    if (isEdit && vendor?.id) {
      const { contactList = [], ...vendorDetails } = vendor;
      const fixedContacts = contactList.length
        ? contactList.map(c => ({
            ...c,
            isDefault: c.isDefault ? 'YES' : 'NO',
          }))
        : [{ name: '', email: '', mobileNo: '', isDefault: '' }];

      setContactList(fixedContacts);
    }
  }, [vendor, isEdit]);

  const handleSubmit = (values) => {
    const payload = {
      ...values,
      contactList: values.contactList.map(c => ({
        ...c,
        isDefault: c.isDefault === 'YES',
      })),
    };

    if (isEdit) {
      payload.id = id;
      dispatch(updateVendorByIdRequest(payload));
      toast.success('Vendor updated successfully');
    } else {
      payload.createdBy = 'adf8906a-cf9a-490f-a233-4df16fc86c58';
      dispatch(createVendorRequest(payload, {
        onSuccess: (newId) => {
          toast.success('Vendor created successfully');
          navigate(`/vendoredit/${newId}`);
        },
        onError: () => toast.error('Vendor creation failed'),
      }));
    }
  };

  return (
    <>
      {isLoading && <Loader />}
      <div className="vendor-edit-container">
        <h2>{isEdit ? 'Edit Vendor' : 'Create Vendor'}</h2>
        <Formik
          enableReinitialize
          initialValues={{ ...initialValues, contactList }}
          validationSchema={validationSchema}
          onSubmit={handleSubmit}
        >
          {({ values, setFieldValue }) => (
            <Form>
              <div className="form-sections">

                {/* --- Basic Info --- */}
                <div className="form-card">
                  <h3>Basic Info</h3>
                  <label>Vendor Name
                    <Field name="vendorName" />
                    <ErrorMessage name="vendorName" component="div" className="error" />
                  </label>
                  <label>Vendor Code
                    <Field name="vendorCode" />
                    <ErrorMessage name="vendorCode" component="div" className="error" />
                  </label>
                  <label>Vendor Type
                    <Field as="select" name="vendorType">
                      <option value="">Select Type</option>
                      <option value="Individual">Individual</option>
                      <option value="Company">Company</option>
                    </Field>
                    <ErrorMessage name="vendorType" component="div" className="error" />
                  </label>
                  <label>Tax Registration No
                    <Field name="taxRegNo" />
                    <ErrorMessage name="taxRegNo" component="div" className="error" />
                  </label>
                  <label>Company Registration No
                    <Field name="companyRegNo" />
                  </label>
                  <label>Currency
                    <Field as="select" name="defaultCurrencyId">
                      <option value="">Select Currency</option>
                      {currencies.map(c => (
                        <option key={c.id} value={c.id}>{c.name}</option>
                      ))}
                    </Field>
                    <ErrorMessage name="defaultCurrencyId" component="div" className="error" />
                  </label>
                </div>

                {/* --- Address --- */}
                <div className="form-card">
                  <h3>Address</h3>
                  <label>Address 1
                    <Field name="address1" />
                    <ErrorMessage name="address1" component="div" className="error" />
                  </label>
                  <label>Address 2
                    <Field name="address2" />
                    <ErrorMessage name="address2" component="div" className="error" />
                  </label>
                  <label>Postal Code
                    <Field name="postalCode" />
                  </label>
                  <label>Country
                    <Field as="select" name="country">
                      <option value="">Select Country</option>
                      {countries.map(c => (
                        <option key={c.id} value={c.id}>{c.name}</option>
                      ))}
                    </Field>
                    <ErrorMessage name="country" component="div" className="error" />
                  </label>
                  <label>City
                    <Field as="select" name="cityId">
                      <option value="">Select City</option>
                      {cities.map(c => (
                        <option key={c.id} value={c.id}>{c.name}</option>
                      ))}
                    </Field>
                    <ErrorMessage name="cityId" component="div" className="error" />
                  </label>
                </div>

                {/* --- Bank Info --- */}
                <div className="form-card">
                  <h3>Bank Info</h3>
                  <label>Account Name
                    <Field name="bankAcctName" />
                  </label>
                  <label>Account Number
                    <Field name="bankAccountNum" />
                  </label>
                  <label>Bank Name
                    <Field name="bankName" />
                  </label>
                  <label>Branch
                    <Field name="bankBranchName" />
                  </label>
                  <label>SWIFT Code
                    <Field name="bankSwiftCode" />
                  </label>
                </div>
              </div>

              {/* --- Contact Section --- */}
              <div className="contact-section">
                <h3 style={{ marginLeft: '20px' }}>Contact Info</h3>
                <FieldArray name="contactList">
                  {() => (
                    <table className="contact-table">
                      <thead>
                        <tr>
                          <th>S.No</th>
                          <th>Name</th>
                          <th>Email</th>
                          <th>Phone</th>
                          <th>Is Default</th>
                          <th>Actions</th>
                        </tr>
                      </thead>
                      <tbody>
                        {values.contactList.map((c, index) => (
                          <tr key={index}>
                            <td>{index + 1}</td>
                            <td>
                              <Field name={`contactList[${index}].name`} />
                              <ErrorMessage name={`contactList[${index}].name`} component="div" className="error" />
                            </td>
                            <td>
                              <Field name={`contactList[${index}].email`} />
                              <ErrorMessage name={`contactList[${index}].email`} component="div" className="error" />
                            </td>
                            <td>
                              <Field name={`contactList[${index}].mobileNo`} />
                              <ErrorMessage name={`contactList[${index}].mobileNo`} component="div" className="error" />
                            </td>
                            <td>
                              <Field as="select" name={`contactList[${index}].isDefault`}>
                                <option value="">isDefault</option>
                                <option value="YES">YES</option>
                                <option value="NO">NO</option>
                              </Field>
                              <ErrorMessage name={`contactList[${index}].isDefault`} component="div" className="error" />
                            </td>
                            <td>
                              <button
                                type="button"
                                onClick={() => {
                                  const updated = [...values.contactList];
                                  updated.splice(index, 1);
                                  setFieldValue('contactList', updated);
                                  setContactList(updated);
                                }}
                              >
                                🗑️
                              </button>
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  )}
                </FieldArray>

                <button
                  type="button"
                  onClick={() => {
                    const updated = [...values.contactList, { name: '', email: '', mobileNo: '', isDefault: '' }];
                    setFieldValue('contactList', updated);
                    setContactList(updated);
                  }}
                >
                  + Add Contact
                </button>
              </div>

              <div className="form-actions">
                <button type="button" onClick={() => navigate('/vendorlist')} className="back-btn">← Back</button>
                <button type="submit">{isEdit ? 'Update Vendor' : 'Save Vendor'}</button>
              </div>
            </Form>
          )}
        </Formik>
      </div>
    </>
  );
};

export default VendorEdit;
