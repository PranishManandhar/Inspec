"use client";
import { Navbar, Carousel, Footer, Copyright } from "./components";
import Image from "next/image";
import Link from "next/link";
import devs from "../app/json-files/members.json";
import {
  Person2Icon,
  SchoolIcon,
  AccountBalanceIcon,
  LocalHospitalIcon,
  LocationCityIcon,
} from "@/public/icons";

export default function Home() {
  return (
    <>
      <Navbar />
      <Carousel />

      {/* Section: Categories*/}
      <section className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 my-20">
        <hr className="border-slate-700/30 mb-12" />
        <h1 className="text-3xl md:text-5xl font-semibold text-center">
          Categories
        </h1>
        <div className="grid grid-cols-3 gap-4 pt-9">
          <Link
            href={"/data/persons"}
            className="flex flex-col items-center gap-3 p-6 border border-black rounded-md hover:bg-slate-50 transition-colors"
          >
            <div className="p-3 bg-slate-100 rounded-full">
              <Person2Icon className="text-slate-600" fontSize="large" />
            </div>
            <span className="text-xl font-light">Persons List</span>
          </Link>
          <Link
            href={"/data/schools"}
            className="flex flex-col items-center gap-3 p-6 border border-black rounded-md hover:bg-slate-50 transition-colors"
          >
            <div className="p-3 bg-slate-100 rounded-full">
              <SchoolIcon className="text-slate-600" fontSize="large" />
            </div>
            <span className="text-xl font-light">Schools List</span>
          </Link>
          <Link
            href={"/data/jurisdictions"}
            className="flex flex-col items-center gap-3 p-6 border border-black rounded-md hover:bg-slate-50 transition-colors"
          >
            <div className="p-3 bg-slate-100 rounded-full">
              <AccountBalanceIcon className="text-slate-600" fontSize="large" />
            </div>
            <span className="text-xl font-light">jurisdictions List</span>
          </Link>
          <Link
            href={"/data/hospitals"}
            className="flex flex-col items-center gap-3 p-6 border border-black rounded-md hover:bg-slate-50 transition-colors"
          >
            <div className="p-3 bg-slate-100 rounded-full">
              <LocalHospitalIcon className="text-slate-600" fontSize="large" />
            </div>
            <span className="text-xl font-light">Hospitals List</span>
          </Link>
          <Link
            href={"/data/companies"}
            className="flex flex-col items-center gap-3 p-6 border border-black rounded-md hover:bg-slate-50 transition-colors"
          >
            <div className="p-3 bg-slate-100 rounded-full">
              <LocationCityIcon className="text-slate-600" fontSize="large" />
            </div>
            <span className="text-xl font-light">Companies List</span>
          </Link>
        </div>
      </section>

      {/* Section: Team */}
      <hr className="border-slate-700/30 mt-12" />
      <section className="max-w-7xl mx-auto px-4 sm:px-6 my-14">
        <h1 className="text-3xl md:text-5xl font-semibold text-center mb-16">
          Team Behind Inspec
        </h1>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {devs.map((dev) => (
            <div
              key={dev.Name}
              className="bg-white rounded-2xl shadow-md overflow-hidden hover:shadow-xl transition-shadow duration-300 border border-gray-100"
            >
              <div className="p-8 flex flex-col items-center text-center">
                {/* Avatar */}
                {dev.Image ? (
                  <Image
                    src={dev.Image}
                    alt={dev.Name}
                    width={160}
                    height={160}
                    className="rounded-full mb-6 object-cover border-4 border-gray-100"
                  />
                ) : (
                  <div className="w-40 h-40 rounded-full bg-gradient-to-br from-gray-200 to-gray-300 flex items-center justify-center mb-6">
                    <span className="text-gray-500 text-3xl font-medium">
                      {dev.Name.split(" ")
                        .map((n) => n[0])
                        .join("")}
                    </span>
                  </div>
                )}

                <h3 className="text-2xl font-bold text-gray-900 mb-2">
                  {dev.Name}
                </h3>
                {dev.Roll && (
                  <p className="text-lg text-blue-600 mb-3">{dev.Roll}</p>
                )}
                <a
                  href={`mailto:${dev.Email}`}
                  className="text-gray-600 hover:text-blue-700"
                >
                  {dev.Email}
                </a>
              </div>
            </div>
          ))}
        </div>
      </section>

      <Footer />
      <Copyright />
    </>
  );
}
