import Title from "antd/es/typography/Title";
import React, {useEffect, useState} from "react";
import {Header} from "antd/es/layout/layout";
import "./header-page.css";
import {Input, List, theme} from "antd";
import {FilmAndSeries, FilmUniversal} from "../../shared/types/films";
import {getMovieSearch} from "../../shared/api/api";

export default function HeaderPage() {
    const [data, setData] = useState<FilmAndSeries[]>([]);
    const [showList, setShowList] = useState(false);
    const [searchValue, setSearchValue] = useState("");
    const {
        token: { colorBgContainer, borderRadiusLG },
    } = theme.useToken();

    const handleSearch: React.ChangeEventHandler<HTMLInputElement> = (event) => {
        const value = event.target.value;
        console.log(value)

        const timerId = setTimeout(() => {
            getMovieSearch(value)
                .then((data: FilmUniversal) => {
                    setData(Object.values(data.docs));
                    setShowList(true);
                })
                .catch((e) => {
                    console.log(e);
                    setShowList(false)
                })

        }, 1000)
    };

    useEffect(() => {

            const timerId = setTimeout(() => {
                if(searchValue) {
                    getMovieSearch(searchValue)
                        .then((data: FilmUniversal) => {
                            setData(Object.values(data.docs));
                            setShowList(true);
                        })
                        .catch((e) => {
                            console.log(e);
                            setShowList(false)
                        })
                }
            }, 1000);

        return () => {
            clearTimeout(timerId);
        }
    }, [searchValue]);

    const handleSearchChange: React.ChangeEventHandler<HTMLInputElement> = (event) => {
        setSearchValue(event.target.value);
    };

    return(
        <Header>
            <Title className="title" style={{display: "flex", alignItems: "flex-end", justifyContent: "space-between"}}>Кинопоиск Dev <Input placeholder="Фильмы, сериалы" style={{width: "40%"}} onChange={handleSearchChange}/></Title>
            {showList && (
                <List
                    style={{ background: colorBgContainer, borderRadius: borderRadiusLG, border: "1px solid rgba(5, 5, 5, 0.06)", margin: "0 0 0 auto", width: "260px" }}
                    itemLayout="horizontal"
                    dataSource={data}
                    size="small"
                    renderItem={(item: FilmAndSeries) => (
                        <List.Item
                            key={item.id}
                            extra={<img src={item.poster.url} alt="poster" width={32} height={48} />}
                        >
                            <List.Item.Meta
                                title={<a href="#">{item.name}</a>}
                                description={`${item.rating.kp}, ${item.alternativeName ? item.alternativeName + ", " : ""} ${item.year}`}
                            />
                        </List.Item>
                    )}
                />
            )}
        </Header>
    )
}
