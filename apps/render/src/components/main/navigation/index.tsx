"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

import styles from "./index.module.scss";

export function MainNavigation() {
  const pathname = usePathname();

  return (
    <nav aria-label="primary" className={styles.root}>
      <ul className={styles.list}>
        {[
          { href: "/", label: "Home" },
          // { href: "/til", label: "Today I Learned" },
          { href: "/books", label: "Books" },
          { href: "/bookmarks", label: "Bookmarks" },
        ]
          .map((link) => ({
            ...link,
            isActive: link.href === pathname,
          }))
          .map(({ href, label, isActive }) => (
            <li key={href} className={styles.link}>
              <Link aria-selected={isActive} href={href}>
                {label}
              </Link>
            </li>
          ))}
      </ul>
    </nav>
  );
}
