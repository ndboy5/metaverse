import React from "react";
import styles from "./About.module.css";
import Image from "next/image";

function About() {
  return (
    <div className="flex-auto">
      {/* <div className="flex-row"> */}
      <section className="text-center p-8">
        <h2 className="text-3xl text-green-200 font-black">Who We Are</h2>
        <article className="text-white text-sm mt-4">
          [Insert a brief and engaging description about the NFT marketplace,
          its vision, mission, and unique selling points.]
        </article>
      </section>

      <div className="flex flex-wrap justify-center gap-4 mt-8">
        <div className="card">
          <Image
            src="/img/upload.jpg"
            width="50"
            height="50"
            alt="NFT Name"
            className="w-full"
          />
          <div className="card__details">
            <h3 className="name">NFT Name</h3>
            <p className="tag">Price: [NFT Price]</p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default About;
