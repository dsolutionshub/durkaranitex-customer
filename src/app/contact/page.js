"use client";

import { useEffect, useState } from "react";
import toast from "react-hot-toast";

import "./contact-page.css";

const STORE_EMAIL = "kavyacreation1471@gmail.com";
const STORE_PHONE = "+91 7904749251";
const STORE_PHONE_HREF = "tel:7904749251";
const STORE_ADDRESS =
  "6/329-4, Ashok Nagar, Near Sanjeeviraya Perumal kovil, Perumagoundampatty, Elampilai, Salem, Tamil Nadu 637502";
const STORE_HOURS = "Mon-Sat from 10am to 7pm";
const MAPS_DIRECTIONS =
  "https://www.google.com/maps/dir//Kavya+Creation,+Perumagoundampatti,+Elampillai,+Tamil+Nadu+637502/@13.0908087,80.1986642,15z/data=!4m8!4m7!1m0!1m5!1m1!1s0x3babe30060299ee7:0xc500141ea361d99e!2m2!1d78.0088047!2d11.5962889?entry=ttu&g_ep=EgoyMDI2MDgyMy4wIKXMDSoASAFQAw%3D%3D";
const MAPS_EMBED =
  "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3918.35!2d78.0088047!3d11.5962889!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3babe30060299ee7%3A0xc500141ea361d99e!2sKavya%20Creation!5e0!3m2!1sen!2sin";

const REMEMBER_KEY = "aq-contact-remember";

const FAQ_ITEMS = [
  {
    q: "What is the return process?",
    a: "We offer replacements only — no refunds. If a saree arrives damaged, email kavyacreation1471@gmail.com or call +91 7904749251 within 1 day of delivery with your order number and photos if asked.",
  },
  {
    q: "Can I cancel my order after placing it?",
    a: "Please contact us as soon as possible on +91 7904749251. Once an order is packed or dispatched, it cannot be cancelled.",
  },
  {
    q: "How can I check the status of my order?",
    a: "Open Account → Orders after you sign in, or check the confirmation SMS and email sent after payment. You can also call +91 7904749251 with your order number.",
  },
  {
    q: "Which items are not eligible for return?",
    a: "Used, washed, or altered sarees cannot be replaced. Replacement is only for items that arrive damaged, and must be requested within 1 day of delivery.",
  },
  {
    q: "How long does it take to receive a refund after a return?",
    a: "We do not offer refunds. Approved cases are fulfilled with a replacement saree after we receive and check the returned item.",
  },
  {
    q: "What should I do if I receive a damaged or incorrect product?",
    a: "Keep the product and packaging, take clear photos, and contact us within 1 day of delivery at kavyacreation1471@gmail.com or +91 7904749251 with your order number.",
  },
];

const ArrowIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 14 14" fill="none">
    <path d="M0.898438 6.90039H12.8984" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
    <path d="M6.89844 0.900391L12.8984 6.90039L6.89844 12.9004" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
  </svg>
);

export default function ContactPage() {
  const [form, setForm] = useState({
    name: "",
    email: "",
    subject: "",
    message: "",
    remember: false,
  });
  const [openFaq, setOpenFaq] = useState(0);

  useEffect(() => {
    try {
      const saved = JSON.parse(localStorage.getItem(REMEMBER_KEY) || "null");
      if (saved?.name || saved?.email) {
        setForm((prev) => ({
          ...prev,
          name: saved.name || "",
          email: saved.email || "",
          remember: true,
        }));
      }
    } catch {
      // ignore invalid saved form
    }
  }, []);

  const onChange = (event) => {
    const { name, value, type, checked } = event.target;
    setForm((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  const onSubmit = (event) => {
    event.preventDefault();
    if (!form.name.trim() || !form.email.trim() || !form.subject.trim() || !form.message.trim()) {
      toast.error("Please fill in all required fields.");
      return;
    }

    if (form.remember) {
      localStorage.setItem(
        REMEMBER_KEY,
        JSON.stringify({ name: form.name, email: form.email })
      );
    } else {
      localStorage.removeItem(REMEMBER_KEY);
    }

    const mailto = `mailto:${STORE_EMAIL}?subject=${encodeURIComponent(form.subject)}&body=${encodeURIComponent(
      `Name: ${form.name}\nEmail: ${form.email}\n\n${form.message}`
    )}`;
    window.location.href = mailto;
    toast.success("Opening your email app to send the message.");
  };

  return (
    <main className="aq-contact-page">
      <div className="aq-breadcrumb-ptb">
        <div className="container">
          <div className="row">
            <div className="col-lg-12">
              <div className="aq-breadcrumb-top-heading text-center aq-contact-pb-60">
                <span className="aq-blog-inner-top-subtitle">Get in Touch</span>
                <h2 className="aq-blog-inner-top-title">
                  Contact our experts <br /> to start working together
                </h2>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="aq-contact-info-area aq-contact-pb-60">
        <div className="container container-1330">
          <div className="row gx-2">
            <div className="col-lg-3 col-md-6">
              <div className="aq-contact-info-wrap text-center aq-contact-mb-30">
                <span className="aq-contact-info-icon d-inline-block aq-contact-mb-50">
                  <svg xmlns="http://www.w3.org/2000/svg" width="30" height="40" viewBox="0 0 30 40" fill="none">
                    <path d="M17.0243 13.2745L19.5785 18.383C19.9268 19.0796 20.8556 19.7762 21.6296 19.8923L26.2543 20.6663C29.2149 21.1694 29.9115 23.2979 27.783 25.4264L24.1839 29.0256C23.584 29.6254 23.2357 30.8058 23.4292 31.6572L24.4548 36.1271C25.2675 39.6488 23.3905 41.0227 20.2752 39.1844L15.9407 36.6109C15.1473 36.1465 13.8702 36.1465 13.0769 36.6109L8.74241 39.1844C5.62703 41.0227 3.75006 39.6488 4.56277 36.1271L5.58838 31.6572C5.78188 30.8252 5.43355 29.6448 4.8337 29.0256L1.23459 25.4264C-0.893924 23.2979 -0.197361 21.15 2.76322 20.6663L7.38793 19.8923C8.16194 19.7568 9.09074 19.0796 9.43905 18.383L11.9933 13.2745C13.3671 10.5074 15.6504 10.5074 17.0243 13.2745Z" fill="currentcolor" />
                    <path opacity="0.4" d="M2.90439 16.4477C2.11103 16.4477 1.45312 15.7898 1.45312 14.9964V1.45126C1.45312 0.657907 2.11103 0 2.90439 0C3.69774 0 4.35565 0.657907 4.35565 1.45126V14.9964C4.35565 15.7898 3.69774 16.4477 2.90439 16.4477Z" fill="currentcolor" />
                    <path opacity="0.4" d="M26.1231 16.4477C25.3298 16.4477 24.6719 15.7898 24.6719 14.9964V1.45126C24.6719 0.657907 25.3298 0 26.1231 0C26.9165 0 27.5744 0.657907 27.5744 1.45126V14.9964C27.5744 15.7898 26.9165 16.4477 26.1231 16.4477Z" fill="currentcolor" />
                    <path opacity="0.4" d="M14.5138 6.77257C13.7204 6.77257 13.0625 6.11466 13.0625 5.3213V1.45126C13.0625 0.657907 13.7204 0 14.5138 0C15.3071 0 15.965 0.657907 15.965 1.45126V5.3213C15.965 6.11466 15.3071 6.77257 14.5138 6.77257Z" fill="currentcolor" />
                  </svg>
                </span>
                <h3 className="aq-contact-info-title">Feedbacks</h3>
                <p>Speak to our Friendly team.</p>
                <a href={`mailto:${STORE_EMAIL}`}>{STORE_EMAIL}</a>
              </div>
            </div>
            <div className="col-lg-3 col-md-6">
              <div className="aq-contact-info-wrap text-center aq-contact-mb-30">
                <span className="aq-contact-info-icon d-inline-block aq-contact-mb-50">
                  <svg xmlns="http://www.w3.org/2000/svg" width="36" height="36" viewBox="0 0 36 36" fill="none">
                    <path d="M26.4339 16.1254C25.7889 16.1254 25.2789 15.6004 25.2789 14.9704C25.2789 14.4154 24.7239 13.2604 23.7939 12.2554C22.8789 11.2804 21.8739 10.7104 21.0339 10.7104C20.3889 10.7104 19.8789 10.1854 19.8789 9.55539C19.8789 8.92539 20.4039 8.40039 21.0339 8.40039C22.5339 8.40039 24.1089 9.21039 25.4889 10.6654C26.7789 12.0304 27.6039 13.7254 27.6039 14.9554C27.6039 15.6004 27.0789 16.1254 26.4339 16.1254Z" fill="currentcolor" />
                    <path d="M31.8534 16.125C31.2084 16.125 30.6984 15.6 30.6984 14.97C30.6984 9.645 26.3634 5.325 21.0534 5.325C20.4084 5.325 19.8984 4.8 19.8984 4.17C19.8984 3.54 20.4084 3 21.0384 3C27.6384 3 33.0084 8.37 33.0084 14.97C33.0084 15.6 32.4834 16.125 31.8534 16.125Z" fill="currentcolor" />
                    <path d="M17.6889 21.315L12.7839 26.22C12.2439 25.74 11.7189 25.245 11.2089 24.735C9.66391 23.175 8.26891 21.54 7.02391 19.83C5.79391 18.12 4.80391 16.41 4.08391 14.715C3.36391 13.005 3.00391 11.37 3.00391 9.81C3.00391 8.79 3.18391 7.815 3.54391 6.915C3.90391 6 4.47391 5.16 5.26891 4.41C6.22891 3.465 7.27891 3 8.38891 3C8.80891 3 9.22891 3.09 9.60391 3.27C9.99391 3.45 10.3389 3.72 10.6089 4.11L14.0889 9.015C14.3589 9.39 14.5539 9.735 14.6889 10.065C14.8239 10.38 14.8989 10.695 14.8989 10.98C14.8989 11.34 14.7939 11.7 14.5839 12.045C14.3889 12.39 14.1039 12.75 13.7439 13.11L12.6039 14.295C12.4389 14.46 12.3639 14.655 12.3639 14.895C12.3639 15.015 12.3789 15.12 12.4089 15.24C12.4539 15.36 12.4989 15.45 12.5289 15.54C12.7989 16.035 13.2639 16.68 13.9239 17.46C14.5989 18.24 15.3189 19.035 16.0989 19.83C16.6389 20.355 17.1639 20.865 17.6889 21.315Z" fill="currentcolor" />
                    <path d="M32.9652 27.4955C32.9652 27.9155 32.8902 28.3505 32.7402 28.7705C32.6952 28.8905 32.6502 29.0105 32.5902 29.1305C32.3352 29.6705 32.0052 30.1805 31.5702 30.6605C30.8352 31.4705 30.0252 32.0555 29.1102 32.4305C29.0952 32.4305 29.0802 32.4455 29.0652 32.4455C28.1802 32.8055 27.2202 33.0005 26.1852 33.0005C24.6552 33.0005 23.0202 32.6405 21.2952 31.9055C19.5702 31.1705 17.8452 30.1805 16.1352 28.9355C15.5502 28.5005 14.9652 28.0655 14.4102 27.6005L19.3152 22.6955C19.7352 23.0105 20.1102 23.2505 20.4252 23.4155C20.5002 23.4455 20.5902 23.4905 20.6952 23.5355C20.8152 23.5805 20.9352 23.5955 21.0702 23.5955C21.3252 23.5955 21.5202 23.5055 21.6852 23.3405L22.8252 22.2155C23.2002 21.8405 23.5602 21.5555 23.9052 21.3755C24.2502 21.1655 24.5952 21.0605 24.9702 21.0605C25.2552 21.0605 25.5552 21.1205 25.8852 21.2555C26.2152 21.3905 26.5602 21.5855 26.9352 21.8405L31.9002 25.3655C32.2902 25.6355 32.5602 25.9505 32.7252 26.3255C32.8752 26.7005 32.9652 27.0755 32.9652 27.4955Z" fill="currentcolor" />
                  </svg>
                </span>
                <h3 className="aq-contact-info-title">Call Us</h3>
                <p>{STORE_HOURS}</p>
                <a href={STORE_PHONE_HREF}>{STORE_PHONE}</a>
              </div>
            </div>
            <div className="col-lg-3 col-md-6">
              <div className="aq-contact-info-wrap text-center aq-contact-mb-30">
                <span className="aq-contact-info-icon d-inline-block aq-contact-mb-50">
                  <svg xmlns="http://www.w3.org/2000/svg" width="26" height="30" viewBox="0 0 26 30" fill="none">
                    <path d="M25.6097 9.80488C24.0731 3.0439 18.1756 0 12.9951 0C12.9951 0 12.9951 0 12.9805 0C7.8146 0 1.90241 3.02927 0.365822 9.79024C-1.34637 17.3415 3.27802 23.7366 7.46338 27.761C9.0146 29.2537 11.0048 30 12.9951 30C14.9853 30 16.9756 29.2537 18.5122 27.761C22.6975 23.7366 27.3219 17.3561 25.6097 9.80488Z" fill="currentcolor" />
                    <path d="M12.9965 17.1365C15.5424 17.1365 17.6062 15.0726 17.6062 12.5267C17.6062 9.98085 15.5424 7.91699 12.9965 7.91699C10.4506 7.91699 8.38672 9.98085 8.38672 12.5267C8.38672 15.0726 10.4506 17.1365 12.9965 17.1365Z" fill="white" />
                  </svg>
                </span>
                <h3 className="aq-contact-info-title">Visit Us</h3>
                <p>Visit our office HQ.</p>
                <a href={MAPS_DIRECTIONS} target="_blank" rel="noopener noreferrer">
                  {STORE_ADDRESS}
                </a>
              </div>
            </div>
            <div className="col-lg-3 col-md-6">
              <div className="aq-contact-info-wrap text-center aq-contact-mb-30">
                <span className="aq-contact-info-icon d-inline-block aq-contact-mb-50">
                  <svg xmlns="http://www.w3.org/2000/svg" width="30" height="30" viewBox="0 0 30 30" fill="none">
                    <path d="M15 30C23.2843 30 30 23.2843 30 15C30 6.71573 23.2843 0 15 0C6.71573 0 0 6.71573 0 15C0 23.2843 6.71573 30 15 30Z" fill="currentcolor" />
                    <path d="M20.5737 20.8976C20.3787 20.8976 20.1837 20.8526 20.0037 20.7326L15.3537 17.9576C14.1987 17.2676 13.3438 15.7526 13.3438 14.4176V8.26758C13.3438 7.65258 13.8537 7.14258 14.4687 7.14258C15.0837 7.14258 15.5937 7.65258 15.5937 8.26758V14.4176C15.5937 14.9576 16.0437 15.7526 16.5087 16.0226L21.1587 18.7976C21.6987 19.1126 21.8637 19.8026 21.5487 20.3426C21.3237 20.7026 20.9487 20.8976 20.5737 20.8976Z" fill="white" />
                  </svg>
                </span>
                <h3 className="aq-contact-info-title">Open Time:</h3>
                <p>Office opening hours</p>
                <a href="#contact-form">{STORE_HOURS}</a>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="aq-contact-ptb p-relative">
        <div className="aq-contact-map">
          <iframe
            title="Kavya Creation location"
            src={MAPS_EMBED}
            width="600"
            height="450"
            allowFullScreen
            referrerPolicy="no-referrer-when-downgrade"
          />
        </div>
        <div className="container">
          <div className="row justify-content-lg-end">
            <div className="col-lg-6">
              <div className="aq-contact-us-wrap" id="contact-form">
                <h4 className="aq-contact-us-title aq-contact-mb-30">Send a Message 👍🏻</h4>
                <form onSubmit={onSubmit}>
                  <div className="row">
                    <div className="col-lg-6">
                      <div className="aq-contact-form-input aq-contact-mb-20">
                        <label className="aq-form-label">Your Name *</label>
                        <input
                          className="aq-form-control h-56 brr-0"
                          placeholder="your name"
                          name="name"
                          type="text"
                          value={form.name}
                          onChange={onChange}
                        />
                      </div>
                    </div>
                    <div className="col-lg-6">
                      <div className="aq-contact-form-input aq-contact-mb-20">
                        <label className="aq-form-label">Email Address *</label>
                        <input
                          className="aq-form-control h-56 brr-0"
                          placeholder="your email"
                          name="email"
                          type="email"
                          value={form.email}
                          onChange={onChange}
                        />
                      </div>
                    </div>
                    <div className="col-lg-12">
                      <div className="aq-contact-form-input aq-contact-mb-20">
                        <label className="aq-form-label">Subject *</label>
                        <input
                          className="aq-form-control h-56 brr-0"
                          placeholder="subject"
                          name="subject"
                          type="text"
                          value={form.subject}
                          onChange={onChange}
                        />
                      </div>
                    </div>
                    <div className="col-lg-12">
                      <div className="aq-contact-form-input aq-contact-mb-20">
                        <label className="aq-form-label">Your message *</label>
                        <textarea
                          className="aq-form-control brr-0"
                          placeholder="message"
                          name="message"
                          value={form.message}
                          onChange={onChange}
                        />
                      </div>
                      <div className="aq-contact-remeber aq-contact-mb-20">
                        <input
                          className="aq-form-checkbox"
                          id="remeberinput"
                          type="checkbox"
                          name="remember"
                          checked={form.remember}
                          onChange={onChange}
                        />
                        <label className="aq-form-checkbox-label" htmlFor="remeberinput">
                          Save my name, email, and website in this browser for the next time I comment.
                        </label>
                      </div>
                      <div className="aq-contact-form-btn">
                        <button className="aq-btn-subscribe w-100" type="submit">
                          Send message
                          <ArrowIcon />
                        </button>
                      </div>
                    </div>
                  </div>
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="aq-contact-faq-area">
        <div className="container container-1330">
          <div className="row">
            <div className="col-lg-5">
              <div className="aq-contact-faq-title-box aq-contact-mb-40">
                <span className="aq-section-subtitle aq-contact-mb-10">Faq’s section</span>
                <h4 className="aq-section-title fs-54 ff-onest-med aq-contact-mb-20">
                  Frequently <br /> Asked Questions
                </h4>
                <div className="aq-contact-faq-btn">
                  <a className="aq-btn-black" href="#contact-form">
                    Contact us
                    <span>
                      <ArrowIcon />
                    </span>
                  </a>
                </div>
              </div>
            </div>
            <div className="col-lg-7">
              <div className="aq-faq-wrap">
                <div className="accordion">
                  {FAQ_ITEMS.map((item, index) => {
                    const open = openFaq === index;
                    return (
                      <div className="accordion-items" key={item.q}>
                        <div className="accordion-header">
                          <button
                            className={`accordion-buttons${open ? "" : " collapsed"}`}
                            type="button"
                            aria-expanded={open}
                            onClick={() => setOpenFaq(open ? -1 : index)}
                          >
                            {item.q}
                            <span className="aq-faq-icon" />
                          </button>
                        </div>
                        {open && (
                          <div className="accordion-collapse">
                            <div className="accordion-body">
                              <p>{item.a}</p>
                            </div>
                          </div>
                        )}
                      </div>
                    );
                  })}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}
