import React, { useState } from "react";
import axios from "axios";
import { REACT_APP_API_BASE_URL } from "../../../config";
import { useForm, ValidationError } from "@formspree/react";

function SlotForm(props) {
  const [studentName, setStudentName] = useState("");
  const [studentEmail, setStudentEmail] = useState("");
  const [studentCountry, setStudentCountry] = useState("");
  const [otp, setOtp] = useState("");
  const [otpSent, setOtpSent] = useState(false);
  const [isEmailVerified, setEmailVerified] = useState(false);
  const [otpError, setOtpError] = useState("");
  const [otpSuccess, setOtpSuccess] = useState("");
  const [otpSentMessage, setOtpSentMessage] = useState("");
  const [emailUsedMessage, setEmailUsedMessage] = useState("");

  const [formSubmitted, setFormSubmitted] = useState(false);
  const [gender, setGender] = useState(""); // New state for gender
  const [interestedArea, setInterestedArea] = useState(""); // New state for interested area
  const [discussionTopics, setDiscussionTopics] = useState([]); // New state for discussion topics
  const [studentDoubtsQuestions, setStudentDoubtsQuestions] = useState("");

  const [state, handleSubmit] = useForm("xdoreyyo");

  const handleGenderChange = (e) => {
    setGender(e.target.value);
  };

  const handleInterestedAreaChange = (e) => {
    setInterestedArea(e.target.value);
    console.log(e.target.value, "area of interest");
  };

  const handleDiscussionTopicChange = (e) => {
    const topic = e.target.value;
    // Check if the topic is already selected
    if (discussionTopics.includes(topic)) {
      // If selected, remove from the array
      setDiscussionTopics((prevTopics) => {
        const updatedTopics = prevTopics.filter(
          (selected) => selected !== topic
        );
        console.log("Discussion Topics:", updatedTopics);
        return updatedTopics;
      });
    } else {
      // If not selected, add to the array
      setDiscussionTopics((prevTopics) => {
        const updatedTopics = [...prevTopics, topic];
        console.log("Discussion Topics:", updatedTopics);
        return updatedTopics;
      });
    }
  };

  const handleDoubtsQuestionsChange = (e) => {
    setStudentDoubtsQuestions(e.target.value);
  };

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

  const sendVerificationEmail = async () => {
    try {
      const response = await axios.post(
        `${REACT_APP_API_BASE_URL}/sendVerificationEmail`,
        {
          email: studentEmail,
        }
      );

      if (response.status === 200) {
        console.log("Verification email sent successfully");
        setOtpSent(true);
        setOtpSentMessage("Verification email sent successfully");
        setEmailUsedMessage(""); // Clear any existing email used message
      } else {
        console.error("Failed to send verification email");
        console.log(response.data.error);
        // Check for specific error conditions
        if (
          response.data.error ===
          "Email is already in use. Please choose another one."
        ) {
          setEmailUsedMessage("This email is already used");
        }
      }
    } catch (error) {
      console.error("Error sending verification email:", error);
      if (
        error.response.data.error ===
        "Email is already in use. Please choose another one."
      ) {
        setEmailUsedMessage("This email is already used");
      } else {
        setEmailUsedMessage("Something went wrong");
      }
    } finally {
      // Clear the messages after 3 seconds
      setTimeout(() => {
        setOtpSentMessage("");
        setEmailUsedMessage("");
      }, 3000);
    }
  };

  const verifyOtp = async () => {
    try {
      const response = await axios.post(`${REACT_APP_API_BASE_URL}/verifyOtp`, {
        email: studentEmail,
        otp: otp,
      });

      if (response.status === 200) {
        console.log("OTP verified successfully");
        setEmailVerified(true);
        setOtpSuccess("OTP verified successfully"); // Set success message
        setOtpError(""); // Clear any existing error message
      } else {
        console.error("OTP verification failed");
        setOtpError("OTP verification failed"); // Set error message
        setOtpSuccess(""); // Clear any existing success message
      }
    } catch (error) {
      console.error("Error verifying OTP:", error);
      setOtpError(error.message || "Error verifying OTP"); // Set error message
      setOtpSuccess(""); // Clear any existing success message
    } finally {
      // Clear the messages after 3 seconds
      setTimeout(() => {
        setOtpError("");
        setOtpSuccess("");
      }, 3000);
    }
  };

  const handleFormSubmit = async (e) => {
    await handleSubmit(e);

    try {
      const response = await axios.put(`/updateSlot?eventId=${props.slotId}`);

      if (response.status === 200) {
        console.log("Slot booked successfully");
        setFormSubmitted(true);
        sendFormDetailsEmail();
      } else {
        console.error("Failed to book slot");
      }

      updateStudentName();
    } catch (error) {
      console.error(error);
    }
  };

  const sendFormDetailsEmail = async () => {
    try {
      const response = await axios.post(
        `${REACT_APP_API_BASE_URL}/sendFormDetailsEmail`,
        {
          name: studentName,
          email: studentEmail,
          country: studentCountry,
          gender,
          interestedArea,
          discussionTopics,
          doubtsQuestions: studentDoubtsQuestions,
        }
      );

      if (response.status === 200) {
        console.log("Form details email sent successfully");
      } else {
        console.error("Failed to send form details email");
      }
    } catch (error) {
      console.error("Error sending form details email:", error);
    }
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
          <div className="mb-4">
            <label htmlFor="name" className="block mb-2 font-medium">
              Name
            </label>
            <input
              id="name"
              type="text"
              name="name"
              className="w-full px-3 py-2 border rounded-l"
              value={studentName}
              onChange={(e) => setStudentName(e.target.value)}
              required
            />
            <label htmlFor="email" className="block mb-2 font-medium">
              Email Address
            </label>
            <div className="flex">
              <input
                id="email"
                type="email"
                name="email"
                className="w-full px-3 py-2 border rounded-l"
                value={studentEmail}
                onChange={(e) => setStudentEmail(e.target.value)}
                required
                disabled={isEmailVerified}
              />
              <button
                onClick={sendVerificationEmail}
                disabled={isEmailVerified}
                className="bg-gray-800 text-white px-4 rounded-r"
                type="button"
              >
                {isEmailVerified ? "Verified" : "Verify"}
              </button>
            </div>
            {otpSentMessage && (
              <p style={{ color: "green" }}>{otpSentMessage}</p>
            )}
            {emailUsedMessage && (
              <p style={{ color: "red" }}>{emailUsedMessage}</p>
            )}
            <ValidationError
              prefix="Email"
              field="email"
              errors={state.errors}
            />
          </div>
          {otpSent && !isEmailVerified && (
            <div className="mb-4">
              <label htmlFor="otp" className="block mb-2 font-medium">
                OTP
              </label>
              <div className="flex">
                <input
                  id="otp"
                  type="text"
                  name="otp"
                  className="w-full px-3 py-2 border rounded-l"
                  value={otp}
                  onChange={(e) => setOtp(e.target.value)}
                  placeholder="Enter OTP"
                />
                <button
                  onClick={verifyOtp}
                  className="bg-gray-800 text-white px-4 rounded-r"
                  type="button"
                >
                  Verify OTP
                </button>
              </div>
              <p className="text-sm text-gray-500 mt-2">
                Note: If you don't receive the OTP, please check your spam
                folder.
              </p>
            </div>
          )}

          {otpError && <p style={{ color: "red" }}>{otpError}</p>}
          {otpSuccess && <p style={{ color: "green" }}>{otpSuccess}</p>}
          <label htmlFor="country" className="block mt-4 mb-2 font-medium">
            Country
          </label>
          <input
            id="country"
            name="country"
            className="w-full px-3 py-2 border rounded"
            value={studentCountry}
            onChange={(e) => setStudentCountry(e.target.value)}
            required
          />
          <label className="block mt-4 mb-2 font-medium">Gender</label>
          <div className="flex items-center space-x-4">
            <label>
              <input
                type="radio"
                name="gender"
                value="male"
                checked={gender === "male"}
                onChange={handleGenderChange}
                className="mr-2"
              />
              Male
            </label>
            <label>
              <input
                type="radio"
                name="gender"
                value="female"
                checked={gender === "female"}
                onChange={handleGenderChange}
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
            value={interestedArea}
            onChange={handleInterestedAreaChange}
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
                  checked={discussionTopics.includes("university")}
                  onChange={handleDiscussionTopicChange}
                  className="mr-2"
                />
                University & Course Selection
              </label>
              <label>
                <input
                  type="checkbox"
                  name="discussionTopic"
                  value="application"
                  checked={discussionTopics.includes("application")}
                  onChange={handleDiscussionTopicChange}
                  className="mr-2"
                />
                Application Process
              </label>
              <label>
                <input
                  type="checkbox"
                  name="discussionTopic"
                  value="scholarships"
                  checked={discussionTopics.includes("scholarships")}
                  onChange={handleDiscussionTopicChange}
                  className="mr-2"
                />
                Scholarships and Education Loan
              </label>
              <label>
                <input
                  type="checkbox"
                  name="discussionTopic"
                  value="visa"
                  checked={discussionTopics.includes("visa")}
                  onChange={handleDiscussionTopicChange}
                  className="mr-2"
                />
                Visa Process
              </label>
              <label>
                <input
                  type="checkbox"
                  name="discussionTopic"
                  value="accommodation"
                  checked={discussionTopics.includes("accommodation")}
                  onChange={handleDiscussionTopicChange}
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
            value={studentDoubtsQuestions}
            onChange={handleDoubtsQuestionsChange}
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
            disabled={state.submitting || !isEmailVerified}
            className="bg-gray-800 mt-4 text-white px-4 py-2 rounded transition ease-in-out delay-150 hover:-translate-y-1 hover:scale-110 hover:bg-gray-600 duration-300"
          >
            Submit
          </button>
        </form>
      )}
    </div>
  );
}

export default SlotForm;
