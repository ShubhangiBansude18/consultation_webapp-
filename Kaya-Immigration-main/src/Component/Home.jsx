// Home.jsx
import React, { useState, useEffect } from "react";
import { Carousel } from "react-responsive-carousel";
import "react-responsive-carousel/lib/styles/carousel.min.css";
import Cards from "./Home/Cards";
import Home1 from "../Assets/Home-1.jpg";
import Home2 from "../Assets/Home-2.jpg";
import Home3 from "../Assets/Home-3.jpg";
import HowItWorks from "./Home/HowItWorks";
import NewsAndTips from "./Home/NewsAndTips";
import FAQ from "./Home/FAQ";
import GetInTouch from "./Home/GetInTouch";
import { Link, useNavigate } from "react-router-dom";
import Footer from "./Footer";
import supabase from "../Component/SupabaseClient";

const Home = () => {
  const [session, setSession] = useState(null);
  const navigate = useNavigate();

  const legendStyles = {
    color: "white",
    fontSize: "75px",
    fontWeight: "bold",
    backgroundColor: "rgba(0, 0, 0, 0.5)",
    position: "absolute",
    top: "50%",
    left: "95%",
    transform: "translate(-50%, -50%)",
  };

  const buttonStyles = {
    position: "absolute",
    bottom: "70px",
    left: "50%",
    transform: "translateX(-50%)",
    padding: "10px 20px",
    fontSize: "16px",
    backgroundColor: "#3498db",
    color: "#fff",
    borderRadius: "5px",
    cursor: "pointer",
  };

  useEffect(() => {
    supabase.auth.getSession().then(({ data: { session } }) => {
      setSession(session);
    });

    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange((_event, session) => {
      setSession(session);
    });

    console.log(session);
    return () => subscription.unsubscribe();
  }, []);

  const handleBookAppointment = () => {
    if (session === null) {
      // If session is null, show an alert to prompt the user to login
      alert("Please login to book an appointment.");
    } else {
      // If session exists, navigate to the "/calendar" route
      navigate("/calendar");
    }
  };

  return (
    <div className="text-black">
      <Carousel showThumbs={false} dynamicHeight={false}>
        <div style={{ position: "relative" }}>
          <img
            src={Home1}
            alt="Home 1"
            style={{ maxHeight: "800px" }}
            loading="lazy"
          />
          <p className="legend" style={legendStyles}>
            We turn your Immigration dream into reality
          </p>

          <button style={buttonStyles} onClick={handleBookAppointment}>
            Book an Appointment
          </button>
        </div>
        <div style={{ position: "relative" }}>
          <img
            src={Home2}
            alt="Home 2"
            style={{ maxHeight: "800px" }}
            loading="lazy"
          />
          <p className="legend" style={legendStyles}>
            Immigration strategies that no other consultancies offer
          </p>
          <button style={buttonStyles} onClick={handleBookAppointment}>
            Book an Appointment
          </button>
        </div>
        <div style={{ position: "relative" }}>
          <img
            src={Home3}
            alt="Home 3"
            style={{ maxHeight: "800px" }}
            loading="lazy"
          />
          <p className="legend" style={legendStyles}>
            Kaya Immigration
            <p>The Smart Choice</p> for future
          </p>
          <button style={buttonStyles} onClick={handleBookAppointment}>
            Book an Appointment
          </button>
        </div>
      </Carousel>
      <HowItWorks />
      <div className="max-w-4xl mx-auto mt-8">
        <Cards />
      </div>
      <NewsAndTips />
      <GetInTouch />
      <FAQ className="mt-10" />
      <Footer />
      {/* <AuthFile /> */}
    </div>
  );
};

export default Home;
