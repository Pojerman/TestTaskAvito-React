import React, {useState} from "react";
import {Layout, theme} from "antd";
import SiderPage from "../../widgets/sider-page/sider-page";
import {Content} from "antd/es/layout/layout";
import './main.css';
import ListPage from "../../widgets/list-page/list-page";
import {FilterSearch} from "../../shared/types/filter";

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
            <Layout style={{ background: colorBgContainer, borderRadius: borderRadiusLG }} className="layout-container">
                <SiderPage onFilterChange={handleFilterChange}></SiderPage>
                <Content style={{padding: '0 24px 0 16px' }} className="list-container">
                    <ListPage filters={filters}></ListPage>
                </Content>
            </Layout>


    )
}
