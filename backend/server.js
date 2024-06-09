const bodyParser = require('body-parser');
const express= require('express');
const cors= require('cors');;
const app=  express();
const http= require('http');
const server= http.createServer(app);
const {Server}= require('socket.io');


app.use(bodyParser.urlencoded({extended:true}));
app.use(express.json());


const io= new Server(server,{
    cors:({
        origin:" http://localhost:3001",
        methods:"GET,POST,DELETE,PUT"
    })
});


io.on("connection",(Socket)=>{
    console.log(`user with id ${Socket.id} connected`)
})

app.listen(3000,()=>{
    console.log(`the server is running on port ${3000}`);
})





