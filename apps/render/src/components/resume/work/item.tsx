type IProps = {
	className?: string;
	item: IJob;
};

export function WorkItem(props: IProps) {
	const { item } = props;
	const { position, contract } = item;
	const { company, market } = item;
	const { startDate, endDate, duration } = item;
	const { techStack } = item;
	const { summary, highlights } = item;

	return (
		<div className="break-inside-avoid">
			<p className="text-xs uppercase">
				{position}
				{contract && <span> - contract</span>}
			</p>
			<h2 className="text-lg font-bold">{company}</h2>
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
