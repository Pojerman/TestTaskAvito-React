import axios, {AxiosResponse} from 'axios';
import {FilterItem, FilterSearch} from "../types/filter";
import {API_URL, DEFAULT_PAGE, PAGE_SIZE} from "../consts/consts";
import {FilmUniversal} from "../types/films";

export const getCountries = async (): Promise<FilterItem[] | []> => {
    try {
        const response = await axios.get(`${API_URL}/v1/movie/possible-values-by-field`, {
            params: {
                field: 'countries.name',
            },
            headers: {
                'X-API-KEY': process.env.REACT_APP_API_TOKEN
            }
        });
        return response.data;
    } catch (e) {
        console.log(e);
        return [];//В случае ошибки запрос повторяется 3 раза - дописать
    }
}

export const getGenres = async (): Promise<FilterItem[] | []> => {
    try {
        const response = await axios.get(`${API_URL}/v1/movie/possible-values-by-field`, {
            params: {
                field: 'genres.name',
            },
            headers: {
                'X-API-KEY': process.env.REACT_APP_API_TOKEN
            }
        });
        return response.data;
    } catch (e) {
        console.log(e);
        return [];//В случае ошибки запрос повторяется 3 раза - дописать
    }
}

export const getFilmsAndSeries = async (page: number = DEFAULT_PAGE, limit: number = PAGE_SIZE): Promise<FilmUniversal> => {
    try {
        const response = await axios.get(`${API_URL}/v1.4/movie`, {
            params: {
                page,
                limit,
                selectFields: [
                    'id',
                    'poster',
                    'name',
                    'movieLength',
                    'year',
                    'countries',
                    'genres',
                    'persons',
                    'rating',
                    'shortDescription',
                    'isSeries',
                    'alternativeName'
                ],
                sortField: '',
                sortType: 1,
            },
            headers: {
                'X-API-KEY': process.env.REACT_APP_API_TOKEN
            }
        })
        return response.data
    } catch (e) {
        console.log(e)
        return {docs: [], limit: 0, page: 0, pages: 0, total: 0};
    }
}


export const getFilter = async (filters: FilterSearch): Promise<FilmUniversal> => {
    try {
        const { country, genre } = filters;
        const params: any = {
            page: DEFAULT_PAGE,
            limit: PAGE_SIZE,
            selectFields: [
                'id',
                'poster',
                'name',
                'movieLength',
                'year',
                'countries',
                'genres',
                'persons',
                'rating',
                'shortDescription',
                'isSeries',
                'alternativeName'
            ],
            sortField: '',
            sortType: 1,
        };

        if (country) {
            params["countries.name"] = country;
        }

        if (genre) {
            params["genres.name"] = genre;
        }
        const response = await axios.get(`${API_URL}/v1.4/movie`, {
            params,
            headers: {
                'X-API-KEY': process.env.REACT_APP_API_TOKEN
            }
        });
        return response.data;
    } catch (e) {
        console.log(e);
        return {docs: [], limit: 0, page: 0, pages: 0, total: 0};
    }
}
