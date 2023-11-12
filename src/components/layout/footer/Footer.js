import styles from "./Footer.module.css";

function Footer() {
  return (
    <div className="container mx-auto">
      <div className={styles.textBlock}>
        <h1 className={styles.logo}>NFX</h1>
        Forem ipsum dolor sit amet, consectetur adipiscing elit. Etiam eu turpis
        molestie, dictum est a, mattis tellus. Sed dignissim, metus nec
        fringilla accumsan, risus sem sollicitudin lacus, ut interdum tellus
        elit sed risus. Maecenas eget lacus, ut interdum tellus elit sed risus.
        Maecenas eget lacus, ut interdum tellus elit sed risus. Maecenas eget
      </div>
      <div className={styles.sectionInfo}>
        <div className={`exploreSection ${styles.exploreSection}`}>
          <div className={styles.heading}>EXPLORE</div>
          <div className={`self-stretch h-72 ${styles.subHeading}`}>
            <div className={`link ${styles.link}`}>Buy Metaverse</div>
            <div className={`link ${styles.link}`}>3D Spaces</div>
            <div className={`link ${styles.link}`}>Avatars</div>
            <div className={`link ${styles.link}`}>Spaces</div>
            <div className={`link ${styles.link}`}>NFTs</div>
            <div className={`link ${styles.link}`}>Start Building</div>
            <div className={`link ${styles.link}`}>Marketplace</div>
            <div className={`link ${styles.link}`}>Academy</div>
          </div>
        </div>

        <div className={`aboutSection ${styles.aboutSection}`}>
          <div className={styles.heading}>ABOUT</div>
          <div className={`self-stretch h-44 ${styles.subHeading}`}>
            <div className={`link ${styles.link}`}>How it works</div>
            <div className={`link ${styles.link}`}>About us</div>
            <div className={`link ${styles.link}`}>Blogs</div>
            <div className={`link ${styles.link}`}>Join the community</div>
            <div className={`link ${styles.link}`}>Contact us</div>
          </div>
        </div>

        <div className={`hireTalentSection ${styles.hireTalentSection}`}>
          <div className={styles.heading}>HIRE TALENT</div>
          <div className={`self-stretch h-64 ${styles.subHeading}`}>
            <div className={`link ${styles.link}`}>Designers</div>
            <div className={`link ${styles.link}`}>Developers</div>
            <div className={`link ${styles.link}`}>NFT Creators</div>
            <div className={`link ${styles.link}`}>Modelers</div>
            <div className={`link ${styles.link}`}>Content Writers</div>
            <div className={`link ${styles.link}`}>Managers</div>
            <div className={`link ${styles.link}`}>AI Experts</div>
          </div>
        </div>

        <div className={`navigateToSection ${styles.navigateToSection}`}>
          <div className={styles.heading}>NAVIGATE TO</div>
          <div className={`self-stretch h-24 ${styles.subHeading}`}>
            <div className={`link ${styles.link}`}>Sign in</div>
            <div className={`link ${styles.link}`}>Privacy Policy</div>
            <div className={`link ${styles.link}`}>Terms of Use</div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Footer;
