"use client";

import Link from "next/link";
import Image from "next/image";

export default function Footer() {
  return (
    <footer className="pointer-events-auto relative z-10 bg-[#081421] pt-20 pb-10 px-6 md:px-10 border-t border-white/10">
      <div className="mx-auto max-w-6xl">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-10 mb-20 text-sm">
          <div className="flex flex-col gap-4">
            <h4 className="font-semibold text-white mb-2">Platform</h4>
            <Link href="/protocol" className="text-white/60 hover:text-[#48cae4] transition">
              Skanda Protocol
            </Link>
            <Link href="/genesis" className="text-white/60 hover:text-[#48cae4] transition">
              Genesis
            </Link>
            <Link href="/demo" className="text-white/60 hover:text-[#48cae4] transition">
              Live Demo
            </Link>
          </div>

          <div className="flex flex-col gap-4">
            <h4 className="font-semibold text-white mb-2">Company</h4>
            <Link href="/genesis" className="text-white/60 hover:text-[#48cae4] transition">
              Manifesto
            </Link>
            <Link href="/careers" className="text-white/60 hover:text-[#48cae4] transition">
              Careers
            </Link>
            <Link href="/contact" className="text-white/60 hover:text-[#48cae4] transition">
              Contact
            </Link>
          </div>

          <div className="col-span-2 md:col-span-2 flex flex-col items-start justify-start md:items-end">
            <div className="max-w-xs md:text-right">
              <p className="text-white/80 leading-relaxed">
                Building the operating system for <br /> autonomous material discovery.
              </p>
            </div>
          </div>
        </div>

        <div className="border-t border-white/10 pt-10">
          <div className="relative w-full h-[12vw] md:h-[8vw] opacity-90 select-none">
            <Image src="/shodhai_logo.svg" alt="SHODH AI" fill className="object-contain object-left" />
          </div>

          <div className="flex flex-col md:flex-row justify-between items-center mt-8 text-xs text-white/40 uppercase tracking-widest">
            <span>© {new Date().getFullYear()} Shodh AI Inc.</span>
            <span className="mt-2 md:mt-0">IndiaAI Mission Flagship Partner</span>
          </div>
        </div>
      </div>
    </footer>
  );
}
