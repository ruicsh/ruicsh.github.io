import { useRef, useState } from "react";

import { useClickOutside } from "src/hooks/use-click-outside";
import { Button } from "src/library/button";

import { Genre } from "./genre";

import styles from "./index.module.scss";

type IProps = {
	genres: IBookGenre[];
};

export function Genres(props: IProps) {
	const { genres } = props;
	const [isPopupOpen, setIsPopupOpen] = useState(false);
	const popupRef = useRef<HTMLUListElement>(null);

	const onTogglePopup = () => {
		setIsPopupOpen((oldState) => !oldState);
	};

	useClickOutside({ elementRef: popupRef, onClickOutside: onTogglePopup });

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
				<ul className={styles.list} ref={popupRef} onMouseLeave={onTogglePopup}>
					{genres.map((genre) => (
						<Genre key={`nav-genre-option-${genre.slug}`} genre={genre} />
					))}
				</ul>
			)}
		</div>
	);
}
