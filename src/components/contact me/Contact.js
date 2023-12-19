// src/components/ContactMe.js
import React from "react";
import { FaInstagram, FaLinkedin } from "react-icons/fa";

const Contact = () => {
  return (
    <section className="bg-gray-100 py-8 p-1">
      <div className="container mx-auto text-center">
        <h2 className="text-2xl font-bold mb-4">
          You Can Also Connect With Me{" "}
        </h2>
        <div className="flex justify-center space-x-8 ">
          <div className="flex items-center justify-center p-5 rounded-xl shadow-xl transition ease-in-out delay-15 hover:-translate-y-1 hover:scale-105 hover:bg-blue-200 duration-300 hover:border-4 border-solid border-linkedInBorder">
            <a
              href="https://www.linkedin.com/in/manishtomar1/"
              target="_blank"
              rel="noopener noreferrer"
              className="text-3xl text-linkedInBorder hover:text-blue-700"
            >
              <FaLinkedin />
            </a>
          </div>
          <div className="flex items-center justify-center p-5 rounded-xl shadow-xl transition ease-in-out delay-15 hover:-translate-y-1 hover:scale-105 hover:bg-pink-200 duration-300 hover:border-4 border-solid border-instaBorder">
      <a
        href="https://www.instagram.com/_tomarmanish/"
        target="_blank"
        rel="noopener noreferrer"
        className="text-3xl text-instaBorder hover:text-HoverInsta"
      >
        <FaInstagram /> {/* Use the Instagram icon component */}
      </a>
    </div>

        </div>
      </div>
    </section>
  );
};

export default Contact;
