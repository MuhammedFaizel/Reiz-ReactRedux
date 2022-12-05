import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import UserProfile from "./component/Pages/User/UserProfile";
import "./App.css";

function App() {
  return (
    <div className="App">
      <Router>
        <Routes>
          <Route path="/" element={<UserProfile />} />
        </Routes>
      </Router>
    </div>
  );
}

export default App;
