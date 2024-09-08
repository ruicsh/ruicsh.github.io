"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

export function MainNavigation() {
	const pathname = usePathname();

	const links = [
		{ href: "/", label: "Home" },
		{ href: "/books", label: "Books" },
		{ href: "/resume", label: "Resume" },
	].map((link) => ({
		...link,
		isActive: link.href === pathname,
	}));

	return (
		<nav aria-label="primary">
			<ul className="flex justify-center gap-2">
				{links.map(({ href, label, isActive }) => (
					<li key={href}>
						<Link
							className="font-heading px-2 font-bold uppercase text-stone-400 transition-colors aria-selected:text-black"
							aria-selected={isActive}
							href={href}
						>
							{label}
						</Link>
					</li>
				))}
			</ul>
		</nav>
	);
}
