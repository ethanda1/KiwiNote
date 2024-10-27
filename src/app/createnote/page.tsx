"use client";

import React, { useState, useRef, useEffect } from 'react';
import { Mic, Square, Download } from 'lucide-react';
import {supabase} from '../supabaseClient'

import axios from 'axios';
const AudioRecorder = () => {
  useEffect(() => {
    const checkUserSession = async () => {
      const { data: { session } } = await supabase.auth.getSession();
      if (session) {
        setUser(session.user); // Save user data
      } else {
        setUser(null); // Clear user data
      }
    };
  
    checkUserSession(); // Call the async function
  }, []);
  
  const [isRecording, setIsRecording] = useState(false);
  const [audioURL, setAudioURL] = useState('');
  const [isProcessing, setIsProcessing] = useState(false);
  const mediaRecorderRef = useRef(null);
  const chunksRef = useRef([]);
  const [transcription, setTranscription] = useState('');
  const [summarized, setSummarized] = useState('');
  const [showTranscription, setShowTranscription] = useState(false);
  const [user, setUser] = useState(null);
  

  const startRecording = async () => {
    try {
      // Clear previous state
      setAudioURL('');
      setTranscription('');
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
      console.error('Error accessing microphone:', error);
      alert('Error accessing microphone. Please ensure you have granted microphone permissions.');
    }
  };

  const stopAndTranscribe = async () => {
    if (!mediaRecorderRef.current || !isRecording) return;
    
    setIsProcessing(true);
    
    try {
      // Create a Promise to handle the recording stop
      const audioData = await new Promise((resolve) => {
        const chunks = [];
        
        mediaRecorderRef.current.addEventListener('dataavailable', (event) => {
          if (event.data.size > 0) {
            chunks.push(event.data);
          }
        });

        mediaRecorderRef.current.addEventListener('stop', () => {
          const blob = new Blob(chunks, { type: 'audio/webm' });
          resolve(blob);
        });

        // Stop the recording
        mediaRecorderRef.current.stop();
        mediaRecorderRef.current.stream.getTracks().forEach(track => track.stop());
      });

      // Create and set audio URL
      const url = URL.createObjectURL(audioData);
      setAudioURL(url);

      // Create FormData and append the audio file
      const formData = new FormData();
      formData.append('file', audioData);
      formData.append('language', 'english');
      formData.append('response_format', 'json');

      // Send to API
      const response = await fetch('https://api.lemonfox.ai/v1/audio/transcriptions', {
        method: 'POST',
        headers: {
          'Authorization': 'Bearer ao8Yk7j8tlbYNr14FWQr2gikZQuLjaup'
        },
        body: formData
      });

      const data = await response.json();
      setTranscription(data.text);
      
    } catch (error) {
      console.error('Error processing audio:', error);
      alert('Error processing audio: ' + error.message);
    } finally {
      setIsRecording(false);
      setIsProcessing(false);
    }
    
  };

  const summarizer = async () => {
try{
    const response = await axios.post('http://localhost:3001/createNotes', {
      text: transcription
    })
    const summarized = response.data
    console.log(summarized);
    setSummarized(summarized.summary);
  }catch(error) {console.error('Error processing audio:', error);}

  
}

const handleShowTranscription = () => {
  setShowTranscription(!showTranscription);
}

if (user){
  return (<>
    <div className = "absolute top-4 left-4 w-1/4">
    {transcription && (      <button 
onClick = {handleShowTranscription}
>Transcription:</button>)}

{transcription && showTranscription && (
  <div className="mt-4 p-4 bg-gray-50 rounded-lg w-full">
    <h3 className="font-semibold mb-2"></h3>
    <p>{transcription}</p>
    {summarized && (<>Summary: {summarized}</>)}
  </div>
)}
</div>
<div className='flex justify-center items-center h-screen'>
    <div className="flex flex-col items-center gap-4 p-4 rounded-lg bg-white shadow-md">
      
      <div className="flex">
        {!isRecording ? (
          <button
            onClick={startRecording}
            className="flex items-center gap-2 bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-400 transition-colors"
            disabled={isProcessing}
          >
            <Mic className="w-5 h-5" />
            Start Recording
          </button>
        ) : (
          <button
            onClick={stopAndTranscribe}
            className="flex items-center gap-2 bg-red-500 text-white px-4 py-2 rounded-lg hover:bg-red-400 transition-colors"
          >
            <Square className="w-5 h-5" />
            Stop Recording
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
      <button
            onClick={summarizer}
            className="flex items-center gap-2 bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-400 transition-colors"
          >
            Generate AI Notes
          </button>
          </div>
          </div>
    </>
  )}
  else{
    return (
      <div className="flex justify-center items-center h-screen">
        <h1>Please log in to access this feature.</h1>
      </div>
    )
  }

};

export default function Page() {
  return (
    <main>
          <AudioRecorder />
    </main>
  );
}