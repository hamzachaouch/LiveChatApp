
import * as firebase from 'firebase';

class Backend {
    uid = ''
    messageResf=null

    //init firebase
    constructor(){
        firebase.initializeApp({
        apiKey: 'AIzaSyAG4mGLiKJX5AmRje2lkkKHuruWQ3xMvXs',
        authDomain: 'chatapp-86bd5.firebaseapp.com',
        databaseURL: 'https://chatapp-86bd5.firebaseio.com',
        storageBucket: 'chatapp-86bd5.appspot.com',
    })
    firebase.auth().onAuthStateChanged((user)=>{
        if (user){
            this.setUid(user.uid)
        }else{
            firebase.auth().signInAnonymously().catch((error)=>{
                alert(error.message)
            })
        }
    })
    }

    setUid(value){
        this.uid=value
    }

    getUid(){
        return this.uid
    }

    //retrieve the message form the backend

    loadMessages(callback){
        this.messageResf = firebase.database().ref('messages')
        this.messageResf.off()
        const onReceive =(data)=>{
            const message = data.val()
            callback({
                _id:data.key,
                text:message.text,
                createdAt: new Date(message.createdAt),
                user:{
                    _id:message.user._id,
                    name:message.user.name,
                },
            })
        }
   this.messageResf.limitToLast(20).on('child_added',onReceive)
    }
    sendMessage(message){
        for (let i = 0 ; i<message.length;i++){
            this.messageResf.push({
                text: message[i].text,
                user:message[i].user,
                createdAt: firebase.database.ServerValue.TIMESTAMP,
            })
        }
    }

 closeChat(){
        if (this.messageResf){
            this.messageResf.off()
        }
 }


}
export  default  new Backend()