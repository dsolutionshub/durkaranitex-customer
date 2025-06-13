"use client";

import React from "react";
import {
  Shield,
  Lock,
  Eye,
  Database,
  UserCheck,
  AlertTriangle,
} from "lucide-react";
import { BreadCrumb } from "primereact/breadcrumb";

const PrivacyPolicy = () => {
  const items = [{ label: "Privacy Policy" }];
  const home = { label: "Home", url: "/" };

  return (
    <main className="px-6 sm:p-8 md:p-10 lg:p-12 max-w-7xl mx-auto">
      <BreadCrumb
        model={items}
        home={home}
        className="pt-0 pb-3 custom-breadcrumb"
      />

      <div className="prose max-w-none">
        <div className="bg-gradient-to-r from-blue-50 to-indigo-50 p-6 rounded-lg mb-8 border border-blue-200">
          <div className="flex items-center mb-2 space-x-2">
            <Shield className="w-6 h-6 text-blue-600" />
            <span className="text-blue-800 font-bold text-lg flex items-center h-6">
              Your Privacy Matters to Us
            </span>
          </div>

          <p className="text-black mb-2">
            <strong>Last updated:</strong> {new Date().toLocaleDateString()}
          </p>
          <p className="text-black">
            We are committed to protecting your privacy and handling your
            personal information with care and transparency.
          </p>
        </div>

        {/* INTRODUCTION */}
        <section className="mb-10">
          <h2 className="text-2xl font-bold text-black mb-6">Introduction</h2>
          <p className="text-black leading-relaxed mb-4">
            At our Saree Store, we are committed to protecting your privacy.
            This Privacy Policy explains how we collect, use, disclose, and
            safeguard your information when you visit our website and make
            purchases from our saree collection. We believe transparency is key
            to building trust with our customers.
          </p>
        </section>

        {/* INFORMATION WE COLLECT */}
        <section className="mb-10">
          <h2 className="text-2xl font-bold text-black mb-6">
            Information We Collect
          </h2>
          <div className="grid md:grid-cols-2 gap-6 mb-6">
            <div className="bg-green-50 p-6 rounded-lg border border-green-200">
              <div className="flex items-center mb-4 space-x-3">
                <UserCheck className="w-6 h-6 text-green-600" />
                <span className="text-lg font-bold text-black flex items-center h-6">
                  Personal Information
                </span>
              </div>

              <ul className="text-black space-y-2">
                <li>• Name and contact information</li>
                <li>• Billing and shipping addresses</li>
                <li>• Email address and phone number</li>
                <li>• Payment information (processed securely)</li>
                <li>• Order history and preferences</li>
                <li>• Customer service interactions</li>
                <li>• Account credentials and settings</li>
              </ul>
            </div>

            <div className="bg-blue-50 p-6 rounded-lg border border-blue-200">
              <div className="flex items-center mb-4 space-x-3">
                <Database className="w-6 h-6 text-blue-600" />
                <span className="text-lg font-bold text-black flex items-center h-6">
                  Usage Information
                </span>
              </div>

              <ul className="text-black space-y-2">
                <li>• Website usage patterns and analytics</li>
                <li>• Product preferences and browsing history</li>
                <li>• Device and browser information</li>
                <li>• IP address and location data</li>
                <li>• Search queries and filters used</li>
                <li>• Time spent on pages</li>
                <li>• Referral sources</li>
              </ul>
            </div>
          </div>
        </section>

        {/* HOW WE USE INFO */}
        <section className="mb-10">
          <h2 className="text-2xl font-bold text-black mb-6">
            How We Use Your Information
          </h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {[
              {
                icon: <Lock className="w-6 h-6 text-purple-600" />,
                title: "Order Processing",
                desc: "To process and fulfill your saree orders, manage payments, and provide order updates",
              },
              {
                icon: <UserCheck className="w-6 h-6 text-green-600" />,
                title: "Customer Service",
                desc: "To respond to your inquiries, provide support, and resolve any issues you may have",
              },
              {
                icon: <Eye className="w-6 h-6 text-pink-600" />,
                title: "Personalization",
                desc: "To recommend sarees based on your preferences and improve your shopping experience",
              },
              {
                icon: <Database className="w-6 h-6 text-blue-600" />,
                title: "Marketing",
                desc: "To send you updates about new saree collections and offers (with your consent)",
              },
              {
                icon: <Shield className="w-6 h-6 text-indigo-600" />,
                title: "Legal Compliance",
                desc: "To comply with applicable laws, regulations, and legal obligations",
              },
              {
                icon: <AlertTriangle className="w-6 h-6 text-orange-600" />,
                title: "Security",
                desc: "To detect and prevent fraud, protect our systems, and ensure website security",
              },
            ].map(({ icon, title, desc }, i) => (
              <div key={i} className="bg-white p-6 rounded-lg shadow-md border">
                <div className="flex items-center mb-3 space-x-2">
                  <div className="w-6 h-6 flex items-center justify-center">
                    {icon}
                  </div>
                  <span className="font-bold text-black flex items-center h-6">
                    {title}
                  </span>
                </div>
                <p className="text-black text-lg">{desc}</p>
              </div>
            ))}
          </div>
        </section>
        <section className="mb-10">
          <h2 className="text-2xl font-bold text-black mb-6">
            Information Sharing
          </h2>
          <div className="bg-yellow-50 p-6 rounded-lg border border-yellow-200 mb-6">
            <div className="flex items-center mb-3">
              <div className="w-6 h-6 flex items-center justify-center mr-3">
                <AlertTriangle className="w-6 h-6 text-yellow-600" />
              </div>
              <span className="text-lg font-bold text-yellow-800 flex items-center h-6">
                Important Notice
              </span>
            </div>
            <p className="text-black font-medium">
              We do not sell, trade, or otherwise transfer your personal
              information to third parties for their marketing purposes.
            </p>
          </div>

          <p className="text-black leading-relaxed mb-4">
            We may share your information only in the following limited
            circumstances:
          </p>
          <ul className="text-black space-y-3">
            <li>
              • <span className="font-bold">With your explicit consent:</span>{" "}
              When you authorize us to share specific information
            </li>
            <li>
              • <span className="font-bold">Service providers:</span> Trusted
              partners who assist in operating our website, processing payments,
              and fulfilling orders
            </li>
            <li>
              • <span className="font-bold">Legal requirements:</span> When
              required by law, court order, or to protect our rights and safety
            </li>
            <li>
              • <span className="font-bold">Business transfers:</span> In
              connection with a merger, acquisition, or sale of business assets
            </li>
            <li>
              • <span className="font-bold">Fraud prevention:</span> To detect,
              prevent, or investigate fraudulent activities
            </li>
          </ul>
        </section>

        <section className="mb-10">
          <h2 className="text-2xl font-bold text-black mb-6">Data Security</h2>
          <div className="bg-green-50 p-6 rounded-lg border border-green-200">
            <div className="flex items-center mb-4">
              <div className="w-6 h-6 flex items-center justify-center mr-3">
                <Lock className="w-6 h-6 text-green-600" />
              </div>
              <span className="text-lg font-semibold text-green-800 flex items-center h-6">
                Security Measures
              </span>
            </div>

            <p className="text-black leading-relaxed mb-4">
              We implement comprehensive security measures to protect your
              personal information against unauthorized access, alteration,
              disclosure, or destruction:
            </p>
            <ul className="text-black space-y-2">
              <li>• SSL encryption for all data transmission</li>
              <li>• Secure payment processing through certified providers</li>
              <li>• Regular security audits and vulnerability assessments</li>
              <li>• Employee training on data protection practices</li>
              <li>• Access controls and authentication systems</li>
              <li>• Encrypted storage of sensitive information</li>
            </ul>
          </div>
        </section>

        <section className="mb-10">
          <h2 className="text-2xl font-bold text-black mb-6">
            Your Rights and Choices
          </h2>
          <div className="grid md:grid-cols-2 gap-6">
            <div className="bg-blue-50 p-6 rounded-lg border border-blue-200">
              <h3 className="text-lg font-semibold text-blue-800 mb-3 !text-blue-800">
                Your Rights Include
              </h3>
              <ul className="text-black space-y-2">
                <li>• Access your personal information</li>
                <li>• Correct inaccurate data</li>
                <li>• Request deletion of your data</li>
                <li>• Object to certain processing</li>
                <li>• Data portability rights</li>
                <li>• Withdraw consent at any time</li>
              </ul>
            </div>

            <div className="bg-purple-50 p-6 rounded-lg border border-purple-200">
              <h3 className="text-lg font-semibold mb-3 !text-purple-800">
                Communication Preferences
              </h3>
              <ul className="text-black space-y-2">
                <li>• Opt-out of marketing emails</li>
                <li>• Unsubscribe from newsletters</li>
                <li>• Manage notification settings</li>
                <li>• Update contact preferences</li>
                <li>• Control cookie settings</li>
                <li>• Modify account privacy settings</li>
              </ul>
            </div>
          </div>
        </section>

        <section className="mb-10">
          <h2 className="text-2xl font-bold text-black mb-6">
            Cookies and Tracking
          </h2>
          <p className="text-black leading-relaxed mb-4">
            We use cookies and similar tracking technologies to enhance your
            browsing experience, analyze website traffic, and understand user
            preferences. You can control cookie settings through your browser
            preferences.
          </p>
          <div className="bg-gray-50 p-6 rounded-lg">
            <h3 className="text-2xl font-bold text-black mb-6">
              Types of Cookies We Use:
            </h3>
            <ul className="text-black space-y-3">
              <li>
                • <span className="font-bold">Essential cookies:</span> Required
                for website functionality
              </li>
              <li>
                • <span className="font-bold">Analytics cookies:</span> Help us
                understand website usage
              </li>
              <li>
                • <span className="font-bold">Marketing cookies:</span> Used for
                personalized advertising
              </li>
              <li>
                • <span className="font-bold">Preference cookies:</span>{" "}
                Remember your settings and choices
              </li>
            </ul>
          </div>
        </section>

        <section className="mb-10">
          <h2 className="text-2xl font-bold text-black mb-6">Data Retention</h2>
          <p className="text-black leading-relaxed mb-4">
            We retain your personal information only for as long as necessary to
            fulfill the purposes outlined in this policy, comply with legal
            obligations, resolve disputes, and enforce our agreements. Specific
            retention periods vary based on the type of information and
            applicable legal requirements.
          </p>
        </section>
      </div>
    </main>
  );
};

export default PrivacyPolicy;
