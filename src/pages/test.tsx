import Image from "next/image";
import { Inter } from "next/font/google";
import { signIn, signOut, useSession } from "next-auth/react";
import { useEffect, useState } from "react";

const inter = Inter({ subsets: ["latin"] });
const dataobj = {
  name: "Karthik",
  age: 20,
};

export default function Home() {
  const [start, setStart] = useState<string>();
  const [end, setEnd] = useState();
  const [description, setdescription] = useState();
  const [eventType, seteventType] = useState();

  return (
    <main className="flex justify-center align-middle m-6">
      <div className="flex flex-col gap-10">
        <p>
          <input
          style={{color:"black"}}
            onChange={function (val) {
              setStart(val.target.value);
            }}
          />
        </p>
        <p>{start}</p>
      </div>
    </main>
  );
}
