import { Image } from "src/library/image";

import { WatchedOn } from "./watched-on";
import { WishedOn } from "./wished-on";

type IProps = {
	film: IFilm;
	order: number;
};

export function Film(props: IProps) {
	const { film } = props;
	const { slug, title, director, year } = film;

	return (
		<article className="flex w-full flex-col gap-1">
			<div className="aspect-[0.65] overflow-hidden">
				<Image
					src={`/films/posters/${slug}.jpg`}
					// style={{ backgroundColor: coverColor }}
					alt=""
					className="rounded"
				/>
			</div>
			<aside className="flex flex-col gap-[1px]">
				<h1 className="font-heading text-lg font-bold leading-5">{title}</h1>
				<p className="text-xs">
					{year}, {director}
				</p>
			</aside>
			<div className="mt-auto flex flex-col border-t border-t-stone-300 pt-1">
				<WatchedOn film={film} />
				<WishedOn film={film} />
			</div>
		</article>
	);
}
