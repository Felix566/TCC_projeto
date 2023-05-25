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
import EditBlood from "./components/pages/Blood/EditBlood";

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

            <Route path="/bloods/donations" element={<Donations />} />

            <Route path="/bloods/add" element={<AddBlood />} />

            <Route path="/bloods/edit/:id" element={<EditBlood />} />

            <Route path="/" element={<Home />} />
          </Routes>
        </Container>
        <Footer />
      </UserProvider>
    </Router>
  );
}

export default App;
