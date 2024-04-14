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
    description: string;
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
    ageRating: number;
    description: string;
    similarMovies: similarMovies[];
    seasonsInfo: SeasonsInfo[],
}

export interface FilmUniversal {
    docs: FilmAndSeries[];
    total: number;
    limit: number;
    page: number;
    pages: number;
}
export interface SeasonsInfo {
    number: number,
    episodesCount: number
}


export interface similarMovies {
    id: number;
    name: string;
    year: string;
    poster: Poster,
    alternativeName: string;
}

export interface FilmPoster {
    docs: PosterInfo[];
    total: number;
    limit: number;
    page: number;
    pages: number;

}

export interface PosterInfo {
    url: string;
    previewUrl: string;
    movieId: number;
    id: number
}

export interface ReviewInfo {
    id: number;
    movieId: number;
    type: string;
    review: string;
    author: string;
    date: string;
}

export interface FilmReview {
    docs: ReviewInfo[];
    total: number;
    limit: number;
    page: number;
    pages: number;
}
