import React,{ Component } from 'react';
import {
    View,
    Text,
    StyleSheet,
} from 'react-native';
import Const from '../helper/constant';
import FontSize from '../helper/fontsize';
import Header from '../screens/component/reportHeader';

export default class Scheduler extends Component{

    static navigationOptions = {
        header: null,
    }

    render(){
        return(
            <View style={{flex:1}}>
                <Header title='Scheduler' onMenuPressed={this.animate} rightHeader={true} onUserPressed={this.animate}/>
            <View style={style.container}>
                <Text>SCHEDULER</Text>
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
