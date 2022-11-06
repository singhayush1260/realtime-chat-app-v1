
const express=require('express');
const app=express();
const http = require('http').createServer(app)
const io=require('socket.io')(http);

const PORT=process.env.PORT||3002;

app.use(express.static(__dirname+'/public'))

app.get('/',(req,res)=>{
    res.sendFile(__dirname+'/index.html')
})

io.on('connection',(socket)=>{
 console.log('connected');
 socket.on('message',(msg)=>{
    console.log(msg);
    socket.broadcast.emit('message',msg);
 })
})


http.listen(PORT,()=>{
    console.log('Server started at PORT',PORT);
})