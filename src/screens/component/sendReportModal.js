import React,{ Component } from 'react';
import {
    StyleSheet,
    Image,
    Text,
    View
} from 'react-native';

export default SendReportModal = (props) => {
        return(
            <View style={{alignItems:'center',}}>
                <Image source={require('..//../assets/attention.png')}
                       style={{height:30,width:30}}/>
                <Text style={style.title}>Your about to send a report.</Text>
                <Text style={style.subtitle}>You have {props.limit} report(s) left to send.</Text>
                <Text style={style.content}>Your sending this report to the following recipients:</Text>
                <Text>Agent:No agent assigned.</Text>
                <Text>Client:{props.client}</Text>
            </View>
        );
};

const style = StyleSheet.create({
    container: {
        alignItems:'center',
    },
    title: {
        color:'black',
        fontWeight:'500',
        fontSize:18
    },
    subtitle: {
        color:'gray',
        fontWeight:'400',
        fontSize:14
    },
    content: {
        color:'gray',
        fontSize:12
    }
});