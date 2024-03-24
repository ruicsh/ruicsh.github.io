import { Header } from "./header";
import { Skills } from "./skills";
import { Work } from "./work";

type IProps = {
	resume: IResume;
};

export function Resume(props: IProps) {
	const { resume } = props;

	return (
		<article className="m-4 mx-auto mb-24 flex w-[210mm] flex-col gap-6 border bg-white p-0 pb-24 text-neutral-800 shadow-xl print:m-0 print:w-full print:border-none print:p-0 print:shadow-none">
			<Header resume={resume} />
			<div className="grid break-inside-auto grid-cols-12">
				<Skills resume={resume} />
				<Work resume={resume} />
			</div>
		</article>
	);
}
