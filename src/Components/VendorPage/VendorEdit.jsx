import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams, useNavigate } from 'react-router-dom';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';

import {
  fetchVendorByIdRequest,
  fetchCountriesRequest,
  fetchCurrenciesRequest,
  fetchCitiesRequest,
  updateVendorByIdRequest,
  createVendorRequest,
} from '../Action_file/VendorAction';

import VendorContactsCreate from './VendorContactsCreate';
import VendorContacts from './VendorContacts';
import Loader from '../Loader_File/Loader';
import './VendorEdit.css';
import { toast } from 'react-toastify';

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
  const [contactList, setContactList] = useState([
  { name: '', email: '', mobileNo: '', isDefault: '' },
]);


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
    contactList: [],
  };

  const [initialForm, setInitialForm] = useState(initialValues);

  useEffect(() => {
    dispatch(fetchCountriesRequest());
    dispatch(fetchCurrenciesRequest());
    dispatch(fetchCitiesRequest());
    if (isEdit) dispatch(fetchVendorByIdRequest(id));
    setTimeout(() => setIsLoading(false), 1000);
  }, [dispatch, id, isEdit]);

  useEffect(() => {
    if (isEdit && vendor?.id) {
      const { contactList, ...vendorDetails } = vendor;
      const formattedContacts = (contactList || []).map(c => ({
        ...c,
        isDefault: c.isDefault ? 'YES' : 'NO',
      }));
      setInitialForm({
        ...initialValues,
        ...vendorDetails,
        contactList: formattedContacts,
      });
      setContacts(JSON.parse(JSON.stringify(formattedContacts)));
    }
  }, [vendor, isEdit]);

  const validationSchema = Yup.object().shape({
    vendorName: Yup.string().required('required'),
    vendorCode: Yup.string().required('required'),
    vendorType: Yup.string().required(' required'),
    taxRegNo: Yup.string().required('required'),
    companyRegNo: Yup.string().required('required'),
    defaultCurrencyId: Yup.string().required(' required'),
    address1: Yup.string().required('required'),
    address2: Yup.string(),
    postalCode: Yup.string(),
    country: Yup.string().required('required'),
    cityId: Yup.string().required('required'),
    bankAcctName: Yup.string(),
    bankAccountNum: Yup.string(),
    bankName: Yup.string(),
    bankBranchName: Yup.string(),
    bankSwiftCode: Yup.string(),
    contactList: Yup.array()
      .of(
        Yup.object().shape({
          name: Yup.string().required('Required'),
          email: Yup.string().email('Invalid email').required('Required'),
          mobileNo: Yup.string().matches(/^\d{10}$/, 'Phone must be 10 digits').required('Required'),
          isDefault: Yup.string().oneOf(['YES', 'NO'], 'Required'),
        })
      )
    
  });
const handleSubmit = (values) => {
  if (!values.contactList || values.contactList.length === 0) {
    toast.error("Missing contacts");
    return;
  }

  const hasIncomplete = values.contactList.some(c => !c.name || !c.email || !c.mobileNo || !c.isDefault);
  if (hasIncomplete) {
    toast.error("Please save all contact rows before submitting.");
    return;
  }

 const cleanedList = (values.contactList || [])
  .filter(c => c.name && c.email && c.mobileNo)
  .map(c => ({
    name: c.name,
    email: c.email,
    id: c.id,
    isDefault: c.isDefault === 'YES',
    mobileNo: c.mobileNo,
  }));

// ✅ Fix here: check cleanedList, not values.contactList
if (cleanedList.length === 0) {
  toast.error("Missing contacts");
  return;
}


  const defaultCount = cleanedList.filter(c => c.isDefault).length;
  if (defaultCount !== 1) {
    toast.error("Exactly one contact must be marked as default");
    return;
  }

  const payload = {
    ...values,
    contactList: cleanedList,
    createdBy: 'adf8906a-cf9a-490f-a233-4df16fc86c58',
  };

  if (isEdit) {
    dispatch(updateVendorByIdRequest(payload, id));
  } else {
    dispatch(createVendorRequest(payload, {
      onSuccess: (newVendorId) => {
        toast.success('Vendor created successfully');
        navigate(`/vendoredit/${newVendorId}`);
      }
    }));
  }
};



  return (
    <>
      {isLoading && <Loader />}
      <div className="vendor-edit-container">
        <h2>{isEdit ? 'Edit Vendor' : 'Create Vendor'}</h2>
       <div style={{textAlign:"right"}}>
        <button type="button" onClick={() => navigate('/nextpage')} className="back-button">
        ← Back
        </button>
       </div>
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
                        setFieldValue("cityId", ""); 
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
                <br/>
                <br/>
              <div className="form-card ">
                <h3>Contact Info</h3>
                {defaultContactError && (
                  <div className="error" style={{ color: 'red', marginBottom: '10px' }}>
                    {defaultContactError}
                  </div>
                )}
                <div className='contact-design'> 
                 {!isEdit ? (
                  <VendorContactsCreate
                    values={values}
                    setFieldValue={setFieldValue}
                    defaultContactError={defaultContactError}
                    setDefaultContactError={setDefaultContactError}
                  />
                ) : (
                <VendorContacts
                  contacts={values.contactList}
                  setContacts={(updated) => {
                  setFieldValue('contactList', updated, true);
                  setContactList(updated);
                  }}
                vendorId={id} 
                createdBy="adf8906a-cf9a-490f-a233-4df16fc86c58"
                />
                )}
               </div>

               
              </div>

              <div className="form-actions">
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
