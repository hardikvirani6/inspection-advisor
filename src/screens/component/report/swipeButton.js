import React,{Component} from 'react';
import {
    StyleSheet,
    View,
    Text,
    Image
} from 'react-native';

export default SwipeButton = (props) => {
    return(
        <View style={{
            flex:1,
            backgroundColor: props.color,
            flexDirection:'column',
            alignItems:'center',
            justifyContent:'center',
        }}>
            <View style={style.containerView}>
                <Text style={style.title}>{props.title}</Text>
                <Image style={style.image} source={props.image} resizeMode="contain"/>
            </View>
        </View>
    );
}

const style = StyleSheet.create({
    image: {
        width:15,
        height:15,
        marginTop:5
    },
    title: {
        color:'white',
        textAlign:'center',
        fontSize:14,
    },
    containerView: {
        flex:1,
        alignItems:'center',
        justifyContent:'center'
    }
});