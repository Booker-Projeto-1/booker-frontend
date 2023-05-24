import { useEffect } from 'react';
import { Inter } from "next/font/google";
import Link from "next/link";
import { useRouter } from 'next/navigation';
import { parseCookies } from "nookies";

const inter = Inter({ subsets: ["latin"] });

export default function Home() {
  const { push } = useRouter();

  useEffect(() => {
    const { "nextauth.token": token } = parseCookies();
    
    if (token) {
      push('/ads');
    } else {
      push('/login');
    }
  }, []);
  
  return (
    <>
      <h1>Home</h1>
      <Link href="/login">LOGIN</Link>
    </>
  );
}
