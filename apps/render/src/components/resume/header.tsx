type IProps = {
	resume: IResume;
};

export function Header(props: IProps) {
	const { resume } = props;
	const { basics } = resume;
	const { firstName, lastName, label, profiles } = basics;

	return (
		<header className="grid grid-cols-1 items-center gap-y-8 bg-neutral-100 py-8 pt-10 md:grid-cols-12">
			<div className="flex flex-col gap-4 md:col-start-2 md:col-end-5">
				<div>
					<h1 className="font-heading text-5xl uppercase">
						<span className="font-bold">{firstName}</span> {lastName}
					</h1>
					<p className="text-xs font-bold uppercase">{label}</p>
				</div>
				<div className="col-start-6 col-end-12 flex flex-col gap-1">
					{profiles.map((profile, index) => (
						<a href={profile.url} key={index} className="text-xs">
							{profile.label}
						</a>
					))}
				</div>
			</div>
			<p className="text-xs leading-normal md:col-start-6 md:col-end-12">
				I have a strong background in{" "}
				<span className="font-bold">React, TypeScript,</span> and{" "}
				<span className="font-bold">Node.js</span> and a deep interest in{" "}
				<span className="font-bold">web design</span> and{" "}
				<span className="font-bold">user experience</span>. I am{" "}
				<strong>product-oriented</strong> with a strong focus on the
				field&apos;s <strong>best practices</strong> and a passion for software{" "}
				<strong>testing</strong>. I have been working in the{" "}
				<strong>Trading</strong> and <strong>Financial</strong> sector in the
				past 5 years where I have worked on internal, front-office and market
				facing tools. I have led and been part of teams as well delivered
				projects as a solo developer.
			</p>
		</header>
	);
}
