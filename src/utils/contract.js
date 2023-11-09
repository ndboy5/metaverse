// utils/contract.js
import { ethers } from "ethers";
import NFTMarket from "../../artifacts/contracts/NFTMarket.sol/NFTMarket.json";
import NFT from "../../artifacts/contracts/NFT.sol/NFT.json";
import { connectToBlockchain } from "./connectToBlockchain";

const nftMarketAddress = process.env.NEXT_PUBLIC_MARKETPLACE_ADDR;
const nftAddress = process.env.NEXT_PUBLIC_NFT_ADDR;

export async function fetchItems() {
  try {
    const signer = connectToBlockchain();
    const nftMarketContract = new ethers.Contract(
      nftMarketAddress,
      NFTMarket.abi,
      signer
    );
    const items = await nftMarketContract.fetchMarketItems();
    return items;
  } catch (error) {
    console.error("Error fetching items:", error);
    throw error;
  }
}

export async function createItem(url, price) {
  try {
    const signer = connectToBlockchain();
    const nftContract = new ethers.Contract(nftAddress, NFT.abi, signer);
    const transaction = await nftContract.createItem(url, price);
    await transaction.wait();
  } catch (error) {
    console.error("Error creating item:", error);
    throw error;
  }
}
