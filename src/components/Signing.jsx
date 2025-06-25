import React, { useState } from "react";
import { FaCheckCircle } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";

import { toast } from "react-toastify";
import { loginSuccess } from "../features/auth/authSlice";

const AuthForm = () => {
  const [activeTab, setActiveTab] = useState("login");
  const [signupSuccess, setSignupSuccess] = useState(false);
  const [loginStep, setLoginStep] = useState("form");
  const [resetStep, setResetStep] = useState("");
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [signupData, setSignupData] = useState({
    name: "",
    email: "",
    phoneNumber: "",
    organisationName: "",
    GSTNumber: "",
  });

  const handleSignupChange = (e) => {
    const { name, value } = e.target;
    setSignupData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSignup = async (e) => {
    e.preventDefault();

    try {
      const response = await fetch(
        "https://inventorymanagement-backend-dev.onrender.com/api/auth/accountCreatationRequest",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(signupData),
        }
      );

      if (response.ok) {
        toast.success("Signup successful!");

        setSignupSuccess(true);
        // Reset form
        setSignupData({
          name: "",
          email: "",
          phoneNumber: "",
          organisationName: "",
          GSTNumber: "",
        });
      } else {
        const errorData = await response.json();
        console.error("Error:", errorData);
        toast.error("Signup failed! Please try again.");
      }
    } catch (error) {
      console.error("Signup failed:", error);
      toast.error("Signup failed! Please try again.");
    }
  };

  const [formData, setFormData] = useState({
    otp: "",
    email: "",
    password: "",
  });

  const [errors, setErrors] = useState({});
  const [email, setEmail] = useState("");

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleLoginSubmit = async (e) => {
    e.preventDefault();

    // Validation
    const newErrors = {};
    if (!formData.email) newErrors.email = "Email is required";
    if (!formData.password) newErrors.password = "Password is required";
    setErrors(newErrors);
    if (Object.keys(newErrors).length > 0) return;

    try {
      const response = await fetch(
        "https://inventorymanagement-backend-dev.onrender.com/api/auth/manager/login",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(formData),
        }
      );

      if (response.ok) {
        const data = await response.json();

        // 🔥 Dispatch Redux action
        dispatch(loginSuccess({ user: data.user, token: data.token }));

        // 🔐 Optional: Save token to localStorage
        // localStorage.setItem("token", data.token);

        // Clear form
        setFormData({ email: "", password: "" });
        toast.success("Login successful!");
        navigate("/"); // redirect
      } else {
        const errorData = await response.json();

        toast.error("Login failed. Please try again.");
      }
    } catch (error) {
      console.error("Login error:", error);
      toast.error("Something went wrong. Please try again later.");
    }
  };

  const resetToLogin = () => {
    navigate("/");
    setActiveTab("login");
    setSignupSuccess(false);
    setLoginStep("form");
    setResetStep("");
    setFormData({ email: "", password: "", otp: "", confirmPassword: "" });
    setErrors({});
  };

  const handleResetClick = () => {
    setResetStep("otp");
    setLoginStep("");
    setErrors({});
  };

  const handleResetOtpSubmit = async (e) => {
    e.preventDefault();
    console.log(email);
    setErrors({});

    try {
      const response = await fetch(
        "https://inventorymanagement-backend-dev.onrender.com/api/auth/manager/forgot-password",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            email: email, // ✅ only sending email in payload
          }),
        }
      );

      if (!response.ok) {
        throw new Error("Email verification failed");
      }

      const data = await response.json();
      console.log("Email verified:", data);

      // Move to next step if needed
      setResetStep("newPassword");
    } catch (error) {
      console.error("Email verification error:", error);
      setErrors({ otp: "Something went wrong. Please try again." });
    }
  };

  const handleChangePasswordSubmit = async (e) => {
    e.preventDefault();
    const { otp, password, confirmPassword, email } = formData;
    const errs = {};

    if (!otp || !/^\d{6}$/.test(otp)) {
      errs.otp = "Enter a valid 6-digit OTP";
    }
    if (password.length < 6) {
      errs.password = "Minimum 6 characters required";
    }
    if (password !== confirmPassword) {
      errs.confirmPassword = "Passwords do not match";
    }

    if (Object.keys(errs).length > 0) {
      setErrors(errs);
      return;
    }

    setErrors({});

    try {
      const response = await fetch(
        "https://inventorymanagement-backend-dev.onrender.com/api/auth/manager/reset-password",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            email, // make sure this is in your formData
            otp,
            newPassword: password,
            // confirmPassword,
          }),
        }
      );

      if (!response.ok) {
        const err = await response.json();
        toast.error(err.message || "Password reset failed");
        return;
      }

      toast.success("Password reset successful!");
      setResetStep("done");
    } catch (error) {
      console.error("Password reset error:", error);
      toast.error("Something went wrong. Please try again.");
    }
  };

  const inputStyle =
    "w-full px-4 py-3 bg-[#FBDBB5] rounded-md border border-gray-400 placeholder-gray-600";

  return (
    <div className="min-h-screen bg-[#FBDBB5] flex items-center justify-center px-2">
      <div className="w-full max-w-3xl bg-[#d87f35] p-4 rounded-[30px] shadow-lg max-h-[450px] flex items-center justify-center min-h-[520px] md:min-h-[350px] mt-16 md:mt-0">
        <div className="w-full max-w-2xl h-[420px] md:h-[330px] flex flex-col">
          <div className="flex justify-evenly mb-4">
            <button
              onClick={() => {
                setActiveTab("login");
                setSignupSuccess(false);
                setLoginStep("form");
                setResetStep("");
                setErrors({});
              }}
              className={`text-2xl cursor-pointer font-semibold ${
                activeTab === "login"
                  ? "text-white border-b-2 border-white"
                  : "text-gray-300"
              }`}>
              LogIn
            </button>
            <button
              onClick={() => {
                setActiveTab("signup");
                setSignupSuccess(false);
                setLoginStep("");
                setResetStep("");
                setFormData({
                  email: "",
                  password: "",
                  otp: "",
                  confirmPassword: "",
                });
                setErrors({});
              }}
              className={`text-2xl font-semibold cursor-pointer ${
                activeTab === "signup"
                  ? "text-white border-b-2 border-white"
                  : "text-gray-300"
              }`}>
              Sign Up
            </button>
          </div>

          <div className="flex-1 overflow-visible">
            {loginStep === "success" && (
              <div className="flex flex-col items-center justify-center space-y-6 py-4">
                <FaCheckCircle size={60} className="text-white" />
                <p className="text-white text-xl font-semibold text-center">
                  You Have Logged In Successfully
                </p>
                <button
                  onClick={resetToLogin}
                  className="w-full bg-[#202020] cursor-pointer text-white font-semibold py-3 rounded-md">
                  Back to LogIn
                </button>
              </div>
            )}

            {!signupSuccess &&
              activeTab === "login" &&
              resetStep === "" &&
              loginStep === "form" && (
                <form onSubmit={handleLoginSubmit} className="space-y-4 ">
                  <input
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    placeholder="Enter Registered Email ID"
                    className={inputStyle}
                  />
                  {errors.email && (
                    <p className="text-red-200 text-sm">{errors.email}</p>
                  )}

                  <input
                    type="password"
                    name="password"
                    value={formData.password}
                    onChange={handleChange}
                    placeholder="Enter Your Password"
                    className={inputStyle}
                  />
                  {errors.password && (
                    <p className="text-red-200 text-sm">{errors.password}</p>
                  )}

                  <div className="flex justify-end text-sm text-white  font-medium">
                    <button
                      onClick={handleResetClick}
                      className="cursor-pointer"
                      type="button">
                      Forgot Password?
                    </button>
                  </div>

                  <button
                    type="submit"
                    className="w-full bg-[#202020] text-white font-semibold py-3 cursor-pointer rounded-md mt-46 sm:mt-12">
                    Log In
                  </button>
                </form>
              )}

            {signupSuccess && (
              <div className="flex flex-col items-center justify-center pt-10 space-y-2 py-4">
                <FaCheckCircle size={60} className="text-white" />
                <p className="text-white text-xl font-semibold text-center">
                  Your Account Has Been Sent For Verification
                </p>
                <p className="text-white text-center">
                  Officials From Claw Legaltech Will Contact You For
                  Verification Process
                </p>
                <button
                  onClick={resetToLogin}
                  className="w-full bg-[#202020] mt-8 text-white font-semibold py-3 cursor-pointer rounded-md">
                  Go Back to Website
                </button>
              </div>
            )}

            {!signupSuccess && activeTab === "signup" && (
              <form
                onSubmit={handleSignup}
                className="grid grid-cols-1 md:grid-cols-2 gap-2">
                <input
                  type="text"
                  name="name"
                  value={signupData.name}
                  onChange={handleSignupChange}
                  placeholder="Enter Your Full Name"
                  className={`${inputStyle} md:col-span-2`}
                  required
                />

                <input
                  type="email"
                  name="email"
                  value={signupData.email}
                  onChange={handleSignupChange}
                  placeholder="Enter Email ID"
                  className={inputStyle}
                  required
                />

                <input
                  type="tel"
                  name="phoneNumber"
                  value={signupData.phoneNumber}
                  onChange={handleSignupChange}
                  placeholder="Enter Mobile Number"
                  className={inputStyle}
                  required
                />

                <input
                  type="text"
                  name="organisationName"
                  value={signupData.organisationName}
                  onChange={handleSignupChange}
                  placeholder="Enter Company Name"
                  className={inputStyle}
                />

                <input
                  type="text"
                  name="GSTNumber"
                  value={signupData.GSTNumber}
                  onChange={handleSignupChange}
                  placeholder="Enter Company GST"
                  className={inputStyle}
                />

                <div className="text-sm text-white md:col-span-2">
                  By Clicking "Create Account" you agree to Claw Legaltech's
                  Terms and Conditions and
                  <span className="font-semibold text-black cursor-pointer">
                    {" "}
                    Privacy Policy
                  </span>
                </div>
                <button
                  type="submit"
                  className="w-full bg-[#202020] cursor-pointer text-white font-semibold py-3 rounded-md mt-4 md:col-span-2 ">
                  Create Account
                </button>
              </form>
            )}

            {resetStep === "otp" && (
              <form
                onSubmit={handleResetOtpSubmit}
                className="space-y-4 sm:pt-10 pt-6">
                <label className="text-white text-center text-lg font-medium block">
                  Reset Password
                </label>
                <p className="text-center pt-0 text-white">
                  An OTP will be sent to your registered email ID
                </p>

                <input
                  type="email"
                  name="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="Enter your email"
                  className={inputStyle}
                />

                {/* {errors.otp && (
                  <p className="text-red-200 text-sm">{errors.otp}</p>
                )} */}

                <button
                  type="submit"
                  className="w-full bg-[#202020] cursor-pointer text-white font-semibold py-3 rounded-md">
                  Send OTP
                </button>
              </form>
            )}

            {resetStep === "newPassword" && (
              <form onSubmit={handleChangePasswordSubmit} className="space-y-3">
                <p className="text-white text-center font-bold">
                  Reset Password
                </p>
                <p className="text-white text-center">
                  Enter the OTP sent to your email and create a new password.
                </p>

                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  placeholder="Enter New Password"
                  className={inputStyle}
                />

                {/* 🔐 OTP Input */}
                <input
                  type="text"
                  name="otp"
                  value={formData.otp}
                  onChange={handleChange}
                  placeholder="Enter 6-digit OTP"
                  className={inputStyle}
                />
                {errors.otp && (
                  <p className="text-red-200 text-sm">{errors.otp}</p>
                )}

                {/* 🔑 New Password */}
                <input
                  type="password"
                  name="password"
                  value={formData.password}
                  onChange={handleChange}
                  placeholder="Enter New Password"
                  className={inputStyle}
                />
                {errors.password && (
                  <p className="text-red-200 text-sm">{errors.password}</p>
                )}

                {/* 🔄 Confirm Password */}
                <input
                  type="password"
                  name="confirmPassword"
                  value={formData.confirmPassword}
                  onChange={handleChange}
                  placeholder="Re-enter New Password"
                  className={inputStyle}
                />
                {errors.confirmPassword && (
                  <p className="text-red-200 text-sm">
                    {errors.confirmPassword}
                  </p>
                )}

                {/* Submit Button */}
                <button
                  type="submit"
                  className="w-full bg-[#202020] cursor-pointer text-white font-semibold py-3 rounded-md">
                  Reset Password
                </button>
              </form>
            )}

            {resetStep === "done" && (
              <div className="flex flex-col items-center justify-center pt-16 space-y-6 py-4">
                <FaCheckCircle size={60} className="text-white" />
                <p className="text-white text-xl font-semibold text-center">
                  Your Password Has Been Reset Successfully
                </p>
                <button
                  onClick={resetToLogin}
                  className="w-full bg-[#202020] cursor-pointer text-white font-semibold py-3 rounded-md">
                  Back to Login
                </button>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default AuthForm;
