import { cmsdb } from "@ruicsh/services";

async function normalizeBooksTable() {
	const fields = ["queuedOnDate", "readOnDate", "wishedOnDate"];
	for await (const field of fields) {
		await cmsdb("book")
			.update({ [field]: null })
			.where({ [field]: "" });
	}
}

async function main() {
	await normalizeBooksTable();

	await cmsdb.destroy();
}

main();
