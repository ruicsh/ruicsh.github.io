import Link from "next/link";
import { usePathname, useSearchParams } from "next/navigation";

import styles from "./collections.module.scss";

function BookCollections() {
  const pathname = usePathname();
  const searchParams = useSearchParams();

  return (
    <ul className={styles.root}>
      {[
        { href: "/books", label: "All" },
        { href: "/books/wishlist", label: "Wishlist" },
        { href: "/books/queue", label: "Queue" },
        { href: "/books/read", label: "Read" },
      ]
        .map((link) => {
          const url = new URL("http://to");
          url.pathname = link.href;
          const sp = new URLSearchParams(searchParams.toString());
          url.search = sp.toString();

          return {
            label: link.label,
            href: url.href.replace(url.origin, ""),
            isActive: pathname === url.pathname,
          };
        })
        .map(({ href, label, isActive }) => (
          <li key={`books-nav-${href}`} className={styles.option}>
            <Link
              aria-selected={isActive}
              className={styles.link}
              href={href}
              scroll={false}
            >
              {label}
            </Link>
          </li>
        ))}
    </ul>
  );
}

export default BookCollections;
