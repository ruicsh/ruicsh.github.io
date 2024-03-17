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
	const {
		slug,
		title,
		coverColor,
		subtitle,
		authors,
		publishedDate,
		pageCount,
		description,
	} = book;

	const df = new Intl.DateTimeFormat("en-GB", {
		dateStyle: "medium",
	});

	return (
		<article className="flex w-full gap-3 rounded border bg-stone-100 p-4">
			<div className="relative h-[285px] basis-5/12">
				<Image
					src={`/books/covers/${slug}.jpg`}
					style={{ backgroundColor: coverColor }}
					alt=""
					className="shadow-xl"
				/>
			</div>
			<div className="flex basis-7/12 flex-col gap-1">
				<h1 className="font-heading text-2xl font-bold leading-none">
					{title}
				</h1>
				{subtitle && (
					<h2 className="font-heading text-md font-semibold leading-tight">
						{subtitle}
					</h2>
				)}
				<p className="text-sm">{authors}</p>
				<p className="text-xs text-stone-600">
					{[
						publishedDate && df.format(new Date(publishedDate)),
						pageCount && `${pageCount} pages`,
					].join(", ")}
				</p>
				{description && (
					<p className="line-clamp-5 text-xs leading-relaxed">{description}</p>
				)}
				<div className="mt-auto flex flex-col gap-1 border-t border-t-stone-300 pt-1">
					<ReadOn book={book} />
					<QueuedOn book={book} />
					<WishedOn book={book} />
				</div>
			</div>
		</article>
	);
}
