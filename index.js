require('dotenv').config()
const express = require('express')
const sequelize = require('./db.js')
const models = require('./models/models.js')
const cors = require('cors')
const fileUpload = require('express-fileupload')
const router = require('./routes/index.js')
const errorMiddleware = require('./middleware/ErrorHandlingMiddleware.js')
const path = require('path')



const PORT = process.env.PORT || 5000

const app = express()
app.use(cors())
app.use(express.json())
app.use(express.static(path.resolve(__dirname, 'static')))
app.use(fileUpload({}))
app.use(errorMiddleware)
app.use('/api', router)
 
const start = async () => { 
    try {
        await sequelize.authenticate()
        await sequelize.sync()
        app.listen(PORT, () => console.log('server ok'))

    } catch (err) {
        console.log(err)
    }
}
 
start()