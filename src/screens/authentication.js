import React,{ Component } from 'react';
import {
    StyleSheet,
    View,
    TouchableHighlight,
    Text
} from 'react-native';
import Const from '../helper/constant';
import LocalAuth from 'react-native-local-auth';


export default class TouchID extends Component {

    constructor(props){
        super(props);
        this.state={
            isLoding:true
        }
    }


    pressHandler() {
        LocalAuth.authenticate({
            reason: 'this is a secure area, please authenticate yourself',
            falbackToPasscode: true,    // fallback to passcode on cancel
            suppressEnterPassword: true // disallow Enter Password fallback
        })
            .then(success => {

                // alert('Authenticated Successfully')
                this.setState({
                    isLoding: false
                });
                this.props.navigation.navigate('Dashboard');
            })
            .catch(error => {
                this.setState({
                    isLoding: false
                });
                this.props.navigation.navigate('Dashboard');
                //alert(error.message)
            })
    }


    render(){
        return(
            <View style={style.container}>
                <TouchableHighlight onPress={()=> this.pressHandler()} underlayColor='transparent' style={{marginBottom:50}}>
                    <View style={{backgroundColor:Const.appblue,height:50,width:150,alignItems:'center',justifyContent:'center',borderRadius:5}}>
                        <Text style={{color:'white',padding:10}}>Enter Password</Text>
                    </View>
                </TouchableHighlight>
            </View>
        );
    }

}



const style = StyleSheet.create({
    container: {
        flex:1,
        backgroundColor:'white',
        alignItems:'center',
        justifyContent:'flex-end',
    }

});