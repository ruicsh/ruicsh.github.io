import clsx from "clsx";

import { Icon, IconType } from "src/library/icon";

import styles from "./index.module.scss";

interface IProps {
  className?: string;
  id: string;
  value?: number;
}

export function StarRating(props: IProps) {
  const { className, id, value = 0 } = props;
  if (!value) {
    return null;
  }

  const full = Math.trunc(value);
  const half = value % 1 ? 1 : 0;
  const empty = Math.trunc(5 - full - half);
  const cls = clsx(styles.root, className);

  return (
    <div className={cls}>
      {new Array(full).fill(null).map((_, i) => (
        <Icon
          key={`star-full-${id}-${i}`}
          className={styles.star}
          icon={IconType.StarFilled}
        />
      ))}
      {new Array(half).fill(null).map((_, i) => (
        <Icon
          key={`star-half-${id}-${i}`}
          className={styles.star}
          icon={IconType.StarHalf}
        />
      ))}
      {new Array(empty).fill(null).map((_, i) => (
        <Icon
          key={`star-empty-${id}-${i}`}
          className={styles.starEmpty}
          icon={IconType.StarEmpty}
        />
      ))}
    </div>
  );
}
