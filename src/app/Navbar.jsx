
"use client"

import React, { useState, useEffect } from "react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { supabase } from "./supabaseClient";

export const Navbar = ({ handleSearch }) => {
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
      window.location.reload();
      if (!error) {
        setUser(null);
      }
    };
  
    const handleClick = () => {
      setClick(!click);
    };

    const handleSearchChange = (e) => {
      const query = e.target.value;
      setSearchQuery(query);
      handleSearch(query);
    };
    
    return (
        <div className="flex justify-between p-2 bg-[#5C4033] items-center drop-shadow-2xl">
          <div className="hover:bg-[#3D2B1F] transition-colors duration-200 select-none rounded-full text-xl text-[#F5F5DC] font-bold py-2 px-4" onClick={() => router.push("/")}>
            <span className="text-[#98FF98]">Kiwi</span>Note
          </div>
          <div>
            {handleSearch && (
              <input
                type="text"
                id="search"
                className="rounded-full p-3 w-full bg-[#F5F5DC] focus:outline-none focus:ring-2 focus:ring-[#98FF98] transition-all"
                placeholder="Search"
                value={searchQuery}
                onChange={handleSearchChange}
              />
            )}
          </div>
          <div className="flex flex-row items-center gap-5">
            {user && (
              <button
                className="bg-[#98FF98] hover:bg-[#7FE87F] transition-colors duration-200 text-[#3D2B1F] font-bold px-4 py-2 rounded-full text-2xl font-extralight"
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
                    <div className="absolute right-0 z-10 mt-2 w-56 origin-top-right rounded-md bg-[#F5F5DC] shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none">
                      <div className="py-1" role="menu">
                        <a
                          href="/profile"
                          className="block px-4 py-2 text-sm text-[#3D2B1F] hover:bg-[#E8E8D0] transition-colors duration-200"
                          role="menuitem"
                        >
                          Profile
                        </a>
                        <a
                          href="/settings"
                          className="block px-4 py-2 text-sm text-[#3D2B1F] hover:bg-[#E8E8D0] transition-colors duration-200"
                          role="menuitem"
                        >
                          Settings
                        </a>
                        <button
                          onClick={handleSignOut}
                          className="block w-full px-4 py-2 text-left text-sm text-[#3D2B1F] hover:bg-[#E8E8D0] transition-colors duration-200"
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
                  className="inline-flex justify-center gap-x-1.5 rounded-md bg-[#F5F5DC] px-3 py-2 text-sm font-semibold text-[#3D2B1F] shadow-sm ring-1 ring-inset ring-[#3D2B1F] hover:bg-[#E8E8D0] transition-colors duration-200"
                >
                  Login
                </button>
              )}
            </div>
          </div>
        </div>
    );
};