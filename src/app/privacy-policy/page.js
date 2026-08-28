import Link from "next/link";

import PolicyPage, {
  PolicySection,
  STORE_EMAIL,
  STORE_PHONE,
  STORE_PHONE_HREF,
} from "../components/policy/PolicyPage";

export default function PrivacyPolicyPage() {
  return (
    <PolicyPage
      title="Privacy Policy"
      crumb="privacy policy"
      subtitle="How Kavya Creation collects, uses, and protects your information."
    >
      <PolicySection title="Introduction" as="h3">
        <p>
          At Kavya Creation, we value your privacy and are committed to
          protecting your personal information. This Privacy Policy explains how
          we collect, use, disclose, and safeguard your data when you browse
          our website, create an account, or place an order. By using our
          website or services, you consent to the practices described here.
        </p>
      </PolicySection>

      <PolicySection title="Information We Collect">
        <p>We may collect various types of information from you, including:</p>
        <ul>
          <li>Personal information: name, email address, and phone number.</li>
          <li>
            Billing and shipping information: addresses used to complete an
            order.
          </li>
          <li>
            Payment details processed securely through Razorpay. We do not store
            your full card or UPI credentials on our servers.
          </li>
          <li>
            Order history, wishlist items, and customer-service messages.
          </li>
          <li>
            Usage data: pages viewed, device and browser information, and
            similar technical data needed to run the site.
          </li>
          <li>
            Cookies and similar tracking data used to keep you signed in and
            remember cart or preference settings.
          </li>
        </ul>
      </PolicySection>

      <PolicySection title="How We Use Your Information">
        <p>We use your information for the following purposes:</p>
        <ul>
          <li>To provide, maintain, and improve our website and services.</li>
          <li>
            To process orders, payments, shipping, and replacement requests.
          </li>
          <li>To send order confirmations and important account updates.</li>
          <li>To respond to your questions, comments, or support requests.</li>
          <li>
            To personalise your shopping experience, such as showing relevant
            sarees.
          </li>
          <li>
            To send newsletters or offers only if you choose to subscribe. You
            can unsubscribe at any time.
          </li>
        </ul>
      </PolicySection>

      <PolicySection title="Information Sharing">
        <p>
          We do not sell, trade, or rent your personal information to others
          for marketing. We may share information with trusted partners who help us
          operate the website — including payment processing through Razorpay
          and courier partners who deliver your order — provided they use the
          data only to perform those services. We may also share information
          when required by law or to protect our rights and customers.
        </p>
      </PolicySection>

      <PolicySection title="Data Security">
        <p>
          We implement security measures to protect your personal information,
          including encrypted connections on checkout and access controls on
          our systems. No method of transmission over the internet is completely
          secure, but we take reasonable steps to keep your data safe.
        </p>
      </PolicySection>

      <PolicySection title="Cookies and Tracking Technologies">
        <p>
          We use cookies and similar technologies to keep you signed in,
          remember cart contents, and understand how the site is used. You can
          disable cookies in your browser settings; some features, including
          checkout and account pages, may not work correctly if you do.
        </p>
      </PolicySection>

      <PolicySection title="Your Choices">
        <p>
          You may choose not to provide certain information; that may limit
          features such as placing an order or saving a wishlist. You can ask
          us to access, correct, or delete personal data we hold by emailing{" "}
          <a href={`mailto:${STORE_EMAIL}`}>{STORE_EMAIL}</a> or calling{" "}
          <a href={STORE_PHONE_HREF}>{STORE_PHONE}</a>. Support hours are
          Monday–Saturday, 10am to 7pm.
        </p>
      </PolicySection>

      <PolicySection title="Changes to this Privacy Policy">
        <p>
          We may update this Privacy Policy from time to time. When we do, we
          will revise the date at the bottom of this page. Please review this
          page periodically for the latest information on our privacy
          practices.
        </p>
      </PolicySection>

      <PolicySection title="Contact Us">
        <p>
          If you have questions or concerns about this Privacy Policy, contact
          us at <a href={`mailto:${STORE_EMAIL}`}>{STORE_EMAIL}</a> or{" "}
          <a href={STORE_PHONE_HREF}>{STORE_PHONE}</a>. You can also use our{" "}
          <Link href="/contact">Contact</Link> page.
        </p>
      </PolicySection>
    </PolicyPage>
  );
}
