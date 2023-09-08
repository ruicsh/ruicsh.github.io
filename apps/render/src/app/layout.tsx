import type { PropsWithChildren } from "react";

import "ag-grid-community/styles/ag-grid.css"; // Core grid CSS, always needed
import "ag-grid-community/styles/ag-theme-alpine.css"; // Optional theme CSS

import { barlowCondensed } from "src/styles/fonts";
import "src/styles/icons.scss";
import "src/styles/reset.scss";
import "src/styles/typography.scss";
import "src/styles/variables.scss";

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
