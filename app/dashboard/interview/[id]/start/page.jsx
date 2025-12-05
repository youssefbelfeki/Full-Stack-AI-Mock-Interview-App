"use client";
import React, { useEffect, useState } from "react";
import { db } from "@/utils/db";
import { MockInterview } from "@/utils/schema";
import { eq } from "drizzle-orm";
import QuestionsSection from "./_components/QuestionsSection";
import RecordAnserSection from "./_components/RecordAnserSection";
import { Button } from "@/components/ui/button";

function StartInterviewPage({ params }) {
  const { id } = React.use(params);
  const [mockInterviewQuestion, setMockInterviewQuestion] = useState([]);
  const [activeQuestionIndex, setActiveQuestionIndex] = useState(0);
  const [interviewData, setIntervieData] = useState();
  const GetInterviewDetails = async () => {
    try {
      const result = await db
        .select()
        .from(MockInterview)
        .where(eq(MockInterview.mockId, id));

      if (result.length > 0) {
        const jsonMockResp = JSON.parse(result[0].jsonMockResp);
        setMockInterviewQuestion(jsonMockResp);
        setIntervieData(result[0]);
      } else {
        console.error("No interview found for the given ID");
      }
    } catch (error) {
      console.error("Error fetching interview details:", error);
    }
  };
  useEffect(() => {
    GetInterviewDetails();
  }, []);
  return (
    <div className="p-5">
      <div className="grid grid-cols-1 md:grid-cols-2 ">
        {/* Questions */}
        <QuestionsSection
          activeQuestionIndex={activeQuestionIndex}
          setActiveQuestionIndex={setActiveQuestionIndex}
          mockInterviewQuestion={mockInterviewQuestion}
        />

        {/* Video/ Audio Recording */}
        <RecordAnserSection
          mockInterviewQuestion={mockInterviewQuestion}
          activeQuestionIndex={activeQuestionIndex}
          interviewData={interviewData}
        />
      </div>
      <div className="flex justify-start gap-6">
        {activeQuestionIndex > 0 && (
          <Button
            onClick={() => setActiveQuestionIndex(activeQuestionIndex - 1)}
          >
            Previous
          </Button>
        )}
        {activeQuestionIndex !== mockInterviewQuestion?.length - 1 && (
          <Button
            onClick={() => setActiveQuestionIndex(activeQuestionIndex + 1)}
          >
            Next
          </Button>
        )}
        {activeQuestionIndex === mockInterviewQuestion?.length - 1 && (
          <Button>End Interview</Button>
        )}
      </div>
    </div>
  );
}

export default StartInterviewPage;
