// pages/api/blockchain.js
import { ethers } from "ethers";
import NFTMarketABI from "../../../artifacts/contracts/NFTMarket.sol/NFTMarket.json";
import NFTABI from "../../../artifacts/contracts/NFT.sol/NFT.json";

export default async function handler(req, res) {
  const provider = new ethers.providers.JsonRpcProvider(
    process.env.NEXT_PUBLIC_SEPOLIA_RPC_URL
  );
  const wallet = new ethers.Wallet(process.env.SEPOLIA_PRIVATE_KEY, provider);

  const NFTMarketContract = new ethers.Contract(
    process.env.NEXT_PUBLIC_MARKETPLACE_ADDR,
    NFTMarketABI,
    wallet
  );
  const NFTContract = new ethers.Contract(
    process.env.NEXT_PUBLIC_NFT_ADDR,
    NFTABI,
    wallet
  );

  res.status(200).json({ success: true });
}
