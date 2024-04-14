import Title from "antd/es/typography/Title";
import React, {useEffect, useState} from "react";
import {Header} from "antd/es/layout/layout";
import "./header-page.css";
import {Input, List, theme} from "antd";
import {FilmAndSeries, FilmUniversal} from "../../shared/types/films";
import {getMovieSearch} from "../../shared/api/api";
import {Link} from "react-router-dom";
import {AppRoutes} from "../../shared/types/route";

export default function HeaderPage() {
    const [data, setData] = useState<FilmAndSeries[]>([]);
    const [showList, setShowList] = useState(false);
    const [searchValue, setSearchValue] = useState("");
    const {
        token: { colorBgContainer, borderRadiusLG },
    } = theme.useToken();


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
        if(!event.target.value) {
            setShowList(false);
        }
        setSearchValue(event.target.value);
    };

    const handleClickOutsideList = () => {
        setShowList(false);
    };

    return(
        <Header onClick={handleClickOutsideList} className="header">
            <Title className="title">Кинопоиск Dev <Input style={{width: "auto"}} placeholder="Фильмы, сериалы" onChange={handleSearchChange} allowClear/></Title>
            {showList && (
                <List className="search-list"
                    style={{ background: colorBgContainer, borderRadius: borderRadiusLG}}
                    itemLayout="horizontal"
                    dataSource={data}
                    size="small"
                    renderItem={(item: FilmAndSeries) => (
                        <List.Item
                            key={item.id}
                            extra={<img src={item.poster.url} alt="poster" width={32} height={48} />}
                        >
                            <List.Item.Meta
                                title={<Link to={AppRoutes.Move_Details.replace(':id', String(item.id))}>{item.name}</Link>}
                                description={`${item.rating.kp}, ${item.alternativeName ? item.alternativeName + ", " : ""} ${item.year}`}
                            />
                        </List.Item>
                    )}
                />
            )}
        </Header>
    )
}
