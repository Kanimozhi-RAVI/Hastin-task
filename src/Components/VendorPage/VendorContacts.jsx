import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { Formik, FieldArray } from 'formik';
import * as Yup from 'yup';
import { toast } from 'react-toastify';
import ContactRow from './ContactRow';
import {
  createContactRequest,
  putcontactRequest,
  deleteContactRequest,
} from '../Action_file/VendorAction';
import '../VendorPage/VendorContacts.css';

const VendorContacts = ({ contacts, setContacts, vendorId }) => {
  const dispatch = useDispatch();
  const [hasClickedTick, setHasClickedTick] = useState(false);
  const [defaultError, setDefaultError] = useState('');
  const [savingContactIndex, setSavingContactIndex] = useState(null);
  const createdBy = 'adf8906a-cf9a-490f-a233-4df16fc86c58';

  const initialValues = {
    contacts: contacts.length > 0
      ? contacts.map((c) => ({
          ...c,
          isDefault: c.isDefault === true ? 'YES' : c.isDefault === false ? 'NO' : c.isDefault,
        }))
      : [{ name: '', email: '', mobileNo: '', isDefault: '' }],
  };

  const contactSchema = Yup.object().shape({
    contacts: Yup.array().of(
      Yup.object().shape({
        name: Yup.string().required('Name is required'),
        email: Yup.string().email('Invalid email').required('Email is required'),
        mobileNo: Yup.string()
          .matches(/^\d{10}$/, 'Phone must be 10 digits')
          .required('Phone is required'),
        isDefault: Yup.string().required('Required'),
      })
    ),
  });

  const validateDefault = (list) => {
    const count = list.filter((c) => c.isDefault === 'YES').length;
    if (count === 0) {
      setDefaultError('At least one contact must be marked as default');
      return false;
    } else if (count > 1) {
      setDefaultError('Only one contact can be default');
      return false;
    }
    setDefaultError('');
    return true;
  };

  return (
    <Formik
      initialValues={initialValues}
      validationSchema={contactSchema}
      enableReinitialize
      validate={(values) => {
        if (hasClickedTick) validateDefault(values.contacts);
      }}
      onSubmit={() => {}}
    >
      {({ values, errors, touched, setFieldValue, setFieldTouched }) => {
  const handleDeleteContact = (index) => {
  const updatedList = [...values.contacts];
  const toDelete = updatedList[index];
  const isSaved = toDelete?.id && vendorId;

  updatedList.splice(index, 1); 
  if(isSaved) {
    dispatch(deleteContactRequest({ contactId: toDelete.id, createdBy }));
  
  }else if(updatedList.length === 0) {
    updatedList.push({ name: '', email: '', mobileNo: '', isDefault: 'select' });
    toast.error('At least one empty contact row must remain');
  } else  {
    toast.success('Row deleted successfully');
  }

  setContacts(updatedList);
  setFieldValue('contacts', updatedList);
  validateDefault(updatedList);
};

        const handleSaveContact = async (index) => {
          setHasClickedTick(true);
          setSavingContactIndex(index);

          try {
            await contactSchema.fields.contacts.innerType.validate(values.contacts[index], {
              abortEarly: false,
            });
          } catch (err) {
            if (Array.isArray(err.inner)) {
              err.inner.forEach((e) => {
                setFieldTouched(`contacts[${index}].${e.path}`, true);
              });
            }
            setSavingContactIndex(null);
            return;
          }

          const isValid = validateDefault(values.contacts);
          if (!isValid) {
            setSavingContactIndex(null);
            return;
          }

          const contact = values.contacts[index];
          const updated = [...values.contacts];

          if (contact.isDefault === 'YES') {
            updated.forEach((c, i) => {
              if (i !== index) updated[i].isDefault = 'NO';
            });
          }

          const payload = {
            ...contact,
            isDefault: contact.isDefault === 'YES',
            vendorId,
            createdBy,
          };

          try {
            if (contact.id) {
              await dispatch(putcontactRequest({ ...payload, id: contact.id }));
            } else {
              await dispatch(createContactRequest(payload));
            }

            updated[index] = {
              ...contact,
              id: contact.id || payload.id,
              isDefault: contact.isDefault, 
            };

            setContacts(updated);
            setFieldValue('contacts', updated);
          } catch (error) {
            console.error('API error:', error);
            toast.error(error?.message || 'Something went wrong');
          }

          setSavingContactIndex(null);
        };

        return (
          <div className="contact-section">
            {defaultError && hasClickedTick && (
              <div className="default-error-msg">{defaultError}</div>
            )}

            <table className="contact-table">
              <thead>
                <tr>
                  <th>S.NO</th>
                  <th>Name</th>
                  <th>Email</th>
                  <th>Phone</th>
                  <th>Is Default</th>
                  <th className="text-right">Actions</th>
                </tr>
              </thead>
              <tbody>
                <FieldArray
                  name="contacts"
                  render={() =>
                    values.contacts.map((contact, index) => (
                      <ContactRow
                        key={index}
                        index={index}
                        contact={contact}
                        errors={errors}
                        touched={touched}
                        setFieldValue={setFieldValue}
                        setFieldTouched={setFieldTouched}
                        handleSave={() => handleSaveContact(index)}
                        handleDelete={() => handleDeleteContact(index)}
                        vendorId={vendorId}
                        savingContactIndex={savingContactIndex}
                      />
                    ))
                  }
                />
              </tbody>
            </table>

            <div className="add-btn-wrapper">
              <button
                type="button"
                onClick={() => {
                  setHasClickedTick(false);
                  const newRow = { name: '', email: '', mobileNo: '', isDefault: '' };
                  const updated = [...values.contacts, newRow];
                  setContacts(updated);
                  setFieldValue('contacts', updated);
                }}
                className="add-contact-btn"
              >
                + Add Contact
              </button>
            </div>
          </div>
        );
      }}
    </Formik>
  );
};

export default VendorContacts;
