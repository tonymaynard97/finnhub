import { useState } from "react";
import DayPickerInput from "react-day-picker/DayPickerInput";
import { formatDate, parseDate } from "react-day-picker/moment";
import "react-day-picker/lib/style.css";

export const DatePicker = ({ handleChange, value }) => {
  const [date, setDate] = useState(value);

  const handleDayChange = (day) => {
    setDate(day);
    handleChange(day);
  };
  return (
    <DayPickerInput
      style={{ width: "90px", margin: "0 10px" }}
      value={date}
      formatDate={formatDate}
      parseDate={parseDate}
      onDayChange={handleDayChange}
      dayPickerProps={{
        selectedDays: date,
      }}
    />
  );
};
