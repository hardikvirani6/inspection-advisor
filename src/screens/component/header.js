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
        <View style={style.Containers}>
            <View style={style.outerview}>
                <View>
                    <TouchableHighlight onPress={() => props.onBackPressed()} underlayColor='transparent'>
                        <Image style={style.headerimage} source={require('../../assets/back.png')}
                               resizeMode="contain"/>
                    </TouchableHighlight>
                </View>
                <View>
                    <Text style={style.title}>{props.title}</Text>
                </View>
                <View>
                    {
                        (props.rightHeader) &&
                        <TouchableHighlight onPress={() => props.onSend()} underlayColor='transparent'>
                            <Text style={style.btnText}>
                                SEND REPORT
                            </Text>
                        </TouchableHighlight>
                        ||
                        null
                    }
                </View>
            </View>
        </View>
    );
};

const style = StyleSheet.create({
    Containers:{
        height:64,
        backgroundColor: Const.lbgray
    },
    headerimage: {
        width:30,
        height:25,
        marginTop:Platform.OS === 'ios' ?20 : 0
    },
    title: {
        color:'white',
        textAlign:'center',
        fontSize:19,
        fontWeight:'500',
        marginTop:Platform.OS === 'ios' ?20 : 0,
        width:Const.width-140,
        marginLeft:40,
    },
    outerview: {
        flex:1,
        height:65,
        flexDirection:'row',
        alignItems:'center'
    },
    btnText:{
        color: 'white',
        fontSize: 14,
        marginTop:Platform.OS === 'ios' ?20 : 0,
        flexWrap: 'wrap',
        width: 70,
        textAlign: 'center'
    },
});