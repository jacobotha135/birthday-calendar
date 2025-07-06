import { useState } from 'react';
import './App.css';
import BirthdayForm from './BirthdayForm';
import BirthdayCalendar from './BirthdayCalendar';

function App() {
  // TODO: 1. Implement state management for birthdays
  const [birthdays, setBirthdays] = useState<{ name: string; date: string }[]>([]);

  // Function to add a birthday to state
  const addBirthday = (name: string, date: string) => {
    setBirthdays(prev => [...prev, { name, date }]);
  };

  // FEATURE: Function to delete a birthday entry
  const deleteBirthday = (name: string, date: string) => {
    setBirthdays(prev => prev.filter(b => !(b.name === name && b.date === date)));
  };

  return (
    <>
      <h2>Birthday Calendar App</h2>
      <BirthdayForm onAddBirthday={addBirthday} birthdays={birthdays} />
      <BirthdayCalendar birthdays={birthdays} onDeleteBirthday={deleteBirthday} />
    </>
  );
}

export default App;
