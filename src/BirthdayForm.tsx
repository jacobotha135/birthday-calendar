import React, { useState } from 'react';
import { toast } from 'react-toastify';

// Props expected by this component
interface Birthday {
  name: string;
  date: string;
}

interface BirthdayFormProps {
  onAddBirthday: (name: string, date: string) => void;
  birthdays: Birthday[];
}

const BirthdayForm: React.FC<BirthdayFormProps> = ({ onAddBirthday, birthdays }) => {
  const [name, setName] = useState('');
  const [date, setDate] = useState('');

  // handleSubmit function runs when the user submits the form
  // It validates the input, shows an error if needed, or adds the birthday
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
  
    if (!name.trim() || !date) {
      toast.error('Please enter both a name and a valid date!');
      return;
    }
  
    const normalizedName = name.trim().toLowerCase();
  
    const existsByName = birthdays.some(
      b => b.name.trim().toLowerCase() === normalizedName
    );
    if (existsByName) {
      toast.error(`${name} is already on the birthday list.`);
      return;
    }
  
    const existsExact = birthdays.some(
      b => b.name.trim().toLowerCase() === normalizedName && b.date === date
    );
    if (existsExact) {
      toast.error(`${name} already has a birthday on ${date}`);
      return;
    }
  
    onAddBirthday(name.trim(), date);
    toast.success(`🎉 ${name.trim()}'s birthday was added!`);
    setName('');
    setDate('');
  };

  return (
    <form onSubmit={handleSubmit} style={{ marginBottom: '1rem', display: 'flex', gap: '10px' }}>
      <input
        type="text"
        placeholder="Name"
        value={name}
        onChange={e => setName(e.target.value)}
      />
      <input
        type="date"
        value={date}
        onChange={e => setDate(e.target.value)}
      />
      <button type="submit">Add Birthday</button>
    </form>
  );
};

export default BirthdayForm;
