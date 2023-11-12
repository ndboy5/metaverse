import React, { useState, useCallback } from "react";
import { useDropzone } from "react-dropzone";
import { ToastContainer, toast } from "react-toastify";
import Image from "next/image";
import Style from "./DropZone.module.css";
import { useDispatch, useSelector } from "react-redux";
import { ethers } from "ethers";
import IPFS from "ipfs-http-client";
import { connectWallet } from "@/redux/slices/connectionSlice";
import { createAsset } from "@/redux/slices/marketSlice";

const DropZone = ({ title, heading, subHeading }) => {
  const dispatch = useDispatch();
  const [price, setPrice] = useState(5);
  const { account, signer } = useSelector((state) => state.connection);

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
          const ipfs = IPFS({
            host: "ipfs.infura.io",
            port: 5001,
            protocol: "https",
          });
          const added = await ipfs.add(file);
          const url = `https://ipfs.infura.io/ipfs/${added.path}`;

          // Create NFT on blockchain
          const priceInEther = ethers.utils.parseUnits(
            price.toString(),
            "ether"
          );
          const transaction = await createAsset({ url, priceInEther, signer });
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
    [dispatch, account, price, signer]
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
