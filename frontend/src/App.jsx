 Feature-home
import Footer from "../../../src/components/Footer";
import Navbar from "./components/NavbarH";
import AnimatedRoutes from "./routes/AnimatedRoutes";
import React from "react";
import { BrowserRouter as Router } from "react-router-dom";
function App() {
  return (
    <Router>
      <div className="flex flex-col min-h-screen">
        <Navbar />
        <main className="flex-grow">
          {/* Uncomment below to use routes */}
          <AnimatedRoutes />
          {/* <Mainpanel /> */}
        </main>
        <Footer />
      </div>
    </Router>
  );
}
export default App;