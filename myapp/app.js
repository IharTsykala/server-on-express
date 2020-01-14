const express = require('express');
const router = require('./router');

const app = express()
const port = 3000
app.use(express.json())
app.use('/users', router)

app.listen(port, () => {
    console.log('server on port ' + port)
})