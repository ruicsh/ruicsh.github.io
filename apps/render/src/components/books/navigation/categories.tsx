import { useState, useRef } from "react";
import { useRouter, useSearchParams, usePathname } from "next/navigation";

import Button from "src/library/button";
import Checkbox from "src/library/input/checkbox";
import { useClickOutside } from "src/hooks/use-click-outside";

import styles from "./categories.module.scss";

interface IProps {
  categories: ICategory[];
}

function BookCategories(props: IProps) {
  const { categories } = props;
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const activeCategories = searchParams.get("c")?.split("|") ?? [];
  const [isPopupOpen, setIsPopupOpen] = useState(false);
  const popupRef = useRef<HTMLUListElement>(null);

  const onTogglePopup = () => {
    setIsPopupOpen((oldState) => !oldState);
  };

  useClickOutside({ elementRef: popupRef, onClickOutside: onTogglePopup });

  const onToggleCategory = (category: string) => {
    const index = activeCategories.indexOf(category);
    if (index > -1) {
      activeCategories.splice(index, 1);
    } else {
      activeCategories.push(category);
    }

    const url = new URL("http://to");
    url.pathname = pathname;
    const sp = new URLSearchParams(searchParams.toString());
    const empty = activeCategories.length === 0;
    if (!empty) {
      sp.set("c", activeCategories.filter(Boolean).join("|"));
    } else {
      sp.delete("c");
    }
    url.search = sp.toString();

    router.push(url.href.replace(url.origin, ""));
  };

  return (
    <div className={styles.root}>
      <Button
        className={styles.toggleButton}
        onClick={onTogglePopup}
        aria-selected={isPopupOpen}
      >
        Genres
      </Button>
      {isPopupOpen && (
        <ul className={styles.list} ref={popupRef}>
          {categories
            .map((option) => ({
              ...option,
              isActive: activeCategories.includes(option.slug),
            }))
            .map(({ slug, label, isActive }) => (
              <li
                key={`nav-category-option-${slug}`}
                className={styles.category}
              >
                <Button onClick={() => onToggleCategory(slug)}>
                  <Checkbox checked={isActive} />
                  <span>{label}</span>
                </Button>
              </li>
            ))}
        </ul>
      )}
    </div>
  );
}

export default BookCategories;
