import { SkillsArea } from "./item";

type IProps = {
	resume: IResume;
};

export function Skills(props: IProps) {
	const { resume } = props;
	const { skills } = resume;

	return (
		<div className="break flex flex-col gap-4 md:col-start-2 md:col-end-6">
			{skills.map((area, i) => (
				<SkillsArea key={`area-${i}`} area={area} />
			))}
		</div>
	);
}
