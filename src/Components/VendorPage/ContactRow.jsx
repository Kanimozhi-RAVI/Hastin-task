import React from 'react';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import { FaCheck, FaTrash } from 'react-icons/fa';

const ContactRow = ({ contact, index, handleDelete, handleSetDefault, vendorId, createdBy, dispatch, putcontactRequest, createContactRequest }) => {

  const formik = useFormik({
    initialValues: {
      name: contact.name || '',
      email: contact.email || '',
      mobileNo: contact.mobileNo || '',
    },
    validationSchema: Yup.object({
      name: Yup.string().required('Name is required'),
      email: Yup.string().email('Invalid email').required('Email required'),
      mobileNo: Yup.string()
        .matches(/^[0-9]{10}$/, 'Mobile number must be 10 digits')
        .required('Phone required'),
    }),
    onSubmit: (values) => {
      const payload = {
        ...values,
        mobileNo: Number(values.mobileNo),
        isDefault: contact.isDefault === 'YES',
        vendorId,
        createdBy,
      };

      if (contact.id) {
        payload.id = contact.id;
        dispatch(putcontactRequest(payload));
      } else {
        dispatch(createContactRequest(payload));
      }

      alert('Contact saved successfully!');
    },
  });

  return (
    <tr>
      <td>{index + 1}</td>
      <td>
        <input
          type="text"
          name="name"
          value={formik.values.name}
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
        />
        {formik.touched.name && formik.errors.name && (
          <div className="error">{formik.errors.name}</div>
        )}
      </td>
      <td>
        <input
          type="email"
          name="email"
          value={formik.values.email}
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
        />
        {formik.touched.email && formik.errors.email && (
          <div className="error">{formik.errors.email}</div>
        )}
      </td>
      <td>
        <input
          type="number"
          name="mobileNo"
          value={formik.values.mobileNo}
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
        />
        {formik.touched.mobileNo && formik.errors.mobileNo && (
          <div className="error">{formik.errors.mobileNo}</div>
        )}
      </td>
      <td>
        <select
          value={contact.isDefault}
          onChange={() => handleSetDefault(index)}
        >
          <option value="YES">YES</option>
          <option value="NO">NO</option>
        </select>
      </td>
      <td className="text-right">
        <FaCheck className="icon tick" onClick={formik.handleSubmit} />
        <FaTrash className="icon delete" onClick={() => handleDelete(index)} />
      </td>
    </tr>
  );
};

export default ContactRow;
