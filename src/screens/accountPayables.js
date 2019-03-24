import React,{ Component } from 'react';
import {
    View,
    Text,
    StyleSheet,
} from 'react-native';
import Header from '../screens/component/reportHeader';
import Const from '../helper/constant';
import FontSize from '../helper/fontsize';

export default class AccountPayable extends Component{

    static navigationOptions = {
        header: null,
    }

    render(){
        return(
            <View style={{flex:1}}>
                <Header title='Account Payables' onMenuPressed={this.animate} rightHeader={true} onUserPressed={this.animate}/>
            <View style={style.container}>
                <Text>ACCOUNT PAYABLE</Text>
            </View>
            </View>
        );
    }
}

const style = StyleSheet.create({
    container: {
        flex:1,
        justifyContent:'center',
        alignItems:'center'
    },
    headerimage: {
        width:30,
        height:30,
        margin:10,
    },

});
