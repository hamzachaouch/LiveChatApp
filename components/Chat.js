import React from 'react'
import {KeyboardAvoidingView,StyleSheet,Text,TextInput,TouchableOpacity,View} from 'react-native'
import {GiftedChat} from 'react-native-gifted-chat'
import Backend from '../Backend'
console.disableYellowBox = true;

export default class Chat extends React.Component{

        state= {
            messages:[],
        }


    render(){


        return(
            <GiftedChat
                messages={this.state.messages}
                onSend={(message)=>{
                    Backend.sendMessage(message)
                }}
                user={{
                    _id: Backend.getUid(),
                    name:this.props.navigation.state.params.name,
                }}
            />
                    )
    }
componentDidMount(){
        Backend.loadMessages((message)=>{
            this.setState((previousState)=>{
                return{
                    messages:GiftedChat.append(previousState.messages,message),
                }
            })
        })
}
    componentWillUnmount (){
        Backend.closeChat()
}
}



Chat.defaultProps ={
    name:"Ariya Stark",
}
const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
        alignItems: 'center',
        justifyContent: 'center',
    },
});
