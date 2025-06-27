import React, { useState } from "react";
import { FaCog, FaMinus, FaPlus } from "react-icons/fa";
import Banner from "../../assets/banner.png";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { setTextileParameters } from "../../features/textiles/textilesSlice";
import { setAllParameters } from "../../features/textileDesign/textileDesignSlice";
import "./textile.css"

export default function TextileDesignPage() {
  const [complexity, setComplexity] = useState(3);
  const [numImages, setNumImages] = useState(4);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleSaveParameters = async () => {
    setLoading(true);
    const payload = { complexity, numImages };
    dispatch(setAllParameters(payload));
    console.log("Saved to Redux:", payload);
    setLoading(false);
    setError(null);
    navigate("/textile");
  };

  return (
    <div className="min-h-screen bg-[#FCD8A8] text-gray-900 flex flex-col items-center justify-center px-4 py-10">
      <div className="grid grid-cols-1 md:grid-cols-2 items-center gap-6 max-w-6xl w-full">
        {/* Text Section */}
        <div className="text-center sm:pt-10 pt-16 md:text-left space-y-4">
          {/* Desktop Heading */}
          <h1 className="hidden md:block text-5xl font-bold leading-tight textile-heading-animate">
            Bring Textile <br />
            Designs to Life
          </h1>

          {/* Mobile Heading */}
          <h1 className="block md:hidden text-2xl font-bold leading-tight textile-heading-animate">
            Bring Textile Designs to Life
          </h1>

          {/* Description */}
          <p className="text-sm md:text-lg text-gray-800 textile-subheading-animate">
            With AI-Powered Image Generation <br />
            Customized for Textile Designs
          </p>
        </div>

        {/* Banner */}
        <div className="flex justify-center">
          <img
            src={Banner}
            alt="Illustration"
            className="w-[320px] sm:w-[400px] md:w-[480px] xl:w-[520px] pt-4 sm:pt-10 textile-image-animate"
          />
        </div>
      </div>

      {/* Parameters Section */}
      <div className="w-full max-w-6xl p-6 rounded-2xl shadow-lg space-y-4 sm:space-y-6 relative border border-black bg-gradient-to-r sm:bg-gradient-to-l from-[#FBDBB5] to-[#DB9245]">
        <Link
          to="/textile"
          className="absolute top-4 right-4 p-2 rounded-md bg-black">
          <FaCog className="text-[#F7941D] text-lg" />
        </Link>

        <h2 className="font-bold text-sm sm:text-xl text-black">
          Set Image Generation Parameters
        </h2>
        <div className="grid sm:grid-cols-3 grid-cols-1 gap-2">
          <div className="flex items-center gap-2 bg-black text-white px-2 py-2 rounded-md w-full sm:w-auto">
            <span className="mr-4 text-sm sm:text-base">Complexity</span>
            <div className="bg-white rounded-md py-1 w-48 flex items-center justify-center ml-auto">
              <button
                onClick={() => setComplexity((prev) => Math.max(1, prev - 1))}
                disabled={complexity === 1}
                className="text-black px-2 py-1 font-bold disabled:opacity-50 disabled:cursor-not-allowed hover:bg-gray-200">
                <FaMinus size={12} />
              </button>
              <span className="text-black px-8 py-0.5 font-semibold">
                {complexity}
              </span>
              <button
                onClick={() => setComplexity((prev) => Math.min(10, prev + 1))}
                disabled={complexity === 10}
                className="text-black px-2 py-1 font-bold disabled:opacity-50 disabled:cursor-not-allowed hover:bg-gray-200">
                <FaPlus size={12} />
              </button>
            </div>
          </div>

          {/* No of Images */}
          <div className="flex items-center  bg-black text-white px-2 py-2 rounded-md w-full sm:w-auto ">
            <span className="mr-1 text-sm sm:text-base">No. of Images</span>
            <div className="bg-white py-1 rounded-md w-48 flex items-center justify-center ml-auto">
              <button
                onClick={() => setNumImages((prev) => Math.max(1, prev - 1))}
                disabled={numImages === 1}
                className="text-black px-2 py-1 font-bold disabled:opacity-50 disabled:cursor-not-allowed hover:bg-gray-200">
                <FaMinus size={12} />
              </button>
              <span className="text-black px-8 py-0.5 font-semibold">
                {numImages}
              </span>
              <button
                onClick={() => setNumImages((prev) => Math.min(10, prev + 1))}
                disabled={numImages === 10}
                className="text-black px-2 py-1 font-bold disabled:opacity-50 disabled:cursor-not-allowed hover:bg-gray-200">
                <FaPlus size={12} />
              </button>
            </div>
          </div>

          {/* Save button */}
          <div className="flex">
            <button
              onClick={handleSaveParameters}
              disabled={loading}
              className="ml-auto bg-[#F7941D]  cursor-pointer text-white font-semibold px-5 py-2 rounded-md transition w-full sm:w-auto textile-btn-animate">
              {loading ? "Saving..." : "Save Parameters"}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
