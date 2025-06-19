import React from "react";
import { MapPin, Users, Award, Heart } from "lucide-react";

import CustomBreadCrumb from "../components/CustomBreadCrumb";
import { ABOUT_MODEL } from "../utils/constants";

const About = () => {
  return (
    <>
      <CustomBreadCrumb model={ABOUT_MODEL} title={"About Us"} />
      <main className="max-w-5xl mx-auto px-4 pt-3 pb-5">
        <section className="mb-12 text-center">
          <h1 className="text-3xl font-bold text-black mb-4">
            Celebrating Indian Heritage Through Timeless Sarees
          </h1>
          <p className="text-lg text-black leading-relaxed">
            For over two decades, we&apos;ve been curating the finest collection
            of authentic Indian sarees from our Salem Elampillai store.
          </p>
        </section>

        <section className="mb-12 text-center">
          <h2 className="text-2xl font-semibold text-black mb-6">
            Our Store Location
          </h2>
          <div className="p-6 border rounded-lg">
            <div className="flex items-center justify-center mb-4">
              <MapPin className="w-6 h-6 text-green-600 mr-2" />
              <h3 className="text-xl font-semibold text-black">
                Salem Elampillai Store
              </h3>
            </div>
            <p className="text-black mb-1">
              Salem Elampillai, Tamil Nadu, India
            </p>
            <p className="text-gray-700 text-sm">
              Your destination for authentic South Indian silk sarees and
              handloom collections.
            </p>
          </div>
        </section>

        {/* Our Journey */}
        <section className="mb-12 text-center">
          <h2 className="text-2xl font-semibold text-black mb-6">
            Our Journey
          </h2>
          <div className="grid md:grid-cols-4 gap-6">
            <div className="p-4 border rounded-lg">
              <Users className="w-8 h-8 text-green-600 mx-auto mb-2" />
              <h3 className="text-xl font-bold text-black">50,000+</h3>
              <p className="text-gray-700 text-sm">Happy Customers</p>
            </div>
            <div className="p-4 border rounded-lg">
              <Award className="w-8 h-8 text-green-600 mx-auto mb-2" />
              <h3 className="text-xl font-bold text-black">25+</h3>
              <p className="text-gray-700 text-sm">Years of Excellence</p>
            </div>
            <div className="p-4 border rounded-lg">
              <Heart className="w-8 h-8 text-green-600 mx-auto mb-2" />
              <h3 className="text-xl font-bold text-black">1000+</h3>
              <p className="text-gray-700 text-sm">Unique Designs</p>
            </div>
            <div className="p-4 border rounded-lg">
              <MapPin className="w-8 h-8 text-green-600 mx-auto mb-2" />
              <h3 className="text-xl font-bold text-black">500+</h3>
              <p className="text-gray-700 text-sm">Cities Served</p>
            </div>
          </div>
        </section>

        {/* Our Story */}
        <section className="mb-12">
          <h2 className="text-2xl font-semibold text-black mb-4">Our Story</h2>
          <p className="text-black leading-relaxed mb-4">
            Founded in 1998, our saree collection began as a passion for
            preserving traditional Indian weaving techniques. We work directly
            with skilled artisans across India to bring you authentic pieces
            that honor traditional craftsmanship.
          </p>
          <p className="text-black leading-relaxed">
            Every saree tells a story of heritage, quality, and the special
            moments it will be part of in your life.
          </p>
        </section>

        {/* Our Promise */}
        <section className="border p-6 rounded-lg">
          <h2 className="text-2xl font-semibold text-black mb-4">
            Our Promise
          </h2>
          <p className="text-black leading-relaxed">
            We deliver authentic, high-quality sarees that connect you to
            India&apos;s rich cultural heritage. Whether for weddings, parties,
            or everyday elegance, we help you find the perfect piece while
            supporting traditional artisans.
          </p>
        </section>
      </main>
    </>
  );
};

export default About;
