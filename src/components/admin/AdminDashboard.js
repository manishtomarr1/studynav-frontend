import React, { useState, useEffect } from "react";
import axios from "axios";
import AddEvent from "./AddEvent/AddEvent";
import BookedEvents from "./bookedEvents/BookedEvents";
import PendingEvents from "./pendingEvents/PendingEvents";
import SeeEvents from "./see events/SeeEvents";


const AdminDashboard = () => {
  const [events, setEvents] = useState([]);
  const [activeTab, setActiveTab] = useState("addEvent"); // Default active tab

  useEffect(() => {
    fetchEvents();
  }, []);

  const fetchEvents = async () => {
    try {
      const response = await axios.get("/fatchSlot"); // Replace with your actual endpoint
      setEvents(response.data);
    } catch (error) {
      console.error("Error fetching events:", error);
    }
  };
 

  const handleTabClick = (tab) => {
    setActiveTab(tab);
  };

  const handleAddEvent = (newEvent) => {
    setEvents([...events, newEvent]);
  };

  // const handleEventDeleted = async (eventId) => {
  //   try {
  //     const response = await axios.delete(
  //       `/deleteSlot?eventId=${eventId}`
  //     );

  //     console.log("Delete response:", response.data); // Log the response for debugging

  //     if (response.data.message === "Event deleted successfully.") {
  //       const updatedEvents = events.filter((event) => event._id !== eventId);
  //       setEvents(updatedEvents);
  //     }
  //   } catch (error) {
  //     console.error("Error deleting event:", error);
  //   }
  // };

  return (
    <div className="p-4">
      <h1 className="text-2xl font-bold mb-4">Admin Dashboard</h1>
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <button
          className={`${
            activeTab === "addEvent" ? "bg-green-500" : "bg-green-300"
          } text-white py-2 rounded-md`}
          onClick={() => handleTabClick("addEvent")}
        >
          Add Event
        </button>
        <button
          className={`${
            activeTab === "bookedEvents" ? "bg-green-500" : "bg-green-300"
          } text-white py-2 rounded-md`}
          onClick={() => handleTabClick("bookedEvents")}
        >
          Booked Events
        </button>
        <button
          className={`${
            activeTab === "pendingEvents" ? "bg-green-500" : "bg-green-300"
          } text-white py-2 rounded-md`}
          onClick={() => handleTabClick("pendingEvents")}
        >
          Pending Events
        </button>
        <button
          className={`${
            activeTab === "seeEvents" ? "bg-green-500" : "bg-green-300"
          } text-white py-2 rounded-md`}
          onClick={() => handleTabClick("seeEvents")}
        >
          See Events
        </button>
      </div>
      <div className="mt-4">
        {activeTab === "addEvent" && <AddEvent onEventAdded={handleAddEvent} />}
        {activeTab === "bookedEvents" && <BookedEvents />}
        {activeTab === "pendingEvents" && <PendingEvents />}
        {activeTab === "seeEvents" && <SeeEvents />}
      </div>
    </div>
  );
};

export default AdminDashboard;
