import React from "react";
import styles from "./NewAssetForm.module.css";

const NewAssetForm = () => {
  return (
    <div className={`container mx-auto ${styles.container}`}>
      <h1 className={styles.title}>Create New NFT</h1>
      <form>
        <div className="mb-4">
          <label htmlFor="name" className={styles.label}>
            NFT Name
          </label>
          <input
            type="text"
            id="name"
            name="name"
            className={`w-full p-2 border ${styles.input}`}
            placeholder="Enter NFT Name"
          />
        </div>
        <div className="mb-4">
          <label htmlFor="description" className={styles.label}>
            Description
          </label>
          <textarea
            id="description"
            name="description"
            className={`w-full p-2 border ${styles.input}`}
            placeholder="Enter NFT Description"
          />
        </div>

        <div className="mb-4">
          <label htmlFor="file" className={styles.label}>
            Upload File (PNG, GIF, WEBP, MP4, or MP3, max 100MB)
          </label>
          <input
            type="file"
            id="file"
            name="file"
            className={`w-full ${styles.input}`}
            accept="image/*,video/*,audio/*"
          />
        </div>
        <div className="mb-4">
          <label htmlFor="price" className={styles.label}>
            Price (ETH)
          </label>
          <input
            type="number"
            id="price"
            name="price"
            className={`w-full p-2 border ${styles.input}`}
            placeholder="Set NFT Price"
          />
        </div>
        <div className="mb-4">
          <label htmlFor="instantBuy" className={styles.label}>
            Instant Buy
          </label>
          <input
            type="checkbox"
            id="instantBuy"
            name="instantBuy"
            className={`mr-2 ${styles.input}`}
          />
          <span className={styles.text}>Allow users to buy instantly</span>
        </div>
        <div className={`mt-6 ${styles.buttonContainer}`}>
          <button
            type="submit"
            className={`bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 ${styles.button}`}
          >
            Create NFT
          </button>
        </div>
      </form>
    </div>
  );
};

export default NewAssetForm;
