import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import React from "react";

/* Components */
import Navbar from "./components/layout/Navbar";
import Footer from "./components/layout/Footer";
import Container from "./components/layout/Container";
import Message from "./components/layout/Message";
import { DarkModeProvider } from "./components/layout/DarkModeContext";

/* Pages */
import Login from "./components/pages/Auth/Login";
import Register from "./components/pages/Auth/Register";
import Home from "./components/pages/Home";
import Profile from "./components/pages/User/Profile";
import Donations from "./components/pages/Blood/Donations";
import AddBlood from "./components/pages/Blood/AddBlood";
import EditBlood from "./components/pages/Blood/EditBlood";
import Error from "./components/layout/Error";

import DashboardEntries from "./components/pages/Control/DashboardEntries";
import DashboardExits from "./components/pages/Control/DashboardExits";

/* Context */
import { UserProvider } from "./context/UserContext";

function App() {
  return (
    <DarkModeProvider>
      <Router>
        <UserProvider>
          <Navbar />
          <Message />
          <Container>
            <Routes>
              <Route path="/" element={<Login />} />

              <Route path="/register" element={<Register />} />

              <Route path="/user/profile" element={<Profile />} />

              <Route path="/bloods/donations" element={<Donations />} />

              <Route path="/bloods/add" element={<AddBlood />} />

              <Route path="/bloods/edit/:id" element={<EditBlood />} />

              <Route path="/home" element={<Home />} />

              <Route path="/entries" element={<DashboardEntries />} />

              <Route path="/exits" element={<DashboardExits />} />

              <Route path="*" element={<Error />} />
            </Routes>
          </Container>
          <Footer />
        </UserProvider>
      </Router>
    </DarkModeProvider>
  );
}

export default App;
