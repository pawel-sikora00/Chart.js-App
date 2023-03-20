import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import DashBoard from "./components/Dashboard";

function App() {
  return (
    <div>
      <Router>
        <Routes>
          <Route path="/" element={<DashBoard />} />
        </Routes>
      </Router>
    </div>
  );
}

export default App;
