import {Person} from "../../shared/types/films";
import {Image, List} from "antd";
import {PAGE_SIZE} from "../../shared/consts/consts";
import React from "react";


interface ActorProps {
    persons: Person[]
}

export default function ActorTab({persons}: ActorProps) {
    return(
        <List
            itemLayout="horizontal"
            pagination={{
                onChange: (page) => {
                    console.log(page);
                },
                pageSize: PAGE_SIZE,
                hideOnSinglePage: true
            }}
            dataSource={persons}
            renderItem={(item) => (
                <List.Item key={item.id}>
                    <List.Item.Meta avatar={<Image width={54} height={82} src={item.photo}></Image>} title={item.name} description={item.description}>
                    </List.Item.Meta>
                </List.Item>
            )}
        >
        </List>
    )
}
