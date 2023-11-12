import { ethers } from "ethers";
import { IncomingForm } from "formidable";

import { create } from "ipfs-http-client";
import fs from "fs";

import NFTMarketABI from "../../../artifacts/contracts/NFTMarket.sol/NFTMarket.json";
import NFTABI from "../../../artifacts/contracts/NFT.sol/NFT.json";

const NFTMarketContractAddress = process.env.NEXT_PUBLIC_MARKETPLACE_ADDR;
const NFTContractAddress = process.env.NEXT_PUBLIC_NFT_ADDR;
const infuraProjectId = process.env.NEXT_PUBLIC_INFURA_PROJECT_ID;
const infuraProjectSecret = process.env.INFURA_PRIVATE_KEY;
const infuraDedicatedEndpoint = process.env.INFURA_DEDICATED_ENDPOINT;

const auth =
  "Basic " +
  Buffer.from(`${infuraProjectId}:${infuraProjectSecret}`).toString("base64");
const client = create({
  host: "ipfs.infura.io",
  port: 5001,
  protocol: "https",
  headers: {
    authorization: auth,
  },
});

export const config = {
  api: {
    bodyParser: false,
  },
};

export default async function handler(req, res) {
  const form = new IncomingForm();

  form.parse(req, async (err, fields, files) => {
    if (err) {
      res.status(500).json({ success: false, error: err.message });
      return;
    }

    try {
      const provider = new ethers.providers.JsonRpcProvider(
        process.env.NEXT_PUBLIC_SEPOLIA_RPC_URL
      );
      const signer = new ethers.Wallet(
        process.env.SEPOLIA_PRIVATE_KEY,
        provider
      );
      const NFTMarketContract = new ethers.Contract(
        NFTMarketContractAddress,
        NFTMarketABI.abi,
        signer
      );

      const action = fields["action"][0];
      switch (action) {
        case "fetchMarketItems":
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

        case "createAsset":
          const file = fs.readFileSync(files["file"][0].filepath);
          const ipfsResponse = await client.add(file);
          const url = `${infuraDedicatedEndpoint}/ipfs/${ipfsResponse.path}`;
          console.log("URL", url);
          const price = ethers.utils.parseUnits(
            fields.price.toString(),
            "ether"
          );
          // to add other attributes and save on blockchain
          const mintingCost = ethers.utils.parseUnits("0.0008", "ether");
          const transaction = await NFTMarketContract.sellItem(
            url,
            price,
            NFTContractAddress,
            { value: mintingCost }
          );
          await transaction.wait();
          res.status(200).json({ success: true, url: url });
          break;

        default:
          res.status(400).json({ success: false, message: "Invalid action" });
      }
    } catch (error) {
      console.error("Error in API Route:", error);
      res.status(500).json({ success: false, error: error.message });
    }
  });
}
