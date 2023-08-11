import type { PropsWithChildren } from "react";

import "src/styles/reset.scss";
import "src/styles/variables.scss";
import "src/styles/typography.scss";
import { barlowCondensed } from "src/styles/fonts";

import MainHeader from "src/components/main/header";

import styles from "./layout.module.scss";

export const metadata = {
  title: "Home | ruicsh",
};

interface IProps {}

function RootLayout(props: PropsWithChildren<IProps>) {
  const { children } = props;

  return (
    <html lang="en" className={barlowCondensed.variable}>
      <body className={styles.body}>
        <MainHeader />
        {children}
      </body>
    </html>
  );
}

export default RootLayout;
