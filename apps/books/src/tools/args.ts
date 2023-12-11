import { parseArgs } from "node:util";

export function args() {
	const { values } = parseArgs({
		args: process.argv.slice(2),
		options: {
			task: {
				type: "string",
				short: "t",
			},
		},
	});

	return { ...values };
}
