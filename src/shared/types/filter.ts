export interface Filter {
    label: string;
    value: string;
}

export interface FilterItem {
    slug: string;
    name: string;
}

export interface FilterSearch {
    country: string;
    genre: string;
    ageRating: string;
}
