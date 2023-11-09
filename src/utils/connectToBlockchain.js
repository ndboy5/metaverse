// utils/connectToBlockchain.js
import { ethers } from "ethers";

export function connectToBlockchain() {
  const provider = new ethers.providers.JsonRpcProvider(
    "https://sepolia.infura.io/v3/" + process.env.INFURA_PROJECT_ID
  );
  const wallet = new ethers.Wallet(process.env.PRIVATE_KEY);
  const signer = wallet.connect(provider);
  return signer;
}
