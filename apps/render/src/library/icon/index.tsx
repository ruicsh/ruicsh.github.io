import clsx from "clsx";

import styles from "./index.module.scss";

export enum IconType {
  Arrow,
  Grid,
  List,
  StarEmpty,
  StarFilled,
  StarHalf,
  Step,
  XMark,
}

interface IProps {
  className?: string;
  icon: IconType;
}

export function Icon(props: IProps) {
  const { className, icon } = props;
  const cls = clsx(styles.root, className, {
    [styles.iconArrow]: icon === IconType.Arrow,
    [styles.iconGrid]: icon === IconType.Grid,
    [styles.iconList]: icon === IconType.List,
    [styles.iconStarEmpty]: icon === IconType.StarEmpty,
    [styles.iconStarFilled]: icon === IconType.StarFilled,
    [styles.iconStarHalf]: icon === IconType.StarHalf,
    [styles.iconStep]: icon === IconType.Step,
    [styles.iconXMark]: icon === IconType.XMark,
  });

  return <div aria-hidden="true" className={cls} role="img" />;
}
