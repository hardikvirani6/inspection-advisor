import React from 'react';
import {
    StyleSheet,
    Text,
    View
} from 'react-native';
import * as Progress from 'react-native-progress';
import Const from '../../helper/constant';

export default MediaModal = (props) => {
    return(
            <View style={{alignItems:'center',}}>
                <View style={{alignItems:'center'}}>
                    <Progress.Bar progress={props.progress} width={Const.width-50}
                                  height={props.progress === 1 || props.progress === 0 ? 0 : 6}
                                  borderColor={props.progress === 1 || props.progress === 0 ? 'white' : 'rgba(0, 122, 255, 1)'}
                    />
                </View>
                <Text style={style.title}>{props.textSms}</Text>
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
        fontSize:20
    },
    subtitle: {
        color:'gray',
        fontWeight:'500',
        fontSize:16
    },
    content: {
        color:'gray',
        fontSize:14
    }
});