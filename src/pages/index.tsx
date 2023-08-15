import { Inter } from "next/font/google";
import { useRouter } from "next/navigation";
import { parseCookies } from "nookies";
import { useEffect } from "react";
import Landing from "./_landing";

const inter = Inter({ subsets: ["latin"] });

export default function Home() {
  const { push } = useRouter();

  useEffect(() => {
    const { "nextauth.token": token } = parseCookies();

    if (token) {
      push("/ads");
    }
  }, []);

  return (
    <>
      <Landing />
    </>
  );
}
