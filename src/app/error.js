"use client";

import ErrorPage from "./components/error-page/ErrorPage";

export default function Error() {
  return (
    <ErrorPage
      heading="Something went Wrong..."
      message="Sorry, something went wrong. Please try again or go back home."
    />
  );
}
