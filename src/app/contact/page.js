"use client";

import React from "react";
import { Mail, Phone, MapPin, Clock, MessageCircle, Send } from "lucide-react";
import CustomBreadCrumb from "../components/CustomBreadCrumb";
import { CONTACT_MODEL } from "../utils/constants";

const Contact = () => {
  return (
    <>
      <CustomBreadCrumb model={CONTACT_MODEL} />
      <div className="px-6 pb-5 max-w-7xl mx-auto">
        <h1 className="text-4xl font-bold text-black mb-12 text-center">
          Contact Us
        </h1>

        <div className="grid lg:grid-cols-2 gap-12">
          {/* Contact Information */}
          <div>
            <h2 className="text-2xl font-semibold text-black mb-6">
              Get in Touch
            </h2>
            <p className="text-black mb-8 text-base leading-relaxed">
              We&apos;d love to hear from you! Whether you have questions about
              our sarees, need styling advice, or want to know more about our
              collection, our team is here to help.
            </p>

            <div className="space-y-6">
              <div className="flex items-start bg-white p-6 rounded-lg border shadow-sm">
                <Mail className="w-6 h-6 text-green-600 mr-4 mt-1" />
                <div>
                  <h3 className="font-semibold text-black mb-1">Email Us</h3>
                  <p className="text-black text-sm">support@sareestore.com</p>
                </div>
              </div>

              <div className="flex items-start bg-white p-6 rounded-lg border shadow-sm">
                <Phone className="w-6 h-6 text-green-600 mr-4 mt-1" />
                <div>
                  <h3 className="font-semibold text-black mb-1">Call Us</h3>
                  <p className="text-black text-sm">+91 98765 43210</p>
                </div>
              </div>

              <div className="flex items-start bg-white p-6 rounded-lg border shadow-sm">
                <MapPin className="w-6 h-6 text-green-600 mr-4 mt-1" />
                <div>
                  <h3 className="font-semibold text-black mb-1">
                    Visit Our Store
                  </h3>
                  <p className="text-black text-sm">
                    6/380, Ashok Nagar, Perumagoundampatti, Salem, Tamil Nadu
                    637502
                  </p>
                </div>
              </div>

              <div className="flex items-start bg-white p-6 rounded-lg border shadow-sm">
                <Clock className="w-6 h-6 text-green-600 mr-4 mt-1" />
                <div>
                  <h3 className="font-semibold text-black mb-1">Store Hours</h3>
                  <p className="text-black text-sm">
                    Mon-Sat: 10:00 AM - 7:00 PM
                  </p>
                  <p className="text-black text-sm">Sun: 11:00 AM - 5:00 PM</p>
                </div>
              </div>
            </div>
          </div>

          {/* Contact Form */}
          <div className="bg-white rounded-lg p-8 border">
            <h2 className="text-2xl font-semibold text-black mb-6 flex items-center">
              <Send className="w-6 h-6 mr-3 text-green-600" />
              Send us a Message
            </h2>
            <form className="space-y-6">
              <div className="grid md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-medium text-black mb-2">
                    Full Name *
                  </label>
                  <input
                    type="text"
                    className="w-full px-4 py-3 border border-gray-300 rounded-md 
                    text-black focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent"
                    placeholder="Enter your full name"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-black mb-2">
                    Phone Number
                  </label>
                  <input
                    type="tel"
                    className="w-full px-4 py-3 border border-gray-300 rounded-md 
             text-black 
             focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent"
                    placeholder="+91 98765 43210"
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-black mb-2">
                  Email Address *
                </label>
                <input
                  type="email"
                  className="w-full px-4 py-3 border border-gray-300 rounded-md 
             text-black 
             focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent"
                  placeholder="your@email.com"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-black mb-2">
                  Subject *
                </label>
                <select className="w-full px-4 py-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-green-500 focus:border-transparent text-black">
                  <option value="">Select a subject</option>
                  <option value="product-inquiry">Product Inquiry</option>
                  <option value="order-status">Order Status</option>
                  <option value="replacement">Replacement Request</option>
                  <option value="styling-advice">Styling Advice</option>
                  <option value="bulk-order">Bulk Order</option>
                  <option value="other">Other</option>
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium text-black mb-2">
                  Message *
                </label>
                <textarea
                  rows={6}
                  className="w-full px-4 py-3 border border-gray-300 rounded-md 
             text-black 
             focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent"
                  placeholder="Tell us more about your inquiry..."
                ></textarea>
              </div>

              <button
                type="submit"
                className="w-full bg-green-800 text-white py-3 rounded-md hover:bg-green-800 transition font-medium text-lg"
              >
                Send Message
              </button>

              <p className="text-sm text-black text-center mt-3">
                We&apos;ll get back to you within 24 hours during business days
              </p>
            </form>
          </div>
        </div>

        {/* Additional Contact Boxes */}
        <div className="mt-16 grid md:grid-cols-3 gap-8">
          <div className="text-center p-6 bg-white rounded-lg border shadow-sm">
            <Mail className="w-10 h-10 text-green-600 mx-auto mb-4" />
            <h3 className="font-semibold text-black mb-1">Customer Support</h3>
            <p className="text-black text-sm mb-2">
              Order assistance & product queries
            </p>
            <p className="text-green-600 font-medium text-sm">
              support@sareestore.com
            </p>
          </div>

          <div className="text-center p-6 bg-white rounded-lg border shadow-sm">
            <Phone className="w-10 h-10 text-green-600 mx-auto mb-4" />
            <h3 className="font-semibold text-black mb-1">
              Styling Consultation
            </h3>
            <p className="text-black text-sm mb-2">
              Personalized styling advice
            </p>
            <p className="text-green-600 font-medium text-sm">
              +91 98765 43211
            </p>
          </div>

          <div className="text-center p-6 bg-white rounded-lg border shadow-sm">
            <MessageCircle className="w-10 h-10 text-green-600 mx-auto mb-4" />
            <h3 className="font-semibold text-black mb-1">Bulk Orders</h3>
            <p className="text-black text-sm mb-2">
              Corporate & wedding inquiries
            </p>
            <p className="text-green-600 font-medium text-sm">
              bulk@sareestore.com
            </p>
          </div>
        </div>
      </div>
    </>
  );
};

export default Contact;
