import {Button, Drawer, Space, theme} from "antd";
import Sider from "antd/es/layout/Sider";
import React, {useState} from "react";
import CollapsePage from "../../features/collapse-page/collapse-page";
import {FilterSearch} from "../../shared/types/filter";
import "./sider-page.css";
interface Props {
    onFilterChange: (filterType: keyof FilterSearch, value: string) => void;
}

export default function SiderPage({onFilterChange}: Props) {
    const {
        token: { colorBgContainer, borderRadiusLG },
    } = theme.useToken();
    const [open, setOpen] = useState(false);

    const showDrawer = () => {
        setOpen(true);
    };

    const onClose = () => {
        setOpen(false);
    };

    return(
        <Sider style={{ background: colorBgContainer }} width={230}>
            <Space size="middle" style={{ position: "sticky", zIndex: "1", top: "70px" }}>
                <div className="container">
                    <div className="container-mobile">
                        <Button type="primary" onClick={showDrawer}>Фильтр</Button>
                        <Drawer title="Фильтр" onClose={onClose} open={open}>
                            <CollapsePage onFilterChange={onFilterChange}/>
                        </Drawer>
                    </div>
                    <div className="container-desktop">
                        <CollapsePage onFilterChange={onFilterChange}/>
                    </div>
                </div>
            </Space>
        </Sider>
    )
}
