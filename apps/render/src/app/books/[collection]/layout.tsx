import type { PropsWithChildren } from "react";

import styles from "./layout.module.scss";

export const metadata = {
  title: "Books | ruicsh",
};

interface IProps {}

function BooksLayout(props: PropsWithChildren<IProps>) {
  const { children } = props;

  return <main className={styles.root}>{children}</main>;
}

export default BooksLayout;
