const socket=io();
let name;
let messageArea=document.querySelector('.message_area')
let  textarea=document.querySelector("#text");
do{
name=prompt("enter your name");
}while(!name);
console.log(name)
textarea.addEventListener('keyup',(e)=>{
if(e.key==='Enter'){
    sendMessage(e.target.value);
}
})
function sendMessage(msg1){
    let msg={
        user:name,
        message:msg1,

    }
    //Append
    appendMessage(msg,'outgoing')
    textarea.value=''
    scrollTobottom();
    //Send to Server 
    socket.emit('message',msg);
}
function appendMessage(msg,type){
    let maindiv=document.createElement('div');
    let classname=type;
    maindiv.classList.add(classname,'message');
    let markup=`
    <h4>${msg.user}</h4>
    <p>${msg.message}</p>
    `
    maindiv.innerHTML=markup
    messageArea.appendChild(maindiv)
}
// Receive Message
socket.on('message',(msg)=>{
    console.log(msg);
    appendMessage(msg,'incoming')
    scrollTobottom();
    });
function scrollTobottom(){
    messageArea.scrollTop=messageArea.scrollHeight
}