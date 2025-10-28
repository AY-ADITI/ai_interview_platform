// import Agent from "@/components/Agent";
// import { getCurrentUser } from "@/lib/actions/auth.action";

// const Page = async () => {
//   const user = await getCurrentUser();

//   return (
//     <>
//       <h3>Interview generation</h3>

//       <Agent
//         userName={user?.name!}
//         userId={user?.id}
//         profileImage={user?.profileURL}
//         type="generate"
//       />
//     </>
//   );
// };

// export default Page;

// import Agent from "@/components/Agent";
// import { getCurrentUser } from "@/lib/actions/auth.action";
// import { redirect } from "next/navigation";

// const Page = async () => {
//   const user = await getCurrentUser();

//   // Redirect to sign-in page if user is not logged in
//   if (!user?.id || !user?.name) {
//     redirect("/sign-in");
//   }

//   return (
//     <>
//       <h3>Interview Generation</h3>

//       <Agent
//         userName={user.name}
//         userId={user.id}
//         profileImage={user.avatar ?? "/default-avatar.png"} // use existing property or fallback
//         type="generate"
//       />
//     </>
//   );
// };

// export default Page;

   import Agent from "@/components/Agent";
   import { getCurrentUser } from "@/lib/actions/auth.action";

   const Page = async () => {
     const user = await getCurrentUser();

     return (
       <>
         <h3>Interview generation</h3>

         <Agent
           userName={user?.name || "User"}  // ✅ FIXED: Safe fallback for name
           userId={user?.id || ""}          // ✅ FIXED: Safe fallback for id (was commented out)
          //   profileImage={user?.avatar}  // ✅ This should now work if AgentProps is updated
            profileImage={user?.avatar || user?.photoURL || "/user-avatar.png"}
          // profileImage={user?.photoURL || "/user-avatar.png"}
           type="generate"
         />
       </>
     );
   };

   export default Page;
   