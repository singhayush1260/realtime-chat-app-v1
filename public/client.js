const socket=io();

let name="";
let textarea=document.querySelector('#textarea');
let messageArea=document.querySelector('.message_area')
do{
   name= prompt('Please enter your name:')
}
while(!name);

textarea.addEventListener('keyup',(e)=>{
    if(e.key==='Enter'){
        sendMessage(e.target.value);
    }
})

const sendMessage=(message)=>{
  let msg={
    user:name,
    message:message.trim()
  }
  appendMessage(msg,'outgoing');

  textarea.value="";

  scrollToBottom();

  // sending to server
   
  socket.emit('message',msg);

}

const appendMessage=(msg,type)=>{
   let mainDiv=document.createElement('div');
   let classname=type;
   mainDiv.classList.add(classname,'message');
   
   let markup=`
    <h4>${msg.user}</h4>
    <p>${msg.message}</p>
   `
   mainDiv.innerHTML=markup;
   messageArea.appendChild(mainDiv);
}

// receiving msg

socket.on('message',(msg)=>{
  appendMessage(msg,'incoming');

  scrollToBottom();
})

const scrollToBottom=()=>{
    messageArea.scrollTop=messageArea.scrollHeight;
}