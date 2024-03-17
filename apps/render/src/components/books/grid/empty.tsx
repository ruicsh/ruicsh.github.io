export function EmptyList() {
	return (
		<div className="flex flex-col items-center justify-center gap-1 py-12">
			<h1 className="font-heading text-2xl font-bold">No Results Found</h1>
			<p className="text-sm text-stone-600">
				Seems like we don&apos;t have results for that.
			</p>
			<p className="text-sm text-stone-600">
				Try adding or removing different filters.
			</p>
		</div>
	);
}
