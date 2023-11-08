import styles from "./NavBar.module.css";
import Link from "next/link";

function Navbar() {
  return (
    <div className={styles.container}>
      <div className={styles.button}>
        <Link href="/register-user">
          <div className={styles.buttonText}>Register</div>
        </Link>
      </div>
      <div className={styles.button}>
        <Link href="/register-asset">
          <div className={styles.buttonText}>Register Assets</div>
        </Link>
      </div>
    </div>
  );
}

export default Navbar;
