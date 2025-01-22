import { eventService } from "../../services/event";
import { ticketService } from "../../services/ticket";
import { Event } from "../../types/event";
// import { UserRole } from "../types/user";
import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import Navbar from "../../components/Navbar";
import Footer from "../../components/Footer";
import { Ticket } from "../../types/ticket";
import { Link } from "react-router-dom";

export default function EventsPage() {
  // const { user } = useAuth();
  const navigate = useNavigate(); // React Router hook for navigation

  const [isLoading, setIsLoading] = useState(false);
  const [events, setEvents] = useState<Event[]>([]);

  function onGoToEventPage(id: number) {
    navigate(`/events/${id}`);
  }

  async function buyTicket(id: number) {
    try {
      // Assuming eventId is required for ticket creation
      await ticketService.createOne(id);
      alert("Ticket purchased successfully");
      fetchEvents(); // Refresh the events after purchasing the ticket
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

  const fetchEvents = async () => {
    try {
      setIsLoading(true);
      const response = await eventService.getAll();
      setEvents(response.data);
    } catch (error) {
      alert("Failed to fetch events");
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchEvents();
  }, []);

  return (
    <div
      className="bg-purple-200  bg-cover bg-center bg-no-repeat absolute w-full h-full overflow-y-auto overflow-x-hidden"
      style={{ backgroundImage: `url('/download (2).jpeg')` }}
    >
      <Navbar />
      <div className="container text-center mx-auto py-4 px-6 md:px-20 lg:px-32 my-20 w-full overflow-hidden">
        <div className="flex items-center justify-between">
          <h2 className="text-lg font-bold text-white  font-sans">
            {events.length} Events
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 h-fit w-full place-content-end">
          {events.length === 0 ? (
            <p>No events available</p> // Show a fallback message if no events exist
          ) : (
            events.map((event) => (
              <div
                key={event.id}
                className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow"
              >
                <button
                  onClick={() => onGoToEventPage(event.id)}
                  className="w-full"
                >
                  <div className="flex items-center justify-between p-4 h-32">
                    <img
                      src={event.image}
                      alt={event.name}
                      className="w-full h-full  object-cover"
                    />
                  </div>

                  <div className="grid">
                    <div className="flex justify-evenly">
                      <h2 className="font-bold font-sans text-3xl mb-2">
                        {" "}
                        {event.name}
                      </h2>
                    </div>
                    <div className="flex items-center text-gray-900 mb-2">
                      <span className="material-icons text-purple-800 mx-2">
                        location_on
                      </span>
                      <p className="font-serif ">{event.location}</p>
                    </div>
                    <div className="flex items-center text-gray-600 mb-2">
                      <div className="flex items-center text-gray-600">
                        <span className="material-icons text-purple-800 mx-2">
                          calendar_month
                        </span>
                        <p className="font-sans font-bold text-gray-900">
                          {event.date.split("T")[0] || ""}
                        </p>
                      </div>
                    </div>
                    {/* Arrow Icon */}
                    <div className="flex items-center text-gray-600">
                      <div className="flex items-center text-gray-600">
                        <span className="material-icons text-purple-800 mx-2">
                          attach_money
                        </span>
                        <p>Freee</p>
                      </div>
                    </div>
                  </div>
                </button>

                <div className="my-5">
                  <button
                    className="bg-purple-800 hover:bg-purple-700 text-white font-bold py-2 px 
                  -4 rounded font-sans p-8"
                    disabled={isLoading}
                    onClick={() => buyTicket(event.id)}
                  >
                    Buy Ticket
                  </button>
                </div>

                <div className=" grid ">
                  <Link
                    className=" bg-purple-800 hover:bg-purple-700 text-white font-bold py-2 px 
                  -4 rounded"
                    to="/tickets"
                  >
                    Sold: {event.totalTicketsPurchased}
                    <div className="underline font-serif m-2">View Tickets</div>
                  </Link>

                  <span bold fontSize={16} color="green">
                    Validated: {event.totalTicketsEntered}
                  </span>
                </div>
              </div>
            ))
          )}
        </div>
      </div>
      <Footer />
    </div>
  );
}
