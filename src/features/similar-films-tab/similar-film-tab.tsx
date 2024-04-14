import React from "react";
import {similarMovies} from "../../shared/types/films";
import {Card, List} from "antd";
import Meta from "antd/es/card/Meta";
import {Link} from "react-router-dom";
import {AppRoutes} from "../../shared/types/route";


interface SimilarFilmsProps {
    similarMovies: similarMovies[];
}

export default function SimilarFilmTab({similarMovies}: SimilarFilmsProps) {
    return(
        <List grid={{
            gutter: 16,
            xs: 1,
            sm: 2,
            md: 2,
            lg: 3,
            xl: 4,
            xxl: 5,
        }}
              dataSource={similarMovies}
              renderItem={(item) => (
                  <List.Item>
                      <Card
                          style={{width: 300, height: 550}}
                          cover={<img alt="poster" height={450} width={300} src={item.poster.url} />}
                      >
                          <Meta title={<Link to={AppRoutes.Move_Details.replace(":id", String(item.id))}>{item.name}</Link>} description={`${item.alternativeName}, ${item.year}`} />
                      </Card>
                  </List.Item>
              )}
        >
        </List>
    )
}
