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
import NotFound from "../pages/not-found/not-found";

export default function App() {
    return(
        <Layout>
            <Space direction="vertical" size="large" className="space">
            <HeaderPage />
            <Content className="content">
                <Routes>
                    <Route path={AppRoutes.Main} element={<Main />}></Route>
                    <Route path={AppRoutes.Move_Details} element={<MovieDetails/>}></Route>
                    <Route path="*" element={<NotFound/>}></Route>
                </Routes>
            </Content>
            <FooterPage />
            </Space>
        </Layout>
    )
}
