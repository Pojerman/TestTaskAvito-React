import React from "react";
import Title from "antd/es/typography/Title";
import {Link} from "react-router-dom";
import {AppRoutes} from "../../shared/types/route";

export default function NotFound() {
    return(
        <>
            <Title>Такой страницы не сущетсвует</Title>
            <Title level={2}><Link to={AppRoutes.Main}>Главная</Link></Title>
        </>
    )
}
