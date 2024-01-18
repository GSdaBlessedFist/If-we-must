//Footer
import "../styles.scss";

export default function Footer() {
  return (
    <>
      <div  className={styles.footer}>
        <h3>Your taxes will only be used on the categories you select.</h3>
        NOTE: Leaving a space empty means you DON'T want to specify how your
        taxes get spent.
      </div>
    </>
  );
}