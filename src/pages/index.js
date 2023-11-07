import Image from "next/image";
import { Inter } from "next/font/google";

const inter = Inter({ subsets: ["latin"] });

export default function Home() {
  // console.log(process.env.ADDRESS);
  return (
    <main
      className={`flex min-h-screen flex-col items-center justify-between p-24 ${inter.className}`}
    >
      <article>
        <span>Welcome to the world's best marketplace</span>
      </article>
    </main>
  );
}
