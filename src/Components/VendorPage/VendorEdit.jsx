import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams, useNavigate } from 'react-router-dom';
import { Formik, Form, Field, ErrorMessage } from 'formik';
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

import VendorContacts from './VendorContacts';
import './VendorEdit.css';
import Loader from '../Loader_File/Loader';

const VendorEdit = () => {
  const { id } = useParams();
  const isEdit = Boolean(id);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [contacts, setContacts] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [defaultContactError, setDefaultContactError] = useState('');

  const vendor = useSelector(state => state.vendor.singleVendor || {});
  const countries = useSelector(state => state.vendor.countries || []);
  const currencies = useSelector(state => state.vendor.currencies || []);
  const cities = useSelector(state => state.vendor.cities || []);

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
    contacts: [{ name: '', email: '', mobileNo: '', isDefault: '' }], // important
  };

  useEffect(() => {
    setTimeout(() => setIsLoading(false), 1000);
  }, []);

  useEffect(() => {
    dispatch(fetchCountriesRequest());
    dispatch(fetchCurrenciesRequest());
    dispatch(fetchCitiesRequest());
    if (isEdit) dispatch(fetchVendorByIdRequest(id));
  }, [dispatch, id, isEdit]);

  const [initialForm, setInitialForm] = useState(initialValues);

  useEffect(() => {
    if (isEdit && vendor?.id) {
      const { contactList, ...vendorDetails } = vendor;
      const safeContacts =
        contactList?.length > 0
          ? contactList.map((c) => ({
              ...c,
              isDefault: c.isDefault === true ? 'YES' : 'NO',
            }))
          : [{ name: '', email: '', mobileNo: '', isDefault: '' }];

      setInitialForm({ ...initialValues, ...vendorDetails, contacts: safeContacts });
      setContacts(safeContacts);
    }
  }, [vendor, isEdit]);

  const handleSubmit = (values) => {
    const validContacts = values.contacts.filter(
      (c) => c.name?.trim() && c.email?.trim() && c.mobileNo?.trim() && c.isDefault
    );

    const defaultCount = validContacts.filter(
      (c) => c.isDefault === 'YES' || c.isDefault === true
    ).length;

    if (defaultCount !== 1) {
      setDefaultContactError('Exactly one contact must be marked as default');
      return;
    }

    setDefaultContactError('');

    const payload = {
      ...values,
      contactList: validContacts.map((c) => ({
        ...c,
        isDefault: c.isDefault === 'YES' || c.isDefault === true,
      })),
    };

    if (isEdit) {
      payload.id = id;
      dispatch(updateVendorByIdRequest(payload));
    } else {
      payload.createdBy = 'adf8906a-cf9a-490f-a233-4df16fc86c58';
      dispatch(
        createVendorRequest(payload, {
          onSuccess: (newVendorId) => navigate(`/vendoredit/${newVendorId}`),
        })
      );
    }
  };

  return (
    <>
      {isLoading && <Loader />}

      <div className="vendor-edit-container">
        <h2>{isEdit ? 'Edit Vendor' : 'Create Vendor'}</h2>

        <Formik
          enableReinitialize
          initialValues={initialForm}
          validationSchema={Yup.object().shape({
            vendorName: Yup.string().required('Vendor name is required'),
            vendorCode: Yup.string().required('Vendor code is required'),
            vendorType: Yup.string().required('Vendor type is required'),
            taxRegNo: Yup.string().required('Tax Registration Number is required'),
            defaultCurrencyId: Yup.string().required('Currency is required'),
            address1: Yup.string().required('Address 1 is required'),
            country: Yup.string().required('Country is required'),
            cityId: Yup.string().required('City is required'),
            
          })}
          
          onSubmit={handleSubmit}
        >
          {({ values, setFieldValue, setFieldTouched, errors, touched }) => (
            <Form>
              <div className="form-sections">
                {/* Basic Info */}
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
                  <label>Default Currency
               <Field
                as="select"
                name="defaultCurrencyId"
                onChange={(e) => {
                const selectedId = e.target.value;
                setFieldValue("defaultCurrencyId", selectedId);
                setFieldValue("companyRegNo", selectedId); 
                 }}
                 >
               <option value="">Select Currency</option>
                 {currencies.map((c) => (
                 <option key={c.id} value={c.id}>
                 {c.name}
                </option>
                ))}
              </Field>
              <ErrorMessage name="defaultCurrencyId" component="div" className="error" />
             </label>

                </div>

                {/* Address */}
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
                    <Field
                      as="select"
                      name="country"
                      onChange={(e) => {
                        setFieldValue("country", e.target.value);
                        setFieldValue("cityId", ""); // reset city
                      }}
                    >
                      <option value="">Select Country</option>
                      {countries.map((c) => (
                        <option key={c.id} value={c.id}>{c.name}</option>
                      ))}
                    </Field>
                    <ErrorMessage name="country" component="div" className="error" />
                  </label>
                  <label>City
                    <Field as="select" name="cityId">
                      <option value="">Select City</option>
                      {cities
                        .filter(city => city.countryId === values.country)
                        .map((c) => (
                          <option key={c.id} value={c.id}>{c.name}</option>
                        ))}
                    </Field>
                    <ErrorMessage name="cityId" component="div" className="error" />
                  </label>
                </div>

                {/* Bank Info */}
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

              {/* Contact Info */}
              <div className="contact-design">
                <h3 style={{ marginLeft: '20px', marginTop: '10px' }}>Contact Info</h3>

                {defaultContactError && (
                  <div className="default-error-msg">
                    {defaultContactError}
                  </div>
                )}

<VendorContacts
      contacts={values.contacts}
      setContacts={(newList) => setFieldValue('contacts', newList)}
      vendorId={id}
      createdBy="adf8906a-cf9a-490f-a233-4df16fc86c58"
    />

  </div>

              <div className="form-actions">
                <button type="submit">
                  {isEdit ? 'Update Vendor' : 'Save Vendor'}
                </button>
              </div>
            </Form>
          )}
        </Formik>
      </div>
    </>
  );
};

export default VendorEdit;
