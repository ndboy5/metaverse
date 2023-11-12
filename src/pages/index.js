import Image from "next/image";
import { Inter } from "next/font/google";
import About from "@/components/home/About";
import { useDispatch } from "react-redux";
import { useEffect } from "react";
import { fetchMarketItems } from "@/redux/slices/marketSlice";

const inter = Inter({ subsets: ["latin"] });

export default function Home() {
  const dispatch = useDispatch();

  useEffect(() => {
    const fetchItems = async () => {
      try {
        const actionResult = await dispatch(fetchMarketItems());
        const items = actionResult.payload;
        console.log("Fetched items:", items);
      } catch (error) {
        console.error("Error fetching market items:", error);
      }
    };

    // fetchItems();
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
