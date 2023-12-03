import { type ChangeEvent } from "react";

import styles from "./checkbox.module.scss";

type IProps = {
  checked?: boolean;
  onChange?: (isChecked: boolean) => void;
};

export function Checkbox(props: IProps) {
  const { checked, onChange } = props;

  const onLocalChange = (event: ChangeEvent<HTMLInputElement>) => {
    if (onChange) {
      onChange(event.target.checked);
    }
  };

  return (
    <input
      type="checkbox"
      className={styles.root}
      checked={checked}
      onChange={onLocalChange}
    />
  );
}
