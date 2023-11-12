import React, { useState } from "react";
import { MdOutlineHttp, MdOutlineAttachFile } from "react-icons/md";
import { FaPercent } from "react-icons/fa";
import { AiTwotonePropertySafety } from "react-icons/ai";
import { useRouter } from "next/router";
import style from "./AssetUpload.module.css";
import Button from "../button/Button";
import DropZone from "../drop-zone/DropZone";

const AssetUpload = ({ uploadToIPFS, createNFT }) => {
  const [price, setPrice] = useState("");
  const [active, setActive] = useState(0);
  const [name, setName] = useState("");
  const [website, setWebsite] = useState("");
  const [description, setDescription] = useState("");
  const [royalties, setRoyalties] = useState("");
  const [fileSize, setFileSize] = useState("");
  const [category, setCategory] = useState(0);
  const [properties, setProperties] = useState("");
  const [image, setImage] = useState(null);

  const router = useRouter();

  return (
    <div className={`container mx-auto ${style.container}`}>
      <h1 className={style.title}>Create New NFT</h1>
      <div className={style.upload}>
        <DropZone
          title="JPG, PNG, WEBM , MAX 100MB"
          heading="Drag & drop file"
          subHeading="or Browse media on your device"
          name={name}
          website={website}
          description={description}
          royalties={royalties}
          fileSize={fileSize}
          category={category}
          properties={properties}
          setImage={setImage}
          uploadToIPFS={uploadToIPFS}
        />

        <div className={style.upload_box}>
          <div className={style.Form_box_input}>
            <label htmlFor="nft">Item Name</label>
            <input
              type="text"
              placeholder="shoaib bhai"
              className={style.Form_box_input_userName}
              onChange={(e) => setName(e.target.value)}
            />
          </div>

          <div className={style.Form_box_input}>
            <label htmlFor="description">Description</label>
            <textarea
              name=""
              id=""
              cols="30"
              rows="6"
              placeholder="something about yourself in few words"
              onChange={(e) => setDescription(e.target.value)}
            ></textarea>
            <p>Displayed on the asset detail page underneath its image.</p>
          </div>

          <div className={style.Form_box_input_social}>
            <div className={style.Form_box_input}>
              <label htmlFor="Royalties">Royalties</label>
              <div className={style.Form_box_input_box}>
                <div className={style.Form_box_input_box_icon}>
                  <FaPercent />
                </div>
                <input
                  type="text"
                  placeholder="20%"
                  onChange={(e) => setRoyalties(e.target.value)}
                />
              </div>
            </div>
            <div className={style.Form_box_input}>
              <label htmlFor="size">Size</label>
              <div className={style.Form_box_input_box}>
                <div className={style.Form_box_input_box_icon}>
                  <MdOutlineAttachFile />
                </div>
                <input
                  type="text"
                  placeholder="165MB"
                  onChange={(e) => setFileSize(e.target.value)}
                />
              </div>
            </div>
            <div className={style.Form_box_input}>
              <label htmlFor="Propertie">Propertie</label>
              <div className={style.Form_box_input_box}>
                <div className={style.Form_box_input_box_icon}>
                  <AiTwotonePropertySafety />
                </div>
                <input
                  type="text"
                  placeholder="Propertie"
                  onChange={(e) => setProperties(e.target.value)}
                />
              </div>
            </div>

            <div className={style.Form_box_input}>
              <label htmlFor="Price">Price</label>
              <div className={style.Form_box_input_box}>
                <div className={style.Form_box_input_box_icon}>
                  <AiTwotonePropertySafety />
                </div>
                <input
                  type="text"
                  placeholder="Price"
                  onChange={(e) => setPrice(e.target.value)}
                />
              </div>
            </div>
          </div>

          <div className={style.upload_box_btn}>
            <Button
              btnName="Upload"
              handleClick={async () =>
                createNFT(
                  name,
                  price,
                  image,
                  description,
                  router
                  // website,
                  // royalties,
                  // fileSize,
                  // category,
                  // properties
                )
              }
              classstyle={style.upload_box_btn_style}
            />
            <Button
              btnName="Preview"
              handleClick={() => {}}
              classstyle={style.upload_box_btn_style}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default AssetUpload;
