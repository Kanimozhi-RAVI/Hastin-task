import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { Formik, FieldArray, Form } from 'formik';
import * as Yup from 'yup';
import { FaCheck, FaTrash } from 'react-icons/fa';
import { useParams } from 'react-router-dom';
import { toast } from 'react-toastify';
import {
  createContactRequest,
  putcontactRequest,
  deleteContactRequest,
} from '../Action_file/VendorAction';
import '../VendorPage/VendorContacts.css';

const VendorContacts = ({ contacts, setContacts }) => {
  const { id: vendorId } = useParams();
  const dispatch = useDispatch();
  const createdBy = 'adf8906a-cf9a-490f-a233-4df16fc86c58';

  const [defaultError, setDefaultError] = useState('');
  const [hasClickedTick, setHasClickedTick] = useState(false);

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
    } else {
      setDefaultError('');
      return true;
    }
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
      const handleDelete = (index) => {
  const contact = values.contacts[index];
  const updatedList = [...values.contacts];
  updatedList.splice(index, 1); // Remove the row

  const isEmpty =
    !contact.name?.trim() &&
    !contact.email?.trim() &&
    !contact.mobileNo?.trim() &&
    !contact.isDefault;

  const isSaved = contact?.id && vendorId;

  const willBeEmpty = updatedList.length === 0;

  if (willBeEmpty) {
    toast.info('At least one empty contact row must remain');
    updatedList.push({ name: '', email: '', mobileNo: '', isDefault: '' });
  } else {
    if (isEmpty) {
      toast.info('Empty contact row deleted');
    } else if (isSaved) {
      dispatch(deleteContactRequest({ contactId: contact.id, createdBy }));
      toast.success('Row deleted successfully');
    } else {
      toast.success('Row deleted successfully'); // Unsaved row with data
    }
  }

  setContacts(updatedList);
  setFieldValue('contacts', updatedList);
  validateDefault(updatedList);
};


        return (
          <Form className="contact-section">
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
                      <tr key={index}>
                        <td>{index + 1}</td>

                        <td>
                          <input
                            value={contact.name}
                            onChange={(e) =>
                              setFieldValue(`contacts[${index}].name`, e.target.value)
                            }
                            onBlur={() => setFieldTouched(`contacts[${index}].name`, true)}
                            placeholder="Name"
                          />
                          {touched.contacts?.[index]?.name &&
                            errors.contacts?.[index]?.name && (
                              <div className="error">{errors.contacts[index].name}</div>
                            )}
                        </td>

                        <td>
                          <input
                            value={contact.email}
                            onChange={(e) =>
                              setFieldValue(`contacts[${index}].email`, e.target.value)
                            }
                            onBlur={() => setFieldTouched(`contacts[${index}].email`, true)}
                            placeholder="Email"
                          />
                          {touched.contacts?.[index]?.email &&
                            errors.contacts?.[index]?.email && (
                              <div className="error">{errors.contacts[index].email}</div>
                            )}
                        </td>

                        <td>
                          <input
                            value={contact.mobileNo}
                            onChange={(e) =>
                              setFieldValue(`contacts[${index}].mobileNo`, e.target.value)
                            }
                            onBlur={() => setFieldTouched(`contacts[${index}].mobileNo`, true)}
                            placeholder="Phone"
                          />
                          {touched.contacts?.[index]?.mobileNo &&
                            errors.contacts?.[index]?.mobileNo && (
                              <div className="error">{errors.contacts[index].mobileNo}</div>
                            )}
                        </td>

                        <td>
                          <select
                            value={contact.isDefault}
                            onChange={(e) => {
                              const val = e.target.value;
                              setFieldValue(`contacts[${index}].isDefault`, val);
                              const updated = [...values.contacts];
                              updated[index].isDefault = val;
                              setContacts(updated);
                            }}
                            onBlur={() => setFieldTouched(`contacts[${index}].isDefault`, true)}
                          >
                            <option value="" disabled>isDefault</option>
                            <option value="YES">YES</option>
                            <option value="NO">NO</option>
                          </select>
                          {touched.contacts?.[index]?.isDefault &&
                            errors.contacts?.[index]?.isDefault && (
                              <div className="error">{errors.contacts[index].isDefault}</div>
                            )}
                        </td>

                        <td className="text-right">
                          {vendorId && (
                            <FaCheck
                              className="icon tick"
                              onClick={async () => {
                                setHasClickedTick(true);
                                try {
                                  await contactSchema.fields.contacts.innerType.validate(contact, {
                                    abortEarly: false,
                                  });
                                } catch (err) {
                                  if (Array.isArray(err.inner)) {
                                    err.inner.forEach((e) => {
                                      setFieldTouched(`contacts[${index}].${e.path}`, true);
                                    });
                                  }
                                  return;
                                }

                                const isValidDefault = validateDefault(values.contacts);
                                if (!isValidDefault) return;

                                const finalPayload = {
                                  ...contact,
                                  isDefault: contact.isDefault === 'YES',
                                  vendorId,
                                  createdBy,
                                };

                                if (contact.id) {
                                  await dispatch(
                                    putcontactRequest({ ...finalPayload, id: contact.id })
                                  );
                                } else {
                                  await dispatch(createContactRequest(finalPayload));
                                }

                                const updated = [...values.contacts];
                                updated[index] = { ...contact };
                                setContacts(updated);
                              }}
                            />
                          )}
                          <FaTrash className="icon delete" onClick={() => handleDelete(index)} />
                        </td>
                      </tr>
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
                  const newRow = {
                    name: '',
                    email: '',
                    mobileNo: '',
                    isDefault: '',
                  };
                  const updatedList = [...values.contacts, newRow];
                  setContacts(updatedList);
                  setFieldValue('contacts', updatedList);
                }}
                className="add-contact-btn"
              >
                + Add Contact
              </button>
            </div>
          </Form>
        );
      }}
    </Formik>
  );
};

export default VendorContacts;
