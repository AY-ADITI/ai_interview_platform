/* eslint-disable @typescript-eslint/no-explicit-any */
// import dayjs from "dayjs";
// import Link from "next/link";
// import Image from "next/image";

// import { Button } from "./ui/button";
// import DisplayTechIcons from "./DisplayTechIcons";

// import { cn, getRandomInterviewCover } from "@/lib/utils";
// import { getFeedbackByInterviewId } from "@/lib/actions/general.action";

// const InterviewCard = async ({
//   interviewId,
//   userId,
//   role,
//   type,
//   techstack,
//   createdAt,
// }: InterviewCardProps) => {
//   const feedback =
//     userId && interviewId
//       ? await getFeedbackByInterviewId({
//           interviewId,
//           userId,
//         })
//       : null;

//   const normalizedType = /mix/gi.test(type) ? "Mixed" : type;

//   const badgeColor =
//     {
//       Behavioral: "bg-light-400",
//       Mixed: "bg-light-600",
//       Technical: "bg-light-800",
//     }[normalizedType] || "bg-light-600";

//   const formattedDate = dayjs(
//     feedback?.createdAt || createdAt || Date.now()
//   ).format("MMM D, YYYY");

//   return (
//     <div className="card-border w-[360px] max-sm:w-full min-h-96">
//       <div className="card-interview">
//         <div>
//           {/* Type Badge */}
//           <div
//             className={cn(
//               "absolute top-0 right-0 w-fit px-4 py-2 rounded-bl-lg",
//               badgeColor
//             )}
//           >
//             <p className="badge-text ">{normalizedType}</p>
//           </div>

//           {/* Cover Image */}
//           <Image
//             src={getRandomInterviewCover()}
//             alt="cover-image"
//             width={90}
//             height={90}
//             className="rounded-full object-fit size-[90px]"
//           />

//           {/* Interview Role */}
//           <h3 className="mt-5 capitalize">{role} Interview</h3>

//           {/* Date & Score */}
//           <div className="flex flex-row gap-5 mt-3">
//             <div className="flex flex-row gap-2">
//               <Image
//                 src="/calendar.svg"
//                 width={22}
//                 height={22}
//                 alt="calendar"
//               />
//               <p>{formattedDate}</p>
//             </div>

//             <div className="flex flex-row gap-2 items-center">
//               <Image src="/star.svg" width={22} height={22} alt="star" />
//               <p>{feedback?.totalScore || "---"}/100</p>
//             </div>
//           </div>

//           {/* Feedback or Placeholder Text */}
//           <p className="line-clamp-2 mt-5">
//             {feedback?.finalAssessment ||
//               "You haven't taken this interview yet. Take it now to improve your skills."}
//           </p>
//         </div>

//         <div className="flex flex-row justify-between">
//           <DisplayTechIcons techStack={techstack} />

//           <Button className="btn-primary">
//             <Link
//               href={
//                 feedback
//                   ? `/interview/${interviewId}/feedback`
//                   : `/interview/${interviewId}`
//               }
//             >
//               {feedback ? "Check Feedback" : "View Interview"}
//             </Link>
//           </Button>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default InterviewCard;

// "use client";

// import { useState } from "react";
// import dayjs from "dayjs";
// import Link from "next/link";
// import Image from "next/image";

// import { Button } from "./ui/button";
// import DisplayTechIcons from "./DisplayTechIcons";

// import { cn, getRandomInterviewCover } from "@/lib/utils";
// import { getFeedbackByInterviewId } from "@/lib/actions/general.action";

// interface InterviewCardProps {
//   interviewId: string;
//   userId: string;
//   userName?: string;
//   role: string;
//   type: string;
//   techstack: string[];
//   createdAt?: string;
// }

// const InterviewCard = ({
//   interviewId,
//   userId,
//  userName: propUserName,
//   role,
//   type,
//   techstack,
//   createdAt,
// }: InterviewCardProps) => {
//   const [feedback, setFeedback] = useState<any>(null);
//   const [response, setResponse] = useState<any>(null);
//   const [loading, setLoading] = useState(false);
//   const [userName, setUserName] = useState<string | null>(propUserName || null);
  
//   // Fetch feedback once on client-side
//   useState(() => {
//     if (userId && interviewId) {
//       getFeedbackByInterviewId({ interviewId, userId }).then((res) =>
//         setFeedback(res)
//       );
//     }
//   });

//   const normalizedType = /mix/gi.test(type) ? "Mixed" : type;

//   const badgeColor =
//     {
//       Behavioral: "bg-light-400",
//       Mixed: "bg-light-600",
//       Technical: "bg-light-800",
//     }[normalizedType] || "bg-light-600";

//   const formattedDate = dayjs(
//     feedback?.createdAt || createdAt || new Date().toISOString()
//   ).format("MMM D, YYYY");

//   const handleCall = async () => {
//     setLoading(true);
//     try {
//       const res = await fetch(
//         "https://ai-mock-interviews-lemon.vercel.app/api/vapi/generate",
//         {
//           method: "POST",
//           headers: {
//             "Content-Type": "application/json",
//             Authorization: "Bearer 6f6e08ad-194c-4731-97b2-b6bac7be6fba",
//           },
//           body: JSON.stringify({
//             role,
//             type,
//             techstack: techstack.join(", "),
//             amount: "5",
//             comfirmation: "yes",
//             userid: userId,
//           }),
//         }
//       );

//       const data = await res.json();
//       setResponse(data);
//     } catch (err) {
//       console.error("Vapi call error:", err);
//     } finally {
//       setLoading(false);
//     }
//   };

//   return (
//     <div className="card-border w-[360px] max-sm:w-full min-h-96">
//       <div className="card-interview">
//         <div>
//           {/* Type Badge */}
//           <div
//             className={cn(
//               "absolute top-0 right-0 w-fit px-4 py-2 rounded-bl-lg",
//               badgeColor
//             )}
//           >
//             <p className="badge-text">{normalizedType}</p>
//           </div>

//           {/* Cover Image */}
//           <Image
//             src={getRandomInterviewCover()}
//             alt="cover-image"
//             width={90}
//             height={90}
//             className="rounded-full object-cover size-[90px]"
//           />

//           {/* Interview Role */}
//           <h3 className="mt-5 capitalize">{role} Interview</h3>

//            {userName && (
//             <p className="mt-2 text-sm text-gray-600">By: {userName}</p>
//           )}

//           {/* Date & Score */}
//           <div className="flex flex-row gap-5 mt-3">
//             <div className="flex flex-row gap-2 items-center">
//               <Image src="/calendar.svg" width={22} height={22} alt="calendar" />
//               <p>{formattedDate}</p>
//             </div>

//             <div className="flex flex-row gap-2 items-center">
//               <Image src="/star.svg" width={22} height={22} alt="star" />
//               <p>{feedback?.totalScore || "---"}/100</p>
//             </div>
//           </div>

//           {/* Feedback or Placeholder Text */}
//           <p className="line-clamp-2 mt-5">
//             {feedback?.finalAssessment ||
//               "You haven't taken this interview yet. Take it now to improve your skills."}
//           </p>
//         </div>

//         <div className="flex flex-row justify-between mt-5 items-center">
//           <DisplayTechIcons techStack={techstack} />

//           <div className="flex flex-col gap-2">
//             <Button onClick={handleCall} className="btn-primary" disabled={loading}>
//               {loading ? "Generating..." : "Start Interview"}
//             </Button>

//             {response && (
//               <p className="text-sm mt-1 text-gray-600">
//                 Response: {JSON.stringify(response)}
//               </p>
//             )}

//             <Button className="btn-secondary mt-2">
//               <Link
//                 href={
//                   feedback
//                     ? `/interview/${interviewId}/feedback`
//                     : `/interview/${interviewId}`
//                 }
//               >
//                 {feedback ? "Check Feedback" : "View Interview"}
//               </Link>
//             </Button>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default InterviewCard;

"use client";

import { useEffect, useState } from "react";
import dayjs from "dayjs";
import Link from "next/link";
import Image from "next/image";
import { Button } from "./ui/button";
import DisplayTechIcons from "./DisplayTechIcons";
import { cn, getRandomInterviewCover } from "@/lib/utils";
import { getFeedbackByInterviewId } from "@/lib/actions/general.action";

interface InterviewCardProps {
  interviewId: string;
  userId: string;
  userName?: string;
  role: string;
  type: string;
  techstack: string[];
  createdAt?: string;
}

const InterviewCard = ({
  interviewId,
  userId,
  userName,
  role,
  type,
  techstack,
  createdAt,
}: InterviewCardProps) => {
  const [feedback, setFeedback] = useState<any>(null);
  const [loading, setLoading] = useState(false);
  const [response, setResponse] = useState<any>(null);

  // ✅ Properly fetch feedback once
  useEffect(() => {
    const fetchFeedback = async () => {
      if (userId && interviewId) {
        const res = await getFeedbackByInterviewId({ interviewId, userId });
        setFeedback(res);
      }
    };
    fetchFeedback();
  }, [userId, interviewId]);

  const normalizedType = /mix/gi.test(type) ? "Mixed" : type;

  const badgeColor =
    {
      Behavioral: "bg-light-400",
      Mixed: "bg-light-600",
      Technical: "bg-light-800",
    }[normalizedType] || "bg-light-600";

  const formattedDate = dayjs(
    feedback?.createdAt || createdAt || new Date().toISOString()
  ).format("MMM D, YYYY");

  const handleCall = async () => {
    setLoading(true);
    try {
      const res = await fetch(
        "https://ai-mock-interviews-lemon.vercel.app/api/vapi/generate",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: "Bearer  ${process.env.NEXT_PUBLIC_VAPI_WEB_TOKEN}`",
          },
          body: JSON.stringify({
            role,
            type,
            techstack: techstack.join(", "),
            amount: "5",
            confirmation: "yes",
            userid: userId,
          }),
        }
      );

      const data = await res.json();
      setResponse(data);
    } catch (err) {
      console.error("Error generating interview:", err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="card-border w-[360px] max-sm:w-full min-h-96">
      <div className="card-interview">
        <div>
          {/* Type Badge */}
          <div
            className={cn(
              "absolute top-0 right-0 w-fit px-4 py-2 rounded-bl-lg",
              badgeColor
            )}
          >
            <p className="badge-text">{normalizedType}</p>
          </div>

          {/* Cover Image */}
          <Image
            src={getRandomInterviewCover()}
            alt="cover-image"
            width={90}
            height={90}
            className="rounded-full object-cover size-[90px]"
          />

          {/* Interview Role */}
          <h3 className="mt-5 capitalize">{role} Interview</h3>

          {userName && (
            <p className="mt-2 text-sm text-gray-600">By: {userName}</p>
          )}

          {/* Date & Score */}
          <div className="flex flex-row gap-5 mt-3">
            <div className="flex flex-row gap-2 items-center">
              <Image src="/calendar.svg" width={22} height={22} alt="calendar" />
              <p>{formattedDate}</p>
            </div>

            <div className="flex flex-row gap-2 items-center">
              <Image src="/star.svg" width={22} height={22} alt="star" />
              <p>{feedback?.totalScore ?? "---"}/100</p>
            </div>
          </div>

          {/* Feedback or Placeholder Text */}
          <p className="line-clamp-2 mt-5">
            {feedback?.finalAssessment ||
              "You haven’t taken this interview yet. Take it now to improve your skills."}
          </p>
        </div>

        <div className="flex flex-row justify-between mt-5 items-center">
          <DisplayTechIcons techStack={techstack} />

          <div className="flex flex-col gap-2">
            <Button
              onClick={handleCall}
              className="btn-primary"
              disabled={loading}
            >
              {loading ? "Generating..." : "Start Interview"}
            </Button>

            {response && (
              <p className="text-sm mt-1 text-gray-600">
                Response: {JSON.stringify(response)}
              </p>
            )}

            <Button className="btn-secondary mt-2">
              <Link
                href={
                  feedback
                    ? `/interview/${interviewId}/feedback`
                    : `/interview/${interviewId}`
                }
              >
                {feedback ? "Check Feedback" : "View Interview"}
              </Link>
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default InterviewCard;




// "use client";

// import { useEffect, useState } from "react";
// import dayjs from "dayjs";
// import Link from "next/link";
// import Image from "next/image";
// import { Button } from "./ui/button";
// import DisplayTechIcons from "./DisplayTechIcons";
// import { cn, getRandomInterviewCover } from "@/lib/utils";
// import { getAuth } from "firebase/auth"; // ✅ Added Firebase import
// import { getFeedbackByInterviewId } from "@/lib/actions/general.action";

// interface InterviewCardProps {
//   interviewId: string;
//   userId: string;
//   userName?: string;
//   role: string;
//   type: string;
//   techstack: string[];
//   createdAt?: string;
// }

// const InterviewCard = ({
//   interviewId,
//   userId,
//   userName,
//   role,
//   type,
//   techstack,
//   createdAt,
// }: InterviewCardProps) => {
//   const [feedback, setFeedback] = useState<any>(null);
//   const [loading, setLoading] = useState(false);
//   const [response, setResponse] = useState<any>(null);

//   // ✅ Fetch feedback if available
//   useEffect(() => {
//     const fetchFeedback = async () => {
//       if (userId && interviewId) {
//         const res = await getFeedbackByInterviewId({ interviewId, userId });
//         setFeedback(res);
//       }
//     };
//     fetchFeedback();
//   }, [userId, interviewId]);

//   const normalizedType = /mix/gi.test(type) ? "Mixed" : type;
//   const badgeColor =
//     {
//       Behavioral: "bg-light-400",
//       Mixed: "bg-light-600",
//       Technical: "bg-light-800",
//     }[normalizedType] || "bg-light-600";

//   const formattedDate = dayjs(
//     feedback?.createdAt || createdAt || new Date().toISOString()
//   ).format("MMM D, YYYY");

//   // ✅ Fixed handleCall (uses Firebase token + local API)
//   const handleCall = async () => {
//     setLoading(true);
//     try {
//       const auth = getAuth();
//       const user = auth.currentUser;

//       if (!user) {
//         console.warn("⚠️ No signed-in user found.");
//         setResponse({ error: "Please sign in first." });
//         setLoading(false);
//         return;
//       }

//       // 🔹 Get Firebase ID token
//       const token = await user.getIdToken();

//       // 🔹 Call your Next.js API (not external)
//       const res = await fetch("/api/vapi/generate", {
//         method: "POST",
//         headers: {
//           "Content-Type": "application/json",
//           Authorization: `Bearer 6f6e08ad-194c-4731-97b2-b6bac7be6fba`,
//         },
//         body: JSON.stringify({
//           role,
//           type,
//           level: "Mid", // you can change dynamically
//           techstack: techstack.join(", "),
//           amount: "5",
//         }),
//       });

//       const data = await res.json();
//       console.log("✅ Interview generated:", data);
//       setResponse(data);
//     } catch (err) {
//       console.error("❌ Error generating interview:", err);
//       setResponse({ error: err.message });
//     } finally {
//       setLoading(false);
//     }
//   };

//   return (
//     <div className="card-border w-[360px] max-sm:w-full min-h-96">
//       <div className="card-interview">
//         <div>
//           <div
//             className={cn(
//               "absolute top-0 right-0 w-fit px-4 py-2 rounded-bl-lg",
//               badgeColor
//             )}
//           >
//             <p className="badge-text">{normalizedType}</p>
//           </div>

//           <Image
//             src={getRandomInterviewCover()}
//             alt="cover-image"
//             width={90}
//             height={90}
//             className="rounded-full object-cover size-[90px]"
//           />

//           <h3 className="mt-5 capitalize">{role} Interview</h3>
//           {userName && (
//             <p className="mt-2 text-sm text-gray-600">By: {userName}</p>
//           )}

//           <div className="flex flex-row gap-5 mt-3">
//             <div className="flex flex-row gap-2 items-center">
//               <Image src="/calendar.svg" width={22} height={22} alt="calendar" />
//               <p>{formattedDate}</p>
//             </div>

//             <div className="flex flex-row gap-2 items-center">
//               <Image src="/star.svg" width={22} height={22} alt="star" />
//               <p>{feedback?.totalScore ?? "---"}/100</p>
//             </div>
//           </div>

//           <p className="line-clamp-2 mt-5">
//             {feedback?.finalAssessment ||
//               "You haven’t taken this interview yet. Take it now to improve your skills."}
//           </p>
//         </div>

//         <div className="flex flex-row justify-between mt-5 items-center">
//           <DisplayTechIcons techStack={techstack} />

//           <div className="flex flex-col gap-2">
//             <Button
//               onClick={handleCall}
//               className="btn-primary"
//               disabled={loading}
//             >
//               {loading ? "Generating..." : "Start Interview"}
//             </Button>

//             {response && (
//               <pre className="mt-2 text-xs bg-gray-100 rounded p-2 overflow-auto">
//                 {JSON.stringify(response, null, 2)}
//               </pre>
//             )}

//             <Button className="btn-secondary mt-2">
//               <Link
//                 href={
//                   feedback
//                     ? `/interview/${interviewId}/feedback`
//                     : `/interview/${interviewId}`
//                 }
//               >
//                 {feedback ? "Check Feedback" : "View Interview"}
//               </Link>
//             </Button>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default InterviewCard;
