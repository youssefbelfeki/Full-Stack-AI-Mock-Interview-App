"use client";
import { Button } from "@/components/ui/button";
import Image from "next/image";
import React, { useEffect, useState } from "react";
import Webcam from "react-webcam";
import useSpeechToText from "react-hook-speech-to-text";
import { Mic } from "lucide-react";

function RecordAnserSection() {
    const [userAnswer,setUserAnswer] = useState('')
  const {
    error,
    interimResult,
    isRecording,
    results,
    startSpeechToText,
    stopSpeechToText,
  } = useSpeechToText({
    continuous: true,
    useLegacyResults: false,
  });

  useEffect(() => {
      results.map((result)=>{
        setUserAnswer(prevAns=>prevAns+result?.transcript)
      }
    )
    }, [results]);

  if (error) return <p>Web Speech API is not available in this browser 🤷‍</p>;
  return (
    <div>
      <div className="flex flex-col my-20 justify-center items-center">
        <Image
          src={"/webcam.png"}
          width={200}
          height={200}
          alt="webcam"
          className="absolute"
        />
        <Webcam
          mirrored={true}
          style={{
            height: 300,
            width: "100%",
            zindex: 10,
          }}
        />
      </div>
      <div className="flex justify-center items-center">
        <Button
          variant="outline"
          className="my-5"
          onClick={isRecording ? stopSpeechToText : startSpeechToText}
        >
          {isRecording ? (
            <h2 className="text-red-500 flex gap-2">
              <Mic />
              Stop Recording
            </h2>
          ) : (
            "Record Answer"
          )}
        </Button>
        <Button onClick={()=>console.log(userAnswer)}>Show User Anwser</Button>
      </div>
    </div>
  );
}

export default RecordAnserSection;
