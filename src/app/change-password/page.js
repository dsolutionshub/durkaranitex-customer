"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";

export default function ChangePassword() {
  const router = useRouter();
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [error, setError] = useState("");
  const [success, setSuccess] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (newPassword !== confirmPassword) {
      setError("Passwords do not match");
      return;
    }

    setError("");
    setSuccess(true);
  };

  return (
    <div className="flex items-center justify-center dark:bg-gray-50 p-4">
      <div className="w-full max-w-md bg-white text-black rounded-lg shadow-lg">
        {/* Header */}
        <div className="relative bg-indigo-100 p-6 md:p-9 rounded-t-lg pb-10">
          {/* Text Content */}
          <div>
            <h5 className="text-lg md:text-xl font-semibold text-indigo-600 mb-1">
              Reset Password
            </h5>
            <p className="text-sm text-gray-700">
              Reset your password with Dhurgarani Tex.
            </p>
          </div>

          {/* Overlapping Circle Logo */}
          <div className="absolute -bottom-6 left-6 w-16 h-16 rounded-full bg-white shadow flex items-center justify-center">
            <span className="text-xl font-bold text-[#01411c]">Logo</span>
          </div>
        </div>

        {/* Body/Form */}
        <div className="pt-10 pb-6 px-6">
          {success ? (
            <div className="text-center">
              <h2
                className="text-xl font-bold mb-3"
                style={{ color: "#01411c" }}
              >
                Password Updated Successfully
              </h2>
              <p className="text-sm text-gray-700 mb-4">
                You can now log in using your new password.
              </p>
              <button
                onClick={() => router.push("/login")}
                className="w-full py-2 px-4 rounded text-white"
                style={{ backgroundColor: "#01411c" }}
              >
                Go to Login
              </button>
            </div>
          ) : (
            <form onSubmit={handleSubmit}>
              <div className="mb-4">
                <label className="block text-sm font-medium text-gray-700">
                  New Password
                </label>
                <input
                  type="password"
                  placeholder="Enter new password"
                  required
                  className="mt-1 w-full p-2 border border-gray-300 rounded focus:ring-2 focus:ring-indigo-500 focus:outline-none"
                  value={newPassword}
                  onChange={(e) => setNewPassword(e.target.value)}
                />
              </div>

              <div className="mb-4">
                <label className="block text-sm font-medium text-gray-700">
                  Confirm Password
                </label>
                <input
                  type="password"
                  placeholder="Confirm new password"
                  required
                  className="mt-1 w-full p-2 border border-gray-300 rounded focus:ring-2 focus:ring-indigo-500 focus:outline-none"
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                />
              </div>

              {error && (
                <div className="text-sm text-red-600 text-center mb-3">
                  {error}
                </div>
              )}

              <button
                type="submit"
                className="w-full bg-[#01411c] text-white py-2 px-4 rounded"
              >
                Reset Password
              </button>
            </form>
          )}
        </div>
      </div>
    </div>
  );
}