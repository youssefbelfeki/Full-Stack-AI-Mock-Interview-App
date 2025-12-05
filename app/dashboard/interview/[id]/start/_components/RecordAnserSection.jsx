"use client";
import { Button } from "@/components/ui/button";
import Image from "next/image";
import React, { useEffect, useState } from "react";
import Webcam from "react-webcam";
import useSpeechToText from "react-hook-speech-to-text";
import { Mic } from "lucide-react";
import { toast } from "sonner";
import { GoogleGenerativeAI } from "@google/generative-ai";
import { db } from "@/utils/db";
import { UserAnswer } from "@/utils/schema";
import { useUser } from "@clerk/nextjs";
import moment from "moment";

function RecordAnserSection({
  activeQuestionIndex,
  mockInterviewQuestion,
  interviewData,
}) {
  const [userAnswer, setUserAnswer] = useState("");
  const genAI = new GoogleGenerativeAI(process.env.NEXT_PUBLIC_GEMINI_API_KEY);
  const { user } = useUser();
  const [loading, setLoading] = useState(false);
  const session = genAI
    .getGenerativeModel({ model: "gemini-1.5-flash" })
    .startChat();
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
    results.map((result) => {
      setUserAnswer((prevAns) => prevAns + result?.transcript);
    });
  }, [results]);

  useEffect(() => {
    if (!isRecording && userAnswer.length > 10) {
      UpdateUserAnswer();
    }
    // if (userAnswer?.length < 10) {
    //   setLoading(false);
    //   toast("Error while saving your answer, Please record again");
    //   return;
    // }
  }, [userAnswer]);

  const SaveUserAnswer = async () => {
    if (isRecording) {
      stopSpeechToText();

      setUserAnswer("");
    } else {
      startSpeechToText();
    }
  };

  const UpdateUserAnswer = async () => {
    console.log(userAnswer);
    setLoading(true);
    const feedBackPrompt =
      "Question:" +
      mockInterviewQuestion[activeQuestionIndex]?.question +
      ",User Answer" +
      userAnswer +
      ",Deponds on question and user answer for give interview question" +
      "please give us rating for answer and feedback as area of improvement" +
      "if any in just 3 to 5 lines to improve it on JSON Format with rating field and feedback field ";

    const result = await session.sendMessage(feedBackPrompt);
    const mockJsonResp = result.response
      .text()
      .replace("```json", "")
      .replace("```", "");
    console.log(mockJsonResp);
    const JsonFeedBack = JSON.parse(mockJsonResp);
    console.log(JsonFeedBack);
    const resp = await db.insert(UserAnswer).values({
      mockIdRef: interviewData,
      question: mockInterviewQuestion[activeQuestionIndex]?.question,
      correctAns: mockInterviewQuestion[activeQuestionIndex]?.answer,
      userAns: userAnswer,
      feedback: JsonFeedBack?.feedback,
      rating: JsonFeedBack?.rating,
      userEmail: user?.primaryEmailAddress?.emailAddress,
      createdAt: moment().format("DD-MM-YYYY"),
    });
    if (resp) {
      toast("User Answer recorded successfully");
    }
    setUserAnswer("");
    setLoading(false);
  };
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
      <div className="flex justify-center items-center gap-5">
        <Button
          disabled={loading}
          variant="outline"
          className="my-5"
          onClick={SaveUserAnswer}
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
        {/* <Button onClick={() => console.log(userAnswer)}>
          Show User Anwser
        </Button> */}
      </div>
    </div>
  );
}

export default RecordAnserSection;
