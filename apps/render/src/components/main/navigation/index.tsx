"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

import styles from "./index.module.scss";

function MainNavigation() {
  const pathname = usePathname();

  return (
    <nav aria-label="primary" className={styles.root}>
      <ul className={styles.list}>
        {[
          { href: "/", label: "Home" },
          // { href: "/til", label: "Today I Learned" },
          // { href: "/bookmarks", label: "Bookmarks" },
          { href: "/books", label: "Books" },
          // { href: "/films", label: "Films" },
        ]
          .map((link) => ({
            ...link,
            isActive: link.href === pathname,
          }))
          .map(({ href, label, isActive }) => (
            <li key={href}>
              <Link
                aria-selected={isActive}
                className={styles.link}
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

export default MainNavigation;
