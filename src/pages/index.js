import Image from "next/image";
import { Inter } from "next/font/google";
import About from "@/components/home/About";
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
    <main
      className={`flex min-h-screen flex-col items-center justify-between p-24 ${inter.className}`}
    >
      <About />
      <article>
        <span>{`Welcome to the world's best marketplace`}</span>
        {/* Debug: Print the fetched market items */}
        <div>
          {marketItems &&
            marketItems.map((item, index) => (
              <p key={index}>
                {item.title /* Adjust according to your data structure */}
              </p>
            ))}
        </div>
      </article>
    </main>
  );
}
