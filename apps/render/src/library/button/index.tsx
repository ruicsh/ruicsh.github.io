import clsx from "clsx";
import { type MouseEvent, type PropsWithChildren } from "react";

import styles from "./index.module.scss";

export interface IProps {
  className?: string;
  disabled?: boolean;
  isActive?: boolean;
  onClick?: (event: MouseEvent) => void;
}

function Button(props: PropsWithChildren<IProps>) {
  const { children, className, isActive, onClick, ...restOfProps } = props;
  const cls = clsx(styles.root, className);

  return (
    <button
      className={cls}
      aria-pressed={isActive}
      onClick={onClick}
      {...restOfProps}
    >
      {children}
    </button>
  );
}

export default Button;
