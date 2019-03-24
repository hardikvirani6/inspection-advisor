import React,{ Component } from 'react';
import {
    StyleSheet,
    View,
    Text,
    TouchableHighlight,
    Alert,
    ScrollView
} from 'react-native';
import {
    updateReport
} from '../../../actions/reportAction';
import TextBox from '../../component/textInputInfo';
import DatePicker from 'react-native-datepicker';
import Const from '../../../helper/constant';
import RadioButton from '../../component/radioInfo';
import Header from '../../component/header';
import { connect } from 'react-redux';
import Moment from 'moment';
let DeviceInfo = require('react-native-device-info');
let data = ['no','yes'];
let inspectionReport = {};

class InspectionReport extends Component{
    constructor(props){
        super(props);
        this.state = {
            //date:"select inspection date",
            //time:'select inspection time',
            isDateChanged:false,
            minTime:(Moment(new Date()).format('DD-MM-YYYY')).toString()
        }
    }

    componentDidMount(){
        if(this.props.selectedReport.inspection_date_time){
            this.setState({
                date:(Moment(this.props.selectedReport.inspection_date_time).format('DD-MM-YYYY')),
                time:(Moment(this.props.selectedReport.inspection_date_time).format('HH:mm')),
            });
        }
    }

    onBack = () => {
        this.props.navigation.goBack(null)
    };

    onUpdate = (key,value) => {
        if(this.props.selectedReport){
            this.props.selectedReport[key] = value;
            inspectionReport[key] = value;
        }else{
            inspectionReport[key] = value;
        }
    };

    onSave = () => {
        let formattedDate = Moment(this.state.date+ " "+this.state.time, "DD_MM_YYYY hh:mm a").format("YYYY-MM-DD HH:mm:ss")
        if(this.state.isDateChanged){
            let timeZone = DeviceInfo.getTimezone();
            inspectionReport['time_zone'] = timeZone;
            inspectionReport['inspection_date_time'] = formattedDate
        }

        this.props.updateReport(this.props.selectedReport.report_id,inspectionReport)
            .then(()=>{
                Alert.alert('Report saved successfully')
            })
            .catch((err)=>{
                Alert.alert('Something went wrong.')
            });

    };

    render(){
        return(
            <View style={style.container}>
                <Header title='Inspection Report' onBackPressed={this.onBack} rightHeader={false}/>
                <View style={style.innercontainer}>
                    <ScrollView showsVerticalScrollIndicator={false} bounces={false}>
                        <TextBox style={{marginTop:5}}
                                 placeholder="Inspection File Name"
                                 keytext="name"
                                 text={(this.props.selectedReport) ? this.props.selectedReport.name : inspectionReport['name']}
                                 onUpdateData={this.onUpdate}/>
                        <View style={{padding:10}}>
                            <DatePicker
                                style={{width: Const.width-40}}
                                date={this.state.date}
                                mode="date"
                                placeholder="Inspection date"
                                placeholderTextColor={Const.appblue}
                                format="DD-MM-YYYY"
                                minDate={this.state.minTime}
                                maxDate="01-01-2200"
                                confirmBtnText="Confirm"
                                cancelBtnText="Cancel"
                                customStyles={{
                                    dateInput: {
                                        marginLeft: 0
                                    },
                                }}
                                onDateChange={(date) => {
                                    this.setState({
                                        date: date,
                                        isDateChanged:true
                                    });
                                    let tempdate = date.replace(/-/g, "/");
                                    this.onUpdate('inspection_date',tempdate)
                                }}
                            />
                        </View>
                        <View style={{padding:10}}>
                            <DatePicker
                                style={{width: Const.width-40}}
                                date={this.state.time}
                                mode="time"
                                placeholder="Inspection time"
                                placeholderTextColor={Const.appblue}
                                format="h:mm a"
                                confirmBtnText="Confirm"
                                cancelBtnText="Cancel"
                                is24Hour={false}
                                customStyles={{
                                    dateInput: {
                                        marginLeft: 0
                                    },
                                }}
                                onDateChange={(time) => {
                                    this.setState({
                                        time: time,
                                        isDateChanged:true
                                    });
                                    this.onUpdate('inspection_time',time)
                                }}
                            />
                        </View>
                        <View style={{padding:10}}>
                            <RadioButton title="Send a copy of report to the client"
                                         item={data}
                                         keytext="send_to_client"
                                         selectedIndex={(this.props.selectedReport) ? this.props.selectedReport.send_to_client : null}
                                         onUpdateData={this.onUpdate}/>
                            <RadioButton title="Send a copy of report to the agent"
                                         item={data}
                                         keytext="send_to_agent"
                                         selectedIndex={(this.props.selectedReport) ? this.props.selectedReport.send_to_agent : null}
                                         onUpdateData={this.onUpdate}/>
                        </View>
                        <TouchableHighlight style={style.edit} underlayColor='transparent' onPress={() => {this.onSave()}}>
                            <View style={[style.btnview,{backgroundColor:Const.appblue}]}>
                                <Text style={style.editText}>
                                    SAVE
                                </Text>
                            </View>
                        </TouchableHighlight>
                    </ScrollView>
                </View>
            </View>
        );
    }

}

const mapStateToProps = state => {
    return {
        selectedReport: state.report.selectedReport.report
    };
};

export default connect(mapStateToProps, {
    updateReport
})(InspectionReport);

const style = StyleSheet.create({
    container:{
        flex:1
    },
    innercontainer: {
        flex:1,
        backgroundColor:'white',
        padding:10
    },
    btnview: {
        width:Const.width-40,
        padding:15,
        margin: 7,
        borderRadius:25,
        backgroundColor:'rgba(231,231,231,1)',
        alignItems:'center'
    },
    editText: {
        fontWeight:'bold',
        color:'white',
        width:70,
        textAlign:'center',
    },
    edit: {
        alignItems:'center',
        justifyContent:'center',
    },
});