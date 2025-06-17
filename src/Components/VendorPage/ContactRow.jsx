import React, { useState } from 'react';
import { FaCheck, FaTrash } from 'react-icons/fa';
import { toast } from 'react-toastify';

const ContactRow = ({
  contact,
  index,
  contacts,
  setContacts,
  handleDelete,
  vendorId,
  createdBy,
  dispatch,
  putcontactRequest,
  createContactRequest,
}) => {
  const [name, setName] = useState(contact.name || '');
  const [email, setEmail] = useState(contact.email || '');
  const [mobileNo, setMobileNo] = useState(contact.mobileNo || '');

  const handleSubmit = () => {
    if (!name.trim() || !email.trim() || !mobileNo.trim()) {
      toast.error('Please fill all fields');
      return;
    }
const validateContacts = () => {
  const filled = contacts.filter(c => c.name && c.email && c.mobileNo);

  const defaultCount = filled.filter(
    (c) => c.isDefault === 'YES' || c.isDefault === true
  ).length;

  if (defaultCount === 0) {
    toast.error("At least one contact must be marked as default");
    return false;
  }

  if (defaultCount > 1) {
    toast.error("Only one contact can be marked as default");
    return false;
  }

  return true;
};


    const con = {
      name,
      email,
      mobileNo,
      isDefault: contact.isDefault === 'YES' || contact.isDefault === true,
      vendorId,
      createdBy,
    };

    if (contact.id) {
      dispatch(putcontactRequest({ ...con, id: contact.id }));
    } else {
      dispatch(createContactRequest(con));
    }
  };

  const handleSelectChange = (e) => {
    const value = e.target.value;
    const updated = [...contacts];
    updated[index].isDefault = value;
    setContacts(updated);
  };

  return (
    <tr>
      <td>{index + 1}</td>
      <td>
        <input
          type="text"
          value={name}
          onChange={(e) => setName(e.target.value)}
          placeholder="Name"
        />
      </td>
      <td>
        <input
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="Email"
        />
      </td>
      <td>
        <input
          type="number"
          value={mobileNo}
          onChange={(e) => setMobileNo(e.target.value)}
          placeholder="Phone"
        />
      </td>
      <td>
        <select
          value={
            contact.isDefault === true || contact.isDefault === 'YES'
              ? 'YES'
              : 'NO'
          }
          onChange={handleSelectChange}
        >
          <option value="YES">YES</option>
          <option value="NO">NO</option>
        </select>
      </td>
      <td className="text-right">
        <FaCheck className="icon tick" onClick={handleSubmit} />
        <FaTrash className="icon delete" onClick={() => handleDelete(index)} />
      </td>
    </tr>
  );
};

export default ContactRow;
