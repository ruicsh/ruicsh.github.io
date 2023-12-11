import { type IncomingMessage } from "node:http";
import https from "node:https";

import { log } from "@ruicsh/services";

export async function get(url: string): Promise<IncomingMessage> {
	return new Promise((resolve) => {
		https
			.get(url, (res) => {
				resolve(res);
			})
			.on("error", (err) => {
				log.info(err);
			});
	});
}
