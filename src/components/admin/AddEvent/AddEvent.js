import React, { useState } from "react";
import axios from "axios";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { useNavigate } from "react-router-dom";
import { logout } from "../../../context/AuthContext";
import { useAuth } from "../../../context/AuthContext";

const AddEvent = ({ onEventAdded }) => {
  const navigate = useNavigate();
  const [selectedDateTime, setSelectedDateTime] = useState(new Date());
  const [successMessage, setSuccessMessage] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const { authToken } = useAuth(); // Assuming authToken is stored in your context

  const handleAddEvent = async () => {
  console.log(authToken)
    try {
      const response = await axios.post("/addSlot", {
        date: selectedDateTime,
        booked: false,
      }, {
        headers: {
          Authorization: `Bearer ${authToken}`,  // Include "Bearer" before the token
        },
      });
  
      const newSlot = response.data;
  
      onEventAdded(newSlot);
  
      setSelectedDateTime(new Date());
      setSuccessMessage("Event added successfully!");
      setErrorMessage("");
  
      setTimeout(() => {
        setSuccessMessage("");
      }, 5000); // Clear success message after 5 seconds
    } catch (error) {
      console.error("Error adding slot:", error);
      setErrorMessage("An error occurred while adding the event.");
      setSuccessMessage("");
  
      setTimeout(() => {
        setErrorMessage("");
      }, 5000); // Clear error message after 5 seconds
    }
  };

  const handleLogout = () => {
    localStorage.removeItem("authToken");

    // Call the logout function from the AuthContext
    logout();

    navigate('/');
  };

  return (
    <div className="bg-white p-4 shadow-md rounded-md">
      <h2 className="text-lg font-semibold mb-2">Add Event</h2>
      <DatePicker
        selected={selectedDateTime}
        onChange={(date) => setSelectedDateTime(date)}
        showTimeSelect
        timeFormat="HH:mm"
        timeIntervals={15}
        dateFormat="d MMMM, yyyy h:mm aa"
        className="w-full mb-2 p-2 border border-gray-300 rounded-md"
      />
      <button
        onClick={handleAddEvent}
        className="bg-purple-500 text-white px-4 py-2 rounded-md hover:bg-purple-600 ml-3"
      >
        Add Event
      </button>
      {successMessage && <p className="text-green-600">{successMessage}</p>}
      {errorMessage && <p className="text-red-600">{errorMessage}</p>}
      <div className="">
        <button
          className="bg-pink-500 text-white px-4 py-2 rounded-md hover:bg-pink-600 mt-5"
          onClick={handleLogout}
        >
          Logout
        </button>
      </div>
    </div>
  );
};

export default AddEvent;
