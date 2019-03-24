import React from 'react';
import {
    StyleSheet,
    View,
    TextInput,
    Platform
} from 'react-native';
import Const from '../../helper/constant';
import FontSize from '../../helper/fontsize'

export default TextInputInfo = (props) => {
    return(
        <View style={style.container}>
            <View style={(Const.OS)? [style.textview,{flexDirection:'row',}]:[{flexDirection:'row',
                width:Const.width-40,margin: 10, borderRadius:25, backgroundColor:Const.darkgray}]}>
                <TextInput
                    style={style.textinputs}
                    placeholder={props.placeholder}
                    placeholderTextColor={Const.appblue}
                    underlineColorAndroid="transparent"
                    secureTextEntry={false}
                    onChangeText={(text) => props.onUpdateData(props.keytext,text)}
                    value={props.text}
                />
            </View>
        </View>
    );
};

const style = StyleSheet.create({
    container: {
        alignItems:'center',
        backgroundColor:'transparent'
    },
    textview: {
        width:Const.width-40,
        padding:15,
        margin:7,
        borderRadius:25,
        backgroundColor:Const.darkgray
    },
    textinputs: {
        borderRadius:25,
        fontSize:FontSize.regFont,
        paddingLeft:15,
        flex:1,
        justifyContent:'flex-end',
        backgroundColor: 'transparent',
        height: Platform.OS === 'ios' ? 15 : null,
        margin: Platform.OS === 'ios' ? null : 2
    },
});