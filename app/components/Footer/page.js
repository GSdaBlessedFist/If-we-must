//Footer
import styles from "./footer.module.scss";

export default function Footer() {
  return (
    <>
      <div  className={styles.footer}>
        <div className={styles.mainText}>Your taxes will only be used on the categories you select.</div>
        <div className={styles.noticeText}><span className="font-bold">NOTE:</span> Leaving a space empty means you DON'T want to specify how your
        taxes get spent.</div>
      </div>
    </>
  );
}