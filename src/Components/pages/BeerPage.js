import React from 'react'
import {useQuery} from "@apollo/react-hooks";
import {GET_BEER} from "../../query/beers";
import {Card, Col, Descriptions, PageHeader, Row} from "antd";

const BeerPage = ({match,history}) => {
    const {id} = match.params
    const {loading, error, data} = useQuery(GET_BEER,{variables: {id: Number(id)}})

    if (error && !data || (data && !data.beer)) return <div>Error</div>
    if (loading) return <div>...Loading</div>

    const {beer} = data
    return <>
        <Row>
            <Col span={20} offset={2}>
                <PageHeader
                    className="site-page-header"
                    onBack={() => history.goBack()}
                    title="About"
                />
                <Row>
                    <Col span={6}>
                        <Card
                            style={{position: 'relative', width: '240px', height: '100%', textAlign:'center'}}
                            cover={<img alt={beer.tagline}
                                        style={{width: 'auto', height: '240px', margin: '0 auto', paddingTop: '10px'}}
                                        src={beer.image_url}
                            />}
                        >
                            <span>{beer.abv}%</span>
                            <Card.Meta title={beer.name} description={beer.tagline} />
                        </Card>
                    </Col>
                    <Col span={12} offset={1}>
                        <Descriptions title={beer.name} column={3}>
                            {[
                                {l: 'Слоган', v: beer.tagline, c: 3}, {l: 'Крепкость', v: beer.abv + ' %'},
                                {l: 'Горечь', v: beer.ibu + ' (IBU)',c: 2}, {l: 'ph',v: beer.ph},
                                {l: 'Цвет',v: beer.ebc + ' (EBC)',c: 2},
                                {l: 'Описание',v: beer.description,c: 3},
                                {l: 'Предоставлено',v: beer.contributed_by,c: 3},
                            ].map(i=><Descriptions.Item label={i.l} span={i.c}>{i.v}</Descriptions.Item>)}
                        </Descriptions>
                    </Col>
                </Row>
            </Col>
        </Row>
        </>
}

export default BeerPage