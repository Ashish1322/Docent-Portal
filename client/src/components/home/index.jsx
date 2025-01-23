import React from "react";
import Header from "./components/Header";
import "./css/style.css";
import Hero from "./components/Hero";
import Stats from "./components/Stats";
import Services from "./components/Services";
import About from "./components/About";
import Doctors from "./components/Doctors/Doctors";
import Reviews from "./components/Reviews";
import Footer from "./components/Footer";
export default function Home() {
  return (
    <>
      <Header />
      <Hero />
      <Stats />
      <Services />
      <About />
      <Doctors />
      <Reviews />
      <Footer />
    </>
  );
}
