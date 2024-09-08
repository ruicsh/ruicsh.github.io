import { EmptyList } from "./empty";

type IProps<T> = {
	items: T[];
	itemRenderer: (item: T, index: number) => JSX.Element;
	keyFactory: (item: T) => string;
};

export function List<T>(props: IProps<T>) {
	const { items = [], itemRenderer, keyFactory } = props;

	if (items.length === 0) {
		return <EmptyList />;
	}

	return (
		<ul className="mb-8 grid grid-cols-2 gap-8 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6">
			{items.map((item, i) => (
				<li key={keyFactory(item)}>{itemRenderer(item, i)}</li>
			))}
		</ul>
	);
}
