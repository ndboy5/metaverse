import React, { useState, useCallback } from "react";
import { useDropzone } from "react-dropzone";
import { ToastContainer, toast } from "react-toastify";
import Image from "next/image";
import Style from "./DropZone.module.css";
import { useDispatch, useSelector } from "react-redux";
import { ethers } from "ethers";
import { connectWallet } from "@/redux/slices/connectionSlice";
import { create } from "ipfs-http-client";
import { createAsset } from "@/redux/slices/marketSlice";

const DropZone = ({ title, heading, subHeading }) => {
  const dispatch = useDispatch();
  const [price, setPrice] = useState(5);
  const { account, networkId } = useSelector((state) => state.connection);
  const endPointUrl = process.env.NEXT_PUBLIC_INFURA_DEDICATED_ENDPOINT;

  const projectId = process.env.NEXT_PUBLIC_INFURA_PROJECT_ID;
  const projectSecret = process.env.NEXT_PUBLIC_INFURA_PRIVATE_KEY; //TODO: Optionally use API route in blockchain.js
  const auth =
    "Basic " + Buffer.from(projectId + ":" + projectSecret).toString("base64");

  const onDrop = useCallback(
    async (acceptedFiles) => {
      if (!account) {
        dispatch(connectWallet());
        return;
      }

      const file = acceptedFiles[0];
      if (file && price) {
        try {
          // Upload to IPFS
          const ipfs = create({
            host: "ipfs.infura.io",
            port: 5001,
            protocol: "https",
            headers: {
              authorization: auth,
            },
          });
          const added = await ipfs.add(file);
          const url = endPointUrl + `/ipfs/${added.path}`;

          // Create NFT on blockchain
          const priceInEther = ethers.utils.parseUnits(
            price.toString(),
            "ether"
          );
          const transaction = await dispatch(
            createAsset({ url, priceInEther, account })
          );
          console.log(transaction);
          await transaction.wait();

          toast("NFT created successfully!");
        } catch (error) {
          console.error("Error uploading file:", error);
          toast.error("Error uploading file.");
        }
      } else {
        toast("Please complete required details on form");
      }
    },
    [dispatch, account, price]
  );

  const { getRootProps, getInputProps } = useDropzone({
    onDrop,
    accept: "image/*",
    maxSize: 5000000,
  });

  return (
    <div className={Style.DropZone}>
      <div className={Style.DropZone_box} {...getRootProps()}>
        <input {...getInputProps()} />
        <div className={Style.DropZone_box_input}>
          <p>{title}</p>
          <div className={Style.DropZone_box_input_img}>
            <Image
              src={"/img/upload.png"}
              alt="upload"
              width={100}
              height={100}
              objectFit="contain"
            />
          </div>
          <p>{heading}</p>
          <p>{subHeading}</p>
        </div>
      </div>
      <ToastContainer />
    </div>
  );
};

export default DropZone;
