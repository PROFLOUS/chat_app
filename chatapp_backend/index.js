const express = require('express')
const cors = require('cors');
const http = require('http');
const socket = require('./src/app/socket');
const socketio = require('socket.io');
const routes = require('./src/routes');
const handleErr = require('./src/middleware/handleEror');
const morgan = require('morgan');
const bodyParser = require('body-parser');
const getId = require('./src/middleware/getUid')
require('dotenv').config()
const connectDB = require('./src/config/connectDB')



const app = express()

// Connect to MongoDB
connectDB()

app.use(bodyParser.json({limit:"50mb"}));
app.use(cors());
app.use(morgan("common"));



const server = http.createServer(app);
const io = socketio(server);
socket(io);
app.use(handleErr);

routes(app,io);
// var a = getId(app);
// console.log(a);

// if (typeof localStorage === "undefined" || localStorage === null) {
//     var LocalStorage = require('node-localstorage').LocalStorage;
//     localStorage = new LocalStorage('./scratch');
//     }
// var id = localStorage.getItem('user')
// console.log(id)



const port = process.env.PORT



app.listen(port, () => {
    console.log('Example app listening on http://localhost:'+port)
    }
)
