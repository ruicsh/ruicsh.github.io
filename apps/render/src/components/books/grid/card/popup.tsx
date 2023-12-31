import clsx from "clsx";

import styles from "./popup.module.scss";

type IProps = {
	book: IBook;
	order: number;
};

export function Popup(props: IProps) {
	const { book, order } = props;
	const { authors, description, pageCount, publishedDate, subtitle, title } =
		book;
	const cls = clsx(styles.root, {
		[styles.popupOnTheLeft]: order % 6 === 5,
	});

	const df = new Intl.DateTimeFormat("en-GB", {
		dateStyle: "medium",
	});

	return (
		<aside className={cls}>
			<div>
				<h2 className={styles.title}>{title}</h2>
				{subtitle && <h4 className={styles.subtitle}>{subtitle}</h4>}
				<p className={styles.authors}>{authors}</p>
				<p className={styles.meta}>
					{[
						publishedDate && df.format(new Date(publishedDate)),
						pageCount && `${pageCount} pages`,
					].join(", ")}
				</p>
				{description && <p className={styles.description}>{description}</p>}
			</div>
		</aside>
	);
}
