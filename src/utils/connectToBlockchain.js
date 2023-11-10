// utils/connectToBlockchain.js
import { ethers } from "ethers";

export function connectToBlockchain() {
  const provider = new ethers.providers.JsonRpcProvider(
    "https://eth-sepolia.g.alchemy.com/v2/3HOVYOOv0AjBESZZq17WkBB9RBmcizMU"
    // "https://eth-sepolia.g.alchemy.com/v2/" +
    // process.env.NEXT_PUBLIC_INFURA_PROJECT_ID
    // "https://sepolia.infura.io/v3/" + process.env.NEXT_PUBLIC_INFURA_PROJECT_ID //TODO: Move this base url to .env file
  );
  const wallet = new ethers.Wallet(process.env.NEXT_PUBLIC_PRIVATE_KEY);
  const signer = wallet.connect(provider);
  return signer;
}
