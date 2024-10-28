"use client"

import React, { useState, useEffect } from "react";
import { supabase } from "./supabaseClient";

export const Notes = ({ searchQuery }) => {
  const [user, setUser] = useState(null);
  const [notes, setNotes] = useState([]);
  const [filteredNotes, setFilteredNotes] = useState([]);
  const [noteContent, setNoteContent] = useState('');
  const [noteTitle, setNoteTitle] = useState('');
  const [isLoading, setIsLoading] = useState(true);
  console.log(user)
  useEffect(() => {
    const checkUserSession = async () => {
      try {
        const { data: { session }, error } = await supabase.auth.getSession();
        if (error) throw error;
        
        if (session) {
          setUser(session.user);
          await fetchNotes(session.user.id);
        } else {
          console.log("not signed in");
          setIsLoading(false);
        }
      } catch (error) {
        console.error("Session check error:", error);
        setIsLoading(false);
      }
    };

    const fetchNotes = async (userId) => {
      try {
        const { data, error } = await supabase
          .from('note')
          .select('title, content, created_at, id, created_by')
          .eq('created_by', userId);
          
        if (error) throw error;
        
        setNotes(data || []);
      } catch (error) {
        console.error("Fetch notes error:", error);
      } finally {
        setIsLoading(false);
      }
    };

    checkUserSession();
  }, []); // Removed 'user' dependency as it's not needed here

  useEffect(() => {
    if (notes.length > 0) {
      const filtered = notes.filter(note =>
        note.title?.toLowerCase().includes(searchQuery?.toLowerCase() || '') ||
        note.content?.toLowerCase().includes(searchQuery?.toLowerCase() || '')
      );
      setFilteredNotes(filtered);
    } else {
      setFilteredNotes([]);
    }
  }, [searchQuery, notes]);

  const openNote = (content, title) => {
    setNoteContent(content);
    setNoteTitle(title); 
  };

  if (isLoading) {
    return (
      <div className="flex justify-center items-center h-64">
        <div className="text-gray-600">Loading notes...</div>
      </div>
    );
  }

  if (!noteContent) {
    return (
      <div className="flex flex-wrap justify-start items-start pt-10 gap-2 max-w-[1200px] mx-auto">
        {filteredNotes.length > 0 ? (
          filteredNotes.map((note) => (
            <div
              key={note.id}
              className="w-72 h-96 bg-white p-5 text-s relative overflow-hidden shadow-xl rounded-md hover:bg-slate-50 select-none cursor-pointer"
              onClick={() => openNote(note.content, note.title)}
            >
              <p className="overflow-hidden line-clamp-[12]">{note.content}</p>
              <div className="absolute bottom-0 left-0 h-20 w-full bg-slate p-5 bg-slate-50 shadow-md">
                <h3 className="font-bold display-block truncate">{note.title}</h3>
                <small>{new Date(note.created_at).toLocaleDateString()}</small>
              </div>
            </div>
          ))
        ) : (
          <div className="w-full text-center text-gray-600 mt-8">
            {searchQuery ? "No notes match your search" : "No notes found"}
          </div>
        )}
      </div>
    );
  }

  return (
    <div className="p-5 max-w-[1200px] mx-auto">
      <button 
        onClick={() => setNoteContent('')} 
        className="mb-5 bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded transition-colors"
      >
        Back
      </button>
      <div className="bg-white p-5 shadow-lg rounded-md">
        <h3 className="font-bold text-lg mb-4">{noteTitle}</h3>
        <p className="whitespace-pre-wrap">{noteContent}</p>
      </div>
    </div>
  );
};