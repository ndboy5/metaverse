// pages/api/blockchain.js
import { ethers } from 'ethers';
import NFTMarketABI from '../../../artifacts/contracts/NFTMarket.sol/NFTMarket.json';
import NFTABI from '../../../artifacts/contracts/NFT.sol/NFT.json';

const NFTMarketContractAddress = process.env.NEXT_PUBLIC_MARKETPLACE_ADDR;
const NFTContractAddress = process.env.NEXT_PUBLIC_NFT_ADDR;

export default async function handler(req, res) {
  try {
    const provider = new ethers.providers.JsonRpcProvider(process.env.NEXT_PUBLIC_SEPOLIA_RPC_URL);
    const signer = provider.getSigner();

    const NFTMarketContract = new ethers.Contract(
      NFTMarketContractAddress,
      NFTMarketABI,
      signer
    );
    const NFTContract = new ethers.Contract(
      NFTContractAddress,
      NFTABI,
      signer
    );

    const { action, payload } = req.body;

    switch (action) {
        case 'fetchMarketItems':
            const items = await NFTMarketContract.fetchMarketItems();
            const serializedItems = items.map((item) => ({
              status: item.status,
              nftContract: item.nftContract,
              owner: item.owner,
              creator: item.creator,
              token: item.token.toNumber(),
              price: ethers.utils.formatEther(item.price),
            }));
            res.status(200).json({ success: true, data: serializedItems });
            break;
      default:
        res.status(400).json({ success: false, message: 'Invalid action' });
        return;
    }

    res.status(200).json({ success: true, data: /* your data here */ });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
}
