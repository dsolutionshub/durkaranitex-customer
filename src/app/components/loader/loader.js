"use client";

import { useEffect, useState } from "react";
import "./styles.css";
import { registerLoader } from "./loaderManager";

function BouncingDots() {
  const delays = ["-0.3s", "-0.15s", "0s"];
  return (
    <div className="flex space-x-2">
      {delays.map((delay, index) => (
        <div
          key={index}
          className="w-4 h-4 rounded-full bg-gradient-to-r from-purple-500 to-indigo-500 animate-bounce"
          style={{ animationDelay: delay }}
        ></div>
      ))}
    </div>
  );
}

export default function Loader() {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    registerLoader(setVisible);
  }, []);

  if (!visible) return null;

  return (
    <div className="loader-overlay flex justify-center items-center h-screen">
      <BouncingDots />
    </div>
  );
}

export function LoaderComponent() {
  return (
    <div className="flex justify-center items-center h-screen">
      <BouncingDots />
    </div>
  );
}
