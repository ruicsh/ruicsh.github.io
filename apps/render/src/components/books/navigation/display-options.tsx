import { IconType } from "src/library/icon";
import IconButton from "src/library/button/icon";

import styles from "./display-options.module.scss";

interface IProps {
  onChange: (newDisplay: string) => void;
}

function DisplayOptions(props: IProps) {
  const { onChange } = props;

  return (
    <div className={styles.root}>
      <IconButton icon={IconType.Grid} onClick={() => onChange("grid")} />
      <IconButton icon={IconType.List} onClick={() => onChange("table")} />
    </div>
  );
}

export default DisplayOptions;
