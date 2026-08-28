import Link from "next/link";

import PolicyPage, {
  PolicySection,
  STORE_EMAIL,
  STORE_PHONE,
  STORE_PHONE_HREF,
} from "../components/policy/PolicyPage";

export default function TermsAndConditionsPage() {
  return (
    <PolicyPage
      title="Terms & Conditions"
      crumb="terms & conditions"
      subtitle="Please read these terms before you shop with Kavya Creation."
    >
      <PolicySection title="Introduction" as="h3">
        <p>
          These Terms &amp; Conditions govern your use of the Kavya Creation
          website and any purchase of sarees or related products from us. By
          browsing, creating an account, or placing an order, you agree to
          these terms. If you do not agree, please do not use this website.
        </p>
      </PolicySection>

      <PolicySection title="About Kavya Creation">
        <p>
          Kavya Creation is a saree store based in Elampilai, Salem, Tamil
          Nadu. We sell silk, cotton, and other handcrafted sarees for wedding
          and everyday wear. Product pages, prices in Indian Rupees (Rs.), and
          stock shown on the site apply to sales through this website.
        </p>
      </PolicySection>

      <PolicySection title="Accounts">
        <p>
          You are responsible for keeping your login details secure and for
          activity on your account. Please provide accurate name, email, phone,
          and address information so we can fulfil orders and contact you if
          needed.
        </p>
      </PolicySection>

      <PolicySection title="Products and Pricing">
        <p>When you shop with us, please keep the following in mind:</p>
        <ul>
          <li>
            Descriptions and photographs are for guidance. Colour may vary
            slightly because of lighting and screen settings.
          </li>
          <li>
            Handwoven and handcrafted sarees may have small natural variations.
          </li>
          <li>
            Prices are in Indian Rupees (Rs.) and may change without prior
            notice. The price charged is the price shown at checkout.
          </li>
          <li>
            We accept online payment through Razorpay (UPI, cards, and
            netbanking). Cash on Delivery is available only when a product page
            shows that it is offered.
          </li>
        </ul>
      </PolicySection>

      <PolicySection title="Orders">
        <p>
          An order is confirmed after successful payment (or COD confirmation
          where COD is available). We may decline or cancel an order if an item
          is out of stock, if payment fails, or if we cannot verify the order.
          If we cannot fulfil an order, we will contact you using the details
          you provided.
        </p>
      </PolicySection>

      <PolicySection title="Shipping">
        <p>
          We offer affordable shipping across India. Typical delivery is 5–7 days
          after dispatch. Delivery times are estimates and can vary by courier
          and destination. Full details are in our{" "}
          <Link href="/shipping-policy">Shipping Policy</Link>.
        </p>
      </PolicySection>

      <PolicySection title="Replacements">
        <p>
          We offer replacements only — we do not offer refunds. If a saree
          arrives damaged, you may request a replacement within 1 day of
          delivery. Used, washed, or altered items are not eligible. See our{" "}
          <Link href="/replacement-policy">Replacement Policy</Link> for the
          full process.
        </p>
      </PolicySection>

      <PolicySection title="Website use">
        <p>You agree not to misuse the website, including:</p>
        <ul>
          <li>Providing false information or attempting unauthorised access.</li>
          <li>Copying or redistributing our product images or content.</li>
          <li>Interfering with the operation or security of the site.</li>
        </ul>
      </PolicySection>

      <PolicySection title="Intellectual Property">
        <p>
          Text, photographs, logos, and other content on this website belong to
          Kavya Creation or our licensors. You may not copy or use them for
          commercial purposes without our permission.
        </p>
      </PolicySection>

      <PolicySection title="Limitation of Liability">
        <p>
          To the extent permitted by law, Kavya Creation is not liable for
          indirect or consequential loss. Our responsibility for a product
          issue is limited to replacement as described in the Replacement
          Policy.
        </p>
      </PolicySection>

      <PolicySection title="Governing Law">
        <p>
          These terms are governed by the laws of India. Disputes are subject
          to the courts in Salem, Tamil Nadu.
        </p>
      </PolicySection>

      <PolicySection title="Contact Us">
        <p>
          Questions about these terms can be sent to{" "}
          <a href={`mailto:${STORE_EMAIL}`}>{STORE_EMAIL}</a> or{" "}
          <a href={STORE_PHONE_HREF}>{STORE_PHONE}</a>. Support hours are
          Monday–Saturday, 10am to 7pm. You can also visit our{" "}
          <Link href="/contact">Contact</Link> page.
        </p>
      </PolicySection>
    </PolicyPage>
  );
}
