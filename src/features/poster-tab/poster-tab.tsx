import {useEffect, useState} from "react";
import {DEFAULT_PAGE, PAGE_SIZE} from "../../shared/consts/consts";
import {FilmPoster} from "../../shared/types/films";
import {getPosters} from "../../shared/api/api";
import React from "react";
import {Card, Image, List} from "antd";
import Meta from "antd/es/card/Meta";
import {Link} from "react-router-dom";
import {AppRoutes} from "../../shared/types/route";

interface PosterProps {
    id: string | undefined;
}
export default function PosterTab({id}: PosterProps) {
    const [total, setTotal] = useState<number>(0);
    const [pagePoster, setPagePoster] = useState<number>(DEFAULT_PAGE);
    const [limitPosters, setLimitPosters] = useState<number>(PAGE_SIZE);
    const [posters, setPosters] = useState<FilmPoster | null>(null)

    useEffect(() => {
        if(id) {
            getPosters(pagePoster, limitPosters, id)
                .then((poster) => {
                    setTotal(poster.total);
                    setPosters(poster);
                })
                .catch((e) => {
                    console.log(e);
                })
        }

    }, [id, limitPosters, pagePoster]);

    return(
        <>
            {posters && (
                <Image.PreviewGroup>
                    <List
                        grid={{
                            gutter: 16,
                            xs: 1,
                            sm: 2,
                            md: 2,
                            lg: 3,
                            xl: 4,
                            xxl: 5,
                        }}
                        pagination={{
                            onChange: (page) => {
                                console.log(page)
                                setPagePoster(page);
                            },
                            pageSize: PAGE_SIZE,
                            hideOnSinglePage: true,
                            total: total
                        }}
                        dataSource={posters.docs}
                        renderItem={(item) => (
                            <List.Item>
                                <Image alt="poster" width={280} height={380} src={item.url} />
                            </List.Item>
                        )}
                    >
                    </List>
                </Image.PreviewGroup>
            )}
        </>
    )
}
