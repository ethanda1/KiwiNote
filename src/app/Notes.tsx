import React, { useState, useEffect } from "react";
import { supabase } from "./supabaseClient";

export const Notes = () => {
  const [user, setUser] = useState(null);
  const [notes, setNotes] = useState([]);
  

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

    const fetchNotes = async () => {
      const { data, error } = await supabase
        .from('note')
        .select('title, content, created_at')
      console.log(data)
      setNotes(data || []);
    }

    checkUserSession();
    fetchNotes();
  }, []);

  return (
    <div className="flex flex-wrap justify-start items-start pt-10 gap-2 max-w-[1200px] mx-auto">
  {notes.map((note, index) => (
    <div key={index} className="w-72 h-96 bg-white p-5 text-xs relative overflow-hidden">
      <p className="">{note.content}</p>
      <div className="absolute bottom-0 left-0 h-20 w-full bg-slate p-5 bg-slate-50">
      <h3 className="font-bold display-block">{note.title}</h3>
      <small>{new Date(note.created_at).toLocaleDateString()}</small>
      </div>
    </div>
  ))}
</div>
  );
  
}