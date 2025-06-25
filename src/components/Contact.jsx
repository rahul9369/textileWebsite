import React from "react";
import { FaLinkedin } from "react-icons/fa";
import { FaYoutube } from "react-icons/fa";
import { FaSquareInstagram } from "react-icons/fa6";
import './Contact.css';
// import Logo from "../assets/logo.png";


const Contact = () => {
  return (
    <div className="relative min-h-screen bg-[#FCD9A4] flex flex-col items-center justify-center px-4 py-10">
      {/* Orange Background Behind Top and Half of Page */}
      <div className="absolute top-0 left-0 w-full h-1/2 bg-[#DB9245] z-0"></div>

      <div className="w-full z-10 relative bg-transparent py-10 text-center px-4 mt-12">
        <h1 className="contact-heading text-3xl md:text-4xl font-bold text-gray-900">
          Get In Touch
        </h1>
        <p className="contact-subheading text-sm md:text-base text-gray-800 mt-2 max-w-2xl mx-auto px-4 md:px-0">
          We'd love to hear from you. Whether you have a question, idea, or just
          want to <span className="hidden md:inline"><br/></span> say hello — reach out and we'll get back to you soon.
        </p>
      </div>

      <div className="contact-form-animate flex flex-col-reverse lg:flex-row w-full max-w-6xl mt-10 rounded-xl shadow-2xl overflow-hidden z-10">
        {/* Left Side - Contact Info */}
        <div className="bg-[#292C33] text-white w-full lg:w-1/2 p-6 flex flex-col justify-between gap-6">
          <div>
            <h2 className="text-white font-bold text-lg mb-8">
              Company Contact <br/> Information
            </h2>
            <h3 className="text-xl font-bold mb-4">CLAW LEGALTECH</h3>
            <div className="flex items-center gap-2 mb-3 cursor-pointer">
              <img src="/Group 222.png" alt="Phone" className="w-5 h-5" />
              <span className="text-sm text-[#E29642]">+91 9316164924</span>
            </div>
            <div className="flex items-center gap-2 mb-3 break-all cursor-pointer">
              <img src="/Group 223.png" alt="Email" className="w-5 h-5" />
              <span className="text-sm text-[#E29642]">
                claw.lawyers@gmail.com
              </span>
            </div>
            <div className="flex items-center gap-2 mb-3 break-all cursor-pointer">
              <div className="w-5 h-5 rounded-full bg-[#E29642] flex items-center justify-center">
                <img src="/Vector.png" alt="Website" className="w-3 h-3" />
              </div>
              <span className="text-sm text-[#E29642]">www.clawlaw.in</span>
            </div>
          </div>

          <div className="flex gap-4 text-2xl cursor-pointer">
            <span>
              <FaLinkedin />
            </span>
            <span>
              <FaYoutube />
            </span>
            <span>
              <FaSquareInstagram />
            </span>
          </div>
        </div>

        {/* Right Side - Form */}
       <div
  className="w-full lg:w-1/2 p-6"
  style={{ background: "linear-gradient(to right, #FBDBB5, #DB9245)" }}
>
          <h2 className="font-bold text-lg text-gray-900 mb-4">
            Fill Up The Form To Connect !!
          </h2>
          <form className="flex flex-col gap-4">
            <input
              type="text"
              placeholder="Enter Your Full Name"
              className="p-2 rounded-md border border-black w-full focus:outline-none bg-[#FBDBB5]"
            />
            <div className="flex flex-col md:flex-row gap-4">
              <input
                type="email"
                placeholder="Enter Your Email"
                className="p-2 rounded-md border border-black w-full focus:outline-none bg-[#FBDBB5]"
              />
              <input
                type="text"
                placeholder="Enter Your Number"
                className="p-2 rounded-md border border-black w-full focus:outline-none bg-[#FBDBB5]"
              />
            </div>
            <textarea
              placeholder="Enter Your Message"
              className="p-2 rounded-md border border-black w-full h-32 resize-none focus:outline-none bg-[#FBDBB5]"></textarea>
            <button
              type="submit"
              className="bg-[#25262B] text-white py-2 rounded-md hover:opacity-90 w-full cursor-pointer">
              Send
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Contact;
