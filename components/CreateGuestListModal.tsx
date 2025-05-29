import React, { useState } from 'react';

type Guest = {
  firstName: string;
  lastName: string;
  gender: string;
  email: string;
  contactNumber: string;
};

interface Props {
  eventId: number; 
  onSubmit: (guests: Guest[]) => Promise<void>;
}

const CreateGuestListModal: React.FC<Props> = ({ eventId, onSubmit }) => {
  const [guests, setGuests] = useState<Guest[]>([]);
  const [newGuest, setNewGuest] = useState<Guest>({
    firstName: '',
    lastName: '',
    gender: '',
    email: '',
    contactNumber: ''
  });
  const [confirmChecked, setConfirmChecked] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    setNewGuest({
      ...newGuest,
      [e.target.name]: e.target.value
    });
  };

  const handleAddGuest = () => {
    if (newGuest.firstName && newGuest.email) {
      setGuests([...guests, newGuest]);
      setNewGuest({
        firstName: '',
        lastName: '',
        gender: '',
        email: '',
        contactNumber: ''
      });
    }
  };

  const handleDeleteGuest = (index: number) => {
    const updated = guests.filter((_, i) => i !== index);
    setGuests(updated);
  };

  const handleSubmit = async () => {
    if (!confirmChecked) {
      alert('Please confirm before creating the guest list.');
      return;
    }

    if (guests.length === 0) {
      alert('Please add at least one guest.');
      return;
    }

    setLoading(true);
    try {
      await onSubmit(guests); // 🔄 Use the passed-in handler
      setGuests([]);
      setConfirmChecked(false);
    } catch (err) {
      console.error(err);
      alert('Something went wrong while submitting the guest list.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="modal">
      <h2>Create Guest List</h2>

      <div className="step-indicator">
        <span>Mode of Creation</span> ➜ <span><b>Creating List</b></span>
      </div>

      <table>
        <thead>
          <tr>
            <th>First Name</th><th>Last Name</th><th>Gender</th><th>Email</th><th>SMS</th><th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {guests.map((guest, index) => (
            <tr key={index}>
              <td>{guest.firstName}</td>
              <td>{guest.lastName}</td>
              <td>{guest.gender}</td>
              <td>{guest.email}</td>
              <td>{guest.contactNumber}</td>
              <td>
                <button onClick={() => handleDeleteGuest(index)}>🗑️</button>
              </td>
            </tr>
          ))}
          <tr>
            <td><input name="firstName" value={newGuest.firstName} onChange={handleInputChange} /></td>
            <td><input name="lastName" value={newGuest.lastName} onChange={handleInputChange} /></td>
            <td>
              <select name="gender" value={newGuest.gender} onChange={handleInputChange}>
                <option value="">--</option>
                <option value="Male">Male</option>
                <option value="Female">Female</option>
              </select>
            </td>
            <td><input name="email" type="email" value={newGuest.email} onChange={handleInputChange} /></td>
            <td><input name="contactNumber" value={newGuest.contactNumber} onChange={handleInputChange} /></td>
            <td>
              <button onClick={handleAddGuest}>➕</button>
            </td>
          </tr>
        </tbody>
      </table>

      <label>
        <input
          type="checkbox"
          checked={confirmChecked}
          onChange={() => setConfirmChecked(!confirmChecked)}
        />
        I confirm that the encoded guest list is accurate and up to date.
      </label>

      <div className="modal-actions">
        <button onClick={() => console.log('Back clicked')}>Back</button>
        <button onClick={handleSubmit} disabled={loading}>
          {loading ? 'Submitting...' : 'Create Guest List'}
        </button>
      </div>
    </div>
  );
};

export default CreateGuestListModal;
