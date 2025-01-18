import React from "react";
import Header from "../components/Header";
import Eventlist from "../components/Eventlist";
import Footer from "../components/Footer";

const Home = () => {
  return (
    <div className="bg-gray-100">
      <Header />
      <Eventlist />
      <Footer />
    </div>
  );
};

export default Home;
