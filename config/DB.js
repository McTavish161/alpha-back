const mongoose = require('mongoose')
require('dotenv').config()

mongoose.connect(process.env.DB_URL, { useUnifiedTopology: true })
const conn = mongoose.connection

conn.on('open', () => {
    console.log("DB is ready!")
})
conn.on('error', () => {
    console.log("Error connecting to DB!")
})