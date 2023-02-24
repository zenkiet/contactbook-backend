const config = {
    app: {
        port: process.env.PORT || 3000,
    },

    db: {
        uri: process.env.DB_HOST || 'mongodb://127.0.0.1:27017/contactbook',
    }
}

module.exports = config;