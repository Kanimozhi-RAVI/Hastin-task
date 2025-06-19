import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useFormik, FieldArray, FormikProvider } from 'formik';
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

  const initialValues = {
    contacts: [],
  };

  const contactSchema = Yup.object().shape({
    contacts: Yup.array()
      .of(
        Yup.object().shape({
          name: Yup.string().required('Name is required'),
          email: Yup.string().email('Invalid email').required('Email is required'),
          mobileNo: Yup.string()
            .matches(/^\d{10}$/, 'Phone number must be exactly 10 digits')
            .required('Phone is required'),
          isDefault: Yup.string().oneOf(['YES', 'NO'], 'Select YES or NO').required('Required'),
        })
      )
      // .min(1, 'At least one contact is required'),
  });

  const formik = useFormik({
    initialValues,
    validationSchema: contactSchema,
    enableReinitialize: true,
    onSubmit: () => {},
  });

  const { values, errors, touched, handleBlur, setValues, setTouched } = formik;

  useEffect(() => {
    const formatted = contacts.map((c) => ({
      ...c,
      isDefault: c.isDefault === true ? 'YES' : c.isDefault === false ? 'NO' : c.isDefault,
    }));
    setValues({ contacts: formatted });
  }, [contacts]);

  const validateDefaultContact = (contacts) => {
    const count = contacts.filter((c) => c.isDefault === 'YES').length;
    if (count === 0) {
      toast.error('At least one contact must be marked as default');
      return false;
    }
    if (count > 1) {
      toast.error('Only one contact can be default');
      return false;
    }
    return true;
  };

  const handleInputChange = (e, index, field) => {
    const value = e.target.value;
    const updated = [...values.contacts];
    updated[index][field] = value;
    setValues({ contacts: updated });
    setContacts(updated);
  };

  const handleSave = async (index) => {
    const contact = values.contacts[index];

    try {
      await contactSchema.fields.contacts.innerType.validate(contact, {
        abortEarly: false,
      });
    } catch (validationError) {
      const touchedFields = {};
      const errorMessages = [];

      validationError.inner.forEach((err) => {
        touchedFields[`contacts[${index}].${err.path}`] = true;
        errorMessages.push(err.message);
      });

      setTouched(touchedFields);

      toast.error(errorMessages.join(', '), {
        position: 'top-right',
        autoClose: 3000,
        theme: 'colored',
      });

      return;
    }

    if (!validateDefaultContact(values.contacts)) return;

    const finalPayload = {
      ...contact,
      isDefault: contact.isDefault === 'YES',
      vendorId,
      createdBy,
    };

    const updatedContacts = [...values.contacts];
    updatedContacts[index] = { ...contact };

    if (vendorId) {
      if (contact.id) {
        dispatch(putcontactRequest({ ...finalPayload, id: contact.id }));
      } else {
        dispatch(createContactRequest(finalPayload));
      }

      // toast.success('Contact saved successfully', {
      //   position: 'top-right',
      //   autoClose: 3000,
      //   theme: 'colored',
      // });
    }

    setValues({ contacts: updatedContacts });
    setContacts(updatedContacts);
  };

  const handleDelete = (index) => {
    const contact = values.contacts[index];
    let newContacts = [...values.contacts];
    newContacts.splice(index, 1);

    if (newContacts.length === 0) {
      newContacts = [{ name: '', email: '', mobileNo: '', isDefault: '' }];
    }

    setValues({ contacts: newContacts });
    setContacts(newContacts);

    if (contact?.id && vendorId) {
      dispatch(
        deleteContactRequest({
          contactId: contact.id,
          createdBy,
        })
      );
    }
  };

  return (
    <FormikProvider value={formik}>
      <div className="contact-section">
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
                        type="text"
                        value={contact.name}
                        onChange={(e) => handleInputChange(e, index, 'name')}
                        onBlur={handleBlur}
                        placeholder="Name"
                      />
                      {errors.contacts?.[index]?.name && (
                        <div className="error">{errors.contacts[index].name}</div>
                      )}
                    </td>
                    <td>
                      <input
                        type="email"
                        value={contact.email}
                        onChange={(e) => handleInputChange(e, index, 'email')}
                        onBlur={handleBlur}
                        placeholder="Email"
                      />
                      {errors.contacts?.[index]?.email && (
                        <div className="error">{errors.contacts[index].email}</div>
                      )}
                    </td>
                    <td>
                      <input
                        type="text"
                        value={contact.mobileNo}
                        onChange={(e) => handleInputChange(e, index, 'mobileNo')}
                        onBlur={handleBlur}
                        placeholder="Phone number"
                      />
                      {errors.contacts?.[index]?.mobileNo && (
                        <div className="error">{errors.contacts[index].mobileNo}</div>
                      )}
                    </td>
                    <td>
                      <select
                        value={contact.isDefault}
                        onChange={(e) => handleInputChange(e, index, 'isDefault')}
                        onBlur={handleBlur}
                      >
                        <option value="" disabled>
                          isDefault
                        </option>
                        <option value="YES">YES</option>
                        <option value="NO">NO</option>
                      </select>
                      {errors.contacts?.[index]?.isDefault && (
                        <div className="error">{errors.contacts[index].isDefault}</div>
                      )}
                    </td>
                    <td className="text-right">
                      {vendorId && (
                        <FaCheck className="icon tick" onClick={() => handleSave(index)} />
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
              const newContact = { name: '', email: '', mobileNo: '', isDefault: '' };
              const updatedList = [...values.contacts, newContact];
              setValues({ contacts: updatedList });
              setContacts(updatedList);
            }}
            className="add-contact-btn"
          >
            + Add Contact
          </button>
        </div>
      </div>
    </FormikProvider>
  );
};

export default VendorContacts;
