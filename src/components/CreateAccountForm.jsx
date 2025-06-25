import React from "react";

const CreateAccountForm = () => {
  return (
    <div className="min-h-screen bg-[#fcd2a5] flex items-center justify-center px-4 py-8">
      <div className="w-full max-w-lg bg-[#fcd2a5] p-8 rounded-xl shadow-xl">
        {/* Back Icon (optional) */}

        {/* Logo */}
        <div className="flex flex-col items-center mb-6">
          <h2 className="text-2xl font-bold text-center text-[#202020]">
            Create An Account
          </h2>
          <p className="text-sm text-center text-gray-700 mt-1">
            Sign Up Now And Automate Your Inventory
          </p>
        </div>

        {/* Form */}
        <form className="space-y-4">
          <input
            type="text"
            placeholder="Enter Your Full Name"
            className="w-full px-4 py-3 border border-gray-400 rounded-md bg-[#ffe7c9] placeholder-gray-600"
          />
          <input
            type="tel"
            placeholder="Enter Your Mobile Number"
            className="w-full px-4 py-3 border border-gray-400 rounded-md bg-[#ffe7c9] placeholder-gray-600"
          />
          <input
            type="email"
            placeholder="Enter Your Email Address"
            className="w-full px-4 py-3 border border-gray-400 rounded-md bg-[#ffe7c9] placeholder-gray-600"
          />
          <input
            type="text"
            placeholder="Enter Company Name"
            className="w-full px-4 py-3 border border-gray-400 rounded-md bg-[#ffe7c9] placeholder-gray-600"
          />
          <input
            type="text"
            placeholder="Enter Company GST Number"
            className="w-full px-4 py-3 border border-gray-400 rounded-md bg-[#ffe7c9] placeholder-gray-600"
          />

          {/* Disclaimer */}
          <p className="text-xs text-gray-700 mt-2">
            By Clicking “Create Account” you agree to Claw Legaltech’s
            <span className="underline ml-1">Terms & Conditions</span> and{" "}
            <span className="underline">Privacy Policy</span>
          </p>

          {/* Submit Button */}
          <button
            type="submit"
            className="w-full bg-[#e59f63] text-white font-semibold py-3 rounded-md mt-4 hover:bg-[#e38b3d]">
            Create Account
          </button>
        </form>

        {/* Already have an account */}
        <p className="mt-6 text-center text-sm text-[#202020]">
          Already Have An Account?{" "}
          <span className="text-[#d87f35] font-medium cursor-pointer hover:underline">
            Log In
          </span>
        </p>
      </div>
    </div>
  );
};

export default CreateAccountForm;
