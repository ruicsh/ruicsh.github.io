import { MainNavigation } from "../navigation";

import styles from "./index.module.scss";

export function MainHeader() {
	return (
		<header className={styles.root}>
			<MainNavigation />
		</header>
	);
}
