import {List} from "antd";
import React, {useEffect, useState} from "react";
import {FilmAndSeries, FilmUniversal} from "../../shared/types/films";
import {getFilmsAndSeries, getFilter} from "../../shared/api/api";
import Paragraph from "antd/es/typography/Paragraph";
import {joinArrayWithCommas} from "../../shared/utils/utils";
import {FilterSearch} from "../../shared/types/filter";

interface Props {
    filters: FilterSearch;
}

export default function ListPage({ filters }: Props) {
    const [films, setFilms] = useState<FilmAndSeries[]>([]);
    const [limitPage, setLimitPage] = useState<number>(10);
    const [total, setTotal] = useState<number>(0);
    const [page, setPage] = useState<number>(1)

    useEffect(() => {
        getFilmsAndSeries(page, limitPage)
            .then((data: FilmUniversal) => {
                setLimitPage(data.limit);
                setTotal(data.total);
                setFilms(Object.values(data.docs));
            })
            .catch((e) => {
                console.log(e);
            })
    }, [page, limitPage]);

    useEffect(() => {
        getFilter(filters)
            .then((data: FilmUniversal) => {
                setLimitPage(data.limit);
                setTotal(data.total);
                setFilms(Object.values(data.docs));
            })
            .catch((e) => {
                console.log(e);
            })
    }, [filters]);

    return(
        <List
            itemLayout="vertical"
            size="large"
            pagination={{
                onChange: (page, pageSize) => {
                    setPage(page);
                    setLimitPage(pageSize);
                },
                align: "center",
                pageSize: limitPage,
                total: total,
            }}
            dataSource={films}
            renderItem={(item: FilmAndSeries) => (
                <List.Item
                    key={item.id}
                    extra={
                        <img src={item.poster.url} alt="poster" width={200}/>
                    }
                >
                    <List.Item.Meta
                        title={<a href="#">{item.name}</a>}
                        description={`
                            ${item.alternativeName ? item.alternativeName + ", " : ""}
                            ${item.year},
                            ${item.movieLength} мин.
                        `}
                    >
                    </List.Item.Meta>
                    <Paragraph>
                        Описание: {item.shortDescription}
                    </Paragraph>
                    <Paragraph>
                        Страна: {joinArrayWithCommas(item.countries.map((country) => country.name))}
                    </Paragraph>
                    <Paragraph>
                        Участники:
                    </Paragraph>
                    <Paragraph>
                        Жанр: {joinArrayWithCommas(item.genres.map((genres) => genres.name))}
                    </Paragraph>
                    <Paragraph>
                        KP: {item.rating.kp}, IMDB: {item.rating.imdb}
                    </Paragraph>
                </List.Item>
            )}
        >

        </List>
    )
}
