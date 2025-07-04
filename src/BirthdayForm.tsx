import React, { useState } from 'react';

interface BirthdayFormProps {
  onAddBirthday: (name: string, date: string) => void;
}

const BirthdayForm: React.FC<BirthdayFormProps> = () => {
  const [name, setName] = useState('');
  const [date, setDate] = useState('');

  return (
    <form 
      //onSubmit={} 
      className="birthday-form"
    >
      <input
        type="text"
        placeholder="Name"
        //value={}
        //onChange={}
        required
      />
      <input
        type="date"
        //value={}
        //onChange={}
        required
      />
      <button type="submit">Add Birthday</button>
    </form>
  );
};

export default BirthdayForm;
