import {
  BrowserRouter as Router,
  Route,
  Routes,
  useLocation,
} from "react-router-dom";
import Dashboard from "../src/components/Dashboard.jsx";
import Login from "./components/Login.jsx";
import Register from "./components/Register.jsx";
import Profile from "./components/Profile.jsx";
import Sell from "./components/Sell.jsx";
import Navbar from "./components/Navbar.jsx";
import View from "./components/View.jsx";
import ChatRoom from "./components/messaging/ChatRoom.jsx";
import ListConversations from "./components/messaging/ListConversations.jsx";
// A separate component for content that depends on the router
function AppContent() {
  const location = useLocation();
  const excludeNavbarPaths = ["/login", "/register"];

  const showNavbar = !excludeNavbarPaths.includes(location.pathname);

  return (
    <>
      {showNavbar && <Navbar />}
      <Routes>
        <Route path="/" element={<Dashboard />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/sell" element={<Sell />} />
        <Route path="/view" element={<View />} />
        <Route path="/profile" element={<Profile />} />
        <Route path="/listofconversation" element={<ListConversations />} />
        <Route path="/chatroom" element={<ChatRoom />} />
      </Routes>
    </>
  );
}

function App() {
  return (
    <Router>
      <AppContent /> {/* AppContent is now inside the Router */}
    </Router>
  );
}

export default App;
