import { Image } from "src/library/image";

import { QueuedOn } from "./queued-on";
import { ReadOn } from "./read-on";
import { WishedOn } from "./wished-on";

type IProps = {
	book: IBook;
	order: number;
};

export function Book(props: IProps) {
	const { book } = props;
	const { slug, title, coverColor, authors } = book;

	return (
		<article className="flex w-full flex-col gap-1">
			<div className="aspect-[0.65] overflow-hidden">
				<Image
					src={`/books/covers/${slug}.jpg`}
					style={{ backgroundColor: coverColor }}
					alt=""
					className="rounded"
				/>
			</div>
			<aside className="flex flex-col gap-[1px]">
				<h1 className="font-heading text-lg font-bold leading-none">{title}</h1>
				<p className="text-sm">{authors}</p>
			</aside>
			<div className="mt-auto flex flex-col gap-1 border-t border-t-stone-300 pt-1">
				<ReadOn book={book} />
				<QueuedOn book={book} />
				<WishedOn book={book} />
			</div>
		</article>
	);
}
