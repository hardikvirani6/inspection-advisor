import React,{Component} from 'react';
import {
    StyleSheet,
    View,
    Text,
    TouchableHighlight
} from 'react-native';
import Const from '../../../helper/constant';
import FontSize from '../../../helper/fontsize';
import Image from 'react-native-image-progress';
import ProgressBar from 'react-native-progress/Bar';

export default class ReportListComponent extends Component {
    constructor(props) {
        super(props);
        this.state = {
            image: {uri: (!props.reportData.property || !props.reportData.property.optimized_img) ? "http://notavailableimage" : props.reportData.property.optimized_img}
        }
    }

    render() {
        return (
            <View style={style.cellview}>
                <TouchableHighlight style={{backgroundColor: 'white'}}
                                    underlayColor="transparent"
                                    onPress={() => this.props.onRowSelect(this.props.reportData)}>
                    <View style={style.cellInnerview}>
                        <View>
                            <Image
                                source={this.state.image}
                                indicator={ProgressBar.Circle}
                                defaultSource={require('../../../assets/lane.jpeg')}
                                indicatorProps={() => <Progress.Circle
                                    style={styles.progress}
                                    progress={this.state.progress}
                                    indeterminate={this.state.indeterminate}
                                />}
                                style={style.contentimage}
                                resizeMode='cover'
                                onError={(e) => {
                                    this.setState({
                                        image: require('../../../assets/lane.jpeg')
                                    })
                                }}
                            />

                        </View>
                        <View style={{flex: 1, justifyContent: 'center'}}>
                            <View style={{marginTop: 15}}>
                                <Text style={style.celltitle}>
                                    {this.props.reportData.name}
                                </Text>
                            </View>
                            <View style={{flexDirection: 'row', flex: 1}}>


                                <View style={{flex: 1}}>

                                    <View style={{flexDirection: 'row'}}>
                                        <Text style={style.titletext}>
                                            Add:
                                        </Text>
                                        <Text style={style.infotext}>
                                            {(this.props.reportData.property && this.props.reportData.property.address) && this.props.reportData.property.address || ''}
                                        </Text>
                                    </View>


                                    <View style={{flexDirection: 'row'}}>
                                        <Text style={style.titletext}>
                                            City:
                                        </Text>
                                        <Text style={style.infotext}>
                                            {(this.props.reportData.property && this.props.reportData.property.city)
                                            && this.props.reportData.property.city || ''}
                                        </Text>
                                    </View>


                                    <View style={{flexDirection: 'row'}}>
                                        <Text style={style.titletext}>
                                            State:
                                        </Text>
                                        <Text style={style.infotext}>
                                            {(this.props.reportData.property && this.props.reportData.property.state)
                                            && this.props.reportData.property.state || ''}
                                        </Text>
                                    </View>


                                    <View style={{flexDirection: 'row'}}>
                                        <Text style={style.titletext}>
                                            Zip:
                                        </Text>
                                        <Text style={style.infotext}>
                                            {(this.props.reportData.property && this.props.reportData.property.zip)
                                            && this.props.reportData.property.zip || ''}
                                        </Text>
                                    </View>

                                </View>
                            </View>
                        </View>
                        <View style={{
                            width: 30,
                            flexDirection: 'column',
                            marginRight: 10,
                            justifyContent: 'space-around'
                        }}>
                            <View style={{alignItems: 'flex-end'}}>
                                <Image style={style.image} source={require('../../../assets/swipe.png')}
                                       resizeMode="contain"/>
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
        fontSize:FontSize.fifteen,
        color:'rgb(27,108,174)'
    },
    titletext: {
        fontWeight:'400',
        fontSize:FontSize.twelve,
        color:'rgb(27,108,174)',
        marginLeft:10,
    },
    infotext: {
        fontSize:FontSize.twelve,
        marginLeft:5,
        color:Const.lbgray
    },
    image: {
        width:FontSize.twentyFive,
        height:FontSize.twentyFive,
    },

});