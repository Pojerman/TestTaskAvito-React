import React from "react";
import {SeasonsInfo} from "../../shared/types/films";
import {List, Typography} from "antd";

interface SeasonsProps {
    seasonsInfo: SeasonsInfo[];
}

export default function SeasonsTab({seasonsInfo}: SeasonsProps) {
    return(
        <List
            bordered
            dataSource={seasonsInfo}
            renderItem={(item) => (
                <List.Item>
                    <Typography.Text>Сезон {item.number} - Серий {item.episodesCount}</Typography.Text>
                </List.Item>
            )}
        />
    )
}
