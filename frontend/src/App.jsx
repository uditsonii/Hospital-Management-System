import React from "react";
import IndexRoutes from "./routes/IndexRoutes";
import { BrowserRouter as Router } from "react-router-dom";

function App() {
  return (
    <Router>
        <main className="flex-grow">
          {/* Uncomment below to use routes */}
          <IndexRoutes />
          {/* <MainDashboard /> */}
        </main>
    </Router>
);
}
export default App;


    // <Router>
    //   <div className="flex flex-col min-h-screen">
    //     <IndexNavbar />
    //     <main className="flex-grow">
    //       {/* Uncomment below to use routes */}
    //       <IndexRoutes />
    //       {/* <MainDashboard /> */}
    //     </main>
    //     <Footer />
    //   </div>
    // </Router>
