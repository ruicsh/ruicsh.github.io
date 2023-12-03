import { type MouseEvent } from "react";

import { IconButton } from "src/library/button/icon";
import { IconType } from "src/library/icon";
import { useDispatch } from "src/store/books";

import styles from "./nav-button.module.scss";

type IProps = {
  dataRole: "next" | "prev" | "first" | "last";
  icon: IconType;
  isDisabled: boolean;
  toPage: number;
};

export function NavButton(props: IProps) {
  const { icon, isDisabled, dataRole, toPage } = props;
  const dispatch = useDispatch();

  const onClick = (event: MouseEvent) => {
    event.preventDefault();
    dispatch({ type: "SET_PAGE", payload: { page: toPage } });
  };

  return (
    <IconButton
      className={styles.root}
      data-role={dataRole}
      disabled={isDisabled}
      icon={icon}
      onClick={onClick}
    />
  );
}
