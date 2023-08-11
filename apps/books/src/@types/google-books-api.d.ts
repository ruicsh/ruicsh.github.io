interface IGoogleBookApiVolumeInfo {
  authors: string[];
  description: string;
  pageCount: number;
  publishedDate: string;
  publisher: string;
  subTitle: string;
  title: string;
}

interface IGoogleBookApiVolume {
  volumeInfo: IGoogleBookApiVolumeInfo;
}

interface IGoogleBookApiVolumesResponse {
  kind: string;
  totalItems: number;
  items: IGoogleBookApiVolume[];
}
