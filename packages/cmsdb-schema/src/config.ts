import convict from "convict";

const config = convict({
	cms: {
		db: {
			filename: {
				doc: "The filename of the database.",
				format: String,
				default: "shared/cms.sqlite3",
				env: "DB_FILE_CMS",
			},
		},
	},
});

config.validate({ allowed: "strict" });

export default config;
