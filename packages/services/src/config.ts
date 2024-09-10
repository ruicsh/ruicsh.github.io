import convict from "convict";

const config = convict({
	logLevel: {
		doc: "The log level.",
		format: ["trace", "debug", "info", "warn", "error", "silent"],
		default: "info",
		env: "LOG_LEVEL",
	},
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
	bunnyCdn: {
		apiKey: {
			doc: "The API key for BunnyCDN.",
			format: String,
			default: undefined,
			env: "BUNNY_API_KEY",
		},
	},
	tmdb: {
		accessToken: {
			default: undefined,
			doc: "The TMDB Access Token",
			env: "TMDB_ACCESS_TOKEN",
			format: String,
			sensitive: true,
		},
	},
});

config.validate({ allowed: "strict" });

export default config;
