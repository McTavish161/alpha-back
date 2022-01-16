// const cluster = require('cluster')
// const numCpus = require('os').cpus().length
const express = require('express')
const cors = require('cors')
const db = require('./config/DB')
// const Users = require('./controllers/Users')


// if (cluster.isMaster) {
//     console.log(`Master ${process.pid} is running!`)
//     for (let i = 0; i < 4; i++) {
//         cluster.fork()
//     }
//     cluster.on('fork', (worker, code, signal) => {
//         console.log(`Worker ${worker.process.pid} created!`)
        
//     })
//     cluster.on('exit', (worker, code, signal) => {
//         console.log(`Worker ${worker.process.pid} died!`)
//         cluster.fork()
//     })
// }
// else {
    // app.use('/users', Users)
    const app = express()
    const Auth = require('./controllers/Auth')
    require('dotenv').config()
    app.use(cors())
    app.use(express.json())
    app.use('/auth', Auth)
    app.listen(process.env.PORT || 80, () => {
        console.log('Alpha is online!')
    })
// }
