import React from 'react';
import {
    StyleSheet,
    View,
    Text,
    TouchableHighlight,
    Image
} from 'react-native';
import Const from '../../helper/constant';

export default SettingComponet = (props) => {
    return(
        <View>
            <TouchableHighlight onPress={() => props.onPress(props.title, !props.checked )} underlayColor='transparent'>
                <View>
                    <View style={{padding:15,backgroundColor:'white',flexDirection:'row'}}>

                        <Text style={{fontSize:16,color:Const.appblue}}>
                            {props.title}
                        </Text>
                        {
                            (props.checkbox)
                            &&
                            <View style={{flex: 1, alignItems: 'flex-end'}}>
                                <Image style={(props.checked) && style.checkimage || style.uncheckimage}
                                       resizeMode='contain'
                                       source={(props.checked) &&
                                       require('../../assets/CheckedCheckbox.png')
                                       || require('../../assets/UncheckedCheckbox.png')}/>
                            </View>
                            ||
                            null
                        }
                    </View>
                    <View style={{backgroundColor:'lightgray',height:1,marginLeft:5,marginRight:5,borderRadius:1}}/>
                </View>
            </TouchableHighlight>
        </View>
    );
};

const style = StyleSheet.create({
    uncheckimage: {
        height: 30,
        width: 30,
        flex: 1,
        tintColor:'gray'
    },
    checkimage: {
        height: 30,
        width: 30,
        flex: 1,
        tintColor:Const.appblue
    },
});
