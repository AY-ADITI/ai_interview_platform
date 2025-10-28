// /* eslint-disable @typescript-eslint/no-explicit-any */
// import Link from "next/link";
// import Image from "next/image";
// import { redirect } from "next/navigation";
// import { Button } from "@/components/ui/button";
// import InterviewCard from "@/components/InterviewCard";
// import { getCurrentUser } from "@/lib/actions/auth.action";
// import {
//   getInterviewsByUserId,
//   getLatestInterviews,
// } from "@/lib/actions/general.action";

// export default async function Home() {
//   const user = await getCurrentUser();

//   // ✅ Redirect if not logged in
//   if (!user?.id) {
//     redirect("/sign-in");
//   }

//   // ✅ Always fallback to an array — handles undefined/null safely
//   const [userInterviewsRaw, allInterviewsRaw] = await Promise.all([
//     getInterviewsByUserId(user.id).catch(() => []),
//     getLatestInterviews({ userId: user.id }).catch(() => []),
//   ]);

//   // ✅ Ensure both are arrays
//   const userInterviews: any[] = Array.isArray(userInterviewsRaw)
//     ? userInterviewsRaw
//     : [];
//   const allInterviews: any[] = Array.isArray(allInterviewsRaw)
//     ? allInterviewsRaw
//     : [];

//   const hasPastInterviews = userInterviews.length > 0;
//   const hasUpcomingInterviews = allInterviews.length > 0;

//   return (
//     <>
//       {/* ===== Hero Section ===== */}
//       <section className="card-cta">
//         <div className="flex flex-col gap-6 max-w-lg">
//           <h2>Get Interview-Ready with AI-Powered Practice & Feedback</h2>
//           <p className="text-lg">
//             Practice real interview questions & get instant feedback
//           </p>

//           <Button asChild className="btn-primary max-sm:w-full">
//             <Link href="/interview">Start an Interview</Link>
//           </Button>
//         </div>

//         <Image
//           src="/robot.png"
//           alt="robo-dude"
//           width={400}
//           height={400}
//           style={{ width: "auto", height: "auto" }}
//           className="max-sm:hidden"
//         />
//       </section>

//       {/* ===== Past Interviews ===== */}
//       <section className="flex flex-col gap-6 mt-8">
//         <h2>Your Interviews</h2>

//         <div className="interviews-section">
//           {hasPastInterviews ? (
//             userInterviews.map((interview) => (
//               <InterviewCard
//                 key={interview.id}
//                 userId={user.id}
//                 interviewId={interview.id}
//                 role={interview.role}
//                 type={interview.type}
//                 techstack={interview.techstack}
//                 createdAt={interview.createdAt}
//               />
//             ))
//           ) : (
//             <p>You haven’t taken any interviews yet</p>
//           )}
//         </div>
//       </section>

//       {/* ===== Available Interviews ===== */}
//       <section className="flex flex-col gap-6 mt-8">
//         <h2>Take Interviews</h2>

//         <div className="interviews-section">
//           {hasUpcomingInterviews ? (
//             allInterviews.map((interview) => (
//               <InterviewCard
//                 key={interview.id}
//                 userId={user.id}
//                 interviewId={interview.id}
//                 role={interview.role}
//                 type={interview.type}
//                 techstack={interview.techstack}
//                 createdAt={interview.createdAt}
//               />
//             ))
//           ) : (
//             <p>There are no interviews available</p>
//           )}
//         </div>
//       </section>
//     </>
//   );
// }


/* eslint-disable @typescript-eslint/no-explicit-any */
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
import { dummyInterviews } from "@/constants"; // ✅ NEW: Import dummy data for fallback

export default async function Home() {
  const user = await getCurrentUser();

  // ✅ Redirect if not logged in
  if (!user?.id) {
    redirect("/sign-in");
  }

  // ✅ Always fallback to an array — handles undefined/null safely
  const [userInterviewsRaw, allInterviewsRaw] = await Promise.all([
    getInterviewsByUserId(user.id).catch(() => []),
    getLatestInterviews({ userId: user.id }).catch(() => []),
  ]);

  // ✅ Ensure both are arrays
  const userInterviews: any[] = Array.isArray(userInterviewsRaw)
    ? userInterviewsRaw
    : [];
  const allInterviews: any[] = Array.isArray(allInterviewsRaw)
    ? allInterviewsRaw
    : [];

  // ✅ NEW: Fallback to dummy data if no real data (for testing/demo)
  // - For user interviews: Use dummies where userId matches a test user (adjust "test-user" if needed)
  // - For all interviews: Use dummies not by current user and finalized
  const finalUserInterviews = userInterviews.length > 0 ? userInterviews : dummyInterviews.filter(interview => interview.userId === "test-user");
  const finalAllInterviews = allInterviews.length > 0 ? allInterviews : dummyInterviews.filter(interview => interview.userId !== user.id && interview.finalized);

  // ✅ UPDATED: Use final arrays for checks
  const hasPastInterviews = finalUserInterviews.length > 0;
  const hasUpcomingInterviews = finalAllInterviews.length > 0;

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
          alt="robo-dude"
          width={400}
          height={400}
          style={{ width: "auto", height: "auto" }}
          className="max-sm:hidden"
        />
      </section>

      {/* ===== Past Interviews ===== */}
      <section className="flex flex-col gap-6 mt-8">
        <h2>Your Interviews</h2>

        <div className="interviews-section">
          {hasPastInterviews ? (
            // ✅ UPDATED: Use finalUserInterviews instead of userInterviews
            finalUserInterviews.map((interview) => (
              <InterviewCard
                key={interview.id}
                userId={user.id}
                interviewId={interview.id}
                role={interview.role}
                type={interview.type}
                techstack={interview.techstack}
                createdAt={interview.createdAt}
              />
            ))
          ) : (
            <p>You haven’t taken any interviews yet</p>
          )}
        </div>
      </section>

      {/* ===== Available Interviews ===== */}
      <section className="flex flex-col gap-6 mt-8">
        <h2>Take Interviews</h2>

        <div className="interviews-section">
          {hasUpcomingInterviews ? (
            // ✅ UPDATED: Use finalAllInterviews instead of allInterviews
            finalAllInterviews.map((interview) => (
              <InterviewCard
                key={interview.id}
                userId={user.id}
                interviewId={interview.id}
                role={interview.role}
                type={interview.type}
                techstack={interview.techstack}
                createdAt={interview.createdAt}
              />
            ))
          ) : (
            <p>There are no interviews available</p>
          )}
        </div>
      </section>
    </>
  );
}
