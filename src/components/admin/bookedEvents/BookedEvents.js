import React, { useState, useEffect } from 'react';
import axios from 'axios';

const BookedEvents = () => {
  const [events, setEvents] = useState([]);

  useEffect(() => {
    fetchEvents();
  }, []);

  const fetchEvents = async () => {
    try {
      const response = await axios.get('/fatchSlot'); // Replace with your actual endpoint
      
      // Filter only the booked events
      const bookedEvents = response.data.filter(event => event.booked);

      setEvents(bookedEvents);
    } catch (error) {
      console.error('Error fetching events:', error);
    }
  };

  const handleEventDeleted = async (eventId) => {
    try {
      const response = await axios.delete(`/deleteSlot?eventId=${eventId}`);

      console.log('Delete response:', response.data); // Log the response for debugging
  
      if (response.data.message === 'Event deleted successfully.') {
        const updatedEvents = events.filter((event) => event._id !== eventId);
        setEvents(updatedEvents);
      }
    } catch (error) {
      console.error('Error deleting event:', error);
    }
  };

  return (
    <div>
      <h2 className="text-lg font-semibold mb-2">Booked Events</h2>
      <ul className="space-y-4 md:grid md:grid-cols-3 md:gap-4">
        {events.map((event) => (
          <li key={event._id} className="border border-gray-300 p-4 rounded-lg shadow-md">
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
              onClick={() => handleEventDeleted(event._id)}
              className="mt-2 bg-red-500 text-white px-3 py-1 rounded-md hover:bg-red-600"
            >
              Delete Event
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default BookedEvents;
