import NewAssetForm from "@/components/register-asset/NewAssetForm";
import React, { useEffect, useState, useContext } from "react";
import Style from "../styles/register-asset.module.css";
import AssetUpload from "@/components/register-asset/AssetUpload";

const RegisterAsset = () => {
  return (
    <div className={Style.uploadNFT}>
      <div>
        <div className={Style.uploadNFT_box_heading}>
          <h1>Create New NFT</h1>
        </div>
        <div className={Style.uploadNFT_box_form}>
          <NewAssetForm />;
        </div>
      </div>
    </div>
  );
};

export default RegisterAsset;
