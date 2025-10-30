import { generateText } from "ai";  // Ensure this is the correct import for your "ai" package version
import { google } from "@ai-sdk/google";

import { db } from "@/firebase/admin";
import { getRandomInterviewCover } from "@/lib/utils";

export async function POST(request: Request) {
  const { type, role, level, techstack, amount, userid } = await request.json();

  // ✅ ADDED: Basic validation for required fields
  if (!type || !role || !level || !techstack || !amount || !userid) {
    return Response.json({ success: false, error: "Missing required fields" }, { status: 400 });
  }

  try {
    const { text: questions } = await generateText({
      model: google("gemini-2.0-flash-001"),
      prompt: `Prepare questions for a job interview.
        The job role is ${role}.
        The job experience level is ${level}.
        The tech stack used in the job is: ${techstack}.
        The focus between behavioural and technical questions should lean towards: ${type}.
        The amount of questions required is: ${amount}.
        Please return ONLY the questions in valid JSON array format, without any additional text, explanations, or characters.
        Example format: ["Question 1", "Question 2", "Question 3"]
        
        Do not include any markdown, quotes around the array, or extra text. Just the JSON array.
    `,
    });

    // ✅ ADDED: Clean and validate the response before parsing
    let parsedQuestions;
    try {
      // Remove any leading/trailing whitespace or extra text
      const cleanedQuestions = questions.trim();
      parsedQuestions = JSON.parse(cleanedQuestions);
      
      // Ensure it's an array
      if (!Array.isArray(parsedQuestions)) {
        throw new Error("Response is not a valid array");
      }
    } catch (parseError) {
      console.error("JSON parse error:", parseError, "Raw response:", questions);
      return Response.json({ success: false, error: "Failed to parse questions from AI response" }, { status: 500 });
    }

    const interview = {
      role: role,
      type: type,
      level: level,
      techstack: techstack.split(",").map((tech: string) => tech.trim()),  // ✅ FIXED: Trim spaces
      questions: parsedQuestions,
      userId: userid,
      finalized: true,
      coverImage: getRandomInterviewCover(),
      createdAt: new Date().toISOString(),
    };

    // ✅ ADDED: Add the interview to Firestore
    const docRef = await db.collection("interviews").add(interview);

    return Response.json({ success: true, interviewId: docRef.id }, { status: 200 });
  } catch (error) {
    console.error("Error generating interview:", error);
    return Response.json({ success: false, error: "Internal server error" }, { status: 500 });
  }
}

export async function GET() {
  return Response.json({ success: true, data: "Thank you!" }, { status: 200 });
}



// import { generateText } from "ai";
// import { google } from "@ai-sdk/google";
// import { auth, db } from "@/firebase/admin";
// import { getRandomInterviewCover } from "@/lib/utils";

// export async function POST(request: Request) {
//   try {
//     const authHeader = request.headers.get("authorization");
//     const token = authHeader?.split("Bearer ")[1];
//     if (!token) {
//       return Response.json({ success: false, error: "Missing auth token" }, { status: 401 });
//     }

//     // ✅ Verify user token
//     const decoded = await auth.verifyIdToken(token);
//     const uid = decoded.uid;

//     // ✅ Extract fields from request body
//     const { type, role, level, techstack, amount } = await request.json();

//     if (!type || !role || !level || !techstack || !amount) {
//       return Response.json({ success: false, error: "Missing required fields" }, { status: 400 });
//     }

//     // ✅ Generate interview questions using Gemini
//     const { text: questions } = await generateText({
//       model: google("gemini-2.0-flash-001"),
//       prompt: `Prepare ${amount} interview questions for a ${role} (${level}) role focusing on ${type} topics.
//       The tech stack includes: ${techstack}.
//       Return only a valid JSON array like ["Question 1", "Question 2", ...].`,
//     });

//     // ✅ Parse and clean AI output
//     let parsedQuestions: string[] = [];
//     try {
//       const cleaned = questions.trim();
//       parsedQuestions = JSON.parse(cleaned);
//       if (!Array.isArray(parsedQuestions)) throw new Error("Response is not an array");
//     } catch (err) {
//       console.error("AI response parse error:", err, questions);
//       return Response.json({ success: false, error: "Invalid AI response format" }, { status: 500 });
//     }

//     // ✅ Prepare interview object
//     const interview = {
//       role,
//       type,
//       level,
//       techstack: techstack.split(",").map((t: string) => t.trim()),
//       questions: parsedQuestions,
//       finalized: true,
//       coverImage: getRandomInterviewCover(),
//       createdAt: new Date().toISOString(),
//     };

//     // ✅ Save under users/{uid}/interviews/{autoId}
//     const docRef = await db.collection("users").doc(uid).collection("interviews").add(interview);

//     return Response.json({ success: true, interviewId: docRef.id });
//   } catch (error) {
//     console.error("Error in POST /generate:", error);
//     return Response.json({ success: false, error: error.message }, { status: 500 });
//   }
// }

// export async function GET(request: Request) {
//   try {
//     const authHeader = request.headers.get("authorization");
//     const token = authHeader?.split("Bearer ")[1];
//     if (!token) {
//       return Response.json({ success: false, error: "Missing auth token" }, { status: 401 });
//     }

//     // ✅ Verify user
//     const decoded = await auth.verifyIdToken(token);
//     const uid = decoded.uid;

//     // ✅ Fetch interviews for that user
//     const snapshot = await db.collection("users").doc(uid).collection("interviews").get();
//     const interviews = snapshot.docs.map((doc) => ({
//       id: doc.id,
//       ...doc.data(),
//     }));

//     return Response.json({ success: true, interviews });
//   } catch (error) {
//     console.error("Error in GET /generate:", error);
//     return Response.json({ success: false, error: error.message }, { status: 500 });
//   }
// }
