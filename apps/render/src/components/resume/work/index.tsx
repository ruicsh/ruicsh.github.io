import { WorkItem } from "./item";

type IProps = {
	resume: IResume;
};

export function Work(props: IProps) {
	const { resume } = props;
	const { work } = resume;

	return (
		<>
			<div className="col-start-6 col-end-12 flex flex-col gap-8">
				{work.slice(0, 4).map((item, i) => (
					<WorkItem key={`work-${i}`} item={item} />
				))}
			</div>
			<div className="col-start-6 col-end-12 mt-8 flex flex-col gap-8 print:col-start-2 print:mt-8 print:break-before-all print:gap-4">
				{work.slice(4, -1).map((item, i) => (
					<WorkItem key={`work-${i}`} item={item} />
				))}
			</div>
		</>
	);
}
