type IFilmInInbox = {
	genres: string;
	wishedOnDate?: string;
	watchedOnDate?: string;
	rating?: number;
	sourceUrl: string;
};

type ITmdbCrew = {
	name: string;
	job: string;
	department: string;
};

type ITmdbMovieDetails = {
	title: string;
	release_date: string;
	poster_path: string;
	credits: {
		crew: ITmdbCrew[];
	};
};

type IFilm = {
	director: string;
	title: string;
	year: number;
	genres: string;
	wishedOnDate?: string;
	watchedOnDate?: string;
	rating?: number;
	sourceUrl: string;
	id?: string;
};
