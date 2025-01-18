import React from "react";
import { AuthenticationProvider } from "./context/AuthContext"; // Make sure this is imported correctly
import Header from "./components/Header";
import Footer from "./components/Footer";
import Navbar from "./components/Navbar";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Home from "./pages/Home";
import Login from "./pages/Login";
import Register from "./pages/Register";
import New from "./pages/New";
import Events from "./pages/Events/index";
import EventDetailsPage from "./pages/Events/[id]"; // Event details page if you have one
import Tickets from "./pages/Tickets/index";
import TicketDetails from "./pages/Tickets/[id]"; // Event details page if you have one

const App = () => {
  return (
    <Router>
      <AuthenticationProvider>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/new" element={<New />} />
          <Route path="/events" element={<Events />} />
          <Route path="/events/:id" element={<EventDetailsPage />} />
          <Route path="/tickets" element={<Tickets />} />
          <Route path="/tickets/:id" element={<TicketDetails />} />
          {/* Event details */}
        </Routes>
      </AuthenticationProvider>
    </Router>
  );
};

export default App;
