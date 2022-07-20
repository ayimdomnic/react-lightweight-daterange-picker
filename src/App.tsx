import "./index.css";
import Calendar from "./components/Calendar";

function App() {
  return <Calendar startDate={new Date().getTime()} />;
}

export default App;
