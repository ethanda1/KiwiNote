"use client";
import {Navbar} from './Navbar'
import {Notes} from './Notes'
import {useState} from 'react';

export default function Page() {
  const [searchQuery, setSearchQuery] = useState("");

  const handleSearch = (query) => {
    setSearchQuery(query);
  };
  return (
    <main>
      <Navbar handleSearch={handleSearch}/>
<Notes searchQuery={searchQuery}/>
    </main>
  );
}
