const express = require('express');
// const swaggerUi = require('swagger-ui-express');
// const swaggerDocument = require('../swagger');
const router = require('./router');
// const mongoose = require('mongoose');

// const options = {
//     customJs: '/custom.js'
//   };

// mongoose.connect('./database.JSON', {
//     useNewUrlParser: true,
//     useCreateIndex: true,
//     useFindAndModify: false,
//     useUnifiedTopology: true
// })

const app = express()
const port = 3000
app.use(express.json())
// app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument, options));
app.use('/users', router)
// app.use('/leagues', router.leagueRouter)
// app.use('/races', router.raceRouter)
// app.use('/stages', router.stageRouter)
// app.get('/', function (req, res) {
//     res.send('./dataBase.JSON');
//   });

app.listen(port, () => {
    console.log('server on port ' + port)
})