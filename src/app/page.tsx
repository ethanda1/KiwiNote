"use client";

import React, { useState, useEffect } from "react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { supabase } from "./supabaseClient";

const Navbar = () => {
  const [user, setUser] = useState(null);
  const [searchQuery, setSearchQuery] = useState("");
  const [click, setClick] = useState(false);
  const router = useRouter();

  useEffect(() => {
    const checkUserSession = async () => {
      const {
        data: { session },
      } = await supabase.auth.getSession();
      if (session) {
        setUser(session.user);
      } else {
        console.log("not signed in");
      }
    };

    checkUserSession();
  }, []);

  const handleSignOut = async () => {
    const { error } = await supabase.auth.signOut();
    if (!error) {
      setUser(null);
    }
  };

  const handleClick = () => {
    setClick(!click);
  };

  return (
    <div className="flex justify-between p-2 bg-slate-50 items-center">
      <div className="text-xl font-bold">
        <span className="text-green-400">Kiwi</span>Note
      </div>
      <div>
        <input
          type="text"
          id="search"
          className="rounded-full p-3 w-full"
          placeholder="Search"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
        />
      </div>
      <div className="flex flex-row items-center gap-5">
        {user && (
          <button
            className="bg-green-400 hover:bg-green-500 text-white font-bold px-4 py-2 rounded-full text-2xl font-extralight"
            onClick={() => router.push("/createnote")}
          >
            +
          </button>
        )}

        <div className="relative inline-block text-left">
          {user ? (
            <>
              <div>
                <button
                  type="button"
                  onClick={handleClick}
                  className="flex items-center"
                >
                  <Image
                    src="/pfp.jpg"
                    alt="Profile picture"
                    width={40}
                    height={40}
                    className="rounded-full cursor-pointer hover:opacity-80 transition-opacity"
                  />
                </button>
              </div>

              {click && (
                <div className="absolute right-0 z-10 mt-2 w-56 origin-top-right rounded-md bg-white shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none">
                  <div className="py-1" role="menu">
                    <a
                      href="/profile"
                      className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                      role="menuitem"
                    >
                      Profile
                    </a>
                    <a
                      href="/settings"
                      className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                      role="menuitem"
                    >
                      Settings
                    </a>
                    <button
                      onClick={handleSignOut}
                      className="block w-full px-4 py-2 text-left text-sm text-gray-700 hover:bg-gray-100"
                      role="menuitem"
                    >
                      Sign out
                    </button>
                  </div>
                </div>
              )}
            </>
          ) : (
            <button
              onClick={() => router.push("/login")}
              className="inline-flex justify-center gap-x-1.5 rounded-md bg-white px-3 py-2 text-sm font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50"
            >
              Login
            </button>
          )}
        </div>
      </div>
    </div>
  );
};

export default function Page() {
  return (
    <main>
      <Navbar />
    </main>
  );
}
