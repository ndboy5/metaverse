import React, { useState, useCallback } from "react";
import { useDropzone } from "react-dropzone";
import { ToastContainer, toast } from "react-toastify";
import Image from "next/image";
import Style from "./DropZone.module.css";
import { createAsset } from "@/redux/slices/marketSlice";
import { useDispatch } from "react-redux";

const DropZone = ({ title, heading, subHeading }) => {
  const dispatch = useDispatch();
  const [price, setPrice] = useState(5);

  const onDrop = useCallback(
    async (acceptedFiles) => {
      const file = acceptedFiles[0];
      if (file && price) {
        dispatch(createAsset({ file, price }));
      } else {
        toast("Please complete reqquired details on form");
        console.error("error occured");
      }
    },
    [dispatch, price]
  );

  const { getRootProps, getInputProps } = useDropzone({
    onDrop,
    accept: "image/*", //TODO: Test other file types
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
              className={Style.DropZone_box_input_img_img}
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
