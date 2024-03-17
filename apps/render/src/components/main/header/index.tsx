import { MainNavigation } from "../navigation";

export function MainHeader() {
	return (
		<header className="border-b border-neutral-200 py-2 print:hidden">
			<MainNavigation />
		</header>
	);
}
