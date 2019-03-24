import React,{ Component } from 'react';
import {
    StyleSheet,
    View,
    Text,
    TouchableHighlight
} from 'react-native';
import Const from '../../../helper/constant';
import Image from 'react-native-image-progress';
import ProgressBar from 'react-native-progress/Bar';

export default class ImageUpload extends Component {
    constructor(props){
        super(props);
        this.state = {
            image: {uri: props.images}
        }
    }

    componentWillReceiveProps(nextProps) {
        this.setState ({
            image:nextProps.images
        })
    }

    render() {
        return (
            <View style={style.container}>
                <View style={style.innerView}>
                    <View style={style.imageInner}>
                        <Image
                            style={{flex: 1, height: null, width: null}}
                            source={this.state.image}
                            defaultSource={require('../../../assets/lane.jpeg')}
                            onError={(e) => {
                                this.setState({
                                    image: require('../../../assets/lane.jpeg')
                                })
                            }}
                            indicator={ProgressBar.Circle}
                            indicatorProps={{
                                borderWidth: 0,
                                color: Const.appblue,
                                unfilledColor: '#fff'
                            }}
                        />
                    </View>
                    <View style={style.btnOuter}>
                        <View style={style.btnInner}>
                            <TouchableHighlight onPress={() => this.props.onImageDelete()} underlayColor="transparent">
                                <View style={style.btnView}>
                                    <Text style={{color: 'rgb(226,98,98)'}}>Remove</Text>
                                </View>
                            </TouchableHighlight>
                        </View>
                        <View style={style.btnInner}>
                            <TouchableHighlight onPress={() => this.props.onImageUpload()} underlayColor="transparent">
                                <View style={style.btnView}>
                                    <Text style={{color: Const.appblue}}>Update</Text>
                                </View>
                            </TouchableHighlight>
                        </View>
                    </View>
                </View>
            </View>
        );
    }
}

const style = StyleSheet.create({
    container: {
        backgroundColor:'white',
        flex:1
    },
    text: {
        padding: 10,
        fontSize: 14,
    },
    innerView:{
        flexDirection:'row',
        backgroundColor:Const.lightgray,
        margin:10,
        borderRadius:25,
        padding:10
    },
    imageInner:{
        height:100,
        width:130,
        backgroundColor:Const.darkgray,
        borderRadius:5,
        borderWidth:1,
        borderColor:'rgb(194,209,296)'
    },
    btnOuter:{
        flex:1,
        flexDirection:'column',
        justifyContent:'center',
        alignItems:'center'
    },
    btnInner:{
        padding:3,
        width:'70%'
    },
    btnView:{
        backgroundColor:'rgb(206,206,206)',
        justifyContent:'center',
        alignItems:'center',
        width:'100%',
        height:30,
        borderRadius:15
    },
});

