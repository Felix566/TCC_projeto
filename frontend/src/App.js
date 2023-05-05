import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import React from "react";

/* Components */
import Navbar from "./components/layout/Navbar";
import Footer from "./components/layout/Footer";
import Container from "./components/layout/Container";
import Message from "./components/layout/Message";

/* Pages */
import Login from "./components/pages/Auth/Login";
import Register from "./components/pages/Auth/Register";
import Home from "./components/pages/Home";
import Profile from "./components/pages/User/Profile";
import Donations from "./components/pages/Blood/Donations";
import AddBlood from "./components/pages/Blood/AddBlood";

/* Context */
import { UserProvider } from "./context/UserContext";

function App() {
  return (
    <Router>
      <UserProvider>
        <Navbar />
        <Message />
        <Container>
          <Routes>
            <Route path="/login" element={<Login />} />

            <Route path="/register" element={<Register />} />

            <Route path="/user/profile" element={<Profile />} />

            <Route path="/blood/donations" element={<Donations />} />

            <Route path="/blood/add" element={<AddBlood />} />

            <Route path="/" element={<Home />} />
          </Routes>
        </Container>
        <Footer />
      </UserProvider>
    </Router>
  );
}

export default App;
