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

  // const [day, setDay] = useState(0);
  // const [month, setMonth] = useState(0);

  const calCulateMathBirth = (_date) => {
    let date = _date;

    // const day = date.getDate();
    // const month = date.getMonth() + 1;

    // setDay(day);
    // setMonth(month);

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
      <div>
        <DatePicker
          selected={selectedDate}
          onChange={(date) => {
            // const day = date.getDate();
            // const month = date.getMonth();

            setDisplayValue("inline");
            setSelectedDate(date);

            calCulateMathBirth(date);
          }}
          placeholderText="Select your date of birth"
          dateFormat="MM/dd"
          minDate={new Date(`${new Date().getFullYear()}-01-01`)}
          maxDate={new Date(`${new Date().getFullYear()}-12-31`)}
          isClearable
          // showMonthDropdown
          // dateFormatCalendar=" "
        />
      </div>
      <div style={{ display: displayValue }}>{mathBirthStr}</div>
    </div>
  );
}
export default App;
