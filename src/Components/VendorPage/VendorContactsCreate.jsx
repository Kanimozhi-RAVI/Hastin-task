import React, { useEffect } from 'react';
import { Field, ErrorMessage } from 'formik';
import { toast } from 'react-toastify';
import { FaTrash } from 'react-icons/fa';
import './VendorContacts.css';

const VendorContactsCreate = ({ values, setFieldValue, defaultContactError, setDefaultContactError }) => {
  useEffect(() => {
    const count = values.contactList.filter(c => c.isDefault === 'YES').length;
    if (count === 1) {
      setDefaultContactError('');
    }
  }, [values.contactList, setDefaultContactError]);

  const handleDelete = (index) => {
    const contact = values.contactList[index];
    const updatedList = [...values.contactList];
    updatedList.splice(index, 1);

    const isEmpty =
      !contact.name?.trim() &&
      !contact.email?.trim() &&
      !contact.mobileNo?.trim();

    if (updatedList.length === 0) {
      toast.info('At least one empty contact row must remain');
      updatedList.push({ name: '', email: '', mobileNo: '', isDefault: '' });
    } else {
      if (isEmpty) toast.info('Empty contact row deleted');
      else toast.success('Contact row deleted');
    }

    setFieldValue('contactList', updatedList);
  };

  const handleAdd = () => {
    const newRow = { name: '', email: '', mobileNo: '', isDefault: '' };
    const updatedList = [...values.contactList, newRow];
    setFieldValue('contactList', updatedList);
  };

  return (
    <div className="contact-section">
      <table className="contact-table">
        <thead>
          <tr>
            <th>S.NO</th>
            <th>Name</th>
            <th>Email</th>
            <th>Phone</th>
            <th>Is Default</th>
            <th className="text-right">Action</th>
          </tr>
        </thead>
        <tbody>
          {values.contactList.map((_, index) => (
            <tr key={index}>
              <td>{index + 1}</td>
              <td>
                <Field name={`contactList.${index}.name`} placeholder="Name" />
                <ErrorMessage name={`contactList.${index}.name`} component="div" className="error" />
              </td>
              <td>
                <Field name={`contactList.${index}.email`} placeholder="Email" />
                <ErrorMessage name={`contactList.${index}.email`} component="div" className="error" />
              </td>
              <td>
                <Field name={`contactList.${index}.mobileNo`} placeholder="Phone" />
                <ErrorMessage name={`contactList.${index}.mobileNo`} component="div" className="error" />
              </td>
              <td>
                <Field as="select" name={`contactList.${index}.isDefault`}>
                  <option value="">Select</option>
                  <option value="YES">YES</option>
                  <option value="NO">NO</option>
                </Field>
                <ErrorMessage name={`contactList.${index}.isDefault`} component="div" className="error" />
              </td>
              <td className="text-right">
                <FaTrash className="icon delete" onClick={() => handleDelete(index)} />
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      <div className="add-btn-wrapper">
        <button type="button" onClick={handleAdd} className="add-contact-btn">
          + Add Contact
        </button>
      </div>
    </div>
  );
};

export default VendorContactsCreate;
