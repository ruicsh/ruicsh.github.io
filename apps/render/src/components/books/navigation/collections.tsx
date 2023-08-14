"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

import styles from "./collections.module.scss";

function BookCollections() {
  const pathname = usePathname();

  return (
    <ul className={styles.root}>
      {[
        { href: "/books", label: "All" },
        { href: "/books/wishlist", label: "Wishlist" },
        { href: "/books/queue", label: "Queue" },
        { href: "/books/read", label: "Read" },
      ]
        .map((link) => ({
          ...link,
          isActive: new RegExp(`${link.href}$`).test(pathname),
        }))
        .map(({ href, label, isActive }) => (
          <li key={`books-nav-${href}`} className={styles.option}>
            <Link aria-selected={isActive} className={styles.link} href={href}>
              {label}
            </Link>
          </li>
        ))}
    </ul>
  );
}

export default BookCollections;
