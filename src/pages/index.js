import Image from "next/image";
import { Inter } from "next/font/google";
import About from "@/components/home/About";
import { useDispatch } from "react-redux";
import { useEffect } from "react";
import { createItemAsync } from "@/redux/slices/marketSlice";

const inter = Inter({ subsets: ["latin"] });

export default function Home() {
  const dispatch = useDispatch();

  useEffect(() => {
    const items = dispatch(
      createItemAsync({
        url: "https://my-metaverse-development-prj.infura-ipfs.io/ipfs/QmWYFKGMbPWLhwtSiZzu7p4zhB9E2q3NzfBCFUmweovivT",
        price: 0.01,
      })
    );
  }, [dispatch]);

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
