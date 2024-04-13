import {Collapse, InputNumber, Select, Slider, Tooltip} from "antd";
import React, {useEffect, useState} from "react";
import {FilterOption} from "../../shared/utils/utils";
import {Filter, FilterItem, FilterSearch} from "../../shared/types/filter";
import {getCountries, getFilter, getGenres} from "../../shared/api/api";
import {FilterLabel} from "../../shared/enum/enum";

interface Props {
    onFilterChange: (filterType: keyof FilterSearch, value: string) => void;
}

const onSearch = (value: string) => {
    // console.log('search:', value);
};

export default function CollapsePage({ onFilterChange }: Props) {
    const [genres, setGenres] = useState<Filter[]>([]);
    const [countries, setCountries] = useState<Filter[]>
    ([]);
    const [ageRating, setAgeRating] = useState<string  | null>(null);
    const [fromAge, setFromAge] = useState<number | null>(null);
    const [toAge, setToAge] = useState<number | null>(null);

    useEffect(() => {
        getCountries()
            .then((data: FilterItem[]) => {
                const options = [
                    { value: 'all', label: 'Все страны' },
                    ...data.map((country) => ({
                        value: country.slug,
                        label: country.name
                    }))
                ];
                setCountries(options)
            })
            .catch((e) => {
                console.log(e)
            });

        getGenres()
            .then((data: FilterItem[]) => {
                const options = [
                    { value: 'all', label: 'Все жанры' },
                    ...data.map((genres) => ({
                        value: genres.slug,
                        label: genres.name
                    }))
                ];
                setGenres(options);
            })
            .catch((e) => {
                console.log(e);
            });

    }, []);

    const handleCountryChange = (option: Filter | Filter[]) => {
        if (!Array.isArray(option)) {
            const {label} = option;
            onFilterChange('country', label);
        }
    };

    const handleGenreChange = (option: Filter | Filter[]) => {
        if (!Array.isArray(option)) {
            const {label} = option;
            onFilterChange('genre', label);
        }
    };

    const handleAgeChange = (index: number) => (value: number | null) => {
        index === 0 ? setFromAge(value) : setToAge(value);
        if (fromAge !== null && toAge !== null) {
            setAgeRating(`${fromAge}-${toAge}`);
        } else {
            setAgeRating(String(value))
        }
    };

    return(
        <Collapse defaultActiveKey={['1', '2', '3']} ghost items={[
            {
                key: '1',
                label: FilterLabel.Countries,
                children: <Select
                    showSearch
                    placeholder="Все страны"
                    optionFilterProp="children"
                    onChange={handleCountryChange}
                    onSearch={onSearch}
                    filterOption={FilterOption}
                    size="middle"
                    style={{ width: 200 }}
                    options={countries}>
                </Select>
            },
            {
                key: '2',
                label: FilterLabel.Genres,
                children: <Select
                    showSearch
                    placeholder="Все жанры"
                    optionFilterProp="children"
                    onChange={handleGenreChange}
                    onSearch={onSearch}
                    filterOption={FilterOption}
                    size="middle"
                    style={{ width: 200 }}
                    options={genres}>
                </Select>
            },
            {
                key: '3',
                label: FilterLabel.Age,
                children: <>
                    <InputNumber min={0} max={18} placeholder="От" onChange={handleAgeChange(0)}/>
                    <InputNumber min={0} max={18} placeholder="До" onChange={handleAgeChange(1)}/>
                </>
            }
        ]}></Collapse>
    )
}
