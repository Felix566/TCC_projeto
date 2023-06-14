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

import RegistersInputs from "./components/pages/Control/RegistersInputs";
import RegistersOutputs from "./components/pages/Control/RegistersOutputs";
import EditEntrie from "./components/pages/Control/EditEntrie";
import EditExit from "./components/pages/Control/EditExit";
import DashboardEntries from "./components/pages/Control/DashboardEntries";
import DashboardExits from "./components/pages/Control/DashboardExits";

/* Context */
import { UserProvider } from "./context/UserContext";

function App() {
  return (
    <Router>
      <DarkModeProvider>
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

              <Route path="/createInput" element={<RegistersInputs />} />

              <Route path="/entries" element={<DashboardEntries />} />

              <Route path="/entries/edit/:id" element={<EditEntrie />} />

              <Route path="/createOutput" element={<RegistersOutputs />} />

              <Route path="/exits" element={<DashboardExits />} />

              <Route path="/exits/edit/:id" element={<EditExit />} />

              <Route path="*" element={<Error />} />
            </Routes>
          </Container>
          <Footer />
        </UserProvider>
      </DarkModeProvider>
    </Router>
  );
}

export default App;
