const express=require("express");
const app=express()
const http=require('http').createServer(app)
const Port=process.env.PORT|| 3001;
http.listen(Port,()=>{
    console.log(`Listening on Port ${Port}`)
});
app.use(express.static(__dirname+'/public'))
app.get("/",(req,res)=>{
   res.sendFile(__dirname+ "/index.html")
})
// SOCKET
var io = require('socket.io')(http);
io.on('connection',(socket)=>{
   console.log("Connected");
    socket.on('message',(msg)=>{
        console.log(msg)
        socket.broadcast.emit('message',msg)
    })

})