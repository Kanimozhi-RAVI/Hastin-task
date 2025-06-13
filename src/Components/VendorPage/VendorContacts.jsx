import React from 'react';
import { FaCheck, FaTrash } from 'react-icons/fa';
import './VendorContacts.css';
import { useDispatch } from 'react-redux';
import {
  createContactRequest,
  deleteContactRequest,
  putcontactRequest,
} from '../Action_file/VendorAction';
import { useParams } from 'react-router';

const VendorContacts = ({ contacts, setContacts }) => {
  const dispatch = useDispatch();
  const { id: vendorId } = useParams();

  const createdBy = "adf8906a-cf9a-490f-a233-4df16fc86c58";

  const handleFieldChange = (index, field, value) => {
    const updated = [...contacts];
    updated[index][field] = value;
    setContacts(updated);
  };

  const handleSetDefault = (index) => {
    const updated = contacts.map((c, i) => ({
      ...c,
      isDefault: i === index ? 'YES' : 'NO',
    }));
    setContacts(updated);
  };

  const handleSave = (index) => {
    const c = contacts[index];

    const payload = {
      name: c.name,
      email: c.email,
      mobileNo: Number(c.mobileNo),
      isDefault: c.isDefault === 'YES',
      vendorId,
      createdBy,
    };

    if (!c.id) {
      console.log("Payload being sent for contact create:", JSON.stringify(payload, null, 2));
      dispatch(createContactRequest(payload));
    } else {
      payload.id = c.id;
      dispatch(putcontactRequest(payload));
    }
  };

  const handleDelete = (index) => {
    const c = contacts[index];
    if (vendorId && c.id) {
      dispatch(deleteContactRequest(vendorId, c.id));
    }
    const updated = contacts.filter((_, i) => i !== index);
    setContacts(updated);
  };

  const addContact = () => {
    setContacts([
      ...contacts,
      { name: '', email: '', mobileNo: '', isDefault: 'NO' },
    ]);
  };

  return (
    <div className="contact-section">
      <h3>CONTACT</h3>
      <table className="contact-table">
        <thead>
          <tr>
            <th>S.NO</th>
            <th>NAME</th>
            <th>EMAIL</th>
            <th>PHONE NO</th>
            <th>IS DEFAULT</th>
            <th className="text-right">ACTION</th>
          </tr>
        </thead>
        <tbody>
          {contacts.map((c, index) => (
            <tr key={index}>
              <td>{index + 1}</td>
              <td>
                <input
                  type="text"
                  value={c.name}
                  onChange={(e) => handleFieldChange(index, 'name', e.target.value)}
                />
              </td>
              <td>
                <input
                  type="email"
                  value={c.email}
                  onChange={(e) => handleFieldChange(index, 'email', e.target.value)}
                />
              </td>
              <td>
                <input
                  type="number"
                  value={c.mobileNo}
                  onChange={(e) => handleFieldChange(index, 'mobileNo', e.target.value)}
                />
              </td>
              <td>
                <select value={c.isDefault} onChange={() => handleSetDefault(index)}>
                  <option value="YES">YES</option>
                  <option value="NO">NO</option>
                </select>
              </td>
              <td className="text-right">
                <FaCheck className="icon tick" onClick={() => handleSave(index)} />
                <FaTrash className="icon delete" onClick={() => handleDelete(index)} />
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      <button onClick={addContact}>Add Contact</button>
    </div>
  );
};

export default VendorContacts;
