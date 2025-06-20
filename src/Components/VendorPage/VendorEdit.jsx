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

  const [contacts, setContacts] = useState([{ name: '', email: '', mobileNo: '', isDefault: '' }]);
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
    contactList: contacts, // ✅ Formik's controlled field
  };

  const [initialForm, setInitialForm] = useState(initialValues);

  useEffect(() => {
    if (isEdit && vendor?.id) {
      const { contactList, ...vendorDetails } = vendor;

      const cleanedVendorDetails = {};
      Object.keys(initialValues).forEach((key) => {
        cleanedVendorDetails[key] =
          vendorDetails[key] !== null && vendorDetails[key] !== undefined
            ? vendorDetails[key]
            : '';
      });

      const updatedContacts = (contactList || []).map((c) => ({
        ...c,
        isDefault: c.isDefault === true ? 'YES' : 'NO',
        name: c.name || '',
        email: c.email || '',
        mobileNo: c.mobileNo || '',
      }));

      setContacts(updatedContacts);

      setInitialForm({
        ...initialValues,
        ...cleanedVendorDetails,
        contactList: updatedContacts, // ✅ sync Formik values
      });
    }
  }, [vendor, isEdit]);

  const validationSchema = Yup.object().shape({
    vendorName: Yup.string().required('Vendor name is required'),
    vendorCode: Yup.string().required('Vendor code is required'),
    vendorType: Yup.string().required('Vendor type is required'),
    taxRegNo: Yup.string().required('Tax Registration Number is required'),
    companyRegNo: Yup.string(),
    defaultCurrencyId: Yup.string().required('Currency is required'),
    address1: Yup.string().required('Address 1 is required'),
    address2: Yup.string().required('Address 2 is required'),
    postalCode: Yup.string(),
    country: Yup.string().required('Country is required'),
    cityId: Yup.string().required('City is required'),
    bankAcctName: Yup.string(),
    bankAccountNum: Yup.string(),
    bankName: Yup.string(),
    bankBranchName: Yup.string(),
    bankSwiftCode: Yup.string(),
  });

  const handleSubmit = (values) => {
    const contactListFromFormik = values.contactList || [];

    const cleanedList = contactListFromFormik
      .filter(c => c.name && c.email && c.mobileNo)
      .map(c => ({
        id: c.id,
        name: c.name,
        email: c.email,
        mobileNo: c.mobileNo,
        isDefault: c.isDefault === 'YES',
        createdBy: 'adf8906a-cf9a-490f-a233-4df16fc86c58',
        vendorId: id || undefined,
      }));

    const defaultCount = cleanedList.filter(c => c.isDefault).length;
    if (defaultCount !== 1) {
      toast.error('Exactly one contact must be marked as default');
      return;
    }

    const payload = {
      ...values,
      contactList: cleanedList,
    };

    if (isEdit) {
      dispatch(updateVendorByIdRequest({
        payload: { ...payload, id },
        meta: {
          onSuccess: () => toast.success("Vendor updated successfully"),
          onError: () => toast.error("Update failed"),
        },
      }));
    } else {
      payload.createdBy = 'adf8906a-cf9a-490f-a233-4df16fc86c58';
      dispatch(createVendorRequest(payload, {
        onSuccess: (newVendorId) => {
          toast.success('Vendor created successfully');
          navigate(`/vendoredit/${newVendorId}`);
        },
        onError: () => {
          toast.error('Vendor creation failed');
        },
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
          initialValues={initialForm}
          validationSchema={validationSchema}
          onSubmit={handleSubmit}
        >
          {({ values,setFieldValue }) => (
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

              {/* --- Contacts Section --- */}
              <div className="contact-design">
                <h3 style={{ marginLeft: '20px', marginTop: '10px' }}>Contact Info</h3>
              <VendorContacts
  contacts={values.contactList}
  setContacts={(list) => setFieldValue('contactList', list)}
  vendorId={id}
  createdBy="adf8906a-cf9a-490f-a233-4df16fc86c58"
/>

              </div>

              <div className="form-actions">
                <button
                  type="button"
                  onClick={() => navigate('/vendorlist')}
                  className="back-btn"
                >
                  ← Back
                </button>
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
