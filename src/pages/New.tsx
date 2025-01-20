import { Link } from "react-router-dom";
import Navbar from "../components/Navbar";
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import Footer from "../components/Footer";
import { eventService } from "../services/event";

const New = () => {
  const navigate = useNavigate();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [name, setName] = useState("");
  const [location, setLocation] = useState("");
  const [date, setDate] = useState("");
  const [error, setError] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");

    if (!name || !location || !date) {
      setError("All fields are required.");
      return;
    }

    try {
      setIsSubmitting(true);
      await eventService.createOne(
        name,
        location,
        new Date(date).toISOString()
      );
      navigate("/events"); // Redirect to the events page
    } catch (err) {
      console.error("Failed to add event:", err);
      setError("Failed to create the event. Please try again later.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div
      className=" bg-cover bg-center bg-no-repeat w-full h-full min-h-screen"
      style={{ backgroundImage: `url('/download (2).jpeg')` }}
    >
      <Navbar />

      <div className=" flex justify-center items-center min-h-screen">
        <div className="bg-white p-8 rounded-lg shadow-lg w-100  mt-24 mb-24">
          <h2 className="text-3xl font-bold mb-6 text-center text-purple-700">
            Add Event
          </h2>
          {error && (
            <div className="text-red-500 text-sm mb-4 text-center">{error}</div>
          )}
          <form onSubmit={handleSubmit}>
            <div className="mb-4">
              <label className="block text-sm font-bold mb-2" htmlFor="name">
                Event Name
              </label>
              <input
                id="name"
                type="text"
                value={name}
                autoComplete="off"
                onChange={(e) => setName(e.target.value)}
                className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-purple-500 font-sans"
                placeholder="Enter event name"
                disabled={isSubmitting}
              />
            </div>
            <div className="mb-4">
              <label
                className="block text-sm font-bold mb-2"
                htmlFor="location"
              >
                Event Location
              </label>
              <input
                id="location"
                type="text"
                value={location}
                autoComplete="off"
                onChange={(e) => setLocation(e.target.value)}
                className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-purple-500 font-sans"
                placeholder="Enter event location"
                disabled={isSubmitting}
              />
            </div>
            <div className="mb-4">
              <label className="block text-sm font-bold mb-2" htmlFor="date">
                Event Date
              </label>
              <input
                id="date"
                type="date"
                value={date}
                onChange={(e) => setDate(e.target.value)}
                className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-purple-500 font-sans font-thin "
                disabled={isSubmitting}
              />
            </div>
            <button
              type="submit"
              className="w-full py-2 bg-purple-600 text-white font-bold rounded-md hover:bg-purple-700 disabled:bg-gray-400"
              disabled={isSubmitting}
            >
              {isSubmitting ? "Adding Event..." : "Add Event"}
            </button>
          </form>
          <div className="mt-4 text-center">
            <Link to="/" className="text-purple-600 hover:underline">
              Back to Events
            </Link>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default New;
