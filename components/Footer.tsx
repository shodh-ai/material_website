"use client";

import Link from "next/link";
import { ArrowUpRight } from "lucide-react";

export default function Footer() {
  return (
    <footer className="relative w-full overflow-hidden">
      {/* Background */}
      <div className="absolute inset-0 bg-gradient-to-br from-[#0a1628] via-[#0d1f3c] to-[#081421]">
        <div className="absolute inset-0 bg-black/30" />
      </div>

      {/* Content */}
      <div className="relative z-10 px-4 sm:px-6 md:px-10 pt-12 sm:pt-16 md:pt-20 pb-8">
        {/* Top Section */}
        <div className="flex flex-col gap-8 md:gap-16 lg:gap-32 mb-16 md:mb-32">
          {/* Left - CTA */}
          <div className="w-full">
            <h2 className="text-white text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-normal leading-tight mb-8 md:mb-12">
              The Future of Material Science.
            </h2>
            <Link
              href="#contact"
              className="inline-flex items-center justify-center px-5 py-3 bg-[#f0f0ff] text-[#081421] text-sm sm:text-base tracking-wide rounded-md hover:bg-white transition-colors"
            >
              WORK WITH US
            </Link>
          </div>
        </div>

        {/* Links Grid - Mobile Optimized */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 mb-16 md:mb-32">
          {/* Platform Links */}
          <div className="border-l-0 sm:border-l border-[#f0f0ff]/50 pl-0 sm:pl-6">
            <span className="text-[#f0f0ff]/50 text-sm sm:text-base tracking-wide uppercase block mb-6">
              Platform
            </span>
            <nav className="flex flex-col gap-4">
              <Link
                href="/protocol"
                className="text-[#f0f0ff] text-sm sm:text-base capitalize hover:opacity-80 transition-opacity"
              >
                Skanda Protocol
              </Link>
              <Link
                href="/genesis"
                className="text-[#f0f0ff] text-sm sm:text-base capitalize hover:opacity-80 transition-opacity"
              >
                Genesis
              </Link>
              <Link
                href="/demo"
                className="text-[#f0f0ff] text-sm sm:text-base capitalize hover:opacity-80 transition-opacity"
              >
                Live Demo
              </Link>
            </nav>
          </div>

          {/* Company Links */}
          <div className="border-l-0 sm:border-l border-[#f0f0ff]/50 pl-0 sm:pl-6">
            <span className="text-[#f0f0ff]/50 text-sm sm:text-base tracking-wide uppercase block mb-6">
              Company
            </span>
            <nav className="flex flex-col gap-4">
              <Link
                href="#manifesto"
                className="text-[#f0f0ff] text-sm sm:text-base capitalize hover:opacity-80 transition-opacity"
              >
                Manifesto
              </Link>
              <Link
                href="#careers"
                className="text-[#f0f0ff] text-sm sm:text-base capitalize hover:opacity-80 transition-opacity"
              >
                Careers
              </Link>
              <Link
                href="#contact"
                className="text-[#f0f0ff] text-sm sm:text-base capitalize hover:opacity-80 transition-opacity"
              >
                Contact
              </Link>
            </nav>
          </div>

          {/* Connect Links */}
          <div className="border-l-0 sm:border-l border-[#f0f0ff]/50 pl-0 sm:pl-6">
            <span className="text-[#f0f0ff]/50 text-sm sm:text-base tracking-wide uppercase block mb-6">
              Connect
            </span>
            <nav className="flex flex-col gap-4">
              <Link
                href="https://linkedin.com"
                target="_blank"
                rel="noopener noreferrer"
                className="text-[#f0f0ff] text-sm sm:text-base capitalize hover:opacity-80 transition-opacity"
              >
                Linkedin
              </Link>
              <Link
                href="https://x.com"
                target="_blank"
                rel="noopener noreferrer"
                className="text-[#f0f0ff] text-sm sm:text-base capitalize hover:opacity-80 transition-opacity"
              >
                X
              </Link>
            </nav>
          </div>

          {/* Arrow Button */}
          <div className="flex items-start">
            <button className="w-10 h-10 sm:w-12 sm:h-12 border border-[#f0f0ff] rounded-lg flex items-center justify-center hover:bg-white/10 transition-colors">
              <ArrowUpRight className="w-5 h-5 sm:w-6 sm:h-6 text-[#f0f0ff]" />
            </button>
          </div>
        </div>

        {/* Large Brand Text */}
        <div className="mb-8 overflow-hidden -mx-4 sm:-mx-8 md:-mx-32 lg:-mx-48">
          <h1 className="text-[#f0f0ff] text-6xl sm:text-8xl md:text-9xl lg:text-[341.45px] font-normal leading-[110%] capitalize tracking-normal select-none w-full px-4 sm:px-8 md:px-32 lg:px-48">
            Shodh AI
          </h1>
        </div>

        {/* Copyright */}
        <div className="text-[#f0f0ff] text-xs tracking-wider uppercase">
          2026 Shodh AI. All rights reserved
        </div>
      </div>
    </footer>
  );
}
