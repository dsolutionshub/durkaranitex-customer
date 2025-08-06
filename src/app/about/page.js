import React from "react";
import { MapPin, Users, Award, Heart, Truck, Star } from "lucide-react";

import CustomBreadCrumb from "../components/CustomBreadCrumb";
import { ABOUT_MODEL } from "../utils/constants";
import Image from "next/image";

const About = () => {
  return (
    <>
      <CustomBreadCrumb model={ABOUT_MODEL} title={"About Us"} />
      <main className="max-w-5xl mx-auto px-4 pt-3 pb-5">
        <div className="mb-12 text-center">
          <div className="mb-8">
            <Image
              height={100}
              width={100}
              src="/images/home/banner_about.png"
              alt="Beautiful saree collection"
              className="w-full h-64 object-cover rounded-lg shadow-lg"
            />
          </div>
          <h2 className="text-3xl font-bold text-black mb-4">
            Celebrating Indian Heritage Through Timeless Sarees
          </h2>
          <p className="text-xl text-black leading-relaxed max-w-3xl mx-auto">
            For over two decades, we&apos;ve been curating the finest collection
            of authentic Indian sarees, bringing you closer to the rich tapestry
            of Indian culture and craftsmanship.
          </p>
        </div>

        {/* Our Store */}
        <section className="mb-12">
          <h2 className="text-3xl font-semibold text-black mb-8 text-center">
            Our Store Location
          </h2>
          <div className="max-w-2xl mx-auto">
            <div className="bg-gradient-to-br from-pink-50 to-purple-50 p-8 rounded-lg shadow-md border">
              <Image
                height={100}
                width={100}
                src="/images/home/banner_about.png"
                alt="Dhurgarani Tex"
                className="w-full h-64 object-cover rounded-lg mb-6"
              />
              <div className="text-center">
                <p className="text-black mb-2 text-lg">
                  6/380, Ashok Nagar, Perumagoundampatti,
                </p>
                <p className="text-black mb-4 text-lg">
                  Salem, Tamil Nadu 637502
                </p>
                <p className="text-black mb-6">
                  Our store featuring the largest collection of designer and
                  traditional sarees, with personalized styling consultations
                  and expert guidance from our experienced team.
                </p>

                {/* Google Maps Embed */}
                <div className="w-full h-64">
                  <iframe
                    title="Dhurgarani Tex Location"
                    src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3918.372387065994!2d78.009571!3d11.5948415!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3babe35d303e1d15%3A0xbb3f6971d3f74ddb!2sDhurgarani%20Tex!5e0!3m2!1sen!2sin!4v1718888888888!5m2!1sen!2sin"
                    width="100%"
                    height="100%"
                    className="rounded-lg border-0"
                    allowFullScreen=""
                    loading="lazy"
                    referrerPolicy="no-referrer-when-downgrade"
                  ></iframe>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Success Stories */}
        <section className="mb-12">
          <h2 className="text-3xl font-semibold text-black mb-8 text-center">
            Our Success Journey
          </h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
            <div className="text-center p-6 bg-gradient-to-br from-green-50 to-emerald-50 rounded-lg">
              <Users className="w-12 h-12 text-green-600 mx-auto mb-3" />
              <h3 className="text-2xl font-bold text-black">50,000+</h3>
              <p className="text-black">Happy Customers</p>
            </div>
            <div className="text-center p-6 bg-gradient-to-br from-blue-50 to-cyan-50 rounded-lg">
              <Award className="w-12 h-12 text-blue-600 mx-auto mb-3" />
              <h3 className="text-2xl font-bold text-black">25+</h3>
              <p className="text-black">Years of Excellence</p>
            </div>
            <div className="text-center p-6 bg-gradient-to-br from-purple-50 to-violet-50 rounded-lg">
              <Heart className="w-12 h-12 text-purple-600 mx-auto mb-3" />
              <h3 className="text-2xl font-bold text-black">1000+</h3>
              <p className="text-black">Unique Designs</p>
            </div>
            <div className="text-center p-6 bg-gradient-to-br from-pink-50 to-rose-50 rounded-lg">
              <Truck className="w-12 h-12 text-pink-600 mx-auto mb-3" />
              <h3 className="text-2xl font-bold text-black">50+</h3>
              <p className="text-black">Cities Served</p>
            </div>
          </div>
        </section>

        {/* Our Story */}
        <div className="mb-8">
          <h2 className="text-2xl font-semibold text-black mb-4">Our Story</h2>
          <div className="grid md:grid-cols-2 gap-8 items-center">
            <div>
              <p className="text-black leading-relaxed mb-4">
                Founded in 1998 by textile enthusiast Sathish Kumar, our saree
                collection began as a small boutique in Salem&apos;s bustling
                textile district. What started as a passion for preserving
                traditional Indian weaving techniques has grown into one of
                India&apos;s most trusted saree destinations.
              </p>
              <p className="text-black leading-relaxed mb-4">
                We believe every saree tells a story – of the skilled artisan
                who wove it, the rich cultural heritage it represents, and the
                special moments it will be part of in your life. Our carefully
                curated collection spans from traditional handloom sarees to
                contemporary designer pieces.
              </p>
            </div>
            <Image
              height={100}
              width={100}
              src="/images/home/our_story.png"
              alt="Traditional saree weaving"
              className="w-full h-64 object-cover rounded-lg shadow-lg"
            />
          </div>
        </div>

        {/* Mission & Values */}
        <div className="mb-8">
          <h2 className="text-2xl font-semibold text-black mb-4">
            Our Mission
          </h2>
          <p className="text-black leading-relaxed mb-6">
            Our mission is to preserve and promote the art of saree weaving
            while providing modern women with elegant, high-quality sarees for
            every occasion. We work directly with skilled artisans and weavers
            across India to bring you authentic pieces that honor traditional
            techniques.
          </p>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            <div className="bg-gradient-to-br from-pink-50 to-purple-50 p-1 rounded-lg text-center">
              <Award className="w-8 h-8 text-pink-600 mx-auto mb-3" />
              <h3
                className="text-lg font-semibold mb-2"
                style={{ color: "#C2185B" }}
              >
                Authentic Quality
              </h3>

              <p className="text-black text-sm">
                Every saree is carefully selected for its quality, authenticity,
                and craftsmanship.
              </p>
            </div>
            <div className="bg-gradient-to-br from-purple-50 to-pink-50 p-1 rounded-lg text-center">
              <Users className="w-8 h-8 text-purple-600 mx-auto mb-3" />
              <h3
                className="text-lg font-semibold mb-2"
                style={{ color: "#6A1B9A" }}
              >
                Original Handcraft
              </h3>

              <p className="text-black text-sm">
                We partner with skilled weavers and artisans to offer fair
                trade, handcrafted originals.
              </p>
            </div>
            <div className="bg-gradient-to-br from-pink-50 to-purple-50 p-1 rounded-lg text-center">
              <Heart className="w-8 h-8 text-pink-600 mx-auto mb-3" />
              <h3
                className="text-lg font-semibold mb-2"
                style={{ color: "#AD1457" }}
              >
                Curated Collection
              </h3>

              <p className="text-black text-sm">
                Our team carefully curates each piece to offer you the best in
                traditional and contemporary designs.
              </p>
            </div>
            <div className="bg-gradient-to-br from-purple-50 to-pink-50 p-1 rounded-lg text-center">
              <Star className="w-8 h-8 text-purple-600 mx-auto mb-3" />
              <h3
                className="text-lg font-semibold mb-2"
                style={{ color: "#4A148C" }}
              >
                Customer Care
              </h3>

              <p className="text-black text-sm">
                We provide personalized service to help you find the perfect
                saree for any occasion.
              </p>
            </div>
          </div>
        </div>

        {/* Our Promise */}
        <div className="bg-gradient-to-r from-pink-100 to-purple-100 p-8 rounded-lg">
          <h2 className="text-2xl font-semibold text-black mb-4">
            Our Promise
          </h2>
          <p className="text-black leading-relaxed">
            We promise to deliver not just a saree, but a piece of art that
            connects you to the rich cultural heritage of India. Whether
            you&apos;re looking for a wedding saree, party wear, or everyday
            elegance, we&apos;re here to help you find the perfect piece that
            makes you feel beautiful and confident. Every purchase supports
            traditional artisans and helps preserve the timeless craft of saree
            weaving for future generations.
          </p>
        </div>
      </main>
    </>
  );
};

export default About;
