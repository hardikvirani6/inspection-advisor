import React,{Component} from 'react';
import {
    StyleSheet,
    View,
    Text,
    TouchableHighlight
} from 'react-native';
import Const from '../../../helper/constant'
import ProgressBar from 'react-native-progress/Bar';
import Image from 'react-native-image-progress';

export default class ReportListComponent extends Component{

    constructor(props){
        debugger
        super(props);
        that = this;
        this.state = {
            image:{uri : (!props.reportdata.property || !props.reportdata.property.optimized_img) ? "http://notavailableimage" : props.reportdata.property.optimized_img},
        }
    }

    render(){
        return(
            <View style={style.cellview}>
                <TouchableHighlight style={{backgroundColor:'white'}}
                                    underlayColor="transparent"
                                    onPress={() => this.props.onPress(this.props.reportdata)}>
                    <View style={style.cellInnerview}>
                        <View>
                            <Image style={style.contentimage}
                                   source={this.state.image}
                                   onError={(e) => {
                                       this.setState({
                                           image: require('../../../assets/lane.jpeg')
                                       })
                                   }}
                                   resizeMode='cover'/>
                        </View>
                        <View style={{flex:1,justifyContent:'center'}}>
                            <View style={{marginTop:15}}>
                                <Text style={style.celltitle}>
                                    {this.props.reportdata.name}
                                </Text>
                            </View>
                            <View style={{flex:1,padding:5}}>
                                <View style={{flexDirection:'row',flex:1}}>
                                    <View style={{flex:1}}>
                                        <View style={{flexDirection:'row'}}>
                                            <Text style={style.titletext}>
                                                Add:
                                            </Text>
                                            <Text style={style.infotext}>
                                                { (this.props.reportdata.property) ? this.props.reportdata.property.address : ''}
                                            </Text>
                                        </View>

                                        <View style={{flexDirection:'row'}}>
                                            <Text style={style.titletext}>
                                                City:
                                            </Text>
                                            <Text style={style.infotext}>
                                                { (this.props.reportdata.property) ? this.props.reportdata.property.city : ''}
                                            </Text>
                                        </View>

                                        <View style={{flexDirection:'row'}}>
                                            <Text style={style.titletext}>
                                                State:
                                            </Text>
                                            <Text style={style.infotext}>
                                                { (this.props.reportdata.property) ? this.props.reportdata.property.state : ''}
                                            </Text>
                                        </View>

                                        <View style={{flexDirection:'row'}}>
                                            <Text style={style.titletext}>
                                                Zip:
                                            </Text>
                                            <Text style={style.infotext}>
                                                { (this.props.reportdata.property) ? this.props.reportdata.property.zip : ''}
                                            </Text>
                                        </View>
                                    </View>

                                    <View style={{width:30,flexDirection:'column',marginRight:10,justifyContent:'space-around'}}>
                                        <View style={{alignItems:'flex-end'}}>
                                            <TouchableHighlight underlayColor="transparent"
                                                                onPress={() => this.props.onEdit(this.props.reportdata)}>
                                                <Image style={style.image} source={require('../../../assets/Edit.png')}
                                                       resizeMode="contain"/>
                                            </TouchableHighlight>
                                        </View>

                                        <View style={{alignItems:'flex-end'}}>
                                            <TouchableHighlight underlayColor="transparent"
                                                                onPress={() => this.props.onPreview(this.props.reportdata)}>
                                                <Image style={style.image} source={require('../../../assets/Preview.png')}
                                                       resizeMode="contain"/>
                                            </TouchableHighlight>
                                        </View>

                                        <View style={{alignItems:'flex-end'}}>
                                            <TouchableHighlight underlayColor="transparent"
                                                                onPress={() => this.props.onDelete(this.props.reportdata)}>
                                                <Image style={style.image} source={require('../../../assets/delete1.png')}
                                                       resizeMode="contain"/>
                                            </TouchableHighlight>
                                        </View>
                                    </View>
                                </View>
                            </View>
                        </View>
                    </View>
                </TouchableHighlight>
            </View>
        );
    }
}

const style = StyleSheet.create({
    cellview: {
        flex:1,
        backgroundColor:'white',
        height:Const.height/4.5,
        width:Const.width,
        marginTop:10,
        marginBottom:10,
    },
    cellInnerview: {
        flexDirection:'row',
        backgroundColor:'rgb(185,208,230)',
        marginLeft:15,
        marginRight:15
    },
    contentimage: {
        width:Const.width/2.5,
        marginTop:15,
        marginBottom:15,
        marginLeft:5,
        height:(Const.height/4.5)-30,
        borderWidth:2,
        borderColor:'rgb(125,170,209)'
    },
    celltitle: {
        fontWeight:'bold',
        textAlign:'center',
        fontSize:15,
        color:'rgb(27,108,174)'
    },
    titletext: {
        fontWeight:'400',
        fontSize:12,
        color:'rgb(27,108,174)',
        marginLeft:10,
    },
    infotext: {
        fontSize:12,
        marginLeft:5,
        color:Const.lbgray
    },
    image: {
        width:18,
        height:18,
    },
});
