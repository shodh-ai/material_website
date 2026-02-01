import Image from "next/image";
import Link from "next/link";

export default function Navbar() {
  return (
    <header className="fixed top-0 left-0 right-0 z-50">
      <div className="mx-auto max-w-6xl px-6 md:px-10">
        <div className="mt-6 flex items-center justify-between rounded-2xl border border-white/10 bg-black/20 px-4 py-3 backdrop-blur-md">
          <Link href="/" className="flex items-center gap-3">
            <Image src="/shodhai_logo.svg" alt="Shodh AI" width={136} height={32} priority />
          </Link>

          <nav className="hidden items-center gap-6 text-sm text-white/70 md:flex">
            <Link href="/protocol" className="hover:text-white transition-colors">The Protocol</Link>
            <Link href="/genesis" className="hover:text-white transition-colors">Genesis</Link>
            <Link href="/demo" className="hover:text-white transition-colors">Demo</Link>
          </nav>

          <div className="flex items-center gap-2">
            <Link
              href="/demo"
              className="rounded-full border border-white/15 bg-white/5 px-4 py-2 text-xs font-medium text-white hover:bg-white/10 transition-colors"
            >
              Try Demo
            </Link>
          </div>
        </div>
      </div>
    </header>
  );
}
