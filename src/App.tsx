import "./index.css";
import Calendar from "./components/Calendar";
import { useState } from "react";

function App() {
  const [dates, setDates] = useState<{
    startDate: number | undefined;
    endDate: number | undefined;
  }>();
  // console.log("dates :>> ", dates);
  return (
    <Calendar
      // startDate={new Date().getTime()}
      startDate={1582934400000}
      setDates={setDates}
    />
  );
}

export default App;
