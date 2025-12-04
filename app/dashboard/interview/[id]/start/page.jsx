"use client";
import React, { useEffect, useState } from "react";
import { db } from "@/utils/db";
import { MockInterview } from "@/utils/schema";
import { eq } from "drizzle-orm";
import QuestionsSection from "./_components/QuestionsSection";
import RecordAnserSection from "./_components/RecordAnserSection";

function StartInterviewPage({ params }) {
  const { id } = React.use(params);
  console.log("id: ", id);
  const [mockInterviewQuestion, setMockInterviewQuestion] = useState([]);
  const [activeQuestionIndex, setActiveQuestionIndex] = useState(0);
  const GetInterviewDetails = async () => {
    try {
      const result = await db
        .select()
        .from(MockInterview)
        .where(eq(MockInterview.mockId, id));

      if (result.length > 0) {
        const jsonMockResp = JSON.parse(result[0].jsonMockResp);
        console.log("result", jsonMockResp);
        setMockInterviewQuestion(jsonMockResp);
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
    <div>
      <div className="grid grid-cols-1 md:grid-cols-2">
        {/* Questions */}
        <QuestionsSection
          activeQuestionIndex={activeQuestionIndex}
          setActiveQuestionIndex={setActiveQuestionIndex}
          mockInterviewQuestion={mockInterviewQuestion}
        />

        {/* Video/ Audio Recording */}
        <RecordAnserSection />
      </div>
    </div>
  );
}

export default StartInterviewPage;
