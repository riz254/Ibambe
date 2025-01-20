import React from "react";
import { eventList } from "../assets/assets";
import { Link } from "react-router-dom";

const Eventlist = () => {
  return (
    <div
      className="container text-center mx-auto py-4 px-6 md:px-20 lg:px-32 my-20 w-full overflow-hidden"
      id="Events"
    >
      <h1 className="pb-5 underline font-bold text-4xl text-purple-900">
        Upcoming Events
      </h1>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        {eventList.map((event) => (
          <div
            key={event.id}
            className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow"
          >
            {/* Event Image */}
            <img
              src={event.image}
              alt={event.name}
              className="w-full h-48 object-cover"
            />

            {/* Event Details */}
            <div className="p-6">
              <h2 className="font-bold font-serif text-xl mb-2">
                {event.name}
              </h2>
              <div className="flex items-center text-gray-600 mb-2">
                <span className="material-icons text-purple-800 mr-2">
                  location_on
                </span>
                <p className="font-serif text-left">{event.location}</p>
              </div>
              <div className="flex items-center text-gray-600">
                <span className="material-icons text-purple-800 mr-2">
                  attach_money
                </span>
                <p>{event.price}</p>
              </div>
              <div className="container grid">
                <Link
                  to="/events"
                  className="bg-purple-900 hover:bg-purple-700 text-white font-bold py-2 px-4 mt-4 inline-block rounded"
                >
                  View Details
                </Link>
                <button className="bg-purple-900 hover:bg-purple-700 text-white font-bold py-2 px-4 mt-4 inline-block rounded">
                  Buy Ticket
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Eventlist;
