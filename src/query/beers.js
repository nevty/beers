import {gql} from "apollo-boost";

export const GET_BEERS = gql`    
    query getBeers($page: Int, $limit: Int, $queryParams: QueryParams) {
        beers(page: $page, limit: $limit, queryParams: $queryParams)  {
            id
            name
            image_url
            tagline
            abv
        }
    }
`

export const GET_BEER = gql`
    query getBeer($id: Int) {
        beer(id: $id)  {
            name
            image_url
            tagline
            abv
            ebc
            ibu
            ph
            contributed_by
            description
        }
    }
`