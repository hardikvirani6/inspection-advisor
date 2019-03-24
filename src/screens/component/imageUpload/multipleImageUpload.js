import React from 'react';
import {
    StyleSheet,
    View,
    Text,
    TouchableHighlight,
    FlatList
} from 'react-native';
import Const from '../../../helper/constant';
import Image from 'react-native-image-progress';
import ProgressBar from 'react-native-progress/Bar';

export default MultipleImageUpload = (props) => {
    renderImages = (data, sectionID, rowID) => {
        return (
            <View style={{justifyContent:'space-between', margin:4}}>
                <View style={{height: Const.width/2.5, width: Const.width/3.4, backgroundColor:Const.darkgray, borderRadius:3}}>
                    <Image
                        style={{flex:1,height:null,width:null}}
                        source={{uri : data.item.original ? data.item.original : require('../../../assets/lane.jpeg')}}
                        defaultSource={require('../../../assets/lane.jpeg')}
                        onError={(e) => {
                        }}
                        indicator={ProgressBar.Circle}
                        indicatorProps={{
                            borderWidth: 0,
                            color: '#fff',
                            unfilledColor: '#fff'
                        }}
                    />
                    <View style={style.imageOuter}>
                        <TouchableHighlight onPress={() => props.onImageEdit(sectionID, data.item.id, data.item.original )} underlayColor="transparent">
                            <View style={style.btnOuter}>
                                <Image style={{width:16, height:16, tintColor:'#000'}} source={require('../../../assets/editImg.png')} />
                                <Text style={{fontSize:13}}> Edit</Text>
                            </View>
                        </TouchableHighlight>
                    </View>
                    <View style={style.imageOuter}>
                        <TouchableHighlight onPress={() => props.onImageDelete(data.index, data.item.id)} underlayColor="transparent">
                            <View style={style.btnOuter}>
                                <Image style={{width:14, height:14, tintColor:'#000'}} source={require('../../../assets/delete1.png')} />
                                <Text style={{fontSize:13}}> Delete</Text>
                            </View>
                        </TouchableHighlight>
                    </View>
                </View>
            </View>
        )
    };

    return(
        <View style={{flex:1}}>
            <FlatList
                contentContainerStyle={[style.container, {height: props.images.length <= 3 ? Const.width/2.5+12 : null}]}
                data={props.images}
                renderItem={this.renderImages}
            />
        </View>
    );
};

const style = StyleSheet.create({

    container: {
        flex:1,
        flexDirection:'row',
        flexWrap: 'wrap',
        borderWidth:1,
        borderColor:'lightgray',
        margin:8,
        borderRadius:6,
        width: Const.width-16,
        backgroundColor: Const.lightgray,},
    text: {
        padding: 10,
        fontSize: 14,
    },
    imageOuter:{
        padding:1,
        width:'80%',
        alignSelf:'center'
    },
    btnOuter:{
        backgroundColor:'#fff',
        flexDirection:'row',
        justifyContent:'center',
        alignItems:'center',
        padding:5,
        borderRadius:6,
        borderColor:'lightgray',
        borderWidth:1
    },
});

