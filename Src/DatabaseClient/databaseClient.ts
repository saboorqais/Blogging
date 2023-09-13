import {Client} from 'pg'

const client: Client = new Client({
    user: 'postgres',
    host: "127.0.0.1",
    database: 'blog',
    password: 'saboor9494',
    port: 5432
})

export default client