import path from "node:path";

import config from "../config";
import type * as BUNNY from "./index.d";

export class BunnyCdn {
	storageZone: BUNNY.IStorageZone | undefined;

	async put(pathname: string, body: ArrayBuffer) {
		if (!this.storageZone) {
			await this.init();
		}

		if (!this.storageZone) {
			return;
		}

		const {
			Name: storageZoneName,
			StorageHostname: host,
			Password: AccessKey,
		} = this.storageZone;
		const url = new URL(`https://${host}`);
		url.pathname = path.join(storageZoneName, pathname);

		return fetch(url.href, {
			method: "PUT",
			headers: {
				"Content-Type": "application/octet-stream",
				AccessKey,
			},
			body,
		});
	}

	private async init() {
		await this.findStorageZone("ruicsh");
	}

	private async findStorageZone(name: string) {
		if (this.storageZone) {
			return this.storageZone;
		}

		const response = await this.fetchApi("/storagezone");
		if (!response) {
			return;
		}

		const zones = response as BUNNY.IStorageZone[];
		if (!Array.isArray(zones)) {
			console.log("Failed to fetch storage zones.");
			return;
		}

		const rg = new RegExp(name, "i");
		this.storageZone = zones.find((sz) => rg.test(sz.Name));

		return;
	}

	private async fetchApi<T>(pathname: string, options?: RequestInit) {
		const AccessKey = config.get("bunnyCdn.apiKey");
		if (!AccessKey) {
			return;
		}

		const url = new URL("https://api.bunny.net");
		url.pathname = pathname;

		const reqOptions = {
			headers: {
				accept: "application/json",
				AccessKey,
				...options?.headers,
			},
			...options,
		};

		const response = await fetch(url, reqOptions);
		if (!response) {
			return;
		}

		const text = await response.text();
		if (!text) return {} as T;

		const data = JSON.parse(text);
		return data as T;
	}
}
