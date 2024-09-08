import { MainNavigation } from "../navigation";

export function MainHeader() {
	return (
		<header className="border-b-4 border-double border-stone-300 py-2 print:hidden">
			<MainNavigation />
		</header>
	);
}
