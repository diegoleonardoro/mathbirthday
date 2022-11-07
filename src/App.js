import React, { useState } from "react";
import DatePicker from "react-datepicker";
import "./App.css";
import "react-datepicker/dist/react-datepicker.css";

function isBeforeToday(date) {
  const today = new Date();

  today.setHours(0, 0, 0, 0);

  return date < today;
}

function App() {
  const [selectedDate, setSelectedDate] = useState(null);

  const [displayValue, setDisplayValue] = useState("none");

  const [mathBirthStr, setMathBirthStr] = useState("");

  const calCulateMathBirth = (_date) => {
    let date = _date;
    const today = new Date();

    let mathBirth;
    if (isBeforeToday(date)) {
      const differenceInTime = today.getTime() - date.getTime();
      const differenceInDays = Math.floor(
        differenceInTime / (1000 * 3600 * 24)
      );

      if (differenceInDays < 10) {
        mathBirth = new Date(date.setDate(date.getDate() + 10));
      } else if (differenceInDays < 100) {
        mathBirth = new Date(date.setDate(date.getDate() + 100));
      } else {
        mathBirth = new Date(date.setDate(date.getDate() + 1000));
      }
    } else {
      mathBirth = new Date(date.setDate(date.getDate() + 1000));
    }

    setMathBirthStr(mathBirth.toDateString());
  };

  return (
    <div className="App">
      <h1 className="header">Math Birthdate</h1>

      <div className="container">
        <div>
          <DatePicker
            selected={selectedDate}
            onChange={(date) => {
              setDisplayValue("inline");
              setSelectedDate(date);
              calCulateMathBirth(date);
            }}
            placeholderText="Select your date of birth"
            dateFormat="MM/dd"
            minDate={new Date(`${new Date().getFullYear()}-01-01`)}
            maxDate={new Date(`${new Date().getFullYear()}-12-31`)}
            isClearable
          />
        </div>
        <div className="math-B-day" style={{ display: displayValue }}>
          <h2>Your math birthday is on: </h2>
          {mathBirthStr}
        </div>
      </div>
    </div>
  );
}
export default App;
