import Link from "next/link";

import { IconType } from "src/library/icon";
import IconButton from "src/library/button/icon";

import styles from "./nav-button.module.scss";

interface IProps {
  icon: IconType;
  isDisabled: boolean;
  link: string;
  dataRole: "next" | "prev" | "first" | "last";
}

function NavButton(props: IProps) {
  const { icon, isDisabled, link, dataRole } = props;

  if (isDisabled) {
    return (
      <IconButton
        className={styles.root}
        icon={icon}
        data-role={dataRole}
        disabled={isDisabled}
      />
    );
  }

  return (
    <Link href={link}>
      <IconButton
        className={styles.root}
        icon={icon}
        data-role={dataRole}
        disabled={isDisabled}
      />
    </Link>
  );
}

export default NavButton;
