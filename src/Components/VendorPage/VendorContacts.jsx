import React, { useEffect } from 'react';
import { FaCheck, FaTrash } from 'react-icons/fa';
import './VendorContacts.css';
import { useDispatch } from 'react-redux';

const VendorContacts = ({ contacts, setContacts }) => {
  // const dispatch = useDispatch()

  const handleFieldChange = (index, field, value) => {
    const updated = [...contacts];
    updated[index][field] = value;
    setContacts(updated);
  };

  const handleDelete = (index) => {
    const updated = contacts.filter((_, i) => i !== index);
    setContacts(updated);
  };

  const handleSetDefault = (index) => {
    const updated = contacts.map((contact, i) => ({
      ...contact,
      isDefault: i === index ? 'YES' : 'NO',
    }));
    setContacts(updated);
  };

  const addContact = () => {
    setContacts([
      ...contacts,
      { name: '', email: '', phoneNo: '', isDefault: '' },
    ]);
  };
  // useEffect(() => {
   
  //    dispatch()
  // },[])

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
          {contacts.map((contact, index) => (
            <tr key={index}>
              <td>{index + 1}</td>
              <td>
                <input
                  type="text"
                  value={contact.name}
                  onChange={(e) => handleFieldChange(index, 'name', e.target.value)}
                />
              </td>
              <td>
                <input
                  type="email"
                  value={contact.email}
                  onChange={(e) => handleFieldChange(index, 'email', e.target.value)}
                />
              </td>
              <td>
                <input
                  type="number"
                  value={contact.mobileNo}
                  onChange={(e) => handleFieldChange(index, 'mobileNo', e.target.value)}
                />
              </td>
              <td>
                <select
                  value={contact.isDefault}
                  onChange={() => handleSetDefault(index,'isDefault')}
                >
                  <option value="YES">YES</option>
                  <option value="NO">NO</option>
                </select>
              </td>
              <td className="text-right">
                <FaCheck
                  className="icon tick"
                  onClick={() => handleSetDefault(index)}
                />
                <FaTrash
                  className="icon delete"
                  onClick={() => handleDelete(index)}
                />
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
