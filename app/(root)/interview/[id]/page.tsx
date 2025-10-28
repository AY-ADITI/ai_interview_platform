// import Image from "next/image";
// import { redirect } from "next/navigation";

// import Agent from "@/components/Agent";
// import { getRandomInterviewCover } from "@/lib/utils";

// import {
//   getFeedbackByInterviewId,
//   getInterviewById,
// } from "@/lib/actions/general.action";
// import { getCurrentUser } from "@/lib/actions/auth.action";
// import DisplayTechIcons from "@/components/DisplayTechIcons";

// const InterviewDetails = async ({ params }: RouteParams) => {
//   const { id } = await params;

//   const user = await getCurrentUser();

//   const interview = await getInterviewById(id);
//   if (!interview) redirect("/");

//   const feedback = await getFeedbackByInterviewId({
//     interviewId: id,
//     userId: user?.id!,
//   });

//   return (
//     <>
//       <div className="flex flex-row gap-4 justify-between">
//         <div className="flex flex-row gap-4 items-center max-sm:flex-col">
//           <div className="flex flex-row gap-4 items-center">
//             <Image
//               src={getRandomInterviewCover()}
//               alt="cover-image"
//               width={40}
//               height={40}
//               className="rounded-full object-cover size-[40px]"
//             />
//             <h3 className="capitalize">{interview.role} Interview</h3>
//           </div>

//           <DisplayTechIcons techStack={interview.techstack} />
//         </div>

//         <p className="bg-dark-200 px-4 py-2 rounded-lg h-fit">
//           {interview.type}
//         </p>
//       </div>

//       <Agent
//         userName={user?.name!}
//         userId={user?.id}
//         interviewId={id}
//         type="interview"
//         questions={interview.questions}
//         feedbackId={feedback?.id}
//       />
//     </>
//   );
// };

// export default InterviewDetails;


// import dayjs from "dayjs";
// import Link from "next/link";
// import Image from "next/image";
// import { redirect } from "next/navigation";

// import {
//   getFeedbackByInterviewId,
//   getInterviewById,
// } from "@/lib/actions/general.action";
// import { Button } from "@/components/ui/button";
// import { getCurrentUser } from "@/lib/actions/auth.action";

// // Types
// interface RouteParams {
//   params: { id: string };
// }

// interface FeedbackCategory {
//   name: string;
//   score: number;
//   comment: string;
// }

// interface Feedback {
//   totalScore: number;
//   createdAt: string;
//   finalAssessment: string;
//   categoryScores: FeedbackCategory[];
//   strengths: string[];
//   areasForImprovement: string[];
// }

// const Feedback = async ({ params }: RouteParams) => {
//   const { id } = params;
//   const user = await getCurrentUser();

//   const interview = await getInterviewById(id);
//   if (!interview) redirect("/");

//   const feedback: Feedback | null = await getFeedbackByInterviewId({
//     interviewId: id,
//     userId: user?.id ?? "",
//   });

//   return (
//     <section className="section-feedback">
//       <div className="flex flex-row justify-center">
//         <h1 className="text-4xl font-semibold">
//           Feedback on the Interview -{" "}
//           <span className="capitalize">{interview.role}</span> Interview
//         </h1>
//       </div>

//       <div className="flex flex-row justify-center">
//         <div className="flex flex-row gap-5">
//           {/* Overall Impression */}
//           <div className="flex flex-row gap-2 items-center">
//             <Image src="/star.svg" width={22} height={22} alt="star" />
//             <p>
//               Overall Impression:{" "}
//               <span className="text-primary-200 font-bold">
//                 {feedback?.totalScore ?? "N/A"}
//               </span>
//               /100
//             </p>
//           </div>

//           {/* Date */}
//           <div className="flex flex-row gap-2">
//             <Image src="/calendar.svg" width={22} height={22} alt="calendar" />
//             <p>
//               {feedback?.createdAt
//                 ? dayjs(feedback.createdAt).format("MMM D, YYYY h:mm A")
//                 : "N/A"}
//             </p>
//           </div>
//         </div>
//       </div>

//       <hr className="my-4" />

//       <p>{feedback?.finalAssessment ?? "No assessment available."}</p>

//       {/* Interview Breakdown */}
//       <div className="flex flex-col gap-4 mt-4">
//         <h2>Breakdown of the Interview:</h2>
//         {feedback?.categoryScores?.length ? (
//           feedback.categoryScores.map((category, index) => (
//             <div key={index}>
//               <p className="font-bold">
//                 {index + 1}. {category.name} ({category.score}/100)
//               </p>
//               <p>{category.comment}</p>
//             </div>
//           ))
//         ) : (
//           <p>No category scores available.</p>
//         )}
//       </div>

//       {/* Strengths */}
//       <div className="flex flex-col gap-3 mt-4">
//         <h3>Strengths</h3>
//         <ul>
//           {feedback?.strengths?.length ? (
//             feedback.strengths.map((strength, index) => (
//               <li key={index}>{strength}</li>
//             ))
//           ) : (
//             <li>N/A</li>
//           )}
//         </ul>
//       </div>

//       {/* Areas for Improvement */}
//       <div className="flex flex-col gap-3 mt-4">
//         <h3>Areas for Improvement</h3>
//         <ul>
//           {feedback?.areasForImprovement?.length ? (
//             feedback.areasForImprovement.map((area, index) => (
//               <li key={index}>{area}</li>
//             ))
//           ) : (
//             <li>N/A</li>
//           )}
//         </ul>
//       </div>

//       {/* Buttons */}
//       <div className="flex gap-4 mt-6">
//         <Button className="btn-secondary flex-1">
//           <Link href="/" className="flex w-full justify-center">
//             <p className="text-sm font-semibold text-primary-200 text-center">
//               Back to dashboard
//             </p>
//           </Link>
//         </Button>

//         <Button className="btn-primary flex-1">
//           <Link href={`/interview/${id}`} className="flex w-full justify-center">
//             <p className="text-sm font-semibold text-black text-center">
//               Retake Interview
//             </p>
//           </Link>
//         </Button>
//       </div>
//     </section>
//   );
// };

// export default Feedback;

import Image from "next/image";
import { redirect } from "next/navigation";

import Agent from "@/components/Agent";
import { getRandomInterviewCover } from "@/lib/utils";

import {
  getFeedbackByInterviewId,
  getInterviewById,
} from "@/lib/actions/general.action";
import { getCurrentUser } from "@/lib/actions/auth.action";
import DisplayTechIcons from "@/components/DisplayTechIcons";

const InterviewDetails = async ({ params }: RouteParams) => {
  const { id } = await params;

  const user = await getCurrentUser();

  const interview = await getInterviewById(id);
  if (!interview) redirect("/");

  const feedback = await getFeedbackByInterviewId({
    interviewId: id,
    userId: user?.id!,
  });

  return (
    <>
      <div className="flex flex-row gap-4 justify-between">
        <div className="flex flex-row gap-4 items-center max-sm:flex-col">
          <div className="flex flex-row gap-4 items-center">
            <Image
              src={getRandomInterviewCover()}
              alt="cover-image"
              width={40}
              height={40}
              className="rounded-full object-cover size-[40px]"
            />
            <h3 className="capitalize">{interview.role} Interview</h3>
          </div>

          <DisplayTechIcons techStack={interview.techstack} />
        </div>

        <p className="bg-dark-200 px-4 py-2 rounded-lg h-fit">
          {interview.type}
        </p>
      </div>

      <Agent
        userName={user?.name!}
        userId={user?.id}
        interviewId={id}
        type="interview"
        questions={interview.questions}
        feedbackId={feedback?.id}
      />
    </>
  );
};

export default InterviewDetails;