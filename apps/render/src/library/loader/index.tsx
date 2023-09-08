import clsx from "clsx";

import styles from "./index.module.scss";

interface IProps {
  className?: string;
}

function Loader(props: IProps) {
  const { className } = props;
  const cls = clsx(className, styles.root);

  return (
    <div className={cls}>
      <span className={styles.spinner} />
    </div>
  );
}

export default Loader;
