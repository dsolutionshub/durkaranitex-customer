"use client";
import { reset } from "@/app/api/services/authService";
import { useState } from "react";
import toast from "react-hot-toast";

export default function ForgotPasswordModal({ onClose }) {
  const [email, setEmail] = useState("");
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const data = await reset({ email });
      toast.success(data?.message || "Recovery link sent");
      setSubmitted(true);
    } catch (error) {
      toast.error("Failed to send link. Check email.");
    }
  };

  return (
    <div className="fixed inset-0 z-50 bg-black bg-opacity-50 flex justify-center items-center">
      <div className="bg-white dark:bg-gray-900 text-black dark:text-white p-6 rounded-lg w-[90%] max-w-md shadow-xl transition-colors duration-300">
        {submitted ? (
          <>
            <div className="bg-[#d7e6fd] rounded-t-md p-4 mb-2">
              <h5 className="text-lg font-semibold text-[#333] dark:text-white">
                Reset Password
              </h5>
            </div>

            <div className="bg-green-100 text-green-800 text-sm p-4 rounded text-center mb-4">
              If you had correctly entered an email associated with a Dhurgarani
              Tex account, you will receive an email shortly. Please check your
              email inbox to continue.
            </div>

            <button
              onClick={onClose}
              className="w-full py-2 px-4 rounded text-white"
              style={{ backgroundColor: "#01411c" }}
            >
              Back to Sign In!
            </button>
          </>
        ) : (
          <>
            <h2 className="text-xl font-bold mb-2 text-center">
              Forgot Password?
            </h2>
            <p className="text-sm text-gray-600 dark:text-gray-800 text-center mb-4">
              No worries, we&apos;ll send you reset instructions.
            </p>

            <form onSubmit={handleSubmit}>
              <input
                type="email"
                required
                placeholder="Enter Email"
                className="w-full p-2 border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-800 text-black dark:text-white rounded mb-3"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
              <button
                type="submit"
                className="w-full p-2 rounded text-white"
                style={{ backgroundColor: "#01411c" }}
              >
                Send Recovery Link
              </button>
            </form>

            <button
              className="mt-3 text-sm font-medium w-full text-center hover:underline"
              style={{ color: "#01411c" }}
              onClick={onClose}
            >
              Cancel
            </button>
          </>
        )}
      </div>
    </div>
  );
}
