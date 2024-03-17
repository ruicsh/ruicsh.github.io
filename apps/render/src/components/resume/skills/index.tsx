import { SkillsArea } from "./item";

type IProps = {
	resume: IResume;
};

export function Skills(props: IProps) {
	const { resume } = props;
	const { skills } = resume;

	return (
		<div className="break col-start-2 col-end-6 flex flex-col gap-4">
			{skills.map((area, i) => (
				<SkillsArea key={`area-${i}`} area={area} />
			))}
		</div>
	);
}
