import { LightbulbIcon, Volume2 } from "lucide-react";
import React from "react";

function QuestionsSection({
  mockInterviewQuestion,
  activeQuestionIndex,
  setActiveQuestionIndex,
}) {
  const textToSpeech = (text) =>{
    if('speechSynthesis' in window){
      const speech = new SpeechSynthesisUtterance(text)
      window.speechSynthesis.speak(speech)
    }
    else(
      alert('Sorry, Your Browser not support')
    )
  }
  return (
    <div className="p-5 border rounded-lg my-10">
      <div className="grid grid-cols-2  md:grid-cols-3 lg:grid-cols-4 gap-5">
        {/* {mockInterviewQuestion.map((question, index) => {
              <h2
                className={`p-2 bg-blue-500 rounded-full text-xs md:text-sm text-center cursor-pointer ${
                  activeQuestionIndex == index && 'bg-blue-800 text-black'}`}
                onClick={() => setActiveQuestionIndex(index)} 
              >
                Questions #{index + 1}
              </h2>;
            })} */}
        {mockInterviewQuestion &&
          mockInterviewQuestion.map((question, index) => (
            <div
              key={index}
              className={`p-2 rounded-full text-xs md:text-sm cursor-pointer transition-colors duration-300 ${
                activeQuestionIndex === index
                  ? "bg-blue-600 text-white" // Active question styles
                  : "bg-gray-200 text-gray-700"
              }`}
              onClick={() => setActiveQuestionIndex(index)} // Set active index on click
            >
              Question #{index + 1}
            </div>
          ))}
      </div>
      <h2 className="my-5 text-md md:text-lg">
        {mockInterviewQuestion[activeQuestionIndex]?.question}
      </h2>
      <Volume2 className="cursor-pointer" onClick={()=>textToSpeech(mockInterviewQuestion[activeQuestionIndex]?.question)}/>
      <div className="border rounded-lg bg-blue-100 mt-20">
        <h2 className="flex gap-2 items-center text-primary">
          <LightbulbIcon />
          <strong>Note: </strong>
        </h2>
        <h2 className="text-sm text-primary p-5 my-5">
          {process.env.NEXT_PUBLIC_QUESTION_NOTE}
        </h2>

      </div>
    </div>
  );
}

export default QuestionsSection;
