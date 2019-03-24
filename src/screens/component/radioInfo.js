import React,{ Component } from 'react';
import {
    StyleSheet,
    View,
    Text
} from 'react-native';
import {RadioGroup, RadioButton} from 'react-native-flexi-radio-button'
import Const from '../../helper/constant';
import FontSize from '../../helper/fontsize';

export default Radio = (props) => {
    return(
        <View style={style.container}>
            <View style = {{padding:10}}>
                <Text style={{fontSize:FontSize.regFont}}>{props.title}</Text>
            </View>
            <RadioGroup
                onSelect = {(index) => props.onUpdateData(props.keytext,index)}
                style = {{flexDirection:'row',flexWrap:'wrap'}}
                color = 'gray'
                activeColor={Const.appblue}
                selectedIndex={props.index}>
                {
                    props.item.map((data, index) => {
                        return(
                            <RadioButton key={index} value={'item1'} color={Const.appblue}>
                                <Text style={{fontSize:FontSize.regFont}}>{data}</Text>
                            </RadioButton>
                        );
                    })
                }
            </RadioGroup>
        </View>
    );
};

const style = StyleSheet.create({
    container: {
        backgroundColor:'white',
    },
    text: {
        padding: 10,
        fontSize: 14,
    },
});

