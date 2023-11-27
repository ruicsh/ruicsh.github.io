import { type PropsWithChildren } from "react";

import styles from "./layout.module.scss";

interface IProps {}

function BookmarksLayout(props: PropsWithChildren<IProps>) {
  const { children } = props;

  return <main className={styles.root}>{children}</main>;
}

export default BookmarksLayout;
