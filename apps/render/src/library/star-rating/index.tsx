import { Icon, IconType } from "src/library/icon";

type IProps = {
	className?: string;
	id: string;
	value?: number;
};

export function StarRating(props: IProps) {
	const { id, value = 0 } = props;
	if (!value) {
		return;
	}

	const full = Math.trunc(value);
	const half = value % 1 ? 1 : 0;
	const empty = Math.trunc(5 - full - half);

	return (
		<div className="flex h-4 items-center gap-1">
			{Array.from({ length: full }).map((_, i) => (
				<Icon
					key={`star-full-${id}-${i}`}
					className="h-[10px] w-[10px] bg-stone-800"
					icon={IconType.StarFilled}
				/>
			))}

			{Array.from({ length: half }).map((_, i) => (
				<Icon
					key={`star-half-${id}-${i}`}
					className="h-[10px] w-[10px] bg-stone-800"
					icon={IconType.StarHalf}
				/>
			))}
			{Array.from({ length: empty }).map((_, i) => (
				<Icon
					key={`star-empty-${id}-${i}`}
					className="h-[10px] w-[10px] bg-stone-800"
					icon={IconType.StarEmpty}
				/>
			))}
		</div>
	);
}
