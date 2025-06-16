import React from 'react';
import './VendorContacts.css';
import { useDispatch } from 'react-redux';
import {
  createContactRequest,
  deleteContactRequest,
  putcontactRequest,
} from '../Action_file/VendorAction';
import { useParams } from 'react-router';
import ContactRow from './ContactRow';

const VendorContacts = ({ contacts, setContacts }) => {
  const dispatch = useDispatch();
  const { id: vendorId } = useParams();
  const createdBy = "adf8906a-cf9a-490f-a233-4df16fc86c58";

  const handleSetDefault = (index) => {
    const updated = contacts.map((c, i) => ({
      ...c,
      isDefault: i === index ? 'YES' : 'NO',
    }));
    setContacts(updated);
  };

  const handleDelete = (index) => {
    const c = contacts[index];

    if (vendorId && c?.id) {
      dispatch(deleteContactRequest({
        contactId: c.id,
        createdBy,
      }));
    }

    const updated = contacts.filter((_, i) => i !== index);
    setContacts(updated);
  };

  const addContact = () => {
    setContacts([
      ...contacts,
      { name: '', email: '', mobileNo: '', isDefault: 'YES' },
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
            <ContactRow
              key={index}
              contact={c}
              index={index}
              handleDelete={handleDelete}
              handleSetDefault={handleSetDefault}
              vendorId={vendorId}
              createdBy={createdBy}
              dispatch={dispatch}
              putcontactRequest={putcontactRequest}
              createContactRequest={createContactRequest}
            />
          ))}
        </tbody>
      </table>
      <button onClick={addContact}>Add Contact</button>
    </div>
  );
};

export default VendorContacts;
