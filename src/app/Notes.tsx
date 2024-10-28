// Notes.js
import React, { useState, useEffect } from "react";
import { supabase } from "./supabaseClient";
import { useRouter } from "next/navigation";
import Alert from '@mui/material/Alert';


export const Notes = ({ searchQuery }) => {
  const [user, setUser] = useState(null);
  const [notes, setNotes] = useState([]);
  const [filteredNotes, setFilteredNotes] = useState([]);
  const router = useRouter();
  const [noteContent, setNoteContent] = useState('');
  const [noteTitle, setNoteTitle] = useState('');

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
        .select('title, content, created_at, id, created_by');
      setNotes(data || []);
    };

    checkUserSession();
    fetchNotes();
  }, []);

  // Update filtered notes when searchQuery changes
  useEffect(() => {
    setFilteredNotes(
      notes.filter(note =>
        note.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        note.content.toLowerCase().includes(searchQuery.toLowerCase())
      )
    );
  }, [searchQuery, notes]);

  const openNote = (content, title) => {
    setNoteContent(content);
    setNoteTitle(title); 
  };

  if (!noteContent) {
    return (
      <div className="flex flex-wrap justify-start items-start pt-10 gap-2 max-w-[1200px] mx-auto">
        {filteredNotes.map((note, index) => (
          <div
            key={index}
            className="w-72 h-96 bg-white p-5 text-s relative overflow-hidden shadow-xl rounded-md hover:bg-slate-50 select-none"
            onClick={() => openNote(note.content, note.title)}
          >
            <p className="">{note.content}</p>
            <div className="absolute bottom-0 left-0 h-20 w-full bg-slate p-5 bg-slate-50 shadow-md">
              <h3 className="font-bold display-block">{note.title}</h3>
              <small>{new Date(note.created_at).toLocaleDateString()}</small>
            </div>
          </div>
        ))}
      </div>
    );
  } else {
    return (
      <div className="p-5 max-w-[1200px] mx-auto">
        <button onClick={() => setNoteContent('')} className="mb-5 bg-blue-500 text-white px-4 py-2 rounded">Back</button>
        <div className="bg-white p-5 shadow-lg rounded-md">
          <h3 className="font-bold text-lg mb-4">{noteTitle}</h3>
          <p>{noteContent}</p>
        </div>
      </div>
    );
  }
};
