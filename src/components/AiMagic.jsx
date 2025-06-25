import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { useInView } from "react-intersection-observer";
import Aimagic from "../assets/aimagic.png";
import drop from "../assets/drop.png";
import grid from "../assets/grid.png";
import pen from "../assets/pen.png";
import plus from "../assets/plus.png";
import star from "../assets/star.png";
import { Link } from "react-router-dom";
import "./AiMagic.css";

const CountUpOnView = ({ end, duration = 3000, suffix = "" }) => {
  const [count, setCount] = useState(0);
  const { ref, inView } = useInView({ triggerOnce: true });

  useEffect(() => {
    if (!inView) return;

    let start = 0;
    const endValue = typeof end === "number" ? end : parseFloat(end);
    const increment = endValue / (duration / 16); // ~60fps

    const interval = setInterval(() => {
      start += increment;
      if (start >= endValue) {
        clearInterval(interval);
        setCount(endValue);
      } else {
        setCount(start);
      }
    }, 16);

    return () => clearInterval(interval);
  }, [inView, end, duration]);

  const formatted =
    typeof end === "string" && isNaN(end) ? end : Math.floor(count) + suffix;

  return <span ref={ref}>{formatted}</span>;
};

export default function AiMagicSection() {
  const { ref, inView } = useInView({
    triggerOnce: true,
    threshold: 0.3,
  });

  return (
    <div
      ref={ref}
      className="ai-magic-page bg-[linear-gradient(#FBDBB5_97.45%)] px-4 md:px-16 pt-2 pb-16 font-sans text-gray-900 ">
      <div className="bg-gradient-to-r rounded-xl p-5 pt-0 from-[#fdbb78] to-[#fda769] mt-8 md:mt-0">
        {/* Main Container */}
        <div className="bg-gradient-to-r relative from-[#fdbb78] to-[#fda769] rounded-xl p-0 md:p-12 flex flex-col lg:flex-row justify-between items-center gap-10">
          {/* Mobile Image on top */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
            className="block lg:hidden">
            <img
              src={Aimagic}
              alt="AI Magic"
              className="w-[320px] h-[380px] mx-auto rounded-xl drop-shadow-2xl"
            />
          </motion.div>

          {/* Desktop Image */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
            className="hidden lg:flex lg:w-1/3 absolute top-[1px] right-[20px] justify-center">
            <img
              src={Aimagic}
              alt="AI Magic"
              className="w-[260px] md:w-[400px] h-[400px] md:h-[550px] rounded-xl drop-shadow-2xl"
            />
          </motion.div>

          {/* Left Content */}
          <div className="lg:w-[65%] space-y-6 px-2">
            <h2
              className={`text-center lg:text-left text-xl md:text-xl pt-4 ${
                inView ? "ai-magic-heading-animate" : ""
              }`}>
              Dive Into the Future with <br />
              <span className="text-white font-bold text-4xl md:text-5xl">
                AI Magic
              </span>
            </h2>

            {/* Features */}
            <div className="grid grid-cols-2 gap-3 cursor-pointer">
              {[
                {
                  img: plus,
                  title: "Generate Magic",
                  desc: "Create designs",
                },
                {
                  img: drop,
                  title: "Colorify Instantly",
                  desc: "Palette recolor",
                },
                {
                  img: pen,
                  title: "Edit with Precision",
                  desc: "Scale & remix",
                },
                {
                  img: grid,
                  title: "Grid It. Print It",
                  desc: "Repeat patterns",
                },
              ].map((item, idx) => (
                <div
                  key={idx}
                  className={`bg-[linear-gradient(#FBDBB5_97.45%)] flex rounded-md p-2 shadow-sm w-full sm:p-3 ${
                    inView ? "ai-magic-card-animate" : ""
                  }`}
                  data-card-index={idx}>
                  <img
                    src={item.img}
                    alt={item.title}
                    className="w-4 h-4 sm:w-6 sm:h-6 mr-2 mt-1"
                  />
                  <div className="flex flex-col justify-center">
                    <h3 className="font-semibold text-[10px] sm:text-sm">
                      {item.title}
                    </h3>
                    <p className="text-[10px] sm:text-sm text-gray-600">
                      {item.desc}
                    </p>
                  </div>
                </div>
              ))}
            </div>

            {/* Button */}
            <div className="flex justify-center  lg:justify-start pt-3">
              <button className="flex items-center  gap-2 px-6 py-2 sm:py-3 border text-white rounded-full bg-[#e47c1c] hover:bg-[#e47c1c] ">
                <img
                  src={star}
                  alt="star icon"
                  className="w-5 h-5 filter invert  brightness-50"
                />
                Generate Now
              </button>
            </div>

            {/* Statistics */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 pt-4">
              {[
                { label: "Accurate Design Conversion", value: 95, suffix: "%" },
                { label: "Recolour Accuracy", value: 98, suffix: "%" },
                { label: "Faster Pattern Creation", value: 3, suffix: "X" },
                { label: "Manual Work Reduced", value: 95, suffix: "%" },
              ].map((stat, idx) => (
                <div
                  key={idx}
                  className="bg-orange-200 p-4 rounded-2xl shadow-lg text-center">
                  <div className="text-xl md:text-2xl font-bold">
                    <CountUpOnView end={stat.value} suffix={stat.suffix} />
                  </div>
                  <p className="text-xs md:text-xl text-gray-500 mt-1">
                    {stat.label}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Bottom Statistics */}
      <div className="text-center mt-16">
        <h3 className="text-xl md:text-4xl font-bold mb-10 text-center">
          Tested & Loved by the
          <br className="block md:hidden" />
          <span className="md:ml-2">Textile Community</span>
        </h3>

        {/* Responsive grid */}
        <div className="grid grid-cols-3 gap-6 justify-center text-sm md:hidden">
          {[
            { value: 25, label: "Faster Order Processing", suffix: "%" },
            { value: 98, label: "User Satisfaction", suffix: "%" },
            { value: 40, label: "Less Time Spent", suffix: "%" },
          ].map((stat, idx) => (
            <div key={idx} className="w-full text-center">
              <div className="text-2xl font-bold text-orange-600">
                <CountUpOnView end={stat.value} suffix={stat.suffix} />
              </div>
              <p className="mt-1 text-[14px] font-semibold text-gray-800">
                {stat.label}
              </p>
            </div>
          ))}
        </div>

        <div className="grid grid-cols-2 gap-6 justify-center text-sm md:hidden mt-6">
          {[
            { value: 1000, label: "Designs Created", suffix: "+" },
            { value: 5, label: "Mtr. of Fabric Managed", suffix: "L+" },
          ].map((stat, idx) => (
            <div key={idx} className="w-full text-center">
              <div className="text-2xl font-bold text-orange-600">
                <CountUpOnView end={stat.value} suffix={stat.suffix} />
              </div>
              <p className="mt-1 text-[14px] font-semibold text-gray-800">
                {stat.label}
              </p>
            </div>
          ))}
        </div>

        {/* Desktop view (unchanged) */}
        <div className="hidden md:grid md:grid-cols-5 gap-6 text-base">
          {[
            { value: 25, label: "Faster Order Processing", suffix: "%" },
            { value: 98, label: "User Satisfaction", suffix: "%" },
            { value: 40, label: "Less Time Spent", suffix: "%" },
            { value: 1000, label: "Designs Created", suffix: "+" },
            { value: 5, label: "Mtr. of Fabric Managed", suffix: "L+" },
          ].map((stat, idx) => (
            <div key={idx} className="w-full text-center">
              <div className="text-5xl font-bold text-orange-600">
                <CountUpOnView end={stat.value} suffix={stat.suffix} />
              </div>
              <p className="mt-1 text-[24px] font-semibold text-gray-800">
                {stat.label}
              </p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
