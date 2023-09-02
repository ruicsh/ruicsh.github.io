import Link from "next/link";

import { IconType } from "src/library/icon";
import IconButton from "src/library/button/icon";

import styles from "./nav-button.module.scss";

interface IProps {
  icon: IconType;
  isDisabled: boolean;
  link: string;
  role: "next" | "prev" | "first" | "last";
}

function NavButton(props: IProps) {
  const { icon, isDisabled, link, role } = props;

  if (isDisabled) {
    return (
      <IconButton
        className={styles.root}
        icon={icon}
        data-role={role}
        disabled={isDisabled}
      />
    );
  }

  return (
    <Link href={link}>
      <IconButton
        className={styles.root}
        icon={icon}
        data-role={role}
        disabled={isDisabled}
      />
    </Link>
  );
}

export default NavButton;
