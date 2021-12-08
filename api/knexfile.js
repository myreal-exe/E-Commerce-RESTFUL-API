module.exports={
    development:{
        client: 'postgresql',
        connection: 'postgres://postgres:.-xanax+x.@localhost:5432/ecommerce_api',
        migrations : {
            directory: __dirname + "/migrations"
        },
        seeds:{
            directory: __dirname + "/seeds"
        }
    }
}