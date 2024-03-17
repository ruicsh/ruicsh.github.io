import { type PropsWithChildren } from "react";

import "src/styles/globals.css";
import "src/styles/icons.scss";
import { barlowCondensed } from "src/styles/fonts";

import { MainHeader } from "src/components/main/header";

export const metadata = {
	title: "Home | ruicsh",
};

function RootLayout(props: PropsWithChildren) {
	const { children } = props;

	return (
		<html lang="en" className={barlowCondensed.variable}>
			<body className="container mx-auto print:max-w-full">
				<MainHeader />
				{children}
			</body>
		</html>
	);
}

export default RootLayout;
