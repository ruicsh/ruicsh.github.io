import { WorkItem } from "./item";

type IProps = {
	resume: IResume;
};

export function Work(props: IProps) {
	const { resume } = props;
	const { work } = resume;

	return (
		<div className="col-start-6 col-end-12 flex flex-col gap-8">
			{work.map((item, i) => (
				<WorkItem key={`work-${i}`} item={item} order={i} />
			))}
		</div>
	);
}
