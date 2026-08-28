import Link from "next/link";

import PolicyPage, {
  PolicySection,
  STORE_EMAIL,
  STORE_PHONE,
  STORE_PHONE_HREF,
} from "../components/policy/PolicyPage";

export default function ReplacementPolicyPage() {
  return (
    <PolicyPage
      title="Replacement Policy"
      crumb="replacement policy"
      subtitle="Replacements only — within 1 day of delivery for damaged items."
    >
      <PolicySection title="Introduction" as="h3">
        <p>
          Kavya Creation offers replacements only. We do not offer refunds,
          store credit, or cancellations after an order has been packed or
          dispatched. This policy explains when a replacement is available and
          how to request one.
        </p>
      </PolicySection>

      <PolicySection title="Replacement Window">
        <p>
          You may request a replacement within 1 day of delivery. Requests
          received after this window cannot be accepted. Please inspect your
          saree as soon as it arrives.
        </p>
      </PolicySection>

      <PolicySection title="When a Replacement Is Available">
        <p>A replacement may be approved if:</p>
        <ul>
          <li>The saree arrives damaged or with a manufacturing defect.</li>
          <li>We sent the wrong item compared with your order.</li>
          <li>
            You contact us within 1 day of delivery with your order number.
          </li>
          <li>
            The product is unused, unwashed, and unaltered, with original
            packaging where possible.
          </li>
        </ul>
      </PolicySection>

      <PolicySection title="When a Replacement Is Not Available">
        <p>We cannot replace an item if:</p>
        <ul>
          <li>The request is made more than 1 day after delivery.</li>
          <li>The saree has been used, washed, altered, or had tags removed.</li>
          <li>Damage was caused after delivery by misuse or mishandling.</li>
          <li>
            You changed your mind about colour, design, or purchase. Change of
            mind is not covered.
          </li>
        </ul>
      </PolicySection>

      <PolicySection title="How to Request a Replacement">
        <p>Please follow these steps:</p>
        <ul>
          <li>
            Email <a href={`mailto:${STORE_EMAIL}`}>{STORE_EMAIL}</a> or call{" "}
            <a href={STORE_PHONE_HREF}>{STORE_PHONE}</a> within 1 day of
            delivery.
          </li>
          <li>Share your order number and a short description of the issue.</li>
          <li>
            Keep the product and packaging, and send clear photos if we ask for
            them.
          </li>
          <li>
            After we approve the request, send the item back as instructed. We
            will ship a replacement after we receive and check the returned
            saree.
          </li>
        </ul>
      </PolicySection>

      <PolicySection title="What You Will Receive">
        <p>
          Approved cases are fulfilled with a replacement saree — the same
          product if it is in stock, or a suitable alternative we agree with
          you. We do not issue refunds or store credit.
        </p>
      </PolicySection>

      <PolicySection title="Contact Us">
        <p>
          For replacement help, email{" "}
          <a href={`mailto:${STORE_EMAIL}`}>{STORE_EMAIL}</a> or call{" "}
          <a href={STORE_PHONE_HREF}>{STORE_PHONE}</a> (Monday–Saturday, 10am to
          7pm). You can also use our <Link href="/contact">Contact</Link> page.
        </p>
      </PolicySection>
    </PolicyPage>
  );
}
