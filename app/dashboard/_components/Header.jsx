import { UserButton } from "@clerk/nextjs";
import Image from "next/image";
import Link from "next/link";
import React from "react";

function Header() {
  return (
    <div className="mx-auto flex h-16 max-w-7xl items-center gap-8 px-4 sm:px-6 ">
      <Link className="block text-teal-600" href="/dashboard">
        <Image src={"/logo.png"} width={160} height={100} alt="logo" />
      </Link>

      <div className="flex flex-1 items-center justify-end md:justify-between">
        <nav aria-label="Global" className="hidden md:block">
          <ul className="flex items-center gap-6 text-sm">
            <li>
              <Link
                className="text-gray-500 transition hover:text-gray-500/75"
                href="/dashboard"
              >
                Dashboard
              </Link>
            </li>

            <li>
              <Link
                className="text-gray-500 transition hover:text-gray-500/75"
                href="/questions"
              >
                Questions
              </Link>
            </li>

            <li>
              <Link
                className="text-gray-500 transition hover:text-gray-500/75"
                href="/upgrade"
              >
                Upgrade
              </Link>
            </li>
            <li>
              <Link
                className="text-gray-500 transition hover:text-gray-500/75"
                href="how-it-work"
              >
                How it Works?
              </Link>
            </li>
          </ul>
        </nav>
      </div>
      <UserButton />
    </div>
  );
}

export default Header;
