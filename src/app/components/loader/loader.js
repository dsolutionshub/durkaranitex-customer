"use client";

import { useEffect, useState } from "react";
import "./styles.css";
import { registerLoader } from "./loaderManager";

function BouncingDots() {
  return <div className="dots"></div>;
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
