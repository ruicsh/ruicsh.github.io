interface IProfile {
	network: string;
	username: string;
	url: string;
	label: string;
}

interface IBasics {
	firstName: string;
	lastName: string;
	label: string;
	eligibility: string;
	email: string;
	phone: string;
	location: {
		city: string;
	};
	profiles: IProfile[];
	intro: string;
}

interface ISkillsArea {
	area: string;
	skills: string[];
}

interface IJob {
	company: string;
	website?: string;
	logo?: string;
	position: string;
	summary?: string;
	contract?: boolean;
	startDate: string;
	endDate: string;
	duration: string;
	techStack: string;
	highlights: string[];
	market: string;
}

interface IEducation {
	logo: string;
	degree: string;
	website: string;
	school: string;
	highlights: string[];
}

interface IResume {
	basics: IBasics;
	skills: ISkillsArea[];
	work: IJob[];
	education: IEducation;
}
