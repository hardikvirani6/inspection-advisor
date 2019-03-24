import React from 'react';
import {
    StyleSheet,
    View,
    Text,
    Image,
    TouchableHighlight,
    Platform
} from 'react-native';
import Const from '../../helper/constant'

export default Header = (props) => {
    return(
        <View style={{height:64, backgroundColor: Const.lbgray}}>
            <View style={style.outerview}>
                <View>
                    <TouchableHighlight onPress={() => props.onMenuPressed()} underlayColor='transparent'>
                        <Image style={style.headerimage} source={require('../../assets/menu.png')}
                               resizeMode="contain"/>
                    </TouchableHighlight>
                </View>
                <View>
                    <Text style={style.title}>{props.title}</Text>
                </View>
                <View>
                    <TouchableHighlight onPress={() => props.onUserPressed()} underlayColor='transparent'>
                        <Image style={style.headerimageuser} source={require('../../assets/user.png')}
                               resizeMode="contain"/>
                    </TouchableHighlight>
                </View>
            </View>
        </View>
    );
};

const style = StyleSheet.create({
    headerimage: {
        width:30,
        height:25,
        marginTop:Platform.OS == 'ios' ?20 : 0,
        marginLeft:15
    },
    headerimageuser: {
        width:35,
        height:30,
        marginTop:Platform.OS == 'ios' ?20 : 0,
        marginLeft:25
    },
    title: {
        color:'white',
        textAlign:'center',
        fontSize:19,
        fontWeight:'500',
        marginTop:Platform.OS == 'ios' ?20 : 0,
        width:Const.width-160,
        marginLeft:40,
    },
    outerview: {
        flex:1,
        height:65,
        flexDirection:'row',
        alignItems:'center'
    }
});