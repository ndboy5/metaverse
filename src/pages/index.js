import Image from "next/image";
import { Inter } from "next/font/google";
import About from "@/components/home/About";

const inter = Inter({ subsets: ["latin"] });

export default function Home() {
  return (
    <main
      className={`flex min-h-screen flex-col items-center justify-between p-24 ${inter.className}`}
    >
      <About />
      <article>
        <span>{`Welcome to the world's best marketplace`}</span>
      </article>
    </main>
  );
}
