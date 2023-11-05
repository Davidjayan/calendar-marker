import Image from "next/image";
import { Inter } from "next/font/google";
import { signIn, signOut, useSession } from "next-auth/react";
import { useEffect, useState } from "react";

const inter = Inter({ subsets: ["latin"] });

export default function Home() {
  const session = useSession();
  const [loggedIn, setLoggedIn] = useState(false);

  useEffect(() => {
    console.log(session);

    if (session.status == "authenticated") {
      if (new Date(session.data.expires).getTime() < new Date().getTime()) {
        setLoggedIn(true);
      } else {
        // signOut();
      }
    }
  }, [session.status]);

  if (session.status === "loading") {
    return <div>loading.......</div>;
  }

  return (
    <main className="flex justify-center align-middle m-6">
      <div className="flex flex-col gap-10">
        {session.status==='unauthenticated' ? (
          <button
            onClick={async () => await signIn()}
            className={`border p-5 rounded-2xl`}
          >
            Sign in
          </button>
        ) : (
          <button
            onClick={() => signOut()}
            className={`border p-5 rounded-2xl`}
          >
            Sign out
          </button>
        )}
      </div>
    </main>
  );
}
