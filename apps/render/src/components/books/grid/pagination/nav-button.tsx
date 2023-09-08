import { type MouseEvent } from "react";

import { useBooksStore } from "src/store/books";
import { IconType } from "src/library/icon";
import IconButton from "src/library/button/icon";

import styles from "./nav-button.module.scss";

interface IProps {
  dataRole: "next" | "prev" | "first" | "last";
  icon: IconType;
  isDisabled: boolean;
  toPage: number;
}

function NavButton(props: IProps) {
  const { icon, isDisabled, dataRole } = props;

  const onClick = (event: MouseEvent) => {
    event.preventDefault();
    useBooksStore.getState().setPage(props.toPage);
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

export default NavButton;
