# 🎉 Birthday Calendar App

This is a simple and responsive React + TypeScript application that allows users to add, view, and delete birthdays on a monthly calendar. It was created as part of a frontend developer assessment.

---

## 📌 Features

- ✅ Add a birthday with name and date
- ✅ Prevent duplicate names (case-insensitive)
- ✅ Highlight birthdays on the calendar
- ✅ View birthdays on selected dates
- ✅ See all birthdays for the current month
- ✅ Delete a birthday with confirmation
- ✅ Toast notifications for feedback
- ✅ Responsive layout for mobile & desktop

---

## 🧠 Technologies Used

- ⚛️ React (with Hooks)
- ⛑️ TypeScript
- 💅 CSS (custom & responsive)
- 🔔 React Toastify

---

## 🧪 Validation & Edge Cases

- Names are validated to avoid duplicates (case-insensitive)
- Both `name` and `date` fields are required
- Duplicate entries for the same person are blocked, even with case differences (e.g. `Jaco` vs `jaco`)

---

## 📦 Installation

To run the project locally:

```bash
git clone https://github.com/jacobotha135/birthday-calendar.git
cd birthday-calendar
npm install
npm run dev
