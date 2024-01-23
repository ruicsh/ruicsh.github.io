import shell from "@tuplo/shell";

async function main() {
	const $ = shell.$({ verbose: true });

	await $`ln -s ../ruicsh-data shared`;
	await $`npm run link-shared-dir -- --force`;
}

main();
