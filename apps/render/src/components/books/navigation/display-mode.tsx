import IconButton from "src/library/button/icon";
import { IconType } from "src/library/icon";
import { useBooksStore } from "src/store/books";

import styles from "./display-mode.module.scss";

function DisplayMode() {
  const onChange = (newDisplayMode?: IDisplayMode) => {
    useBooksStore.getState().setDisplayMode(newDisplayMode);
  };

  return (
    <div className={styles.root}>
      <IconButton
        className={styles.button}
        icon={IconType.Grid}
        onClick={() => onChange("grid")}
      />
      <IconButton
        className={styles.button}
        icon={IconType.List}
        onClick={() => onChange("table")}
      />
    </div>
  );
}

export default DisplayMode;
