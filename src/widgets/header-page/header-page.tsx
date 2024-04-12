import Title from "antd/es/typography/Title";
import React from "react";
import {Header} from "antd/es/layout/layout";
import "./header-page.css";
import {Input} from "antd";

export default function HeaderPage() {
    return(
        <Header>
            <Title className="title" style={{display: "flex", alignItems: "flex-end", justifyContent: "space-between"}}>Кинопоиск Dev <Input placeholder="Фильмы, сериалы" style={{width: "40%"}}/></Title>
        </Header>
    )
}
