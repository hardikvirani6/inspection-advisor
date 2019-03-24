import React,{Component} from 'react';
import {
    StyleSheet,
    View,
    ScrollView,
    Text,
    Image,
    TouchableHighlight,
    Alert,
    Easing,
    Animated,
    ToastAndroid
} from 'react-native';
import ReportListComponent from '../component/report/reportListComponent';
import Loader from '../../helper/loader'
import Const from '../../helper/constant';
import Header from '../component/reportHeader';
import { connect } from 'react-redux';
import {
    getReportList,
    deleteReportList
} from "../../actions/reportListAction"
import {
    setSelectedReport,
    deleteReport
} from "../../actions/reportAction";
import {
    setUpdatedData
} from '../../actions/updatedAppDataAction';
import {NavigationActions} from "react-navigation";
let isHidden = true;

class ReportList extends Component{

    static navigationOptions = {
        header: null,
    };

    constructor(props){
        super(props);
        this.state = {
            reportdata:this.props.reportdata,
            position:'relative',
            isLoading:true
        };
        this.animatedvalue = new Animated.Value(0);
    }

    onAdd = () => {
        this.props.navigation.navigate('CreateReport')
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
        else {
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

    onPress = (objReport) => {
        this.props.navigation.navigate('ReportDetail',{report: objReport})
    };

    onLogOut = () => {
        this.props.setUserLogout(this.props.isNetwork)
            .then(() => {
                this.props.navigation.dispatch(NavigationActions.reset({
                    index: 0,
                    actions: [
                        NavigationActions.navigate({ routeName: 'LogIn' })
                    ]
                }))
            })
            .catch((e) => {

            });
    };

    animate = () => {
        this.animatedvalue.setValue(0);
        let toValue = 0;
        this.setState({
            position:'relative'
        });

        if(isHidden) {
            toValue = 1;
            this.setState({
                position:'absolute'
            })
        }
        Animated.timing(
            this.animatedvalue,
            {
                toValue:toValue,
                duration:250,
                Easing:Easing,
                delay:100
            }
        ).start();
        isHidden = !isHidden;
    };

    render(){
        const viewHeight = this.animatedvalue.interpolate({
            inputRange: [0, 1],
            outputRange: [0, 100]
        });

        const viewWidth = this.animatedvalue.interpolate({
            inputRange: [0, 1],
            outputRange: [0, 150]
        });
        return(
            <View style={{flex:1}}>
                <Header title='Inspection' onMenuPressed={this.animate} rightHeader={true} onUserPressed={this.animate}/>
                <View style={{backgroundColor:'white',flex:1,alignItems:'center'}}>
                    <ScrollView style={{flex:1}}
                                bounces={false}
                                horizontal={false}
                                showsVerticalScrollIndicator={false}
                                scrollEnabled={true}
                                ref="mainScroll">
                        <Text style={style.search}>Search Reports</Text>
                        <View style={style.line}/>
                        {
                            this.props.reports.map((data, index) => {
                                return(
                                    <ReportListComponent key={index}
                                                         reportdata={data}
                                                         index={index}
                                                         onPress={this.onPress}
                                                         onPreview={this.onPreview}
                                                         onEdit={this.onEdit}
                                                         onDelete={this.onDelete}/>
                                );
                            })
                        }

                    </ScrollView>
                    <View style={{justifyContent:'flex-end',alignItems:'center',position:'absolute',flex:1,marginTop:Const.height-180}}>
                        <TouchableHighlight onPress={() => this.onAdd()} underlayColor="transparent">
                            <Image style={{height:45,width:45}} source={require('../../assets/add.png')}/>
                        </TouchableHighlight>
                    </View>

                    <Animated.View style={{width:150,height:viewHeight,position:this.state.position,backgroundColor:'rgb(235,235,235)',
                        marginTop:5,marginLeft:Const.width-160,borderRadius:5}}>
                        <TouchableHighlight onPress={()=>{this.onLogOut()}} underlayColor="transparent">
                            <Text style={{marginTop:2,padding:10}}>Log Out</Text>
                        </TouchableHighlight>
                    </Animated.View>
                    {
                        //this.state.isLoading && <Loader visible="true"/> || null
                    }
                </View>
            </View>
        );
    }
}

const mapStateToProps = state => {
    return {
        reports: state.appAllData.reports,
        isNetwork:state.appAllData.isNetwork
    };
};

export default connect(mapStateToProps, {
    getReportList,
    deleteReportList,
    setSelectedReport,
    setUpdatedData,
    deleteReport
})(ReportList);


const style = StyleSheet.create({
    search: {
        marginLeft:15,
        marginTop:10,
        fontSize:14,
        color:Const.lbgray,
        backgroundColor:'transparent'
    },
    line: {
        backgroundColor:Const.lbgray,
        height:2,
        width:Const.width-30,
        marginLeft:15,
        marginTop:3,
        marginBottom:10
    },
    headerimage: {
        width:30,
        height:30,
        margin:10,
    },


});
