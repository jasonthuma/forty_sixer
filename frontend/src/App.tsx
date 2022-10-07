import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Register from "./pages/Register";
import Login from "./pages/Login";
import Dashboard from "./pages/Dashboard";
import Header from "./components/Header";
import Footer from "./components/Footer";
import Rules from "./pages/Rules";
import Gear from "./pages/Gear";
import MountainJournal from "./pages/MountainJournal";
import RecordHike from "./pages/RecordHike";

function App() {
  return (
    <>
      <Router>
        <div className="margins">
          <Header />
          <Routes>
            <Route path="/" element={<Dashboard />} />
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
            <Route path="/rules" element={<Rules />} />
            <Route path="/gear" element={<Gear />} />
            <Route path="/journal" element={<MountainJournal />} />
            <Route path="/record" element={<RecordHike />} />
          </Routes>
          <Footer />
        </div>
      </Router>
    </>
  );
}

export default App;
