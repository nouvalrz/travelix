"use client";

import { Input } from "@heroui/input";
import { Github, Instagram, Linkedin, Mail } from "lucide-react";
import { Button } from "@heroui/button";

import { TravelixLogoHorizontal } from "@/components/icons";
import { Meteors } from "@/components/Meteor";

const Footer = () => {
  return (
    <div className="bg-sky-950 text-white py-16 px-4 relative overflow-clip">
      <div className=" mx-auto container relative z-10">
        <div className="flex flex-col md:flex-row gap-12 justify-between">
          <div>
            <div>
              <TravelixLogoHorizontal isWhite width={120} />
            </div>
            <p className="font-extrabold text-3xl mt-2">
              Let&apos;s Travel With Us
            </p>
            <p className="mt-6 font-medium">Subscribe to our newsletter</p>
            <Input
              className="mt-2 w-full max-w-80"
              endContent={<Mail className="text-gray-600 size-5" />}
              placeholder="example@mail.com"
            />
            <Button className="mt-2" color="primary">
              Submit
            </Button>
          </div>
          <div className="grid grid-cols-2 gap-16">
            <div>
              <p className="text-primary font-medium">Quick Links</p>

              <div className="mt-4 flex flex-col gap-2">
                <p>Home</p>
                <p>Destinations</p>
                <p>Categories</p>
                <p>Promos</p>
              </div>
            </div>
            <div>
              <p className="text-primary font-medium">Information</p>

              <div className="mt-4  flex flex-col gap-2">
                <p>Terms of Service</p>
                <p>Privacy Policy</p>
                <p>Cookies Settings</p>
              </div>
            </div>
          </div>
        </div>
        <hr className="my-16 border-white/20" />
        <div className="flex justify-between">
          <p>&copy; Nouval Rizky. All Rights Reserved</p>
          <div className="flex gap-6">
            <Instagram />
            <Github />
            <Linkedin />
          </div>
        </div>
      </div>
      <Meteors number={20} />
    </div>
  );
};

export default Footer;
