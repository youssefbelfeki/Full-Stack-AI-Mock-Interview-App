"use client";
import React, { useState } from "react";
import { Label } from "@/components/ui/label";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { LoaderCircle } from "lucide-react";
import { v4 as uuidv4 } from "uuid";
import { db } from "@/utils/db";
import { useUser } from "@clerk/nextjs";
import { MockInterview } from "@/utils/schema";
import moment from "moment";
import { useRouter } from "next/navigation";

function AddNewInterview() {
  const [openDialog, setOpenDialog] = useState(false);
  const [jobPosition, setJobPosition] = useState();
  const [jobDescription, setJobDescription] = useState();
  const [jobExperience, setJobExperience] = useState();
  const [loading, setLoading] = useState(false);
  const [jsonResponse, setJsonResponse] = useState([]);
  const { user } = useUser();
  const router = useRouter();
  const onSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    const res = await fetch("/api/interview", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        jobPosition,
        jobDescription,
        jobExperience,
      }),
    });
    setLoading(false);
    const result = await res.json();
    const MockJsonResp = result.data.replace("```json", "").replace("```", "");
    setJsonResponse(MockJsonResp);
    const data = {
      mockId: uuidv4(),
      jsonMockResp: MockJsonResp,
      jobPosition: jobPosition,
      jobDesc: jobDescription,
      jobExperience: jobExperience,
      createdBy: user?.primaryEmailAddress?.emailAddress,
      createdAt: moment().format("DD-MM-YYYY"),
    };
    if (MockJsonResp) {
      const resp = await db.insert(MockInterview).values(data).returning();
      console.log('resp: ',resp)
      setOpenDialog(false);
      router.push("/dashboard/interview/"+resp[0]?.mockId);
    } else {
      console.log("Something went wrong");
    }
  };
  return (
    <div>
      <div className="p-10 border rounded-lg bg-secondary hover:scale-105 hover:shadow-md cursor-pointer">
        <h2 onClick={() => setOpenDialog(true)} className="text-lg text-center">
          + Add New
        </h2>
      </div>
      <Dialog open={openDialog}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Are you absolutely sure?</DialogTitle>
            <DialogDescription>
              <form onSubmit={onSubmit}>
                <div>
                  <h2>Tell Us About Job you are interviewing</h2>
                  <div className="mt-7 my-3">
                    <Label>Job Position</Label>
                    <Input
                      placeholder="Ex. Full Stack Developer"
                      required
                      value={jobPosition}
                      onChange={(e) => setJobPosition(event.target.value)}
                    />
                  </div>
                  <div className="mt-3 my-3">
                    <Label>Job Description /Tech Stack (in short)</Label>
                    <Textarea
                      placeholder="Ex. React, Angular, etc"
                      required
                      value={jobDescription}
                      onChange={(e) => setJobDescription(event.target.value)}
                    />
                  </div>
                  <div className="mt-3 my-3">
                    <Label>Year of experience</Label>
                    <Input
                      placeholder="Ex. 1"
                      type="number"
                      max="50"
                      required
                      value={jobExperience}
                      onChange={(e) => setJobExperience(event.target.value)}
                    />
                  </div>
                </div>
                <div className="flex gap-5 justify-end">
                  <Button variant="ghost" onClick={() => setOpenDialog(false)}>
                    Cancel
                  </Button>
                  <Button disabled={loading} type="submit">
                    {loading ? (
                      <>
                        <LoaderCircle className="animate-spin" /> Generate from
                        Ai
                      </>
                    ) : (
                      "Start Interview"
                    )}
                  </Button>
                </div>
              </form>
            </DialogDescription>
          </DialogHeader>
        </DialogContent>
      </Dialog>
    </div>
  );
}

export default AddNewInterview;
