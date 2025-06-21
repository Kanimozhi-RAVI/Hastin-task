import { FaCheck, FaTrash } from 'react-icons/fa';
import Loader from '../Loader_File/Loader';

const ContactRow = ({
  index,
  contact,
  errors,
  touched,
  setFieldValue,
  setFieldTouched,
  handleSave,
  handleDelete,
  vendorId,
  savingContactIndex,
  createdId,
}) => {
  return (
    <tr>
      <td>{index + 1}</td>

      <td>
        <input
          type="text"
          value={contact.name}
          onChange={(e) => setFieldValue(`contacts[${index}].name`, e.target.value)}
          onBlur={() => setFieldTouched(`contacts[${index}].name`, true)}
          placeholder='Name'
        />
        {touched.contacts?.[index]?.name && errors.contacts?.[index]?.name && (
          <div className="error">{errors.contacts[index].name}</div>
        )}
      </td>

      <td>
        <input
          type="email"
          value={contact.email}
          onChange={(e) => setFieldValue(`contacts[${index}].email`, e.target.value)}
          onBlur={() => setFieldTouched(`contacts[${index}].email`, true)}
          placeholder='Email'
        />
        {touched.contacts?.[index]?.email && errors.contacts?.[index]?.email && (
          <div className="error">{errors.contacts[index].email}</div>
        )}
      </td>

      <td>
        <input
          type="text"
          value={contact.mobileNo}
          onChange={(e) => setFieldValue(`contacts[${index}].mobileNo`, e.target.value)}
          onBlur={() => setFieldTouched(`contacts[${index}].mobileNo`, true)}
          placeholder='Phone Number'
        />
        {touched.contacts?.[index]?.mobileNo && errors.contacts?.[index]?.mobileNo && (
          <div className="error">{errors.contacts[index].mobileNo}</div>
        )}
      </td>

      <td>
        <select
          value={contact.isDefault}
          onChange={(e) => setFieldValue(`contacts[${index}].isDefault`, e.target.value)}
          onBlur={() => setFieldTouched(`contacts[${index}].isDefault`, true)}
        >
          <option value="">Select</option>
          <option value="YES">YES</option>
          <option value="NO">NO</option>
        </select>
        {touched.contacts?.[index]?.isDefault && errors.contacts?.[index]?.isDefault && (
          <div className="error">{errors.contacts[index].isDefault}</div>
        )}
      </td>

      <td className="text-right">
        {vendorId && (
          savingContactIndex === index ? (
            <Loader inline />
          ) : (
            <FaCheck className="icon tick" onClick={handleSave} />
          )
        )}
        <FaTrash className="icon trash" onClick={handleDelete} />
      </td>
    </tr>
  );
};

export default ContactRow;
