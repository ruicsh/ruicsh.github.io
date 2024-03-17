import shell from "@tuplo/shell";

async function main() {
	const $ = shell.$({ verbose: true });

	const varNames = ["BUNNY_PULL_ZONE"];
	for (const varName of varNames) {
		process.env[`NEXT_PUBLIC_${varName}`] = process.env[varName];
	}

	await $`next dev`;
}

main();
