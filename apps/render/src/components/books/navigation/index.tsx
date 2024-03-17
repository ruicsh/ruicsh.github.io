import { Collections } from "./collections";
import { Genres } from "./genres";
import { Status } from "./status";

type IProps = {
	genres: IBookGenre[];
};

export function Navigation(props: IProps) {
	const { genres } = props;

	return (
		<nav className="w-full border-b-2 border-stone-600">
			<Collections />
			<div className="flex border-t border-stone-200 py-2">
				<Genres genres={genres} />
				<Status genres={genres} />
			</div>
		</nav>
	);
}
