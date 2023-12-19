import React, { useState } from "react";
import axios from "axios";

import { useForm, ValidationError } from "@formspree/react";

function SlotForm(props) {
  const [studentName, setStudentName] = useState("");
  const [studentEmail, setStudentEmail] = useState("");
  const [studentCountry, setStudentCountry] = useState("");

  const [formSubmitted, setFormSubmitted] = useState(false);

  const [state, handleSubmit] = useForm("xdoreyyo");

  const updateStudentName = async (e) => {
    const eventId = props.slotId;
    try {
      const response = await axios.put(`/updateNameInSlot?eventId=${eventId}`, {
        name: studentName,
        email: studentEmail,
      });

      if (response.status === 200) {
        console.log("Student name added successfully");
        // setNameOfStudent();
      } else {
        console.error("Failed to book slot");
      }
    } catch (error) {
      console.error(error);
    }
  };

  const handleFormSubmit = async (e) => {
    await handleSubmit(e);
    // if (state.succeeded) {
    e.target.reset(); // Reset the form values

    // Get the slot ID from somewhere (you'll need to adapt this part)
    const eventId = props.slotId;

    // Make the PUT request to update the booked status using Axios
    try {
      const response = await axios.put(`/updateSlot?eventId=${eventId}`);

      if (response.status === 200) {
        console.log("Slot booked successfully");
        setFormSubmitted(true);
      } else {
        console.error("Failed to book slot");
      }

      updateStudentName();
    } catch (error) {
      console.error(error);
    }
    // }
  };

  return (
    <div>
      {formSubmitted ? (
        <div className="text-center">
          <p>Thank you for submitting your details!</p>
          <p>I will review your information and get back to you.</p>
          <p>Check your email for the meeting link.</p>
          <p>Meeting time is 15 minutes.</p>
        </div>
      ) : (
        <form
          onSubmit={handleFormSubmit}
          className="max-w-md mx-auto p-4 border rounded-lg shadow-md"
        >
          <label htmlFor="name" className="block mb-2 font-medium">
            Name
          </label>
          <input
            id="name"
            type="text"
            name="name"
            className="w-full px-3 py-2 border rounded"
            value={studentName} // Bind the input value to the state
            onChange={(e) => setStudentName(e.target.value)} // Update state on input change
            required
          />

          <ValidationError prefix="Name" field="name" errors={state.errors} />

          <label htmlFor="email" className="block mt-4 mb-2 font-medium">
            Email Address
          </label>
          <input
            id="email"
            type="email"
            name="email"
            className="w-full px-3 py-2 border rounded"
            value={studentEmail} // Bind the input value to the state
            onChange={(e) => setStudentEmail(e.target.value)} // Update state on input change
            required
          />
          <ValidationError prefix="Email" field="email" errors={state.errors} />

          <label htmlFor="country" className="block mt-4 mb-2 font-medium">
            Country
          </label>
          <input
            id="country"
            name="country"
            className="w-full px-3 py-2 border rounded"
            value={studentCountry} // Bind the input value to the state
            onChange={(e) => setStudentCountry(e.target.value)} // Update state on input change
            required
          />

          <label className="block mt-4 mb-2 font-medium">Gender</label>
          <div className="flex items-center space-x-4">
            <label>
              <input
                type="checkbox"
                name="gender"
                value="male"
                className="mr-2"
              />
              Male
            </label>
            <label>
              <input
                type="checkbox"
                name="gender"
                value="female"
                className="mr-2"
              />
              Female
            </label>
          </div>

          <label
            htmlFor="interestedArea"
            className="block mt-4 mb-2 font-medium"
          >
            Interested Area
          </label>
          <select
            id="interestedArea"
            name="interestedArea"
            className="w-full px-3 py-2 border rounded"
            required
          >
            <option value="postgraduation">Postgraduation</option>
            <option value="graduation">Graduation</option>
          </select>

          <label
            htmlFor="discussionTopic"
            className="block mt-4 mb-2 font-medium"
          >
            Discussion Topics
          </label>
          <div className="max-w-sm">
            <div className="flex flex-wrap space-x-4">
              <label>
                <input
                  type="checkbox"
                  name="discussionTopic"
                  value="university"
                  className="mr-2"
                />
                University & Course Selection
              </label>
              <label>
                <input
                  type="checkbox"
                  name="discussionTopic"
                  value="application"
                  className="mr-2"
                />
                Application Process
              </label>
              <label>
                <input
                  type="checkbox"
                  name="discussionTopic"
                  value="scholarships"
                  className="mr-2"
                />
                Scholarships and Education Loan
              </label>
              <label>
                <input
                  type="checkbox"
                  name="discussionTopic"
                  value="visa"
                  className="mr-2"
                />
                Visa Process
              </label>
              <label>
                <input
                  type="checkbox"
                  name="discussionTopic"
                  value="accommodation"
                  className="mr-2"
                />
                Accommodation
              </label>
            </div>
          </div>

          <label
            htmlFor="doubtsQuestion"
            className="block mt-4 mb-2 font-medium"
          >
            Doubts/Questions
          </label>
          <textarea
            id="doubtsQuestion"
            name="doubtsQuestion"
            className="w-full px-3 py-2 border rounded"
            required
          />
          <ValidationError
            prefix="Doubts/Questions"
            field="doubtsQuestion"
            errors={state.errors}
          />
          <p className="text-gray-600 text-sm mt-2">
            <span className="font-bold text-blue-500">Note:</span> Please book
            the slot if you genuinely have some doubts, seek guidance, and want
            to know more about studying in the UK. This service is free of cost,
            and i encourage needy students to take advantage of it.
          </p>

          <button
            type="submit"
            disabled={state.submitting}
            className="bg-gray-800 mt-4 text-white px-4 py-2 rounded transition ease-in-out delay-15 hover:-translate-y-1 hover:scale-110 hover:bg-gray-600 duration-300"
          >
            Submit
          </button>
        </form>
      )}
    </div>
  );
}

export default SlotForm;
