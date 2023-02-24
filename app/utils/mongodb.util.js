const { MongoClient } = require('mongodb');

class MongoDB {
    static connect = async (uri) => {
        if(this.client) {
            return this.client;
        } else {
            this.client = await MongoClient.connect(uri, { useUnifiedTopology: true });
            return this.client;
        }
    }
}

module.exports = MongoDB;