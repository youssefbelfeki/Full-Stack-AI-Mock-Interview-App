"use client";
import { Button } from "@/components/ui/button";
import { db } from "@/utils/db";
import { MockInterview } from "@/utils/schema";
import { eq } from "drizzle-orm";
import { Lightbulb, WebcamIcon } from "lucide-react";
import Link from "next/link";
import React, { useEffect, useState } from "react";
import Webcam from "react-webcam";

function InterviewId({ id }) {
  const [interviewData, setInterviewData] = useState([]);
  const [webcamInable, setWebcamInable] = useState(false);
  useEffect(() => {
    GetInterviewDetails();
  }, []);

  const GetInterviewDetails = async () => {
    const result = await db
      .select()
      .from(MockInterview)
      .where(eq(MockInterview.mockId, id));
    setInterviewData(result[0]);
  };
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-10 p-10">
      <div className="flex flex-col my-5 gap-5 ">
        <div className="flex flex-col p-5 rounded-lg border not-[]:gap-5">
          <h2 className="text-lg">
            <strong>Job Role /Job Position :</strong>
            {interviewData?.jobPosition}
          </h2>
          <h2 className="text-lg">
            <strong>Job Description /Tech Stack :</strong>
            {interviewData?.jobDesc}
          </h2>
          <h2 className="text-lg">
            <strong>Years of Experience :</strong>
            {interviewData?.jobExperience}
          </h2>
        </div>
        <div className="p-5 border-lg border-yellow-300 bg-yellow-100">
          <h2 className="flex gap-2 items-center text-yellow-500">
            <Lightbulb className="flex gap-2 items-center" />
            <strong>Information</strong>
          </h2>
          <h2 className="mt-3">{process.env.NEXT_PUBLIC_INFORMATION}</h2>
        </div>
      </div>

      <div className="">
        {webcamInable ? (
          <Webcam
            onUserMedia={() => setWebcamInable(true)}
            onUserMediaError={() => setWebcamInable(false)}
            mirrored={true}
            style={{
              height: 500,
              width: 500,
            }}
          />
        ) : (
          <WebcamIcon className="mt-5 h-72 w-68 p-10 bg-secondary rounded-2xl" />
        )}
        <Button onClick={() => setWebcamInable(true)} className="mt-5">
          Enable Web Cam and Microphone
        </Button>
        <div className="flex justify-end items-center">
          <Link href={'/dashboard/interview/'+id+'/start'}>
            <Button>Start Interview</Button>
          </Link>
        </div>
      </div>
    </div>
  );
}

export default InterviewId;
