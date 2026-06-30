import Link from "next/link";
import styles from "./not-found.module.css";

export default function NotFound() {
  return (
    <div className={styles.wrapper}>
      <div className={styles.noise} />
      <div className={styles.content}>
        <h1 className={styles.code} data-text="404">
          404
        </h1>
        <p className={styles.title}>SYSTEM_ERROR: Page Not Found</p>
        <p className={styles.desc}>
          The node or route you are looking for does not exist in the neural registry.
          It may have been pruned or moved.
        </p>
        <Link href="/" className={styles.btn}>
          <span className={styles.btnText}>Return to Neural Core</span>
          <span className={styles.btnGlitch} />
        </Link>
      </div>
    </div>
  );
}
