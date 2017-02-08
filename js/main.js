//Logica
//CONTAIN all information in chat
//molde del objeto para crear las listas
function chat(_name,_image,_lastmessage){
this.name= _name; 
this.imageURL= _image;
this.lastmessage= _lastmessage; 
this.timelastmessage= "";
this.deleteMessage = function(){
    }
}
/*var search = document.getElementById("lista-chats"),
    name_search = document.getElementsByTagName("h4"),
    forEach = Array.prototype.forEach;

 search.addEventListener("keyup", function(e){
    var choice = this.value;
  
    forEach.call(name_search, function(f){
        if (f.innerHTML.toLowerCase().search(choice.toLowerCase()) == -1){
            f.parentNode.parentNode.style.display = "none";        
        }else{
            f.parentNode.parentNode.style.display = "block";
            }        
    });
}, false); */   

var dataListChats=[
 //   
    new chat("Sayda",'http://www.iconpr.com.au/uploads/styles/feature/uploads/features/preview/Y82bI-Tencent_Logo_icon_3.png',"hola"),
    new chat("Zeldi",'image/logocodeacademy.png',"en que andas?"),
    new chat("Gamer_93",'https://lh3.googleusercontent.com/YGqr3CRLm45jMF8eM8eQxc1VSERDTyzkv1CIng0qjcenJZxqV5DBgH5xlRTawnqNPcOp=w300',"hi, how r u?"),
    new chat("chat 4",'http://wellness.winonastateu.com/wp-content/uploads/2016/06/sign-304643_960_720.png',"yeah!!")
];

//VISUAL
//Se debe pasar como parametro event o evt pues es asi como se podra ejecutar la funcion, en HTML LA FUNCION esta como un parametro determinado event, el cual al presionar la tecla enter dara como resultado la consola.ENTER=13  
//variabel event o this se puede pasar a las funciones.
//CUANDo realemente se necesite colocar la variable dentro de la funcion.
//on ready se ejecuta antes que el onload)(carga imagenes).

var liListItem=null;
//In  body html we write init(), to initialize our page.
//we separate all the functions.
function init(){
    initChatList();
    
}
function initChatList(){
    var listChats = document.getElementById("lista-chats");
    for(var i in dataListChats){
        var htmlChatList = '<li><div class="avatar">'+
		  '<img src="'+ dataListChats[i].imageURL+'" alt="" class="wh-44">'+
		      '<h4 class="w-contact-name">'+dataListChats[i].name +'</h4>' +
		          '<p class="w-last-message" id="mensaje">'+dataListChats[i].lastmessage+'</p>'+
		  '</div>'+
        '<div class="time" id="hora">'+dataListChats[i].timelastmessage+'</div></li>';
        dataListChats[i].deleteMessage();
        listChats.innerHTML+=htmlChatList;
    }
    setEventsListChats();
}

//we create other function to initialize many functions or charactheristics.
function setEventsListChats(){
    var listChats= document.getElementById("lista-chats");
    var arrlistItems= listChats.getElementsByTagName("li");
   // we take the useform of for 'cause  if we put "i in arrlistItems" it returns all the elements "li" with their functions, methods and attibutes(is an object and ain´t an array), and we just need "li"(array); for this reason we avoid to use it.
    for (var i=0;i<arrlistItems.length;i++){
        arrlistItems[i].onclick=function(){
            onChatItemClick};
        //Anyone attribute in the element we can access with dot(.)-->element.type=, element.value=
        arrlistItems[i].addEventListener('click',onChatItemClick);
    }
}
function onChatItemClick(event){
    //it recives the parameter event, and this has an attribute .currenttarget
    //console.log(event.currentTarget); //returns all li
    var contactName= event.currentTarget.getElementsByClassName("w-contact-name")[0].textContent;//textContent is an attibute
    var imgURL = event.currentTarget.getElementsByClassName("wh-44")[0].src;
    refreshHeaderChat(contactName,imgURL,"Conectado");
    var chat = document.getElementById("chat");
    chat.innerHTML=this.lastmessage;
}

function onMessageKey(event){
    //to get the number of each key, we put in console, to get it.
    //console.log(event);
    if(event.keyCode == 13){
        //value, we put it in the function "createChat" 'cause in this way we can refer(allude) at "id"("mensajes") and clean the message.
        //el value se coloca en la 2da linea y no en la 1ra porque sino haria referencia al valor mas no al id, y no se limpiaria despues con elinputmessage=""; se tendria que repetir el codigo de la primera linea para vaciarlo, no seria conveneiente.
        var elinputMessage= document.getElementById("mensajes");
        
        createChat(elinputMessage.value);
        createMessage(elinputMessage.value);//PUT ATTENTION IN CALL THE FUNCTIONS IN ORDEN, cause if we  DON'T put in the orden that have to be execute, the console give us an ERROR.
        //SE DEBE TENER CUIDADO EN EL ORDEN DE LAS FUNCIONES, Primero se crea el chat y luego se crea el mensaje.
        elinputMessage.value="";
    }
}
//crea los mensajes ingresados en el chat
function createMessage (_message){
    var htmlMessageIn ='<div class="w-message w-message-in">'+
        '<div class="w-message text">'+
        '<h5 class="green-1">Maria Paula Rivarola</h5>'+ 
        '<p>Nunca!!! Juan Diego es único</p>'+
        '<div class="time">13:14</div>'+
        '</div>'+
    '</div>';
    
    var d = new Date();
    var htmlMessageOut='<div class="w-message w-message-out">'+
        '<div class="w-message-text">'+
        '<p>' + _message + '</p>'+
        '<div class="time">'+ d.getHours() +':'+ d.getMinutes()+ '</div>'+
        '</div>'+
    '</div>';
    
    var mensaje = liListItem.getElementsByClassName("w-last-message")[0];
	mensaje.innerHTML = _message;
    
    var elchat = document.getElementById("chat");
//Cuando se crea un nuevo elemento para que no se reemplazen se debe utilizar "+=";
//Create  a new element and acumulate wit "+=";
    elchat.innerHTML += htmlMessageOut;
//para que el mensaje se suba arriba y se pueda visualizar el ultimo mensaje
//IMPORTANTE: primero se crea el mensaje y luego se añade el scroll ya que no haria efecto si fuera al reves, SE DEBE MANTENER UN ORDEN.
    elchat.scrollTop= elchat.scrollHeight;
}
//CREATE AN USERS LIST with the message 
function createChat(_message,_name){
    //se coloco un id para el ul en el html llamado lista-chats
    var elChatList=document.getElementById("lista-chats");
//si el item es creado ya no SE CREARA UNA LISTA, caso contrario se tendria que crear el item
    if(liListItem==null){
    //se crea un li para contener lo que se tiene en html que es el htmlchatlist
        liListItem=document.createElement('LI');
        var htmlChatList = 
       ' <div class="avatar">'+
		  '<img src="image/logocodeacademy.png" alt="" class="wh-44">'+
		      '<h4 class="w-contact-name">Laboratoria Perú</h4>' +
		          '<p class="w-last-message" id="mensaje">'+_message+'</p>'+
		  '</div>'+
        '<div class="time" id="hora">14:27</div>';
 
    liListItem.innerHTML=htmlChatList;
//insertBefore (newnode,existingnode)
//El método Node.insertBefore() inserta el nuevo elemento antes antes del elemento de referencia como hijo del nodo actual.Primero va referenciado el padre, en este caso el ul "elChatList", el childnodes[0], se refiere al primer hijo que contendra el ul   que seria el primer hijo li.
    elChatList.insertBefore(liListItem,elChatList.childNodes[0]);  
    }
    setEventsListChats();
}
function refreshHeaderChat(_contactName,_imageURL,_status){
    var chatHeader = document.getElementById("chat-header");
    //asi se puede obtner los elementos dentro de mi variable
    chatHeader.getElementsByClassName("w-contact-name")[0].innerHTML=_contactName;
    chatHeader.getElementsByClassName("w-users-messages")[0].innerHTML=_status;
    chatHeader.getElementsByTagName("img")[0].src=_imageURL;
    
}
//PARA OBTENER EL TIEMPO, MOMENTS JS, codigo para buscar.
//todos los que tienen un set sirven para fijar
// todos los que tienen un get obtienen 