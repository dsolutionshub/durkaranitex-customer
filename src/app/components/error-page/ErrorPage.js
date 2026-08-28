"use client";

import Link from "next/link";
import Image from "next/image";

import "./error-page.css";

export default function ErrorPage({
  title = "Oops!",
  heading = "Something went Wrong...",
  message = "Sorry, we couldn't find your page.",
  actionHref = "/",
  actionLabel = "Back to Home",
}) {
  return (
    <div className="aq-error-page">
      <div className="aq-error-area">
        <div className="container">
          <div className="row">
            <div className="col-xl-12">
              <div className="aq-error-wrapper text-center">
                <h1 className="aq-error-title">{title}</h1>
                <div className="aq-error-thumb">
                  <Image
                    src="/images/others/error.webp"
                    alt="404"
                    width={560}
                    height={220}
                    priority
                  />
                </div>
                <div className="aq-error-content">
                  <h2 className="aq-error-title-sm">{heading}</h2>
                  <p>{message}</p>
                  <Link className="aq-btn-black" href={actionHref}>
                    {actionLabel}
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
