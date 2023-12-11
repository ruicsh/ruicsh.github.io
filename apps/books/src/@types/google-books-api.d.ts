type IGoogleBookApiVolumeInfo = {
	authors: string[];
	description: string;
	pageCount: number;
	publishedDate: string;
	publisher: string;
	subtitle: string;
	title: string;
};

type IGoogleBookApiVolume = {
	volumeInfo: IGoogleBookApiVolumeInfo;
};

type IGoogleBookApiVolumesResponse = {
	kind: string;
	totalItems: number;
	items: IGoogleBookApiVolume[];
};
