"use client";

import { Image } from "@heroui/image";
import { Accordion, AccordionItem } from "@heroui/accordion";

const HomeFaqWrapper = () => {
  return (
    <div className="px-4 pb-12">
      <div className="container mx-auto ">
        <div className="flex justify-start items-end">
          <div>
            <h2 className="text-3xl font-bold">Frequently Asked Questions</h2>
            <p className="mt-2">
              Got questions? We’ve got answers to help you travel with ease.
            </p>
          </div>
        </div>
        <div className="py-8 flex gap-8 lg:flex-row flex-col">
          <Image
            alt="faq-cover"
            className="object-cover w-full h-[200px] lg:w-[400px] lg:h-auto object-[0%_20%]"
            src="/images/travelix-faq-cover.jpg"
            width="100%"
          />
          <Accordion className="">
            <AccordionItem
              key="1"
              aria-label="Accordion 1"
              classNames={{ title: "font-medium" }}
              title="What is Travelix and how does it work?"
            >
              <p>
                Travelix is an online travel ticketing platform that helps you
                discover, book, and manage your trips to popular tourist
                destinations in Indonesia. Simply search for a destination,
                choose your preferred travel date, and complete your booking
                securely—all in just a few clicks.
              </p>
            </AccordionItem>
            <AccordionItem
              key="2"
              aria-label="Accordion 2"
              classNames={{ title: "font-medium" }}
              title="How do I place an order on Travelix?"
            >
              <p>
                Placing an order is easy! First, browse and select the
                destination you want to visit. Then, add it to your cart,
                proceed to checkout, and complete the payment. Once done, your
                booking will be confirmed and ready to enjoy.
              </p>
            </AccordionItem>
            <AccordionItem
              key="3"
              aria-label="Accordion 3"
              classNames={{ title: "font-medium" }}
              title="What payment methods does Travelix accept?"
            >
              <p>
                We accept a variety of payment methods, including credit cards,
                bank transfers, and e-wallets such as GoPay, OVO, and Dana. All
                payments are processed securely for your convenience and safety.
              </p>
            </AccordionItem>
            <AccordionItem
              key="4"
              aria-label="Accordion 3"
              classNames={{ title: "font-medium" }}
              title="Are there any promotions available on Travelix?"
            >
              <p>
                Yes! Travelix frequently offers exclusive discounts, seasonal
                deals, and special promotions for many tourist destinations.
                Make sure to check our Promotions & Offers section or subscribe
                to our newsletter so you never miss a deal.
              </p>
            </AccordionItem>
          </Accordion>
        </div>
      </div>
    </div>
  );
};

export default HomeFaqWrapper;
