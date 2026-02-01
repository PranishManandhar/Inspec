"use client";

import * as Icon from '@/public/icons';

export default function Footer() {
  return (
    <footer className="w-full bg-black text-white">
      <div className="max-w-6xl mx-auto grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 p-8">

        {/* Contacts */}
        <div className="space-y-2">
          <h3 className="font-bold text-2xl mb-3">Contacts</h3>
          <p className="flex items-center gap-2">
            <Icon.LocalPhoneSharpIcon className="text-white" /> +977-0123456
          </p>
          <p className="flex items-center gap-2">
            <Icon.PhoneAndroidSharpIcon className="text-white" /> +977-9876543210
          </p>
          <p className="flex items-center gap-2 mt-4 hover:underline cursor-pointer">
            <Icon.MailOutlineIcon className="text-white" /> help@inspec.org
          </p>
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
            <Icon.ArrowDropUpIcon className="text-white" /> Back to top
          </p>
        </div>

      </div>
    </footer>
  );
}
