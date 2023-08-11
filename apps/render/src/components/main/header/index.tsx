import Navigation from "../navigation";
import styles from "./index.module.scss";

function MainHeader() {
  return (
    <header className={styles.root}>
      <Navigation />
    </header>
  );
}

export default MainHeader;
