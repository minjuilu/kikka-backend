const express = require('express')
const app = express()
const port = 3000
const dotenv = require('dotenv')
const cors = require("cors");
dotenv.config()

const register = require('./src/routes/register');
const login = require('./src/routes/login');
const googleLogin = require('./src/routes/login');

app.use(express.json());
app.use(cors())
app.use('/api', register)
app.use('/api', login)
app.use('/api', googleLogin)

app.listen(port, () => {
	console.log(`Server listening on port ${port}`)
})