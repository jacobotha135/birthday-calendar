import React, { useState } from 'react';

// TODO: Bonus - Implement birthdays type interface
interface BirthdayCalendarProps {
  birthdays: any[];
}

const BirthdayCalendar: React.FC<BirthdayCalendarProps> = () => {
  const today = new Date();
  const [currentYear, setCurrentYear] = useState(today.getFullYear());
  const [currentMonth, setCurrentMonth] = useState(today.getMonth());
  const [selectedDate, setSelectedDate] = useState<string>(today.toISOString().slice(0, 10));

  const daysInMonth = new Date(currentYear, currentMonth + 1, 0).getDate();

  // Helper to format date as yyyy-mm-dd
  const formatDate = (d: number) => {
    const mm = (currentMonth + 1).toString().padStart(2, '0');
    const dd = d.toString().padStart(2, '0');
    return `${currentYear}-${mm}-${dd}`;
  };

  const selected = new Date(selectedDate);
  const selectedMonth = selected.getMonth() + 1;
  const selectedDay = selected.getDate();

  // Month navigation handlers
  const handlePrevMonth = () => {
    if (currentMonth === 0) {
      setCurrentMonth(11);
      setCurrentYear(y => y - 1);
    } else {
      setCurrentMonth(m => m - 1);
    }
    setSelectedDate(`${currentYear}-${(currentMonth === 0 ? 12 : currentMonth).toString().padStart(2, '0')}-01`);
  };

  const handleNextMonth = () => {
    if (currentMonth === 11) {
      setCurrentMonth(0);
      setCurrentYear(y => y + 1);
    } else {
      setCurrentMonth(m => m + 1);
    }
    setSelectedDate(`${currentYear}-${(currentMonth === 11 ? 1 : currentMonth + 2).toString().padStart(2, '0')}-01`);
  };

  // Month names
  const monthNames = [
    'January', 'February', 'March', 'April', 'May', 'June',
    'July', 'August', 'September', 'October', 'November', 'December'
  ];

  return (
    <div className="birthday-calendar">
      <h2>Birthday Calendar</h2>
      <div style={{ display: 'flex', alignItems: 'center', marginBottom: 8 }}>
        <button onClick={handlePrevMonth}>&lt;</button>
        <span style={{ margin: '0 12px' }}>{monthNames[currentMonth]} {currentYear}</span>
        <button onClick={handleNextMonth}>&gt;</button>
      </div>
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(7, 1fr)', gap: 4, marginBottom: 16 }}>
        {[...Array(daysInMonth)].map((_, i) => {
          const dateStr = formatDate(i + 1);
          return (
            <button
              key={dateStr}
              style={{
                padding: 8,
                background: selectedDate === dateStr ? '#b3e5fc' : '#fff',
                border: '1px solid #ccc',
                borderRadius: 4,
                cursor: 'pointer',
              }}
              onClick={() => setSelectedDate(dateStr)}
            >
              {i + 1}
            </button>
          );
        })}
      </div>
      <div>
        <strong>{selectedDate && new Date(selectedDate).toLocaleDateString()}</strong>
        {/* TODO: Show birthdays for this date that was added from the BirthdayForm component. */}
      </div>
    </div>
  );
};

export default BirthdayCalendar;
