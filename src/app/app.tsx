import React from "react";
import {Route, Routes} from "react-router-dom";
import Main from "../pages/main/main";
import MovieDetails from "../pages/movie-details/movie-details";
import {AppRoutes} from "../shared/types/route";
import {Layout, Space} from "antd";
import HeaderPage from "../widgets/header-page/header-page";
import {Content} from "antd/es/layout/layout";
import FooterPage from "../widgets/footer-page/footer-page";
import './app.css';
import SiderPage from "../widgets/sider-page/sider-page";

export default function App() {
    return(
        <Layout>
            <Space direction="vertical" size="large" style={{ display: 'flex' }}>
           <HeaderPage />
            <Content className="content">
                <Routes>
                    <Route path={AppRoutes.Main} element={<Main />}></Route>
                    <Route path={AppRoutes.Move_Details} element={<MovieDetails/>}></Route>
                </Routes>
            </Content>
            <FooterPage />
            </Space>
        </Layout>
    )
}
