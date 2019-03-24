import React,{Component} from 'react';
import {
    StyleSheet,
    View,
    ScrollView,
    Text,
    TouchableHighlight, ToastAndroid, Alert
} from 'react-native';
import Const from '../../helper/constant';
import MapView from 'react-native-maps';
import Header from '../../screens/component/header';
import Image from 'react-native-image-progress';
import ProgressBar from 'react-native-progress/Bar';
import {setSelectedReport,
    deleteReport
} from "../../actions/reportAction";
import {
    setUpdatedData
} from '../../actions/updatedAppDataAction';
import {connect} from "react-redux";

class ReportDetail extends Component{
    constructor(props){
        super(props);
        this.state = {
            image: {uri:props.navigation.state.params.report.property.optimized_img}
        }
    }

    onBack = () => {
        this.props.navigation.goBack();
    };

    onEdit = (objReport) => {
        this.props.setSelectedReport(objReport.report_id, objReport.template_id);
        this.props.navigation.navigate('EditReport');
    };

    onPreview = (objReport) => {
        if(this.props.isNetwork){
            this.props.navigation.navigate('Preview',{reportId: objReport.report_id,
                sectionTitle: objReport.name})
        }
        else{
            if(Const.OS) {
                Alert.alert("Internet Connection is Required.");
            }else{
                ToastAndroid.show("Internet Connection is Required.", ToastAndroid.SHORT);
            }
        }
    };

    onDelete = (objReport) => {
        Alert.alert(
            'Warning',
            'Do you want to delete?',
            [
                {text: 'Cancel', onPress: () => console.log('Cancel Pressed'), style: 'cancel'},
                {text: 'OK', onPress: () => {
                        this.props.deleteReport(objReport.report_id)
                            .then((res)=>{
                                Alert.alert("Deleted Successfully.")
                                let obj = {
                                    resource:'report',
                                    id:objReport.report_id,
                                    operation:'DELETE',
                                    operation_id: new Date().getTime(),
                                    record_timestamp: new Date().getTime()
                                };
                                this.props.setUpdatedData(obj)
                                    .then(()=>{
                                        console.log('added')
                                    })
                            })
                            .catch((err)=>{
                                Alert.alert("Something went wrong.")
                            });
                    }},
            ]
        )
    };

    render(){
        return(
            <View style={style.container}>
                <Header title={this.props.navigation.state.params.report.name || ""} onBackPressed={this.onBack} rightHeader={false}/>
                <ScrollView style={{flex:1,marginBottom:5}}
                            bounces={false}
                            horizontal={false}
                            showsVerticalScrollIndicator={false}
                            scrollEnabled={true}
                            ref="mainScroll">

                    <View>
                        <Text style={{alignSelf:'center',textAlign:'center'}}>Report Initial Summary Page</Text>
                    </View>
                    <View>
                        <Image
                            style={style.propertyimage}
                            source={this.state.image}
                            defaultSource={require('../../assets/lane.jpeg')}
                            onError={(e) => {
                                this.setState({
                                    image: require('../../assets/lane.jpeg')
                                })
                            }}
                            resizeMode={'cover'}
                            indicator={ProgressBar.Circle}
                            indicatorProps={{
                                borderWidth: 0,
                                color: '#fff',
                                unfilledColor: '#fff'
                            }}
                        />
                    </View>
                    <View>
                        <Text style={{alignSelf:'center',textAlign:'center'}}>Client Read only info</Text>
                    </View>
                    <View>
                        <Text style={{alignSelf:'center',textAlign:'center'}}>Agent Read only info</Text>
                    </View>
                    <View style={style.propertyimage}>
                        <MapView
                            initialRegion={{
                                latitude: 37.78825,
                                longitude: -122.4324,
                                latitudeDelta: 0.0922,
                                longitudeDelta: 0.0421,
                            }}
                            style={style.map}
                        />
                    </View>
                    <View style={{alignItems:'center'}}>
                        <View style={[style.btnview,{backgroundColor:Const.appblue}]}>
                            <TouchableHighlight style={style.edit} underlayColor='transparent'>
                                <Text style={style.editText}>
                                    SEND
                                </Text>
                            </TouchableHighlight>
                        </View>
                    </View>
                    <View style={{alignItems:'center'}}>
                        <View style={[style.btnview,{backgroundColor:Const.appblue}]}>
                            <TouchableHighlight
                                onPress={() => this.onEdit(this.props.navigation.state.params.report)}
                                style={style.edit} underlayColor='transparent'>
                                <Text style={style.editText}>
                                    EDIT
                                </Text>
                            </TouchableHighlight>
                        </View>
                    </View>
                    <View style={{alignItems:'center'}}>
                        <View style={[style.btnview,{backgroundColor:Const.appblue}]}>
                            <TouchableHighlight
                                onPress={() => this.onPreview(this.props.navigation.state.params.report)}
                                style={style.edit} underlayColor='transparent'>
                                <Text style={style.editText}>
                                    PREVIEW
                                </Text>
                            </TouchableHighlight>
                        </View>
                    </View>
                    <View style={{alignItems:'center'}}>
                        <View style={[style.btnview,{backgroundColor:Const.appblue}]}>
                            <TouchableHighlight
                                onPress={() => this.onDelete(this.props.navigation.state.params.report)}
                                style={style.edit} underlayColor='transparent'>
                                <Text style={style.editText}>
                                    DELETE
                                </Text>
                            </TouchableHighlight>
                        </View>
                    </View>
                </ScrollView>
            </View>
        );
    }
}

const mapStateToProps = state => {
    console.log('updated data', state.appAllData.updatedData);
    return {
        isNetwork:state.appAllData.isNetwork
    };
};

export default connect(mapStateToProps, {
    setSelectedReport,
    setUpdatedData,
    deleteReport
})(ReportDetail);

const style = StyleSheet.create({
    container: {
        flex:1,
        backgroundColor:'white',

    },
    propertyimage: {
        flex:1,
        margin:20,
        width:null,
        height:Const.height/3
    },
    map: {
        position: 'absolute',
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
    },
    edit: {
        alignItems:'center',
        justifyContent:'center'
    },
    editText: {
        fontWeight:'bold',
        color:'white',
    },
    btnview: {
        width:Const.width-40,
        padding:15,
        margin: 5,
        borderRadius:25,
        backgroundColor:'rgba(231,231,231,1)'
    },
});