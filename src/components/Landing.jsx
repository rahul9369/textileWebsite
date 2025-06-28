import React, { useEffect, useState } from "react";
import { motion, useAnimation } from "framer-motion";
import Img from "../assets/phoneimg.png";
import textImg from "../assets/text.png";
import frame from "../assets/Frame.png";
import alrts from "../assets/alrts.png";
import { useInView } from "react-intersection-observer";
import { Link } from "react-router-dom";
import download from "../assets/Group.png";
import "./Landing.css";

function AnimatedCounter({ value, duration = 3000, isVisible }) {
  const [count, setCount] = useState(0);

  useEffect(() => {
    if (!isVisible) return;

    let startTime = null;
    const end = typeof value === "number" ? value : parseInt(value);
    const step = (timestamp) => {
      if (!startTime) startTime = timestamp;
      const progress = Math.min((timestamp - startTime) / duration, 1);
      setCount(Math.floor(progress * end));
      if (progress < 1) requestAnimationFrame(step);
      else setCount(end);
    };

    requestAnimationFrame(step);
  }, [isVisible, value, duration]);

  return typeof value === "string" && value.includes("L")
    ? `${count}L+`
    : `${count}%`;
}

export default function TextileLandingPage() {
  const { ref, inView } = useInView({
    triggerOnce: true,
    threshold: 0.5,
  });

  const [hasMounted, setHasMounted] = useState(false);
  useEffect(() => {
    setHasMounted(true);
  }, []);

  const [width, setWidth] = useState(
    typeof window !== "undefined" ? window.innerWidth : 0
  );

  useEffect(() => {
    const handleResize = () => setWidth(window.innerWidth);
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const isMobile = width > 0 && width < 640;

  const controls1 = useAnimation();
  const controls2 = useAnimation();
  const controls3 = useAnimation();

  useEffect(() => {
    if (hasMounted) {
      const startAnimations = async () => {
        await Promise.all([
          controls1.start({
            opacity: 1,
            scale: 1,
            top: isMobile ? "7%" : "15%",
            left: isMobile ? "8%" : "-10%",
            transition: { duration: 1, ease: "easeOut", delay: 0.4 },
          }),
          controls2.start({
            opacity: 1,
            scale: 1,
            top: "55%",
            left: "auto",
            right: "2%",
            transition: { duration: 1, ease: "easeOut", delay: 0.8 },
          }),
          controls3.start({
            opacity: 1,
            scale: 1,
            top: isMobile ? "75%" : "85%",
            left: isMobile ? "0%" : "2%",
            transition: { duration: 1, ease: "easeOut", delay: 1.2 },
          }),
        ]);
      };
      startAnimations();
    }
  }, [hasMounted, isMobile, controls1, controls2, controls3]);

  return (
    <div className="landing-fade-in min-h-screen pt-20 sm:pt-0 bg-[linear-gradient(77.05deg,_#DB9245_2.55%,_#FBDBB5_97.45%)] text-gray-900 px-4 sm:px-6 md:px-10 flex flex-col md:flex-row items-center justify-between relative overflow-hidden overflow-x-hidden w-full">
      {/* Left Content */}
      <div className="w-full md:w-1/2 order-1 md:order-1">
        <div className="w-full max-w-xl mx-auto space-y-4 sm:space-y-6 text-center md:text-left">
          <motion.div
            initial={{ opacity: 0, y: -30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}>
            <p className="landing-heading-animate text-[28px] sm:text-[30px] md:text-5xl font-bold text-black leading-snug">
              From Thread to Triumph
            </p>
            {/* <p className="landing-subheading-animate text-[16px] sm:text-[24px] md:text-4xl text-gray-800 mt-1">
              Automate Your Textile Business
            </p> */}
            <p
              className="landing-subheading-animate text-[20px] sm:text-[20px] tracking-wider md:text-4xl text-gray-800 mt-1"
              style={{ wordSpacing: "" }}>
              Automate Your Textile Business
            </p>
          </motion.div>

          <p className="landing-desc-animate pt-6 sm:pt-8 sm:text-[20px] text-[14px] tracking-wider sm:text-base text-gray-700">
            The Only App You'll Ever Need To{" "}
            <strong>
              Manage <br className="" />
              Firms, Orders, Inventory,
            </strong>{" "}
            And <strong>Textile Design</strong>.
          </p>

          {/* Stats */}
          <div
            ref={ref}
            className="flex flex-wrap gap-2 justify-between cursor-pointer ">
            {[
              { value: 98, label: "User Satisfaction Rate" },
              { value: 98, label: "Faster Order Processing" },
              { value: "5L", label: "Meters of Fabrics Managed" },
            ].map((stat, idx) => (
              <div
                key={idx}
                className="landing-card landing-card-animate bg-orange-200 shadow rounded-lg p-1 w-[30%]  text-center sm:h-32 h-28 flex flex-col justify-center items-center gap-2"
                style={{ "--delay": `${0.9 + idx * 0.2}s` }}>
                <p
                  className="text-sm sm:text-3xl font-bold text-[#292c33] leading-tight mb-3"
                  style={{
                    fontFamily: "Anton, sans-serif",
                    letterSpacing: "0.06em", // optional spacing
                  }}>
                  <AnimatedCounter value={stat.value} isVisible={inView} />
                </p>

                <p className="text-[10px] sm:text-xs leading-tight text-center break-words">
                  {stat.label}
                </p>
              </div>
            ))}
          </div>

          {/* CTA Buttons */}
          <motion.div
            className="flex flex-row gap-3 mt-4 justify-center sm:justify-start"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.7, duration: 0.6 }}>
            <Link
              to="/signin"
              className="landing-btn landing-btn-left w-[48%] sm:w-60 text-white px-4 py-2 sm:py-3 rounded-full border border-white text-center bg-transparent hover:bg-white hover:text-black flex items-center justify-center text-xs sm:text-sm font-medium flex-shrink-0">
              Get Started
            </Link>

            <a
              href="https://play.google.com/store/apps/details?id=com.fabriqs"
              target="_blank"
              rel="noopener noreferrer"
              className="landing-btn landing-btn-right bg-white flex items-center gap-1 text-orange-300 w-[48%] sm:w-60 justify-center border border-orange-500 px-4 py-2 sm:py-2 rounded-full shadow text-center text-xs sm:text-sm flex-shrink-0">
              <img
                src={download}
                className="w-4 h-4 download-icon"
                alt="Download Icon"
              />
              <span className="font-semibold whitespace-nowrap">
                Download Now
              </span>
            </a>
          </motion.div>
        </div>
      </div>

      {/* Right Image and Popups */}
      <motion.div className="w-full md:w-1/2 flex justify-center items-center relative sm:mt-10 mt-4 md:mt-0 order-2 md:order-2">
        <motion.img
          src={Img}
          alt="App Screenshot"
          className="w-[85%] sm:w-[75%] md:w-full max-w-[400px] xl:max-w-[680px] h-auto rounded-xl"
          initial={{ opacity: 0, y: 100 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1.2, ease: "easeOut", delay: 0.5 }}
        />

        {/* Top Left Popup - Order Update */}
        <motion.div
          className="landing-float absolute w-[150px] sm:w-[200px] md:w-[240px]"
          initial={{ opacity: 0, scale: 0.5, top: "40%", left: "27%" }}
          animate={controls1}>
          <img
            src={textImg}
            className="h-16 sm:h-24 md:h-28 w-full object-contain"
            alt="Text Popup"
          />
        </motion.div>

        {/* Bottom Right Popup - Invoice Due Alert */}
        <motion.div
          className="landing-float absolute w-[150px] sm:w-[200px] md:w-[240px]"
          initial={{ opacity: 0, scale: 0.5, top: "40%", left: "27%" }}
          animate={controls2}>
          <img
            src={alrts}
            className="h-16 sm:h-24 md:h-28 w-full object-contain"
            alt="Alert Popup"
          />
        </motion.div>

        {/* Bottom Left Popup - Textile Design */}
        <motion.div
          className="landing-float absolute w-[150px] sm:w-[200px] md:w-[240px]"
          initial={{ opacity: 0, scale: 0.5, top: "40%", left: "27%" }}
          animate={controls3}>
          <img
            src={frame}
            className="h-16 sm:h-24 md:h-28 w-full object-contain"
            alt="Frame Popup"
          />
        </motion.div>
      </motion.div>
    </div>
  );
}
