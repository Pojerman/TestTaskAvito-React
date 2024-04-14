import React, {useEffect, useState} from "react";
import {useParams} from "react-router-dom";
import {FilmAndSeries, ReviewInfo} from "../../shared/types/films";
import {getFilm} from "../../shared/api/api";
import {Image, Tabs, theme} from "antd";
import Title from "antd/es/typography/Title";
import "./move-details.css";
import Paragraph from "antd/es/typography/Paragraph";
import {joinArrayWithCommas} from "../../shared/utils/utils";
import ActorTab from "../../features/actor-tab/actor-tab";
import ReviewTab from "../../features/review-tab/review-tab";
import SimilarFilmTab from "../../features/similar-films-tab/similar-film-tab";
import PosterTab from "../../features/poster-tab/poster-tab";
import SeasonsTab from "../../features/seasons-tab/seasons-tab";
import {TabsDetails} from "../../shared/enum/enum";

export default function MovieDetails() {
    const { id } = useParams<string>();
    const [movieDetails, setMovieDetails] = useState<FilmAndSeries | null>(null);
    const {
        token: { colorBgContainer, borderRadiusLG },
    } = theme.useToken();

    useEffect(() => {
        if(id) {
            getFilm(id)
                .then((info) => {
                    setMovieDetails(info);
                })
                .catch((e) => {
                    console.log(e);
                })
        }
    }, [id]);

    return (
        <>
            <div className="movie" style={{background: colorBgContainer, borderRadius: borderRadiusLG, flexGrow: 1}}>
                {movieDetails && (
                    <>
                        <div className="movie-head">
                            <div className="movie-poster">
                                <Image src={movieDetails.poster.url} className="movie-poster__img"></Image>
                            </div>
                            <div className="info-about">
                                <Title className="about-title">{movieDetails.name}&nbsp;({movieDetails.year})</Title>
                                <Paragraph className="about-txt" type="secondary">{movieDetails.alternativeName}&nbsp;{movieDetails.ageRating}+</Paragraph>
                                <Paragraph>Описание: {movieDetails.description}</Paragraph>
                                <Paragraph>
                                    Страна: {joinArrayWithCommas(movieDetails.countries.map((country) => country.name))}
                                </Paragraph>
                                <Paragraph>
                                    Жанр: {joinArrayWithCommas(movieDetails.genres.map((genres) => genres.name))}
                                </Paragraph>
                                <Paragraph>
                                    KP: {movieDetails.rating.kp}, IMDB: {movieDetails.rating.imdb}
                                </Paragraph>
                            </div>
                        </div>
                        <div className="info-more">
                            <Tabs defaultActiveKey="1" items={[
                                {
                                    label: `${TabsDetails.Actor}`,
                                    key: '1',
                                    children: <ActorTab persons={movieDetails.persons}/>
                                },
                                {
                                    label: `${TabsDetails.Review}`,
                                    key: '2',
                                    children: <ReviewTab id={id}/>,
                                },
                                {
                                    label: `${TabsDetails.Seasons}`,
                                    key: '3',
                                    children: <SeasonsTab seasonsInfo={movieDetails.seasonsInfo}/>,
                                    disabled: movieDetails.isSeries ? false : true,

                                },
                                {
                                    label: `${TabsDetails.Posters}`,
                                    key: '4',
                                    children: <PosterTab id={id}/>,
                                },
                                {
                                    label: `${TabsDetails.Similar}`,
                                    key: '5',
                                    children: <SimilarFilmTab similarMovies={movieDetails.similarMovies}/>,
                                },
                            ]}/>
                        </div>
                    </>
                )}
            </div>
        </>
    )
}
