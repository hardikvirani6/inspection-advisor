import React from 'react';
import {
    StyleSheet,
    View,
    TouchableHighlight,
} from 'react-native';

let color = ['#000000','#696969','#800000','#ff0000','#ff8c00','#cd853f','#ffff00','#556b2f','#008000','#006400','#87ceeb','#000080',
    '#808080','#c0c0c0','#dc143c','#ff6347','#f4a460','#daa520','#f0e68c','#808000','#90ee90','#8fbc8f','#87cefa','#0000cd']

export default ColorPicker = (props) => {
    return (
        <View style={{backgroundColor:'yellow',width:280}}>
            <View style={style.container}>
                {
                    color.map((obj) => {
                        return (
                            <TouchableHighlight onPress={() => props.onColorSelect(obj)}>
                                <View style={{backgroundColor: obj, height: 20, width: 20, margin:1.5}}/>
                            </TouchableHighlight>
                        )
                    })
                }
            </View>
        </View>
    );
};

const style = StyleSheet.create({
    container: {
        flexDirection:'row',
        flexWrap: 'wrap',
        width:280,
        backgroundColor:'#dcdcdc',
        alignItems:'center',
        justifyContent:'center',
        borderWidth:0.5,
        borderColor:'black',
        borderRadius:3
    },
});