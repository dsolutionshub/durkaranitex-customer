"use client";
import { useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { loader } from "../components/loader/loaderManager";
import { resetPassword } from "../api/services/authService";
import { getErrorMessage } from "../utils/helperFn";
import toast from "react-hot-toast";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import Image from "next/image";

export default function ChangePassword() {
  const router = useRouter();
  const searchParams = useSearchParams();

  const token = searchParams.get("token");
  const email = searchParams.get("email");

  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [error, setError] = useState("");
  const [success, setSuccess] = useState(false);
  const [visibility, setVisibility] = useState({
    newPassword: false,
    confirmPassword: false,
  });

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (newPassword !== confirmPassword) {
      toast.error("Make sure both passwords are the same.");
      return;
    }
    if (newPassword?.length < 8) {
      toast.error("Password must be at least 8 characters.");
      return;
    }

    const formData = new FormData();
    formData.append("email", email);
    formData.append("token", token);
    formData.append("password", newPassword);
    formData.append("password_confirmation", confirmPassword);

    loader(true);
    try {
      await resetPassword(formData);
      setError("");
      setSuccess(true);
    } catch (error) {
      const MSG = getErrorMessage(error);
      toast.error(MSG);
    } finally {
      loader(false);
    }
  };

  const toggleVisibility = (fieldName) => {
    setVisibility((prev) => ({
      ...prev,
      [fieldName]: !prev[fieldName],
    }));
  };

  return (
    <div className="flex items-center justify-center dark:bg-gray-50 p-4 min-h-screen">
      <div className="w-full max-w-md bg-white text-black rounded-lg shadow-lg">
        <div className="relative bg-indigo-100 p-6 md:p-9 rounded-t-lg pb-10">
          <div>
            <h5 className="text-lg md:text-xl font-semibold text-indigo-600 mb-1">
              Reset Password
            </h5>
            <p className="text-sm text-gray-700">
              Reset your password with Dhurgarani Tex.
            </p>
          </div>
          <div className="absolute -bottom-6 left-6 w-16 h-16 rounded-full bg-white shadow flex items-center justify-center p-2">
            <Image
              src={"/dhurgaraniFavicon.png"}
              height={100}
              width={100}
              alt="logo"
              className="w-full object-cover"
            />
          </div>
        </div>

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
              <div className="mb-4 relative">
                <label
                  htmlFor="newPassword"
                  className="block text-sm font-medium text-gray-700 mb-1"
                >
                  New Password
                </label>
                <input
                  id="newPassword"
                  type={visibility.newPassword ? "text" : "password"}
                  placeholder="Enter new password"
                  required
                  className="w-full p-2 pr-10 border border-gray-300 rounded focus:ring-2 focus:ring-indigo-500 focus:outline-none"
                  value={newPassword}
                  onChange={(e) => setNewPassword(e.target.value)}
                />
                <span
                  onClick={() => toggleVisibility("newPassword")}
                  className="absolute right-3 top-9 cursor-pointer text-gray-500"
                >
                  {visibility.newPassword ? (
                    <FaEyeSlash size={18} />
                  ) : (
                    <FaEye size={18} />
                  )}
                </span>
              </div>

              <div className="mb-4 relative">
                <label
                  htmlFor="confirmPassword"
                  className="block text-sm font-medium text-gray-700 mb-1"
                >
                  Confirm Password
                </label>
                <input
                  id="confirmPassword"
                  type={visibility.confirmPassword ? "text" : "password"}
                  placeholder="Confirm new password"
                  required
                  className="w-full p-2 pr-10 border border-gray-300 rounded focus:ring-2 focus:ring-indigo-500 focus:outline-none"
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                />
                <span
                  onClick={() => toggleVisibility("confirmPassword")}
                  className="absolute right-3 top-9 cursor-pointer text-gray-500"
                >
                  {visibility.confirmPassword ? (
                    <FaEyeSlash size={18} />
                  ) : (
                    <FaEye size={18} />
                  )}
                </span>
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
