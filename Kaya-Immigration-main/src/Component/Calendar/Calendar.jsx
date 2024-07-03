import React, { useState } from "react";
import CalendarComponent from "./CalendarComponent";
import backgroundImage from "../../Assets/backgroundimg4.jpg"; // Import your background image file

const Calendar = () => {
  const [selectedDate, setSelectedDate] = useState(new Date());

  const handleDateChange = (newDate) => {
    setSelectedDate(newDate);
  };

  return (
    <div
      className="flex flex-col justify-start items-center gap-6 bg-cover opacity-70 bg-center h-[89.5vh]"
      style={{ backgroundImage: `url(${backgroundImage})` }}
    >
      <h1 className="mt-4 text-xl font-semibold text-black">
        Appointment Scheduler
      </h1>
      <CalendarComponent onChange={handleDateChange} />
    </div>
  );
};

export default Calendar;
