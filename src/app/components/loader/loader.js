"use client";

import { useEffect, useState } from "react";
import "./styles.css";
import { registerLoader } from "./loaderManager";

function PreloaderMark() {
  return (
    <div className="aq-preloader-content">
      <div className="aq-preloader-logo">
        <div className="aq-preloader-circle">
          <svg width="190" height="190" viewBox="0 0 380 380" fill="none" xmlns="http://www.w3.org/2000/svg">
            <circle stroke="#D9D9D9" cx="190" cy="190" r="180" strokeWidth="6" strokeLinecap="round" />
            <circle stroke="red" cx="190" cy="190" r="180" strokeWidth="6" strokeLinecap="round" />
          </svg>
        </div>
        <img src="/images/loader/favicon.png" alt="" />
      </div>
      <h3 className="aq-preloader-title">Kavya Creation</h3>
      <p className="aq-preloader-subtitle">Loading..</p>
    </div>
  );
}

function PreloaderShell() {
  return (
    <div className="aq-preloader" id="loading">
      <div className="aq-preloader-center" id="loading-center">
        <div className="aq-preloader-absolute" id="loading-center-absolute">
          <PreloaderMark />
        </div>
      </div>
    </div>
  );
}

export default function Loader() {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    registerLoader(setVisible);
  }, []);

  if (!visible) return null;

  return <PreloaderShell />;
}

export function LoaderComponent() {
  return <PreloaderShell />;
}
