const mongoose = require('mongoose');

const config = require('./keys.config');

const connectDB = () => {
    mongoose.connect(config.MONGO_URI, { useNewUrlParser: true, useUnifiedTopology: true, useFindAndModify: false })
        .then(() => console.log('mongoDb connected!'))
        .catch(e => console.log(e))
}

module.exports = connectDB;