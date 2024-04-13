import {Collapse, Form, InputNumber, Select, Slider, Tooltip} from "antd";
import React, {useEffect, useState} from "react";
import {FilterOption} from "../../shared/utils/utils";
import {Filter, FilterItem, FilterSearch} from "../../shared/types/filter";
import {getCountries, getGenres} from "../../shared/api/api";
import {FilterLabel} from "../../shared/enum/enum";

interface Props {
    onFilterChange: (filterType: keyof FilterSearch, value: string) => void;
}

export default function CollapsePage({ onFilterChange }: Props) {
    const [genres, setGenres] = useState<Filter[]>([]);
    const [countries, setCountries] = useState<Filter[]>
    ([]);
    const [fromValue, setFromValue] = useState<number | null>(null);
    const [toValue, setToValue] = useState<number | null>(null);

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

    const handleCountryChange = (label: string, option: Filter | Filter[]) => {
        if (!Array.isArray(option)) {
            const {label} = option;
            onFilterChange('country', label);
        }
    };

    const handleGenreChange = (label: string, option: Filter | Filter[]) => {
        if (!Array.isArray(option)) {
            const {label} = option;
            onFilterChange('genre', label);
        }
    };

    const handleInputChange = (name: "from" | "to", value: number | null) => {
        if (name === "from") {
            setFromValue(value);
        } else {
            setToValue(value);
        }
    };

    const formatRange = (from: number | null, to: number | null): string => {
        if (from !== null && to !== null) {
            return `${from}-${to}`;
        } else if (from !== null) {
            return `${from >= 0 && from <= 18 ? "+" : ""}${from}`;
        } else if (to !== null) {
            return to.toString();
        } else {
            return "";
        }
    };

    useEffect(() => {
        const timerId = setTimeout(() => {
            const formattedRange = formatRange(fromValue, toValue);
            onFilterChange('ageRating', formattedRange);
        }, 1000);

        return () => {
            clearTimeout(timerId);
        };
    }, [fromValue, toValue]);


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
                    <Form style={{display: "flex", gap: "16px"}}>
                        <Form.Item<string> name="from">
                            <InputNumber
                                min={0}
                                max={18}
                                placeholder="От"
                                onChange={(value) => handleInputChange("from", value)}
                                value={fromValue}
                            />
                        </Form.Item>
                        <Form.Item<string> name="to">
                            <InputNumber
                                min={0}
                                max={18}
                                placeholder="До"
                                onChange={(value) => handleInputChange("to", value)}
                                value={toValue}
                            />
                        </Form.Item>
                    </Form>
                </>
            }
        ]}></Collapse>
    )
}
