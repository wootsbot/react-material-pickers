import React, { useState } from "react";

// import Calendar from "react-material-pickers-calendar";

import DateRangePicker from "material-pickers-daterange";

const now = new Date();
const yesterdayBegin = new Date(
  now.getFullYear(),
  now.getMonth(),
  now.getDate()
);
const todayEnd = new Date(
  now.getFullYear(),
  now.getMonth(),
  now.getDate(),
  23,
  59,
  59,
  999
);

function HomePage() {
  const [value, onChange] = useState([new Date(), new Date()]);

  console.log("value", value);

  return (
    <div>
      <DateRangePicker
        calendarAriaLabel="Toggle calendar"
        clearAriaLabel="Clear value"
        dayAriaLabel="Day"
        monthAriaLabel="Month"
        nativeInputAriaLabel="Date"
        onChange={onChange}
        value={value}
        yearAriaLabel="Year"
        clearIcon={null}
      />
    </div>
  );
}

export default HomePage;
