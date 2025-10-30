import Link from "next/link";
import Image from "next/image";
import { redirect } from "next/navigation";
import { Button } from "@/components/ui/button";
import InterviewCard from "@/components/InterviewCard";
import { getCurrentUser } from "@/lib/actions/auth.action";
import {
  getInterviewsByUserId,
  getLatestInterviews,
} from "@/lib/actions/general.action";

export default async function Home() {
  const user = await getCurrentUser();

  // ✅ Redirect if not logged in
  if (!user?.id) redirect("/sign-in");

  // ✅ Fetch interviews concurrently and safely
  const [userInterviewsRaw, allInterviewsRaw] = await Promise.all([
    getInterviewsByUserId(user.id).catch(() => []),
    getLatestInterviews({ userId: user.id }).catch(() => []),
  ]);

  // ✅ Ensure both are arrays (avoid null or undefined)
  const userInterviews = Array.isArray(userInterviewsRaw)
    ? userInterviewsRaw
    : [];
  const allInterviews = Array.isArray(allInterviewsRaw)
    ? allInterviewsRaw
    : [];

  // ✅ Check for content
  const hasPastInterviews = userInterviews.length > 0;
  const hasAvailableInterviews = allInterviews.length > 0;

  return (
    <>
      {/* ===== Hero Section ===== */}
      <section className="card-cta">
        <div className="flex flex-col gap-6 max-w-lg">
          <h2>Get Interview-Ready with AI-Powered Practice & Feedback</h2>
          <p className="text-lg">
            Practice real interview questions & get instant feedback
          </p>

          <Button asChild className="btn-primary max-sm:w-full">
            <Link href="/interview">Start an Interview</Link>
          </Button>
        </div>

        <Image
          src="/robot.png"
          alt="robot"
          width={400}
          height={400}
          style={{ width: "auto", height: "auto" }}
          className="max-sm:hidden"
        />
      </section>

      {/* ===== Past Interviews ===== */}
      <section className="flex flex-col gap-6 mt-8">
        <h2 className="text-2xl font-semibold">Your Past Interviews</h2>

        <div className="interviews-section">
          {hasPastInterviews ? (
            userInterviews.map((interview) => (
              <InterviewCard
                key={interview.id}
                userId={user.id}
                interviewId={interview.id}
                role={interview.role || "Unknown Role"}
                type={interview.type || "General"}
                techstack={interview.techstack || []}
                createdAt={interview.createdAt || new Date().toISOString()}
              />
            ))
          ) : (
            <p className="text-gray-400">You haven’t taken any interviews yet.</p>
          )}
        </div>
      </section>

      {/* ===== Available Interviews ===== */}
      <section className="flex flex-col gap-6 mt-8">
        <h2 className="text-2xl font-semibold">Available Interviews</h2>

        <div className="interviews-section">
          {hasAvailableInterviews ? (
            allInterviews.map((interview) => (
              <InterviewCard
                key={interview.id}
                userId={user.id}
                interviewId={interview.id}
                role={interview.role || "Unknown Role"}
                type={interview.type || "General"}
                techstack={interview.techstack || []}
                createdAt={interview.createdAt || new Date().toISOString()}
              />
            ))
          ) : (
            <p className="text-gray-400">There are no interviews available.</p>
          )}
        </div>
      </section>
    </>
  );
}

/* eslint-disable @typescript-eslint/no-explicit-any */
// "use client";

// import Image from "next/image";
// import { useState, useEffect } from "react";
// import { useRouter } from "next/navigation";
// import { cn } from "@/lib/utils";
// import { vapi } from "@/lib/vapi.sdk";
// import { interviewer } from "@/constants";
// import { createFeedback } from "@/lib/actions/general.action";

// enum CallStatus {
//   INACTIVE = "INACTIVE",
//   CONNECTING = "CONNECTING",
//   ACTIVE = "ACTIVE",
//   FINISHED = "FINISHED",
// }

// interface SavedMessage {
//   role: "user" | "system" | "assistant";
//   content: string;
// }

// interface AgentProps {
//   userName?: string;
//   userId: string;
//   profileImage?: string;
//   type: "generate" | "interview";
//   interviewId?: string;
//   feedbackId?: string;
//   questions?: string[];
// }

// const Agent = ({
//   userName,
//   userId,
//   interviewId,
//   feedbackId,
//   type,
//   questions,
//   profileImage,
// }: AgentProps) => {
//   const router = useRouter();
//   const [callStatus, setCallStatus] = useState<CallStatus>(CallStatus.INACTIVE);
//   const [messages, setMessages] = useState<SavedMessage[]>([]);
//   const [isSpeaking, setIsSpeaking] = useState(false);
//   const [lastMessage, setLastMessage] = useState<string>("");

//   // ✅ Always ensure userName is defined
//   const displayName =
//     userName?.trim() ||
//     "Guest"; // fallback — avoids showing "Unknown"

//   // --- Handle SDK events ---
//   useEffect(() => {
//     if (!vapi) {
//       console.warn("⚠️ Vapi SDK not loaded.");
//       return;
//     }

//     const onCallStart = () => setCallStatus(CallStatus.ACTIVE);
//     const onCallEnd = () => setCallStatus(CallStatus.FINISHED);
//     const onSpeechStart = () => setIsSpeaking(true);
//     const onSpeechEnd = () => setIsSpeaking(false);
//     const onError = (error: any) => console.error("Vapi Error:", error);

//     const onMessage = (message: any) => {
//       if (message.type === "transcript" && message.transcriptType === "final") {
//         setMessages((prev) => [
//           ...prev,
//           { role: message.role, content: message.transcript },
//         ]);
//       }
//     };

//     vapi.on("call-start", onCallStart);
//     vapi.on("call-end", onCallEnd);
//     vapi.on("message", onMessage);
//     vapi.on("speech-start", onSpeechStart);
//     vapi.on("speech-end", onSpeechEnd);
//     vapi.on("error", onError);

//     return () => {
//       vapi.off("call-start", onCallStart);
//       vapi.off("call-end", onCallEnd);
//       vapi.off("message", onMessage);
//       vapi.off("speech-start", onSpeechStart);
//       vapi.off("speech-end", onSpeechEnd);
//       vapi.off("error", onError);
//     };
//   }, []);

//   // --- Handle feedback after call ---
//   useEffect(() => {
//     if (messages.length > 0) {
//       setLastMessage(messages[messages.length - 1].content);
//     }

//     const handleGenerateFeedback = async (msgs: SavedMessage[]) => {
//       console.log("📝 Saving feedback...");

//       const { success, feedbackId: id } = await createFeedback({
//         interviewId: interviewId || "",
//         userId: userId || "",
//         transcript: msgs,
//         feedbackId,
//       });

//       if (success && id) router.push(`/interview/${interviewId}/feedback`);
//       else router.push("/");
//     };

//     if (callStatus === CallStatus.FINISHED) {
//       if (type === "generate") router.push("/");
//       else handleGenerateFeedback(messages);
//     }
//   }, [messages, callStatus, feedbackId, interviewId, router, type, userId]);

//   // --- Start call handler ---
//   const handleCall = async () => {
//     setCallStatus(CallStatus.CONNECTING);
//     try {
//       if (type === "generate") {
//         const workflowId = process.env.NEXT_PUBLIC_VAPI_WORKFLOW_ID;
//         if (!workflowId) throw new Error("Workflow ID missing.");

//         await vapi.start(workflowId, {
//           variableValues: { username: displayName, userid: userId },
//         });
//       } else {
//         let formattedQuestions = "";
//         if (questions)
//           formattedQuestions = questions.map((q) => `- ${q}`).join("\n");

//         await vapi.start(interviewer, {
//           variableValues: {
//             username: displayName,
//             questions: formattedQuestions,
//           },
//         });
//       }
//     } catch (err) {
//       console.error("❌ Vapi start error:", err);
//       setCallStatus(CallStatus.INACTIVE);
//     }
//   };

//   // --- End call handler ---
//   const handleDisconnect = () => {
//     setCallStatus(CallStatus.FINISHED);
//     vapi.stop?.();
//   };

//   return (
//     <>
//       <div className="call-view">
//         {/* AI Interviewer Card */}
//         <div className="card-interviewer">
//           <div className="avatar">
//             <Image
//               src="/ai-avatar.png"
//               alt="AI Interviewer"
//               width={65}
//               height={54}
//               className="object-cover"
//             />
//             {isSpeaking && <span className="animate-speak" />}
//           </div>
//           <h3>AI Interviewer</h3>
//         </div>

//         {/* User Profile Card */}
//         <div className="card-border">
//           <div className="card-content">
//             <Image
//               src={profileImage || "/user-avatar.png"}
//               alt="User"
//               width={120}
//               height={120}
//               className="rounded-full object-cover"
//             />
//             {/* ✅ Now always shows a name */}
//             <h3 className="capitalize">{displayName}</h3>
//           </div>
//         </div>
//       </div>

//       {/* Transcript Section */}
//       {messages.length > 0 && (
//         <div className="transcript-border">
//           <div className="transcript">
//             <p
//               key={lastMessage}
//               className={cn(
//                 "transition-opacity duration-500 opacity-0",
//                 "animate-fadeIn opacity-100"
//               )}
//             >
//               {lastMessage}
//             </p>
//           </div>
//         </div>
//       )}

//       {/* Call Controls */}
//       <div className="w-full flex justify-center">
//         {callStatus !== CallStatus.ACTIVE ? (
//           <button className="relative btn-call" onClick={handleCall}>
//             <span
//               className={cn(
//                 "absolute animate-ping rounded-full opacity-75",
//                 callStatus !== CallStatus.CONNECTING && "hidden"
//               )}
//             />
//             <span className="relative">
//               {callStatus === CallStatus.INACTIVE ||
//               callStatus === CallStatus.FINISHED
//                 ? "Call"
//                 : ". . ."}
//             </span>
//           </button>
//         ) : (
//           <button className="btn-disconnect" onClick={handleDisconnect}>
//             End
//           </button>
//         )}
//       </div>
//     </>
//   );
// };

// export default Agent;
