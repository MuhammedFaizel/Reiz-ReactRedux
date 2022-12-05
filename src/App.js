import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import UserProfile from "./component/Pages/User/UserProfile";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<UserProfile />} />
      </Routes>
    </Router>
  );
}

export default App;
