/* eslint-disable @typescript-eslint/no-explicit-any */
// app/api/vapi/user/route.ts
import { auth, db } from "@/firebase/admin";
import { NextResponse } from "next/server";

export async function GET(request: Request) {
  try {
    const authHeader = request.headers.get("authorization");
    if (!authHeader) {
      return NextResponse.json(
        { success: false, message: "Missing Authorization header" },
        { status: 401 }
      );
    }

    const token = authHeader.split(" ")[1];
    const decoded = await auth.verifyIdToken(token);

    const userId = decoded.uid;

    // Fetch user data from Firestore
    const userDoc = await db.collection("users").doc(userId).get();

    if (!userDoc.exists) {
      return NextResponse.json(
        { success: true, user: null, message: "No user found" },
        { status: 404 }
      );
    }

    const userData = userDoc.data();

    return NextResponse.json({
      success: true,
      user: {
        id: userId,
        name: userData?.name || userData?.displayName || "Unknown User",
        email: userData?.email,
        profileURL: userData?.profileURL || null,
      },
    });
  } catch (error: any) {
    console.error("Error fetching user:", error);
    return NextResponse.json(
      { success: false, error: error.message },
      { status: 500 }
    );
  }
}
