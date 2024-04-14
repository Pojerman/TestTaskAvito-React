import {ReviewInfo} from "../../shared/types/films";
import {DEFAULT_PAGE, PAGE_SIZE} from "../../shared/consts/consts";
import {List} from "antd";
import {SmileOutlined} from "@ant-design/icons";
import Paragraph from "antd/es/typography/Paragraph";
import React, {useEffect, useState} from "react";
import {getReview} from "../../shared/api/api";
import {formatDate} from "../../shared/utils/utils";

interface ReviewProps {
    id: string | undefined;
}
export default function ReviewTab({id}: ReviewProps) {
    const [ellipsis, setEllipsis] = useState<boolean>(true);
    const [total, setTotal] = useState<number>(0);
    const [movieReview, setMovieReview] = useState<ReviewInfo[]>([]);
    const [pageReview, setPageReview] = useState<number>(DEFAULT_PAGE)

    useEffect(() => {
        if(id) {
            getReview(pageReview, id)
                .then((info) => {
                    setTotal(info.total);
                    setMovieReview(info.docs);
                })
                .catch((e) => {
                    console.log(e);
                })
        }

    }, [id, pageReview]);

    return(
        <List
            itemLayout="vertical"
            pagination={{
                onChange: (page) => {
                    setPageReview(page);
                },
                total: total,
                pageSize: PAGE_SIZE,
                hideOnSinglePage: true,
                showSizeChanger: false
            }}
            dataSource={movieReview}
            renderItem={(item) => (
                <List.Item key={item.id}>
                    <List.Item.Meta title={<span>{item.author} {item.type === 'Позитивный' ? <SmileOutlined/> : <SmileOutlined rotate={180} />}</span>} description={formatDate(item.date)}>
                    </List.Item.Meta>
                    <Paragraph ellipsis={ellipsis ? { rows: 2, expandable: true, symbol: 'more' } : false}>
                        {item.review}
                    </Paragraph>
                </List.Item>
            )}
        >
        </List>
    )
}
