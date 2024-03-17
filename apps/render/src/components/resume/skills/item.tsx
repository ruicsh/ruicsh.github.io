type IProps = {
	area: ISkillsArea;
};

export function SkillsArea(props: IProps) {
	const { area } = props;

	return (
		<div>
			<h2 className="font-heading text-md font-semibold uppercase">
				{area.area}
			</h2>
			{area.skills.map((list) => (
				<p key={list} className="text-xs leading-relaxed">
					{list}
				</p>
			))}
		</div>
	);
}
