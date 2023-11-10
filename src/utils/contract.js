// utils/contract.js
import { ethers } from "ethers";
import NFTMarket from "../../artifacts/contracts/NFTMarket.sol/NFTMarket.json";
import NFT from "../../artifacts/contracts/NFT.sol/NFT.json";
import { connectToBlockchain } from "./connectToBlockchain";

const nftMarketAddress = process.env.NEXT_PUBLIC_MARKETPLACE_ADDR;
const nftAddress = process.env.NEXT_PUBLIC_NFT_ADDR;

// export async function fetchItems() {
//   try {
//     const signer = connectToBlockchain();
//     const nftMarketContract = new ethers.Contract(
//       nftMarketAddress,
//       NFTMarket.abi,
//       signer
//     );
//     const rawItems = await nftMarketContract.fetchMarketItems();
//     // Serialize the items from the blockchain
//     const items = rawItems.map((item) => ({
//       status: item.status,
//       nftContract: item.nftContract,
//       owner: item.owner,
//       creator: item.creator,
//       token: item.token.toString(), // Converts BigNumber to string
//       price: ethers.utils.formatUnits(item.price, "ether"), // Converts BigNumber to string and format as ether
//     }));
//     return items;
//   } catch (error) {
//     console.error("Error fetching items:", error);
//     throw error;
//   }
// }

export async function createItem(url, price) {
  try {
    const signer = connectToBlockchain();
    const nftContract = new ethers.Contract(nftAddress, NFT.abi, signer);
    const nftMarketContract = new ethers.Contract(
      nftMarketAddress,
      NFTMarket.abi,
      signer
    );
    const transaction = await nftMarketContract.sellItem(
      url,
      etherToWei(price),
      nftAddress, //nftAddress for ERC721
      { from: signer.address, value: etherToWei("0.0001") }
    );

    await transaction.wait();
  } catch (error) {
    console.error("Error creating item:", error);
    throw error;
  }
}

export const weiToEther = (num) => {
  return ethers.utils.formatEther(num);
};

export const etherToWei = (n) => {
  const weiBigNumber = ethers.utils.parseEther(n.toString());
  const wei = weiBigNumber.toString();
  return wei;
};
