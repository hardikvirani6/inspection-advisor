import React from 'react';
import {
    StyleSheet,
    View,
    Text,
    Image,
    TouchableHighlight,
    FlatList,
    Platform
} from 'react-native'
import Video from 'react-native-video';
import ProgressCircle from 'react-native-progress-circle'
import Const from '../../../helper/constant';

export default MultipleVideoUpload = (props) => {
    renderVideos = (data, sectionID, rowID) => {
        return (
            <View style={style.viewContainer}>
                <View>
                    {!data.item.local_url ?

                        <Image style={style.backgroundVideo}
                               source={require('../../../assets/lane.jpeg')}/>

                        :

                        <Video
                            source={{uri: data.item.local_url ? data.item.local_url : data.item.src_url}}
                            style={style.backgroundVideo}
                            paused={props.indexed === data.index ? props.paused : true}
                            repeat={Platform.OS === 'ios' ? true : false}
                            onEnd={props.setInitialData()}
                            resizeMode="cover"
                        />

                    }
                </View>
                <View style={{alignItems:'center'}}>
                    <ProgressCircle
                        percent={props.videoProgress}
                        radius={20}
                        borderWidth={4}
                        color={data.index === props.indexed && !data.item.local_url ? 'gray' : 'transparent'}
                        shadowColor={data.index === props.indexed && !data.item.local_url ? 'transparent' : 'transparent'}
                        bgColor={data.index === props.indexed && !data.item.local_url ? 'white' : 'transparent'}
                    />
                </View>
                <View style={{flexDirection:'row', justifyContent:'space-between'}}>
                    <View>
                        <TouchableHighlight onPress={() => props.onVideoTapped(data.index, data.item.id, data.item.local_url ? true : false)} underlayColor="transparent">
                            <Image style={{width:30, height:30, tintColor:'#000'}}
                                   source={(props.paused && data.index === props.indexed) || data.index !== props.indexed ?
                                       require('../../../assets/play@1x.png') : require('../../../assets/pause@1x.png')} />
                        </TouchableHighlight>
                    </View>
                    <View>
                        <TouchableHighlight onPress={() => props.onVideoDelete(data.index, data.item.id)} underlayColor="transparent">
                            <View style={style.btnInner}>
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
                contentContainerStyle={[style.container, {height: props.video.length <= 2 ? Const.width/2.5+12 : null}]}
                data={props.video}
                renderItem={this.renderVideos}
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
        backgroundColor: Const.lightgray,
    },
    progress: {
        margin: 10,
    },
    viewContainer:{
        justifyContent:'space-between',
        margin:4,
        width: Const.width/2.2,
        height: Const.width/3,
        borderRadius:6,
        borderColor:'lightgray',
        borderWidth:1
    },
    text: {
        padding: 10,
        fontSize: 14,
    },
    btnInner:{
        backgroundColor:'#fff',
        flexDirection:'row',
        justifyContent:'center',
        alignItems:'center',
        padding:5,
        borderRadius:6,
        borderColor:'lightgray',
        borderWidth:1
    },
    backgroundVideo: {
        position: 'absolute',
        top: 0,
        left: 0,
        bottom: 0,
        right: 0,
        borderWidth:1,
        borderColor:'lightgray',
        width: Const.width/2.2,
        height: Const.width/3.4
    },
});

