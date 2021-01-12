import React from "react";
import {Card} from "antd";
import {Link} from "react-router-dom";


const BeerCard = ({beer}) => {
    return <Card
        style={{position: 'relative', width: '240px', height: '100%', textAlign:'center'}}
        hoverable
        cover={<img alt={beer.tagline}
                    style={{width: 'auto', height: '240px', margin: '0 auto', paddingTop: '10px'}}
                    src={beer.image_url}
        />}
    >
        <span>{beer.abv}%</span>
        <Link to={`beer/${beer.id}`} style={{position: 'absolute',top:'0',left:'0',right:'0',bottom:'0'}}/>
        <Card.Meta title={beer.name} description={beer.tagline} />
    </Card>
}

export default BeerCard