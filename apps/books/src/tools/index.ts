import { args } from "./args";
import { getCoverColor } from "./get-cover-color";
import { resizeCovers } from "./resize-covers";

async function main() {
	const { task } = args();

	switch (task) {
		case "cover-color": {
			await getCoverColor();
			break;
		}
		case "resize-covers": {
			await resizeCovers();
			break;
		}
		default: {
			break;
		}
	}
}

main();
