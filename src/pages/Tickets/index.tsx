import { ticketService } from "../../services/ticket";
import { Event } from "../../types/event";
// import { UserRole } from "../types/user";
import { useNavigate } from "react-router-dom";
import { useCallback, useEffect, useState } from "react";
import Navbar from "../../components/Navbar";
import Footer from "../../components/Footer";
import { Ticket } from "../../types/ticket";

export default function TicketScreen() {
  const navigate = useNavigate();

  const [isLoading, setIsLoading] = useState(false);
  const [tickets, setTickets] = useState<Ticket[]>([]);

  const fetchTickets = useCallback(async () => {
    try {
      setIsLoading(true);
      const response = await ticketService.getAll();
      setTickets(response.data);
    } catch (error) {
      alert("Failed to fetch tickets");
    } finally {
      setIsLoading(false);
    }
  });

  useEffect(() => {
    fetchTickets();
  }, [fetchTickets]);

  const onGoToTicketPage = (id) => {
    navigate(`/tickets/${id}`);
  };

  return (
    <div
      className=" bg-cover bg-center bg-no-repeat absolute w-full h-fit opacity-100"
      style={{ backgroundImage: `url('/download (2).jpeg')` }}
    >
      <Navbar />
      <div className="container mx-auto p-4 pt-6 md:p-6">
        <div className="container mx-auto py-10 px-4 mt-8">
          <h1 className="text-2xl font-bold text-center mb-6">Tickets</h1>
          <p className="text-center font-semibold font-sans mb-4">
            {tickets.length} Tickets Available
          </p>

          {tickets.length === 0 ? (
            <p className="text-center">No tickets available</p>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-6">
              {tickets.map((ticket) => (
                <div
                  key={ticket.id}
                  className={`flex items-stretch bg-white shadow-md rounded-lg overflow-hidden ${
                    ticket.entered ? "opacity-50" : ""
                  } hover:shadow-lg transition-shadow`}
                >
                  <div className="flex-1 p-4">
                    <div className="flex justify-between items-center mb-2">
                      <div className="grid gap-4">
                        <div className="flex">
                          <h3 className="text-sm flex">
                            Ticket Number:
                            <p className="font-sans font-bold ml-4">
                              {ticket.id}
                            </p>
                          </h3>
                        </div>
                        <h3 className="text-sm flex">
                          Event Name:{" "}
                          <p className="font-sans font-bold ml-4">
                            {ticket.event.name} ,
                          </p>
                        </h3>

                        <h3 className=" text-sm flex">
                          Location:
                          <p className="font-sans font-bold ml-4">
                            {ticket.event.location} ,
                          </p>
                        </h3>
                        <h3 className="text-sm flex">
                          Date:{" "}
                          <p className="font-sans font-bold ml-4">
                            {new Date(ticket.event.date).toLocaleString()} ,
                          </p>
                        </h3>
                      </div>
                    </div>

                    <button
                      onClick={() => onGoToTicketPage(ticket.id)}
                      disabled={ticket.entered}
                      className="bg-purple-500 px-8 py-3 mt-4 rounded font-black font-serif hover:text-lg"
                    >
                      {ticket.entered ? "View Details" : "View Ticket"}
                    </button>
                  </div>

                  <div
                    className="w-1 bg-gray-200 flex-shrink-0"
                    style={{ borderStyle: "dashed" }}
                  ></div>

                  {/* <div className="flex flex-col items-center justify-center p-4 bg-gray-50">
                    <p className="text-sm font-bold">
                      {ticket.entered ? "Used" : "Available"}
                    </p>
                    {ticket.entered && (
                      <p className="text-xs text-gray-500 mt-2">
                        {new Date(ticket.updatedAt).toLocaleString()}
                      </p>
                    )}
                  </div> */}
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
      <Footer />
    </div>
  );
}
