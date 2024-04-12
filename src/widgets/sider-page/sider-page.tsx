import {Menu, MenuProps, Select, Space, theme} from "antd";
import Sider from "antd/es/layout/Sider";
import React, {useState} from "react";
import {SizeType} from "antd/es/config-provider/SizeContext";
import CollapsePage from "../../features/collapse-page/collapse-page";
import {FilterSearch} from "../../shared/types/filter";

interface Props {
    onFilterChange: (filterType: keyof FilterSearch, value: string) => void;
}


export default function SiderPage({onFilterChange}: Props) {
    const {
        token: { colorBgContainer, borderRadiusLG },
    } = theme.useToken();

    const [size, setSize] = useState<SizeType>('middle');

    return(
        <Sider style={{ background: colorBgContainer }} width={230}>
            <Space size="middle" style={{ position: "sticky", zIndex: "1", top: "70px" }}>
                <CollapsePage onFilterChange={onFilterChange}/>
            </Space>
        </Sider>
    )
}
