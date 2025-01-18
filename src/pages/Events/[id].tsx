import { useParams, useNavigate } from "react-router-dom";
import { useState, useEffect, useCallback } from "react";
import { eventService } from "../../services/event"; // Adjust import path
import Header from "../../components/Header";
import Event from "../../types/event";
import { ticketService } from "../../services/ticket";
import Navbar from "../../components/Navbar";

const EventDetailsPage = () => {
  const { id } = useParams(); // Get the event ID from the URL
  const navigate = useNavigate();

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [eventData, setEventData] = useState<Event | null>(null);
  const [error, setError] = useState("");

  // Update event field
  const updateField = (field: string, value: string | Date) => {
    setEventData((prev: any) => ({
      ...prev,
      [field]: value,
    }));
  };

  async function buyTicket(id: number) {
    try {
      // Assuming eventId is required for ticket creation
      await ticketService.createOne(id);
      alert("Ticket purchased successfully");
      fetchEvent(); // Refresh the event after purchasing the ticket
    } catch (error) {
      console.error("Error buying ticket:", error);
      // Extracting more details about the error for debugging purposes
      if (error.response) {
        console.error("Error response:", error.response);
        alert(
          `Error: ${error.response.data.message || "Failed to buy ticket"}`
        );
      } else {
        alert("Failed to buy ticket");
      }
    }
  }

  // Fetch event details
  const fetchEvent = useCallback(async () => {
    try {
      const response = await eventService.getOne(Number(id));
      setEventData(response.data);
    } catch (error) {
      setError("Failed to fetch event details");
      navigate("/events");
    }
  }, [id, navigate]);

  useEffect(() => {
    fetchEvent();
  }, [fetchEvent]);

  // Handle save changes
  const onSubmitChanges = async () => {
    if (!eventData) return;
    try {
      setIsSubmitting(true);
      await eventService.updateOne(
        Number(id),
        eventData.name,
        eventData.location,
        eventData.date
      );
      navigate(`/events`);
    } catch (error) {
      setError("Failed to update event");
    } finally {
      setIsSubmitting(false);
    }
  };

  // Handle delete event
  const onDelete = async () => {
    if (!eventData) return;
    try {
      const confirmed = window.confirm(
        "Are you sure you want to delete this event?"
      );
      if (confirmed) {
        await eventService.deleteOne(Number(id));
        navigate("/events");
      }
    } catch (error) {
      setError("Failed to delete event");
    }
  };

  return (
    <div
      className="bg-purple-200  bg-cover bg-center bg-no-repeat absolute w-full h-fit opacity-100"
      style={{ backgroundImage: `url('/download (2).jpeg')` }}
    >
      {" "}
      <Navbar />
      <div className="p-6 max-w-4xl mx-auto">
        {eventData ? (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 h-fit w-full place-content-end mt-20">
            <div>
              {/* Display event image */}
              <img
                src={eventData.imageUrl || "/iBAMBE__1_-removebg-preview.png"} // Use default image if none
                alt={eventData.name}
                className="w-full h-fit bg-white object-cover"
              />
            </div>
            <div>
              <h2 className="text-2xl font-bold s">Name:</h2>
              <h2 className="text-3xl font-sans m-3 text-center">
                {" "}
                {eventData.name}
              </h2>
              <p className="text-2xl font-bold">Where:</p>
              <p className="text-3xl font-sans m-3 text-center">
                {" "}
                {eventData.location}
              </p>
              <p className="text-2xl font-bold">When:</p>
              <p className="text-3xl font-sans m-3 text-center">
                {new Date(eventData.date).toLocaleString()}
              </p>
              {/* Format the date */}
              <p className="text-2xl font-bold ">Price:</p>
              <p className="text-3xl m-3 text-center font-thin"> Free</p>
            </div>
          </div>
        ) : (
          <p>Loading event details...</p>
        )}

        <h2 className="text-3xl font-bold mb-6 underline ">Edit Event</h2>

        {error && <p className="text-red-500 text-center">{error}</p>}

        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700">
              Event Name
            </label>
            <input
              value={eventData?.name || ""}
              onChange={(e) => updateField("name", e.target.value)}
              placeholder="Event Name"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700">
              Location
            </label>
            <input
              value={eventData?.location || ""}
              onChange={(e) => updateField("location", e.target.value)}
              placeholder="Event Location"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700">
              Date
            </label>
            <input
              type="date"
              value={eventData?.date?.split("T")[0] || ""}
              onChange={(e) => updateField("date", e.target.value)}
            />
          </div>

          <div className="flex justify-between gap-4 mt-6">
            <button
              onClick={onSubmitChanges}
              className="w-1/2 bg-blue-600 text-white py-2 rounded"
            >
              {isSubmitting ? "Saving Changes..." : "Save Event"}
            </button>
            <button
              onClick={onDelete}
              className="w-1/2 bg-red-600 text-white py-2 rounded"
            >
              Delete Event
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default EventDetailsPage;
