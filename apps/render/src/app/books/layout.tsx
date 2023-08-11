import type { PropsWithChildren } from "react";

import Navigation from "src/components/books/navigation";

import styles from "./layout.module.scss";

export const metadata = {
  title: "Books | ruicsh",
};

interface IProps {}

function BooksLayout(props: PropsWithChildren<IProps>) {
  const { children } = props;

  return (
    <main className={styles.root}>
      <Navigation />
      {children}
    </main>
  );
}

export default BooksLayout;
