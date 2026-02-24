"use client";

import * as Icon from '@/public/icons';
import { useState } from 'react';
import Link from 'next/link';

function ContactItem({ icon: IconComponent, value }: { icon: any, value: string }) {
  const [copied, setCopied] = useState(false);

  const handleCopy = () => {
    navigator.clipboard.writeText(value)
      .then(() => {
        setCopied(true);
        setTimeout(() => setCopied(false), 1200);
      })
      .catch(() => alert("Failed to copy"));
  };

  return (
    <p
      onClick={handleCopy}
      className="flex items-center gap-2 hover:underline cursor-pointer relative"
    >
      <IconComponent className="text-white" /> {value}
      {copied && <span className="absolute right-0 text-sm text-green-400">Copied!</span>}
    </p>
  );
}

export default function Footer() {
  return (
    <footer className="w-full bg-black text-white">
      <div className="max-w-6xl mx-auto grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 p-8">

        {/* Contacts */}
        <div className="space-y-2">
          <h3 className="font-bold text-2xl mb-3">Contacts</h3>
          <ContactItem icon={Icon.LocalPhoneSharpIcon} value="+977-0123456" />
          <ContactItem icon={Icon.PhoneAndroidSharpIcon} value="+977-9876543210" />
          <ContactItem icon={Icon.MailOutlineIcon} value="help@inspec.org" />
        </div>

        {/* Address */}
        <div className="space-y-2">
          <h3 className="flex items-center gap-2 font-bold text-2xl mb-3">
            <Icon.LocationOnSharpIcon className="text-white" /> Address
          </h3>
          <p>Balkumari, Lalitpur</p>
        </div>

        {/* Socials */}
        <div className="space-y-2">
          <h3 className="font-bold text-2xl mb-3">Socials</h3>
          <p className="flex items-center gap-2 hover:underline cursor-pointer">
            <Icon.FacebookSharpIcon className="text-white" /> Facebook
          </p>
          <p className="flex items-center gap-2 hover:underline cursor-pointer">
            <Icon.InstagramIcon className="text-white" /> Instagram
          </p>
          <p className="flex items-center gap-2 hover:underline cursor-pointer">
            <Icon.XIcon className="text-white" /> X (Twitter)
          </p>
          <p className="flex items-center gap-2 hover:underline cursor-pointer">
            <Icon.LinkedInIcon className="text-white" /> LinkedIn
          </p>
        </div>

        {/* Links */}
        <div className="space-y-2">
          <h3 className="font-bold text-2xl mb-3">Links</h3>
          <p className="flex items-center gap-2 hover:underline cursor-pointer">
            <Icon.HomeSharpIcon className="text-white" /> Home
          </p>
          <p className="flex items-center gap-2 hover:underline cursor-pointer">
            <Icon.InfoSharpIcon className="text-white" /> About Inspec
          </p>
          <p className="flex items-center gap-2 hover:underline cursor-pointer">
            <Icon.GroupsIcon className="text-white" /> Team
          </p>
          <p className="flex items-center gap-2 mt-4 hover:underline cursor-pointer">
            <Link href="/signup">Login</Link>
          </p>
        </div>

      </div>
    </footer>
  );
}
