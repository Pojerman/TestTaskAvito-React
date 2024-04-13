import {List, Skeleton} from "antd";
import React, {useEffect, useState} from "react";
import {FilmAndSeries, FilmUniversal} from "../../shared/types/films";
import {getFilmsAndSeries} from "../../shared/api/api";
import Paragraph from "antd/es/typography/Paragraph";
import {joinArrayWithCommas} from "../../shared/utils/utils";
import {FilterSearch} from "../../shared/types/filter";
import {DEFAULT_PAGE, PAGE_SIZE} from "../../shared/consts/consts";

interface Props {
    filters: FilterSearch;
}

export default function ListPage({ filters }: Props) {
    const [films, setFilms] = useState<FilmAndSeries[]>([]);
    const [limitPage, setLimitPage] = useState<number>(PAGE_SIZE);
    const [total, setTotal] = useState<number>(0);
    const [page, setPage] = useState<number>(DEFAULT_PAGE);
    const [loading, setLoading] = useState(false);


    useEffect(() => {
        setLoading(true);

        getFilmsAndSeries(page, limitPage, filters)
            .then((data: FilmUniversal) => {
                setLimitPage(data.limit);
                setTotal(data.total);
                setFilms(Object.values(data.docs));
                setLoading(false);
            })
            .catch((e) => {
                console.log(e);
                setLoading(false);
            })
    }, [page, limitPage, filters]);

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
                <Skeleton loading={loading} active>
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
                            ${item.movieLength !== null ? item.movieLength + " мин." : item.seriesLength + " сезонов."}
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
                </Skeleton>
            )}
        >
        </List>
    )
}
