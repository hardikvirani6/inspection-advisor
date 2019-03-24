import React  from 'react';
import {
    StyleSheet,
    View,
    Picker,
    Text,
    TouchableHighlight,
    Image
} from 'react-native';
import Const from '../../helper/constant';
let views = null;

export default DropDown = (props) => {
    return(
        <View>
            {
                (Const.OS) &&
                <View>
                    <TouchableHighlight style={[style.textview,{flexDirection:'row',}]}
                                        onPress={() => props.onSelectItem()}
                                        underlayColor='transparent'>
                        <View style={style.btnInner}>
                            <View style={{justifyContent:'center',margin:7}}>
                                <Text style={{color:((props.selected === 'Select State') || (props.selected === 'Select Template')) && Const.appblue || null,paddingLeft:15,fontSize:14}}>{props.selected}</Text>
                            </View>
                            <View style={{alignItems:'flex-end',justifyContent:'center',flex:1}}>
                                <Image source={require('../../assets/ExpandArrow.png')} style={style.iconDownArrow}/>
                            </View>
                        </View>
                    </TouchableHighlight>
                </View>
                ||
                <View style={{width:Const.width-40,
                    margin: 10,
                    borderRadius:25,
                    backgroundColor:Const.darkgray}}>
                    <View>
                        <Picker
                            selectedValue={props.selected}
                            onValueChange={(itemValue) => props.onUpdateData( 'state',itemValue)}
                            mode='dropdown'>

                            {
                                props.item.map(function (state, index) {
                                    return <Picker.Item key={index} label={state} value={state}/>
                                })
                            }

                        </Picker>
                    </View>
                </View>
            }
            <View style={style.viewContainer}>
                {views}
            </View>
        </View>
    );
};

const style = StyleSheet.create({
    text: {
        fontSize: 30,
        alignSelf: 'center',
        color: 'red'
    },
    picker:{
        alignItems:'center',
        flex:1
    },
    outer:{
        flex:1,
        flexDirection:'column',
        justifyContent: 'flex-end',
        width:Const.width

    },
    iconDownArrow: {
        width:15,
        height:30,
        marginRight:10,
        tintColor:Const.appblue
    },
    genderOp: {
        flexDirection: 'row',
        justifyContent: 'center',
        height:40,
        backgroundColor:'transparent',
        marginTop:5,
    },
    viewContainer: {
        flex: 1,
        flexDirection: 'row',
        justifyContent:'flex-end',
        flexWrap: 'wrap',
        position: 'absolute',
        marginTop:(Const.OS) ? Const.height-215 : Const.height-70,
        backgroundColor: 'white',
        width:Const.width
    },
    buttonPicker:{
        width:Const.width,
        backgroundColor:'black',
    },
    textview: {
        width:Const.width-40,
        padding:7,
        margin:7,
        borderRadius:25,
        backgroundColor:Const.darkgray
    },
    btnInner:{
        flex:1,
        flexDirection:'row',
        borderWidth:1,
        borderColor:'transparent',
        borderRadius:5,
        backgroundColor:'transparent'
    },
});