export interface Poster {
    url: string;
    previewUrl: string;
}

export interface FilmItem {
    name: string;
}

export interface Rating {
    kp: number;
    imdb: number;
    filmCritics: number;
    russianFilmCritics: number;
}

export interface Person {
    id: number;
    photo: string;
    name: string;
    profession: string;
}

export interface FilmAndSeries {
    id: number;
    name: string;
    shortDescription: string;
    poster: Poster;
    movieLength: number;
    year: number;
    countries: FilmItem[];
    genres: FilmItem[];
    persons: Person[];
    rating: Rating;
    isSeries: boolean;
    alternativeName: string;
    seriesLength: number;
}

export interface FilmUniversal {
    docs: FilmAndSeries[];
    total: number;
    limit: number;
    page: number;
    pages: number;
}
