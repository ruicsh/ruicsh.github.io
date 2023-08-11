import clsx from "clsx";

import styles from "./index.module.scss";

export enum IconType {
  StarEmpty,
  StarFilled,
  StarHalf,
}

interface IProps {
  className?: string;
  icon: IconType;
}

function Icon(props: IProps) {
  const { className, icon } = props;
  const cls = clsx(styles.root, className, {
    [styles.icStarEmpty]: icon === IconType.StarEmpty,
    [styles.icStarFilled]: icon === IconType.StarFilled,
    [styles.icStarHalf]: icon === IconType.StarHalf,
  });

  return <div aria-hidden="true" className={cls} role="img" />;
}

export default Icon;
