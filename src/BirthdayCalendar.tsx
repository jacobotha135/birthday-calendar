import React, { useState } from 'react';
import { toast } from 'react-toastify';

// TODO: Bonus - Implement birthdays type interface
interface Birthday {
  name: string;
  date: string;
}

interface BirthdayCalendarProps {
  birthdays: Birthday[];
  onDeleteBirthday: (name: string, date: string) => void;
}

const BirthdayCalendar: React.FC<BirthdayCalendarProps> = ({ birthdays, onDeleteBirthday }) => {
  const today = new Date();
  const [currentYear, setCurrentYear] = useState(today.getFullYear());
  const [currentMonth, setCurrentMonth] = useState(today.getMonth());
  const [selectedDate, setSelectedDate] = useState<string>(today.toISOString().slice(0, 10));

  const daysInMonth = new Date(currentYear, currentMonth + 1, 0).getDate();

  const formatDate = (d: number) => {
    const mm = (currentMonth + 1).toString().padStart(2, '0');
    const dd = d.toString().padStart(2, '0');
    return `${currentYear}-${mm}-${dd}`;
  };

  const hasBirthday = (dateStr: string) => {
    const target = dateStr.slice(5);
    return birthdays.some(b => b.date.slice(5) === target);
  };

  const birthdaysOnSelectedDate = birthdays
    .filter(b => b.date.slice(5) === selectedDate.slice(5))
    .sort((a, b) => a.name.localeCompare(b.name));

  const birthdaysInCurrentMonth = birthdays
    .filter(b => {
      const bMonth = parseInt(b.date.slice(5, 7));
      return bMonth === currentMonth + 1;
    })
    .sort((a, b) => a.date.localeCompare(b.date));

  const monthName = new Date(currentYear, currentMonth).toLocaleString('default', { month: 'long' });

  const handlePrevMonth = () => {
    if (currentMonth === 0) {
      setCurrentMonth(11);
      setCurrentYear(prev => prev - 1);
    } else {
      setCurrentMonth(prev => prev - 1);
    }
  };

  const handleNextMonth = () => {
    if (currentMonth === 11) {
      setCurrentMonth(0);
      setCurrentYear(prev => prev + 1);
    } else {
      setCurrentMonth(prev => prev + 1);
    }
  };

  return (
    <div>
      {/* Calendar header */}
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 10 }}>
        <button onClick={handlePrevMonth}>Previous</button>
        <h3>{monthName} {currentYear}</h3>
        <button onClick={handleNextMonth}>Next</button>
      </div>

      {/* Weekday labels */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(7, 1fr)', gap: 4, marginBottom: 4, fontWeight: 'bold', textAlign: 'center' }}>
        <div>Mon</div>
        <div>Tue</div>
        <div>Wed</div>
        <div>Thu</div>
        <div>Fri</div>
        <div>Sat</div>
        <div>Sun</div>
      </div>

      {/* Calendar grid */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(7, 1fr)', gap: 4, marginBottom: 16 }}>
        {[...Array(daysInMonth)].map((_, i) => {
          const day = i + 1;
          const dateStr = formatDate(day);
          const isSelected = selectedDate === dateStr;
          const isBirthday = hasBirthday(dateStr);

          return (
            <button
              key={dateStr}
              onClick={() => setSelectedDate(dateStr)}
              className={`day-tile ${isSelected ? 'selected' : ''} ${isBirthday ? 'birthday' : ''}`}
            >
              {day}
              {isBirthday && (
                <span className="cake-icon" style={{ position: 'absolute', top: 4, right: 6 }}>🎂</span>
              )}
            </button>
          );
        })}
      </div>

      {/* Birthdays on selected date */}
      {selectedDate && (
        <div style={{ marginBottom: '1.5rem' }}>
          <div style={{
            backgroundColor: '#f0f0f0',
            border: '1px solid #ccc',
            padding: '10px',
            borderRadius: '6px',
            marginBottom: '0.5rem',
          }}>
            <h4 style={{ margin: 0, color: 'black' }}>
              Birthdays on {new Date(selectedDate).toLocaleDateString()}
            </h4>
          </div>

          {birthdaysOnSelectedDate.length === 0 ? (
            <p>No birthdays on this date.</p>
          ) : (
            <ul>
              {birthdaysOnSelectedDate.map((b, index) => (
                <li key={index} className="birthday-entry">
                  <span>🎂 {b.name}</span>
                  <button
                    onClick={() => {
                      if (confirm(`Delete birthday for ${b.name}?`)) {
                        onDeleteBirthday(b.name, b.date);
                        toast.info(`Deleted birthday for ${b.name}`);
                      }
                    }}
                    className="delete-button"
                  >
                    🗑️
                  </button>
                </li>
              ))}
            </ul>
          )}
        </div>
      )}

      <div>
        <div style={{
          backgroundColor: '#f0f0f0',
          border: '1px solid #ccc',
          padding: '10px',
          borderRadius: '6px',
          marginBottom: '0.5rem',
        }}>
          <h4 style={{ margin: 0, color: 'black' }}>Birthdays This Month</h4>
        </div>

        {birthdaysInCurrentMonth.length === 0 ? (
          <p>No birthdays in this month.</p>
        ) : (
          <ul>
            {birthdaysInCurrentMonth.map((b, index) => (
              <li key={index} className="birthday-entry">
                <span>🎂 {b.name} – {new Date(b.date).toLocaleDateString()}</span>
                <button
                  onClick={() => {
                    if (confirm(`Delete birthday for ${b.name}?`)) {
                      onDeleteBirthday(b.name, b.date);
                      toast.info(`Deleted birthday for ${b.name}`);
                    }
                  }}className="delete-button">
                  🗑️
                </button>
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
};

export default BirthdayCalendar;
