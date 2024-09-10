/* eslint-disable unicorn/prefer-top-level-await */
import shell from "@tuplo/shell";

async function main() {
	const $ = shell.$({ verbose: true });

	await $`rm -rf shared`;
	await $`ln -s ../ruicsh-data shared`;
	await $`rm -rf apps/*/shared`;
	await $`npm run link-shared-dir -- --force`;
}

main();
