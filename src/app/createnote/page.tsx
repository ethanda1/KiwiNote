"use client";

import React, { useState, useRef, useEffect } from "react";
import { Mic, Square, Download } from "lucide-react";
import { ChevronDown, ChevronUp, FileText, FileSearch } from "lucide-react";
import { supabase } from "../supabaseClient";
import { Navbar } from "../Navbar";
import axios from "axios";
import { useId } from "react";
import moment from "moment";
import { tailspin } from 'ldrs'
import Alert from '@mui/material/Alert';
tailspin.register()



const AudioRecorder = () => {
  useEffect(() => {
    const checkUserSession = async () => {
      const {
        data: { session },
      } = await supabase.auth.getSession();
      if (session) {
        setUser(session.user); 
      } else {
        setUser(null); 
      }
    };

    checkUserSession();
  }, []);

  const [isRecording, setIsRecording] = useState(false);
  const [audioURL, setAudioURL] = useState("");
  const [isProcessing, setIsProcessing] = useState(false);
  const mediaRecorderRef = useRef(null);
  const chunksRef = useRef([]);
  const [transcription, setTranscription] = useState("");
  const [summarized, setSummarized] = useState("");
  const [showTranscription, setShowTranscription] = useState(false);
  const [user, setUser] = useState(null);
  const [usetitle, setuseTitle] = useState("Untitled Document");
  const [saved, setSaved] = useState(false);
  const [showLoading, setShowLoading] = useState(false);

  const startRecording = async () => {
    try {
      setAudioURL("");
      setTranscription("");
      chunksRef.current = [];

      const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
      mediaRecorderRef.current = new MediaRecorder(stream);

      mediaRecorderRef.current.ondataavailable = (event) => {
        if (event.data.size > 0) {
          chunksRef.current.push(event.data);
        }
      };

      mediaRecorderRef.current.start();
      setIsRecording(true);
    } catch (error) {
      console.error("Error accessing microphone:", error);
      alert(
        "Error accessing microphone. Please ensure you have granted microphone permissions."
      );
    }
  };

  const stopAndTranscribe = async () => {
    if (!mediaRecorderRef.current || !isRecording) return;

    setIsProcessing(true);

    try {
      const audioData = await new Promise((resolve) => {
        const chunks = [];

        mediaRecorderRef.current.addEventListener("dataavailable", (event) => {
          if (event.data.size > 0) {
            chunks.push(event.data);
          }
        });

        mediaRecorderRef.current.addEventListener("stop", () => {
          const blob = new Blob(chunks, { type: "audio/webm" });
          resolve(blob);
        });
        mediaRecorderRef.current.stop();
        mediaRecorderRef.current.stream
          .getTracks()
          .forEach((track) => track.stop());
      });

      const url = URL.createObjectURL(audioData);
      setAudioURL(url);
      const formData = new FormData();
      formData.append("file", audioData);
      formData.append("language", "english");
      formData.append("response_format", "json");

      const response = await fetch(
        "https://api.lemonfox.ai/v1/audio/transcriptions",
        {
          method: "POST",
          headers: {
            Authorization: "Bearer ao8Yk7j8tlbYNr14FWQr2gikZQuLjaup",
          },
          body: formData,
        }
      );

      const data = await response.json();
      setTranscription(data.text);
    } catch (error) {
      console.error("Error processing audio:", error);
      alert("Error processing audio: " + error.message);
    } finally {
      setIsRecording(false);
      setIsProcessing(false);
    }
  };

  const summarizer = async () => {
    setShowLoading(true);
    try {
      const response = await axios.post("http://localhost:3001/createNotes", {
        text: transcription,
      });
      const summarized = response.data;
      console.log(summarized);
      setSummarized(summarized);
      setShowLoading(false);
    } catch (error) {
      console.error("Error processing audio:", error);
    }
  };

  const handleShowTranscription = () => {
    setShowTranscription(!showTranscription);
  };
  const generateUniqueId = () => {
    return Date.now() + Math.floor(Math.random() * 1000000);
  };

  if (!user) {
    return (
      <div className="flex justify-center items-center h-screen">
        <h1>Please log in to access this feature.</h1>
      </div>
    );
  }

  const saveNote = async () => {
    if (!saved) {
      const {
        data: { session },
      } = await supabase.auth.getSession();
      const userId = session?.user?.id;
      const NoteId = generateUniqueId();
      const date = new Date().toISOString();
      const { error } = await supabase
        .from("note")
        .insert({
          id: NoteId,
          created_at: date,
          created_by: userId,
          content: summarized,
          title: usetitle,
        });
      if (error) {
        console.log(error);
      }else{
        alert('Successfully Saved')
      }
      setSaved(true);
      console.log("Note Saved!");
    } else {
      console.log("Note already saved!");
    }
  };

  if (!summarized) {
    return (
      <div className="relative ">
        {transcription && (
          <div className="absolute top-5 right-5 w-96">
            <button
              onClick={handleShowTranscription}
              className="flex items-center justify-between w-full px-4 py-2 bg-white border rounded-lg shadow-sm hover:bg-gray-50 transition-colors duration-200"
            >
              <div className="flex items-center gap-2">
                <FileText className="w-4 h-4 text-blue-500" />
                <span className="font-medium">Transcription</span>
              </div>
              {showTranscription ? (
                <ChevronUp className="w-4 h-4 text-gray-500" />
              ) : (
                <ChevronDown className="w-4 h-4 text-gray-500" />
              )}
            </button>
            {showTranscription && (
              <div className="absolute left-0 right-0 mt-2 bg-white border rounded-lg shadow-lg overflow-hidden">
                <div className="p-4 space-y-4">
                  <div className="space-y-2">
                    <h3 className="flex items-center gap-2 text-sm font-semibold text-gray-700">
                      <FileText className="w-4 h-4" />
                      Full Transcription
                    </h3>
                    <p className="text-gray-600 text-sm whitespace-pre-wrap">
                      {transcription}
                    </p>
                  </div>
                </div>
              </div>
            )}
          </div>
        )}
        <div className="flex flex-col justify-center items-center h-screen ">
          <div className="flex">
            {!isRecording ? (
              <button
                onClick={startRecording}
                className="flex items-center bg-green-500 text-white p-5 rounded-full hover:bg-green-400 transition-colors"
                disabled={isProcessing}
              >
                <Mic className="w-10 h-10" />
              </button>
            ) : (
              <button
                onClick={stopAndTranscribe}
                className="flex items-center bg-red-500 text-white p-5 rounded-full hover:bg-red-400 transition-colors"
              >
                <Mic className="w-10 h-10" />
              </button>
            )}
          </div>
          {isProcessing && (
            <div className="text-gray-600">Processing audio...</div>
          )}

          {audioURL && !isProcessing && (
            <div className="flex flex-col items-center gap-2">
              <audio src={audioURL} controls className="mt-4" />
            </div>
          )}
          {!showLoading && transcription && (
            <button
              onClick={summarizer}
              className="flex items-center gap-2 bg-green-500 text-white px-4 py-2 rounded-full hover:bg-blue-400 transition-colors font-bold"
            >
              Generate Notes
            </button>
          )}
          {showLoading && 
(<l-tailspin
  size="40"
  stroke="5"
  speed="0.9" 
  color="black" 
></l-tailspin>)}
        </div>
      </div>
    );
  }
  return (
    <div className="flex flex-col justify-center items-center h-screen relative">
      <div className="w-full max-w-4xl p-6 bg-white rounded-lg shadow-lg absolute top-5">
        <button
          className="absolute top-5 right-5  bg-green-500 text-white px-4 py-2 rounded-full hover:bg-green-400"
          onClick={saveNote}
        >
          Save
        </button>
        <input
          className="text-2xl font-bold mb-4"
          placeholder="Title"
          onChange={(e) => setuseTitle(e.target.value)}
        ></input>
        <div className="whitespace-pre-wrap">{summarized}</div>
      </div>
    </div>
  );
};

export default function Page() {
  const search = false;
  return (
    <main className="max-h-screen">
      <Navbar handleSearch={search} />
      <AudioRecorder />
    </main>
  );
}
