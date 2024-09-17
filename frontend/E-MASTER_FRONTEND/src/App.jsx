import React from "react";
import Footer from "./components/Footer/Footer";
import Navbar from "./components/Navbar/Navbar";
import Routes from "./components/routes/Routes";

const App = () => {
  return (
    <main className="overflow-x-hidden bg-white text-dark">
     
     <Navbar />
     <Routes/>
    <Footer />
      
    </main>
  );
};

export default App;

