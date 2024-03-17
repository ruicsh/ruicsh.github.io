import { Resume } from "src/components/resume";
import resume from "src/data/resume";

export const metadata = {
	title: "Resume | ruicsh",
};

async function ResumePage() {
	return <Resume resume={resume} />;
}

export default ResumePage;
