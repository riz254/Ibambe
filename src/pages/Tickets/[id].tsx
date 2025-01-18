import React, { useState, useEffect, useCallback } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { ticketService } from "../../services/ticket";

const TicketDetailScreen = () => {
  const navigate = useNavigate();
  const { id } = useParams();

  const [ticket, setTicket] = useState<Ticket | null>(null); // Using Ticket type
  const [qrcode, setQrcode] = useState(null);

  const fetchTicket = async () => {
    try {
      const { data } = await ticketService.getOne(Number(id));
      setTicket(data.ticket);
      setQrcode(data.qrcode);
    } catch (error) {
      navigate(-1); // Go back if there is an error
    }
  };

  useEffect(() => {
    fetchTicket();
  }, [id]);

  if (!ticket) return null;

  return (
    <div className="max-w-lg mx-auto my-10 p-6 bg-white rounded-lg shadow-lg">
      <h1 className="text-4xl font-bold mb-4">{ticket.event.name}</h1>
      <p className="text-lg font-semibold mb-2">{ticket.event.location}</p>
      <p className="text-gray-600 text-sm mb-4">
        {new Date(ticket.event.date).toLocaleString()}
      </p>

      <div className="flex justify-center mb-4">
        <img
          className="w-64 h-64 rounded-lg"
          src={`data:image/png;base64,${qrcode}`}
          alt="Ticket QR Code"
        />
      </div>
    </div>
  );
};

export default TicketDetailScreen;
