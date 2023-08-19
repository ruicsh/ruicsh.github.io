import type { PropsWithChildren } from "react";
import clsx from "clsx";

import styles from "./index.module.scss";

export interface IProps {
  className?: string;
  onClick?: () => void;
}

function Button(props: PropsWithChildren<IProps>) {
  const { children, className, onClick, ...restOfProps } = props;
  const cls = clsx(styles.root, className);

  return (
    <button className={cls} onClick={onClick} {...restOfProps}>
      {children}
    </button>
  );
}

export default Button;
