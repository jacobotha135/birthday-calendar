import { useState } from 'react'
import './App.css'
import BirthdayForm from './BirthdayForm'
import BirthdayCalendar from './BirthdayCalendar'

function App() {
  // TODO: 1. Implement state management for birthdays
  // TODO: 2. Share state with BirthdayForm and BirthdayCalendar components

  // TIP: The birthday added from the BirthdayForm component should be consumed in the BirthdayCalendar component.
  return (
    <>
      <h1>Birthday Calendar App</h1>
      <BirthdayForm />
      <BirthdayCalendar />
    </>
  )
}

export default App
