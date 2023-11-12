import React, { useEffect, useState, useContext } from "react";
import Style from "../styles/register-asset.module.css";
import AssetUpload from "@/components/register-asset/AssetUpload";

const RegisterAsset = () => {
  return (
    <div className={Style.uploadNFT}>
      <div>
        <div className={Style.uploadNFT_box_heading}></div>
        <div className={Style.uploadNFT_box_form}>
          <AssetUpload />;
        </div>
      </div>
    </div>
  );
};

export default RegisterAsset;
