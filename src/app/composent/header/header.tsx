"use client"

import Link from "next/link";

export default function Header() {
  return (
    <header className="bg-gray-800 text-white py-4">
      <div className="container mx-auto px-4 lg:px-16 flex justify-between items-center">
      <Link href="/">
        <h1 className="text-xl font-bold cursor-pointer">AnimQuest</h1>
      </Link>        <nav>
          <ul className="flex space-x-4">
            <li>
              <a href="#" className="hover:text-gray-200">
                DashBoard Admin
              </a>
            </li>          
          </ul>
        </nav>
      </div>
    </header>
  );
}
