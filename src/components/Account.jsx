import React, { useEffect, useState, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
// import { logout } from "./features/auth/authSlice";
// import { setSelectedPlan } from "./Features/plan/planSlice";
import { toast } from "react-toastify";
import { logout } from "../features/auth/authSlice";
import { setSelectedPlan } from "../features/plan/planSlice";
import './Account.css';

const AccountPage = () => {
  const currentUser = useSelector((state) => state?.auth?.user);
  const Coins = useSelector((state) => state?.plan?.selectedPlan);
  // const selectedPlan = useSelector((state) => state.plan.selectedPlan);
  console.log(Coins?.planType);
  console.log(currentUser);
  const [rechargeCoins, setRechargeCoins] = useState("");
  const walletCoins = useSelector((state) => state?.generate?.resultImages);

  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [customCoins, setCustomCoins] = useState("");
  const cardsRef = useRef(null);

  // Checks if the plan is expired based on expiryDate
  const isPlanExpired = (Coins) => {
    const expiryDate =
      Coins?.wallet?.expiryDate || Coins?.managerWallet?.expiryDate;
    if (!expiryDate) return true;

    return new Date(expiryDate).getTime() <= new Date().getTime();
  };

  const shouldShowGetItNow = (planName) => {
    if (!Coins) return true; // No plan at all
    const currentPlan =
      Coins?.wallet?.plan || Coins?.managerWallet?.plan || Coins?.planType;
    if (currentPlan?.toLowerCase() !== planName.toLowerCase()) return true; // Different plan
    return isPlanExpired(Coins); // Expired plan => show Get It Now
  };

  const handleLogout = () => {
    dispatch(logout());
    toast.success("Logout Successfully !!!");
    localStorage.removeItem("token");
    navigate("/signin");
  };

  useEffect(() => {
    const scriptUrl = "https://checkout.razorpay.com/v1/checkout.js";

    const existingScript = document.querySelector(`script[src="${scriptUrl}"]`);
    if (existingScript) return;

    const script = document.createElement("script");
    script.src = scriptUrl;
    script.async = true;
    script.onload = () => console.log("Razorpay script loaded");
    script.onerror = () => console.error("Failed to load Razorpay script");
    document.body.appendChild(script);

    return () => {
      if (script.parentNode) {
        script.parentNode.removeChild(script);
      }
    };
  }, []);

  useEffect(() => {
    const cards = cardsRef.current?.querySelectorAll('.account-card-animate');
    if (!cards) return;
    const observer = new window.IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('account-card-in-view');
          }
        });
      },
      { threshold: 0.3 }
    );
    cards.forEach((card) => observer.observe(card));
    return () => cards.forEach((card) => observer.unobserve(card));
  }, []);

  const handlePayment = async ({ name, price, coins }) => {
    try {
      // const managerId = currentUser?._id;
      const managerId = currentUser?.id;
      // STEP 1: Create Order
      const orderRes = await fetch(
        "https://inventorymanagement-backend-dev.onrender.com/api/wallet-topup/create-order",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
          body: JSON.stringify({
            managerId: managerId,
            amount: price,
            currency: "INR",
            planType: name.toLowerCase().split(" ")[1], // e.g., "starter" from "FabrlQs Starter"
          }),
        }
      );

      const orderData = await orderRes.json();
      console.log(orderData);

      if (!orderRes.ok || !orderData?.razorpayOrderId) {
        throw new Error("Failed to create Razorpay order.");
      }

      // STEP 2: Open Razorpay Checkout
      const options = {
        key: "rzp_test_UWcqHHktRV6hxM", // Replace with live key in prod
        amount: price * 100,
        currency: "INR",
        name: "FabrlQs AI",
        description: name,
        order_id: orderData?.razorpayOrderId, // Must come from backend
        handler: async function (response) {
          try {
            console.log("🧾 Razorpay Response:", response);

            const verifyRes = await fetch(
              "https://inventorymanagement-backend-dev.onrender.com/api/wallet-topup/verify-payment",
              {
                method: "POST",
                headers: {
                  "Content-Type": "application/json",
                  Authorization: `Bearer ${localStorage.getItem("token")}`,
                },
                body: JSON.stringify({
                  razorpayOrderId: response.razorpay_order_id,
                  razorpayPaymentId: response.razorpay_payment_id,
                  razorpaySignature: response.razorpay_signature,
                }),
              }
            );

            const verifyData = await verifyRes.json();
            console.log(verifyData);
            console.log("✅ Verify Response:", verifyData);

            if (!verifyRes.ok) {
              console.error(
                "❌ Server responded with status:",
                verifyRes.status
              );

              toast.error("Something went wrong during payment verification.");

              return;
            }

            if (verifyData?.topUpOrder?.paymentStatus === "paid") {
              dispatch(setSelectedPlan(verifyData));
              toast.success("Payment verified and plan activated!");
            } else {
              toast.error(
                "Payment verification failed. Please contact support."
              );
            }
          } catch (err) {
            console.error("❌ Verification error:", err);
            toast.error("Error verifying payment.");
          }
        },
        prefill: {
          name: currentUser?.name || "",
          email: currentUser?.email || "",
          contact: currentUser?.phoneNumber || "",
        },
        theme: {
          color: "#DB9245",
        },
      };

      const rzp = new window.Razorpay(options);
      rzp.open();
    } catch (error) {
      console.error("Payment error:", error);
      alert(error.message || "Something went wrong.");
    }
  };

  const handleRecharge = async ({ name, price, coins }) => {
    try {
      // const managerId = currentUser?._id;
      const managerId = currentUser?.id;
      // STEP 1: Create Order
      const orderRes = await fetch(
        "https://inventorymanagement-backend-dev.onrender.com/api/wallet-topup/add-credit",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
          body: JSON.stringify({
            managerId: managerId,
            amount: price,
            currency: "INR",
            planType: name.toLowerCase().split(" ")[1], // e.g., "starter" from "FabrlQs Starter"
          }),
        }
      );

      const orderData = await orderRes.json();
      console.log(orderData);

      if (!orderRes.ok || !orderData?.razorpayOrderId) {
        throw new Error("Failed to create Razorpay order.");
      }

      // STEP 2: Open Razorpay Checkout
      const options = {
        key: "rzp_test_UWcqHHktRV6hxM", // Replace with live key in prod
        amount: price * 100,
        currency: "INR",
        name: "FabrlQs AI",
        description: name,
        order_id: orderData?.razorpayOrderId, // Must come from backend
        handler: async function (response) {
          try {
            console.log("🧾 Razorpay Response:", response);

            const verifyRes = await fetch(
              "https://inventorymanagement-backend-dev.onrender.com/api/wallet-topup/verify-payment",
              {
                method: "POST",
                headers: {
                  "Content-Type": "application/json",
                  Authorization: `Bearer ${localStorage.getItem("token")}`,
                },
                body: JSON.stringify({
                  razorpayOrderId: response.razorpay_order_id,
                  razorpayPaymentId: response.razorpay_payment_id,
                  razorpaySignature: response.razorpay_signature,
                }),
              }
            );

            const verifyData = await verifyRes.json();

            console.log("✅ Verify Response:", verifyData);

            if (!verifyRes.ok) {
              console.error(
                "❌ Server responded with status:",
                verifyRes.status
              );

              toast.error("Something went wrong during payment verification.");
              return;
            }

            if (verifyData?.topUpOrder?.paymentStatus === "paid") {
              dispatch(setSelectedPlan(verifyData));
              toast.success("Payment verified and plan activated!");
            } else {
              toast.error(
                "Payment verification failed. Please contact support."
              );
            }
          } catch (err) {
            console.error("❌ Verification error:", err);
            toast.error("Error verifying payment.");
          }
        },
        prefill: {
          name: currentUser?.name || "",
          email: currentUser?.email || "",
          contact: currentUser?.phoneNumber || "",
        },
        theme: {
          color: "#DB9245",
        },
      };

      const rzp = new window.Razorpay(options);
      rzp.open();
    } catch (error) {
      console.error("Payment error:", error);
      alert(error.message || "Something went wrong.");
    }
  };

  return (
    <div className="min-h-screen bg-[#FCD9A4] px-4 py-6 sm:px-6 md:px-10">
      {/* Header */}
      <div className="flex flex-row pt-20 justify-between items-center mb-6 gap-4">
        <h1 className="text-2xl md:text-3xl font-bold text-gray-800">
          Your Account
        </h1>
                  <button
            onClick={handleLogout}
            className="bg-[#25262B] cursor-pointer text-white px-4 py-2 rounded-md account-action-btn logout">
            Log Out
          </button>
      </div>

      {/* Form Section */}
      <div className="bg-[#DB9245] p-4 sm:p-6 rounded-lg mb-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-4">
          <div className="space-y-4">
            <input
              type="text"
              value={currentUser?.name}
              placeholder="Soumya Snigdha Banik"
              className="w-full p-2 rounded-md border border-gray-300 bg-[#FBDBB5]"
            />
            <input
              type="email"
              value={currentUser?.email}
              placeholder="soumyabanik0@gmail.com"
              className="w-full p-2 rounded-md border border-gray-300 bg-[#FBDBB5]"
            />
            <input
              type="text"
              value={currentUser?.phoneNumber}
              placeholder="+917384242486"
              className="w-full p-2 rounded-md border border-gray-300 bg-[#FBDBB5]"
            />
          </div>

          <div className="space-y-4">
            <div className="flex flex-col sm:flex-row w-full">
              <label className="bg-[#25262B] text-white text-sm px-3 py-2 sm:w-1/2 w-full flex items-center justify-center rounded-t-md sm:rounded-l-md sm:rounded-tr-none">
                Company Name
              </label>
              <input
                type="text"
                value={currentUser?.organizationName}
                placeholder="Soumya International Textiles"
                className="p-2 w-full sm:w-1/2 rounded-b-md sm:rounded-r-md sm:rounded-bl-none border border-gray-300 bg-[#FBDBB5]"
              />
            </div>
            <div className="flex flex-col sm:flex-row w-full">
              <label className="bg-[#25262B] text-white text-sm px-3 py-2 sm:w-1/2 w-full flex items-center justify-center rounded-t-md sm:rounded-l-md sm:rounded-tr-none">
                Company GST Number
              </label>
              <input
                type="text"
                value={currentUser?.GSTNumber}
                placeholder="GESPB73655L"
                className="p-2 w-full sm:w-1/2 rounded-b-md sm:rounded-r-md sm:rounded-bl-none border border-gray-300 bg-[#FBDBB5]"
              />
            </div>
          </div>
        </div>

        <div className="text-right">
          <a
            href="https://mail.google.com/mail/?view=cm&fs=1&to=claw.lawyers@gmail.com&su=Request%20to%20Edit%20My%20Details&body=Hi%20Team,%0A%0AI%20would%20like%20to%20request%20an%20update%20to%20my%20account%20details.%20Please%20assist%20me.%0A%0AThank%20you."
            className="bg-[#292C33] text-white px-4 py-2 rounded-md account-action-btn request-edit inline-block"
            target="_blank"
            rel="noopener noreferrer">
            Request Edit Details
          </a>
        </div>
      </div>

      {/* Wallet and Plans Section */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Wallet */}
        <div className="bg-[#25262B] text-white p-6 rounded-md flex flex-col justify-between">
          <h2 className="text-xl font-semibold mb-4">Your Wallet</h2>
          <p className="text-sm mb-1">Available Claw Coins</p>
          <p className="text-2xl font-bold text-white mb-4">
            {walletCoins?.walletBalance ||
              Coins?.wallet?.coins ||
              Coins?.managerWallet?.coins}
          </p>

          {/* Inner Add Claw Coins Box */}
          <div className="bg-[#DB9245] p-4 rounded-md">
            <label className="block text-sm text-black font-semibold mb-2">
              Add Claw Coins
            </label>

            {/* Step 2: Update input with state */}
            <input
              type="number"
              value={rechargeCoins}
              onChange={(e) => setRechargeCoins(Number(e.target.value))}
              placeholder="Enter No of Claw Coins"
              className="w-full p-2 rounded-md border border-gray-300 text-black mb-2 bg-[#FBDBB5]"
            />

            {/* Step 3: Calculate total as coins * 6 */}
            <div className="text-right text-sm text-black mb-2">
              Total Amount :{" "}
              <span className="font-bold">₹ {rechargeCoins * 6}</span>
            </div>

            <button
              onClick={() => {
                if (
                  Coins?.planType ||
                  Coins?.managerWallet?.plan === "default"
                ) {
                  toast.error(" Add On Can Be Only Used With An Active Plan.");
                  return;
                }

                handleRecharge({
                  name: "Recharge Custom",
                  price: rechargeCoins * 6,
                  coins: rechargeCoins,
                });
              }}
              className="bg-[#25262B] cursor-pointer text-white w-full py-2 rounded-md account-action-btn recharge">
              Recharge Wallet
            </button>
          </div>
          <div className="w-full text-center text-xs text-white mt-2">
            Add On Can Be Only Used With An Active Plan
          </div>
        </div>

        {/* Pricing Cards - replace the two right-side divs with four cards */}
        <div className="lg:col-span-2 flex flex-col">
          <h2 className="text-xl font-bold text-gray-800 mb-2 text-left">
            AI Labs Pricing Plans
          </h2>
          <div className="grid grid-cols-2 gap-3 sm:grid-cols-2 md:grid-cols-4 xl:grid-cols-4 account-cards-animate" ref={cardsRef}>
            {/* Starter Card */}
            <div className="account-card-animate bg-[#F9E1C0] border border-[#25262B] rounded-xl p-3 pt-2 flex flex-col justify-between min-h-[220px] sm:min-h-[320px] max-w-[270px] mx-auto w-full text-xs" data-card-index="0">
              <h3 className="font-bold text-lg mb-2 text-[#25262B]">
                FabrlQs Starter
              </h3>
              <div className="text-[#E29642] text-3xl font-bold mb-2">
                ₹ 1500
              </div>
              <p className="text-xs text-[#25262B] mb-2">
                Perfect for individuals and small teams exploring AI tools for
                the first time
              </p>
              <ul className="text-xs text-[#25262B] mb-4 list-disc pl-4">
                <li>250 Claw Coins</li>
                <li>Add On Available</li>
                <li>Generate Textile Designs</li>
                <li>Edit Textile Designs</li>
                <li>Convert Designs to EPS</li>
              </ul>
              <button
                className={`account-getit-btn ${shouldShowGetItNow("Starter") ? "" : "bg-green-600 hover:bg-green-700 cursor-not-allowed"}`}
                onClick={() => {
                  if (shouldShowGetItNow("Starter")) {
                    handlePayment({
                      name: "FabrlQs Starter",
                      price: 1500,
                      coins: 250,
                    });
                  } else {
                    toast.info("You already have an active plan.");
                  }
                }}>
                {shouldShowGetItNow("Starter") ? "Get It Now" : "Active Now"}
              </button>
            </div>
            {/* Pro Card */}
            <div className="account-card-animate bg-[#F9E1C0] border border-[#25262B] rounded-xl p-3 pt-2 flex flex-col justify-between min-h-[220px] sm:min-h-[320px] max-w-[270px] mx-auto w-full text-xs" data-card-index="1">
              <h3 className="font-bold text-lg mb-2 text-[#25262B]">
                FabrlQs Pro
              </h3>
              <div className="text-[#E29642] text-3xl font-bold mb-2">
                ₹ 3000
              </div>
              <p className="text-xs text-[#25262B] mb-2">
                Perfect for individuals and small teams exploring AI tools for
                the first time
              </p>
              <ul className="text-xs text-[#25262B] mb-4 list-disc pl-4">
                <li>500 Claw Coins</li>
                <li>Add On Available</li>
                <li>Generate Textile Designs</li>
                <li>Edit Textile Designs</li>
                <li>Convert Designs to EPS</li>
              </ul>
              <button
                className={`account-getit-btn ${shouldShowGetItNow("Pro") ? "" : "bg-green-600 hover:bg-green-700 cursor-not-allowed"}`}
                onClick={() => {
                  if (shouldShowGetItNow("Pro")) {
                    handlePayment({
                      name: "FabrlQs Pro",
                      price: 3000,
                      coins: 500,
                    });
                  } else {
                    toast.info("You already have an active plan.");
                  }
                }}
                disabled={!shouldShowGetItNow("Pro")}>
                {shouldShowGetItNow("Pro") ? "Get It Now" : "Active Now"}
              </button>
            </div>
            {/* Elite Card */}
            <div className="account-card-animate bg-[#F9E1C0] border border-[#25262B] rounded-xl p-3 pt-2 flex flex-col justify-between min-h-[220px] sm:min-h-[320px] max-w-[270px] mx-auto w-full text-xs" data-card-index="2">
              <h3 className="font-bold text-lg mb-2 text-[#25262B]">
                FabrlQs Elite
              </h3>
              <div className="text-[#E29642] text-3xl font-bold mb-2">
                ₹ 6000
              </div>
              <p className="text-xs text-[#25262B] mb-2">
                Perfect for individuals and small teams exploring AI tools for
                the first time
              </p>
              <ul className="text-xs text-[#25262B] mb-4 list-disc pl-4">
                <li>1000 Claw Coins</li>
                <li>Add On Available</li>
                <li>Generate Textile Designs</li>
                <li>Edit Textile Designs</li>
                <li>Convert Designs to EPS</li>
              </ul>
              <button
                className={`account-getit-btn ${shouldShowGetItNow("Elite") ? "" : "bg-green-600 hover:bg-green-700 cursor-not-allowed"}`}
                onClick={() => {
                  if (shouldShowGetItNow("Elite")) {
                    handlePayment({
                      name: "FabrlQs Elite",
                      price: 6000,
                      coins: 1000,
                    });
                  } else {
                    toast.info("You already have an active plan.");
                  }
                }}
                disabled={!shouldShowGetItNow("Elite")}>
                {shouldShowGetItNow("Elite") ? "Get It Now" : "Active Now"}
              </button>
            </div>
            {/* Custom Card */}
            <div className="account-card-animate bg-[#F9E1C0] border border-[#25262B] rounded-xl p-3 pt-6 flex flex-col justify-between min-h-[220px] sm:min-h-[320px] max-w-[270px] mx-auto w-full relative text-xs" data-card-index="3">
              <div className="absolute top-0 left-0 w-full bg-[#25262B] text-[#DB9245] text-xs font-bold rounded-t-xl py-2 text-center">
                FLAT 10 % OFF
              </div>
              <h3 className="font-bold text-lg mt-4 mb-2 text-[#25262B]">
                FabrlQs Custom
              </h3>
              <style>{`
                input[type=number]::-webkit-outer-spin-button,
                input[type=number]::-webkit-inner-spin-button {
                  -webkit-appearance: none;
                  margin: 0;
                }
                input[type=number] {
                  -moz-appearance: textfield;
                }
              `}</style>
              <input
                type="number"
                value={customCoins}
                min={1000}
                onChange={(e) => setCustomCoins(Number(e.target.value))}
                placeholder="Enter Amount of Claw Coins"
                className="border border-[#25262B] rounded-md px-2 py-2 mb-2 w-full text-xs h-10 bg-[#DB924580]"
              />

              <div className="text-[#E29642] text-3xl font-bold mb-2">
                ₹ {customCoins * 6 - customCoins * 6 * 0.1}
              </div>

              <ul className="text-xs text-[#25262B] mb-4 list-disc pl-4">
                <li>Custom Amount of Claw Coins</li>
                <li>Claw Coins Must Be 1000+</li>
                <li>Add On Available</li>
                <li>Generate Textile Designs</li>
                <li>Edit Textile Designs</li>
                <li>Convert Designs to EPS</li>
              </ul>
              <button
                className="account-getit-btn"
                onClick={() => {
                  if (customCoins < 1001) {
                    toast.error("Claw Coins Must Be 1000+");
                    return;
                  }

                  handlePayment({
                    name: "FabrlQs Custom",
                    price: customCoins * 6 - customCoins * 6 * 0.1,
                    coins: customCoins,
                  });
                }}>
                Get It Now
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AccountPage;
