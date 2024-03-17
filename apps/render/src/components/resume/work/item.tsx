type IProps = {
	item: IJob;
	order: number;
};

export function WorkItem(props: IProps) {
	const { item, order } = props;
	const { position, contract } = item;
	const { company, market } = item;
	const { startDate, endDate, duration } = item;
	const { techStack } = item;
	const { summary, highlights } = item;

	const hasMarginTop = [4, 8].includes(order);

	return (
		<div
			className="break-inside-avoid"
			style={{
				breakBefore: hasMarginTop ? "page" : "auto",
			}}
		>
			<p className="text-xs uppercase">
				{position}
				{contract && <span> - contract</span>}
			</p>
			<h2 className="text-lg font-bold leading-normal">{company}</h2>
			<p className="text-sm font-semibold">{market}</p>
			<p className="text-xs leading-normal">
				{[startDate, endDate, duration].filter(Boolean).join(" - ")}
			</p>
			<p className="text-xs font-semibold leading-normal">{techStack}</p>
			<p className="text-xs leading-normal">{summary}</p>
			{
				<ul className="list-inside list-disc text-xs">
					{highlights.map((highlight, i) => (
						<li key={`highlight-${i}`} className="leading-normal">
							{highlight}
						</li>
					))}
				</ul>
			}
		</div>
	);
}
