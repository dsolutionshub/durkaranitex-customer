import Link from "next/link";

import PolicyPage, {
  PolicySection,
  STORE_ADDRESS,
  STORE_EMAIL,
  STORE_PHONE,
  STORE_PHONE_HREF,
} from "../components/policy/PolicyPage";

export default function ShippingPolicyPage() {
  return (
    <PolicyPage
      title="Shipping Policy"
      crumb="shipping policy"
      subtitle="Affordable shipping across India. Typical delivery is 5–7 days."
    >
      <PolicySection title="Introduction" as="h3">
        <p>
          Kavya Creation ships sarees across India. This Shipping Policy
          explains processing time, delivery estimates, and what to do if a
          parcel is delayed or damaged. Shipping charges are calculated at
          checkout for orders within India.
        </p>
      </PolicySection>

      <PolicySection title="Coverage">
        <p>
          We deliver to addresses across India. International shipping is not
          available. Remote pincodes may take longer than the estimate below.
        </p>
      </PolicySection>

      <PolicySection title="Order Processing">
        <p>
          Orders are typically processed within 1–2 business days after payment
          is confirmed. Orders placed after 2pm on Friday are processed the
          following Monday. Support and dispatch run Monday–Saturday, 10am to
          7pm. We do not process orders on Sundays or public holidays.
        </p>
      </PolicySection>

      <PolicySection title="Delivery Time">
        <p>
          After dispatch, typical delivery is 5–7 days. This is an estimate, not
          a guarantee. Courier schedules, weather, and local restrictions can
          add time. Once shipped, title and risk pass according to the courier’s
          terms; please inspect the parcel on arrival.
        </p>
      </PolicySection>

      <PolicySection title="Packaging">
        <p>
          Sarees are packed to protect the fabric in transit. Please keep the
          packaging until you have checked the product. If the parcel looks
          damaged on arrival, note it with the courier if possible and contact
          us the same day.
        </p>
      </PolicySection>

      <PolicySection title="Order Updates">
        <p>
          After payment you will receive confirmation by email and, where
          available, SMS. When the order ships, tracking details from the
          courier are shared when the partner provides them. You can also check
          order status under Account → Orders after you sign in, or call us
          with your order number.
        </p>
      </PolicySection>

      <PolicySection title="Delays, Loss, or Damage in Transit">
        <p>
          If your order is delayed, lost, or arrives damaged, contact us as
          soon as possible at{" "}
          <a href={`mailto:${STORE_EMAIL}`}>{STORE_EMAIL}</a> or{" "}
          <a href={STORE_PHONE_HREF}>{STORE_PHONE}</a> with your order number.
          Damaged products are handled under our{" "}
          <Link href="/replacement-policy">Replacement Policy</Link> (request
          within 1 day of delivery). We do not offer refunds.
        </p>
      </PolicySection>

      <PolicySection title="Address Accuracy">
        <p>
          Please enter a complete and accurate shipping address, including
          pincode and a reachable phone number. Extra courier charges caused by
          a wrong address, failed delivery attempts, or a request to change the
          address after dispatch may apply where the courier bills them.
        </p>
      </PolicySection>

      <PolicySection title="Contact Us">
        <p>
          For shipping questions, email{" "}
          <a href={`mailto:${STORE_EMAIL}`}>{STORE_EMAIL}</a> or call{" "}
          <a href={STORE_PHONE_HREF}>{STORE_PHONE}</a> (Monday–Saturday, 10am to
          7pm). Our store address is {STORE_ADDRESS}. You can also use our{" "}
          <Link href="/contact">Contact</Link> page.
        </p>
      </PolicySection>
    </PolicyPage>
  );
}
