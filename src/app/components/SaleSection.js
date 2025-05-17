'use client';

import { Card } from 'primereact/card';
import Image from "next/image";
import Link from "next/link";
import Section from './Section';


const Offers = [
  { id: 1, imgsrc: "/images/big_sale.png", title: "Big Sale 1", link: '/' },
  { id: 2, imgsrc: "/images/big_sale.png", title: "Big Sale 2", link: "/" }
]

const OfferCard = () => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-7">
      {Offers.map((offer) => (
        <div className="flex justify-between" key={offer.id}>
          <Card className="w-[100%] max-w-none rounded-lg overflow-hidden shadow-md group">
            <Link href={offer.link}>
              <div className="relative w-full h-72 md:h-96">
                <Image
                  src={offer.imgsrc}
                  alt={offer.title}
                  fill
                  className="object-cover transition-transform duration-300 group-hover:scale-105"
                />
              </div>
            </Link>
          </Card>
        </div>
      ))}
    </div>
  )
}

const SaleSection = () => {
  return (
    <Section title={"Special Offers"} desc={"Exclusive deals and discounts for our valued customers"} section={<OfferCard />} />
  )
}
export default SaleSection;