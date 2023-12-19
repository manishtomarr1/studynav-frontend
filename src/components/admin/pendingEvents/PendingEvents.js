import React, { useState, useEffect } from "react";
import axios from "axios";

const PendingEvents = () => {
  const [events, setEvents] = useState([]);

  useEffect(() => {
    fetchEvents();
  }, []);

  const fetchEvents = async () => {
    try {
      const response = await axios.get("/fatchSlot"); // Replace with your actual endpoint

      // Filter only the booked events
      const bookedEvents = response.data.filter((event) => event.pending);

      setEvents(bookedEvents);
    } catch (error) {
      console.error("Error fetching events:", error);
    }
  };

  const handleEventConfirm = async (eventId) => {
    try {
      const response = await axios.put(
        `/updatePendingSlot?eventId=${eventId}`
      );

      if (response.data.message === "Event update successfully.") {
        setEvents((prevEvents) =>
          prevEvents.filter((event) => event._id !== eventId)
        );
      }
    } catch (error) {
      console.error("Error updating event:", error);
    }
  };

  const handleEventNotConfirm = async (eventId) => {
    try {
      const response = await axios.put(
        `/updateNotConfirm?eventId=${eventId}`
      );

      if (response.data.message === "Event update successfully.") {
        setEvents((prevEvents) =>
          prevEvents.filter((event) => event._id !== eventId)
        );
      }
    } catch (error) {
      console.error("Error updating event:", error);
    }
  };

  return (
    <div>
      <h2 className="text-lg font-semibold mb-2">Pending Events</h2>
      <ul className="space-y-4">
        {events.map((event) => (
          <li
            key={event._id}
            className="border border-gray-300 p-4 rounded-lg shadow-md"
          >
            <div>
              <strong>Date:</strong> {new Date(event.date).toLocaleDateString()}
            </div>
            <div>
              <strong>Time:</strong> {new Date(event.date).toLocaleTimeString()}
            </div>
            <div>
              <h3>Student Name : {event.studentName}</h3>
            </div>
            <div>
              <h3>Student Email : {event.studentEmail}</h3>
            </div>
            <button
              onClick={() => handleEventConfirm(event._id)}
              className="mt-2 bg-green-500 text-white px-3 py-1 rounded-md hover:bg-green-600"
            >
              Confirm Event
            </button>
            <button
              onClick={() => handleEventNotConfirm(event._id)}
              className="mt-2 ml-2 bg-orange-500 text-white px-3 py-1 rounded-md hover:bg-orange-600"
            >
              Not Confirm Event
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default PendingEvents;
