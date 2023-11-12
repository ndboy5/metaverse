import Image from "next/image";
import { Inter } from "next/font/google";
import About from "@/components/about-us/About";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import { fetchMarketItems } from "@/redux/slices/marketSlice";
import { connectWallet } from "@/redux/slices/connectionSlice";

const inter = Inter({ subsets: ["latin"] });

export default function Home() {
  const dispatch = useDispatch();
  const { account, isConnected, networkId } = useSelector(
    (state) => state.connection
  );
  const {
    marketItems,
    isLoading: itemsLoading,
    error,
  } = useSelector((state) => state.market);

  useEffect(() => {
    if (!account && !isConnected) {
      dispatch(connectWallet());
    }
  }, [account, isConnected, dispatch]);

  useEffect(() => {
    if (account) {
      dispatch(fetchMarketItems());
    }
  }, [account, dispatch]);

  // Handle errors
  useEffect(() => {
    if (error) {
      console.error("Error fetching market items:", error);
    }
  }, [error]);

  return (
    <div className="container mx-auto">
      <aside className="w-96 text-pink-400 text-6xl font-black font-['Termina Test']">
        Discover, Buy, Collect And Sell NFT Arts
      </aside>
      <main className="flex flex-col">
        <div className="w-96 h-48 flex-col justify-start items-start gap-6 inline-flex">
          <div className="self-stretch text-white text-xl font-medium font-['Neue Haas Grotesk Display Pro']">
            Dorem ipsum dolor sit amet, consectetur adipiscing elit. Etiam eu
            turpis molestie, dictum est a, mattis tellus. Sed dignissim, metus
            nec fringilla accumsan, risus sem sollicitudin lacus, ut interdum
            tellus elit sed risus.
          </div>
          <div className="w-80 h-16 px-6 bg-gradient-to-l from-pink-400 via-purple-400 to-teal-600 rounded-lg shadow justify-center items-center gap-2 inline-flex">
            <div className="Button text-white text-xl font-medium font-['Aeonik'] leading-tight tracking-tight">
              Explore All NFTs
            </div>
          </div>
        </div>
        <div className="flex flex-col">
          <About />
        </div>
      </main>
    </div>
  );
}
