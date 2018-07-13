import React from 'react'
import {StyleSheet,Text,TextInput,TouchableOpacity,View} from 'react-native'


export default class Home extends React.Component{
        static navigationOptions={
            header : null,
        }
            state={
                name:"",
            }


        render(){
            return(
                <View style={{flex:1,marginTop:30}}>
                    <Text style={styles.title}> Enter your name: </Text>
                    <TextInput style={styles.nameInput} placeholder='Arya Stark'
                               underlineColorAndroid='transparent'
                               onChangeText={(text)=>{
                                   this.setState({name:text})
                               }}
                               value={this.state.name}
                    />
                    <TouchableOpacity  onPress={()=>{
                        this.props.navigation.navigate('Chat',{ name:this.state.name})
                        }}>
                    <Text style={styles.btn}>Next ></Text>
                    </TouchableOpacity>
                </View>
            )
        }


}


const styles = StyleSheet.create({
    title:{
        fontSize : 20 ,
        marginTop: 20,
        marginLeft: 10,
        fontWeight:'bold'
    },
    nameInput: {
        borderWidth: 1 ,
        margin: 10,
        borderColor :"gray",
        height: 40,
        padding: 10,
    },
    btn:{
        fontSize: 25,
        margin:20,
        }
});
