import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams, useNavigate } from 'react-router';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import {
  fetchVendorByIdRequest,
  fetchCountriesRequest,
  fetchCurrenciesRequest,
  fetchCitiesRequest,
  updateVendorByIdRequest,
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

  const vendor = useSelector(state => state.vendor.singleVendor || {});
  const countries = useSelector(state => state.vendor.countries || []);
  const currencies = useSelector(state => state.vendor.currencies || []);
  const cities = useSelector(state => state.vendor.cities || []);

    const [isLoading, setIsLoading] = useState(true); 

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoading(false); 
    }, 2000);
    return () => clearTimeout(timer);
  }, []);
  useEffect(() => {
    dispatch(fetchCountriesRequest());
    dispatch(fetchCurrenciesRequest());
    dispatch(fetchCitiesRequest());
    if (isEdit) {
      dispatch(fetchVendorByIdRequest(id));
    }
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
  };

  const validationSchema = Yup.object().shape({
    vendorName: Yup.string().required('Vendor name is required'),
    vendorCode: Yup.string().required('Vendor code is required'),
    vendorType: Yup.string().required('Vendor type is required'),
    taxRegNo: Yup.string().required('Taxregno required'),
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
 
  const payload = {
    id,
    ...values,
    contactList: contacts.map(c => ({
      ...c,
      isDefault: c.isDefault === 'YES' || c.isDefault === true,
    })),
  };

  dispatch(updateVendorByIdRequest(payload));
};

  const [initialForm, setInitialForm] = useState(initialValues);

  useEffect(() => {
    if (isEdit && vendor?.id) {
      const { contactList, ...vendorDetails } = vendor;
      setInitialForm({
        ...initialValues,
        ...vendorDetails,
      });
      setContacts(JSON.parse(JSON.stringify(contactList || [])));
    }
  }, [vendor,isEdit]);

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
  {({ values, setFieldValue }) => (  
    <Form>
            <div className="form-sections">
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
                    <option value="">Select Vendor Type</option>
                    <option value="Individual">Individual</option>
                    <option value="Company">Company</option>
                  </Field>
                  <ErrorMessage name="vendorType" component="div" className="error" />
                </label>
                <label>Tax Registration Number
                  <Field name="taxRegNo" />
                  <ErrorMessage name="taxRegNo" component="div" className="error" />

                </label>
                  <label>Company Registration Number
                    <Field name="companyRegNo" />
                    <ErrorMessage name="companyRegNo" component="div" className="error" />
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

              <div className="form-card">
                <h3>Address</h3>
                <label>Address Line 1
                  <Field name="address1" />
                  <ErrorMessage name="address1" component="div" className="error" />
                </label>
                <label>Address Line 2
                  <Field name="address2"  />
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

              <div className="form-card">
                <h3>Bank Info</h3>
                <label>Bank Account Name
                  <Field name="bankAcctName" />
                </label>
                <label>Bank Account Number
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

            <div className="contact-design">
              <br/>
              <h3 style={{ marginLeft: '20px', marginTop:"10px" }}>Contact Info</h3>
              <VendorContacts contacts={contacts} setContacts={setContacts} ve={id} />
            </div>

            <div className="form-actions">
              <button type="submit" onClick={() =>navigate('/nextpage') }>{isEdit ? 'Update' : 'Save'}</button>
            </div>
          </Form>
        )}
      </Formik>
      
    </div>
    </>
  );
};

export default VendorEdit;
