import React, {useEffect, useState} from "react";
import {Avatar, Divider, Layout, List, Skeleton, Space, theme} from "antd";
import SiderPage from "../../widgets/sider-page/sider-page";
import {Content} from "antd/es/layout/layout";
import { LikeOutlined, MessageOutlined, StarOutlined } from '@ant-design/icons';
import {FilmAndSeries} from "../../shared/types/films";
import {getFilmsAndSeries} from "../../shared/api/api";
import ListPage from "../../widgets/list-page/list-page";
import {FilterSearch} from "../../shared/types/filter";


const IconText = ({ icon, text }: { icon: React.FC; text: string }) => (
    <Space>
        {React.createElement(icon)}
        {text}
    </Space>
);


export default function Main() {
    const {
        token: { colorBgContainer, borderRadiusLG },
    } = theme.useToken();

    const [filters, setFilters] = useState<FilterSearch>({country: "", genre: "", ageRating: ""});

    const handleFilterChange = (filterType: keyof FilterSearch, value: string) => {
        setFilters(prevFilters => ({
            ...prevFilters,
            [filterType]: value,
        }));
    };

    return(
            <Layout style={{ padding: '24px 0', background: colorBgContainer, borderRadius: borderRadiusLG }}>
                <SiderPage onFilterChange={handleFilterChange}></SiderPage>
                <Divider type="vertical" style={{"height": "auto"}}></Divider>
                <Content style={{minHeight: 280, padding: '0 24px 0 16px' }}>
                    <ListPage filters={filters}></ListPage>
                </Content>
            </Layout>


    )
}
