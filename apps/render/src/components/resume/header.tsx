type IProps = {
	resume: IResume;
};

export function Header(props: IProps) {
	const { resume } = props;
	const { basics } = resume;
	const { firstName, lastName, label, intro, profiles } = basics;

	return (
		<header className="grid grid-cols-12 gap-y-4 bg-neutral-100 py-6 pt-10">
			<div className="col-start-2 col-end-5 flex flex-col gap-4">
				<div>
					<h1 className="font-heading text-5xl uppercase">
						<span className="font-bold">{firstName}</span> {lastName}
					</h1>
					<p className="text-lg">{label}</p>
				</div>
				<div className="col-start-6 col-end-12 flex flex-col gap-1">
					{profiles.map((profile, index) => (
						<a
							href={profile.url}
							key={index}
							className="text-xs text-neutral-500"
						>
							{profile.label}
						</a>
					))}
				</div>
			</div>
			<div className="col-start-6 col-end-12 flex flex-col items-start">
				<h2 className="font-heading text-xl font-semibold uppercase">
					Profile
				</h2>
				<p className="text-sm leading-normal">{intro}</p>
			</div>
		</header>
	);
}
