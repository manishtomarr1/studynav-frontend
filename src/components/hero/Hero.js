import { useState } from "react";
import { FaCalendarAlt, FaCheckCircle, FaEnvelope } from "react-icons/fa";
import { BsChevronCompactLeft, BsChevronCompactRight } from "react-icons/bs";
import { useNavigate } from "react-router-dom";
// import { RxDotFilled } from "react-icons/rx";
import picture from "./assets/pic.JPG";
import HelpField from "../home/HelpField/HelpField";

const Hero = () => {
  const images = [
    {
      url: "https://images.pexels.com/photos/3769138/pexels-photo-3769138.jpeg?auto=compress&cs=tinysrgb&w=600",
    },
    {
      url: "https://images.pexels.com/photos/5065313/pexels-photo-5065313.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
    },
    {
      url: "https://images.pexels.com/photos/66100/pexels-photo-66100.jpeg?auto=compress&cs=tinysrgb&w=600",
    },
    {
      url: "https://images.pexels.com/photos/1078850/pexels-photo-1078850.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
    },
  ];
  const [index, setIndex] = useState(0);
  function prevSlide() {
    const isFirstSlide = index === 0;
    const newIndex = isFirstSlide ? images.length - 1 : index - 1;
    setIndex(newIndex);
  }
  function nextSlide() {
    const isLastSlide = index === images.length - 1;
    const newIndex = isLastSlide ? 0 : index + 1;
    setIndex(newIndex);
  }
  function goToSlide(slideIndex) {
    setIndex(slideIndex);
  }
  const navigate = useNavigate();
  const handleAdminLogin = () => {
    navigate(`/${process.env.REACT_APP_PATHCODE}/adminLogin`);
  };


  return (
    <section className="bg-primary text-black py-16">
      <div className="container mx-auto flex flex-col md:flex-row items-center justify-center">
        <div className="md:w-1/2 mb-4 md:mb-0 md:mr-4">
          <img src={picture} alt="Manish Tomar" className="rounded-2xl" />
        </div>
        <div className="w-full md:w-1/2 bg-gray-100 shadow-xl rounded-xl">
          <div className="p-6 text-center">
            <div>
              <p className="text-2xl font-bold mb-4 ">Who I Am?</p>
            </div>
            <p className="text-lg text-justify">
              Greetings! I'm Manish Tomar from India, and I'm on a journey to
              further enhance my passion for software engineering. With
              experience as a Software Development Engineer at MoonDive in
              India, I'm excited to embark on a new chapter in my academic
              pursuit. I hold a postgraduate degree in Computer Applications
              with Honors from Madan Mohan Malaviya University of Technology,
              Gorakhpur, U.P, India, and a bachelor's degree from Dewan VS
              Institute of Engineering and Technology, Meerut, U.P, India.
              Currently, I'm thrilled to be pursuing my Master's in Software
              Engineering from Cardiff University in the UK.
            </p>
            <button
              onClick={handleAdminLogin}
              className="bg-blue-800 text-white px-4 py-2 rounded transition ease-in-out delay-150 hover:-translate-y-1 hover:scale-110 hover:bg-blue-600 duration-300 mt-4"
            >
              Admin Login
            </button>
          </div>
        </div>
      </div>
      <div className="container mx-auto flex flex-col md:flex-row items-center justify-center mt-8">
        <div className="w-full md:w-1/2 bg-gray-100 shadow-xl rounded-xl ">
          <div className="rounded-2xl p-6 ">
            <h3 className="text-2xl font-bold mb-4">How Can I Assist You?</h3>
            <p className="text-lg text-justify">
              If you're aspiring to pursue higher studies in the UK, I'm here to
              guide you through the entire journey. From the initial application
              process to the intricacies of obtaining a visa, I'm ready to
              provide valuable insights and answer your queries. Feel free to
              reach out and ask me anything. My mission is to make this process
              as smooth as possible for you. The best part? My guidance is
              absolutely free of charge. Your success is my priority! For urgent
              matters, feel free to connect with me on Instagram and LinkedIn
              using the links provided below. I'm here to support you throughout
              this exciting academic pursuit.
            </p>

            <a
              href="https://portfolio-main-sage.vercel.app/"
              target="_blank"
              rel="noopener noreferrer"
            >
              <button
                className="bg-blue-800 text-white px-4 py-2 rounded transition ease-in-out delay-150 hover:-translate-y-1 hover:scale-110 hover:bg-blue-600 duration-300 mt-4"
              >
                Visit My Portfolio
              </button>
            </a>

           
            <div>{/* <HelpField/> */}</div>
          </div>
        </div>
        <div className="h-[360px] p-6 w-full md:w-1/2 mt-8 md:mt-0 md:ml-4 relative group">
          <div
            style={{
              backgroundImage: `url(${images[index].url})`,
              backgroundSize: "cover",
            }}
            className="w-full h-full rounded-2xl bg-center bg-cover duration-500"
          ></div>
          <div
            onClick={prevSlide}
            className="hidden group-hover:block absolute top-[50%] -translate-x-0 -translate-y-[50%] left-7 text-2xl rounded-full p-2 bg-black/20 text-white cursor-pointer"
          >
            <BsChevronCompactLeft />
          </div>
          <div
            onClick={nextSlide}
            className="hidden group-hover:block absolute top-[50%] -translate-x-0 -translate-y-[50%] right-7 text-2xl rounded-full p-2 bg-black/20 text-white cursor-pointer"
          >
            <BsChevronCompactRight />
          </div>
          <div className="flex top-4 justify-center py-2">
            {images.map((index) => (
              <div
                key={index}
                onClick={() => goToSlide(index)}
                className="text-xl cursor-pointer"
              >
                {/* <RxDotFilled /> */}
              </div>
            ))}
          </div>
        </div>
      </div>
      <div className="bg-gray-100 py-8 mt-8">
        <div className="mx-auto text-center">
          <h3 className="text-2xl font-bold mb-5">How Can I Help You?</h3>
        </div>
        <HelpField />
      </div>
      <div className="bg-gray-100 py-8 mt-8">
        <div className="mx-auto text-center">
          <h3 className="text-2xl font-bold mb-4">How Can You Reach Me?</h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="flex items-center justify-center p-5 rounded-xl shadow-xl transition ease-in-out delay-15 hover:-translate-y-1 hover:scale-105 hover:bg-gray-300 duration-300">
              <div className="flex-shrink-0">
                <FaCalendarAlt className="text-secondary text-3xl" />
              </div>
              <div className="ml-4">
                <h4 className="font-semibold">Book a Slot</h4>
                <p>Choose a convenient time for a one-on-one session.</p>
              </div>
            </div>
            <div className="flex items-center justify-center p-5 rounded-xl shadow-xl transition ease-in-out delay-15 hover:-translate-y-1 hover:scale-105 hover:bg-gray-300 duration-300">
              <div className="flex-shrink-0">
                <FaCheckCircle className="text-secondary text-3xl" />
              </div>
              <div className="ml-4">
                <h4 className="font-semibold">Request Confirmation</h4>
                <p>I'll receive your request and confirm the session.</p>
              </div>
            </div>
            <div className="flex items-center justify-center p-5 rounded-xl shadow-xl transition ease-in-out delay-15 hover:-translate-y-1 hover:scale-105 hover:bg-gray-300 duration-300">
              <div className="flex-shrink-0">
                <FaEnvelope className="text-secondary text-3xl" />
              </div>
              <div className="ml-4">
                <h4 className="font-semibold">Receive Meeting Link</h4>
                <p>
                  You'll receive a meeting link via email to join the session.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
