"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

import styles from "./index.module.scss";

function BooksNavigation() {
  const pathname = usePathname();

  return (
    <nav>
      <ul>
        {[
          { href: "/books", label: "All" },
          { href: "/books/read", label: "Read" },
          { href: "/books/queue", label: "Queue" },
          { href: "/books/wishlist", label: "Wishlist" },
        ]
          .map((link) => ({
            ...link,
            isActive: new RegExp(`${link.href}$`).test(pathname),
          }))
          .map(({ href, label, isActive }) => (
            <li key={`books-nav-${href}`}>
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

export default BooksNavigation;
