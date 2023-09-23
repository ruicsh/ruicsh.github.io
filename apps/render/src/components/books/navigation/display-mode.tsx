import IconButton from "src/library/button/icon";
import { IconType } from "src/library/icon";
import { useDispatch } from "src/store/books";

import styles from "./display-mode.module.scss";

function DisplayMode() {
  const dispatch = useDispatch();

  const onChange = (newDisplayMode: IDisplayMode) => {
    dispatch({
      type: "SET_DISPLAY_MODE",
      payload: { displayMode: newDisplayMode },
    });
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
