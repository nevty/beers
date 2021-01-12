const {GraphQLServer} = require('graphql-yoga')
const axios = require('axios')

const baseURL = 'https://api.punkapi.com/v2'

const resolvers = {
    Query: {
        beers: (_, { page = 1, limit = 30, queryParams}) => {
            const params = { page, per_page: limit, ...queryParams }
            return axios.get(`${baseURL}/beers`,{params})
                .then(res=>res.data)
        },
        beer: (_, { id }) => {
            return axios.get(`${baseURL}/beers/${id}`)
                .then(res=>{
                    console.log(res.headers['x-ratelimit-remaining'])
                    return res.data[0]
                })
        }
    }
}

const server = new GraphQLServer({
    typeDefs: './server/schema.graphql',
    resolvers
})

const port = 4000

server.start({port},()=>{
    console.log(`Server running on http://localhost:${port}`)
})