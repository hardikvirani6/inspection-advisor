import React,{ Component } from 'react';
import {
    StyleSheet,
    View,
    Text,
    Picker,
    ScrollView,
    TouchableHighlight,
    Alert
} from 'react-native';
import Const from '../../helper/constant';
import TextInputInfo from '../component/textInputInfo';
import DropDown from '../component/infoDropDown';
import DatePicker from 'react-native-datepicker';
import Header from '../../screens/component/header';
import Moment from 'moment';
import { connect } from 'react-redux';
import {
    addReport
} from '../../actions/reportAction';
import {
    getReportTemplate
} from '../../actions/reportTemplateAction';
import {
    setUpdatedData
} from '../../actions/updatedAppDataAction';
let _ = require('lodash');
let views = null;
let reportInfo = {};

class CreateReport extends Component{

    constructor(props){
        super(props);
        this.state = {
            views: [],
            selected: 'Select Template',
            opened: false,
            date: '',
            isDateChanged: false,
            template: this.props.template,
            templateItem:[],
            minTime:(Moment(new Date()).format('DD-MM-YYYY')).toString()
        };
        reportInfo = {}
    }

    onBack = () => {
        this.props.navigation.goBack(null)
    };

    updateState = (state,index) => {
        this.setState({selected: state});
        this.onUpdate('state',state);
        this.onPressRemoveView()
    };

    onPressSelect = () => {
        if (this.state.opened === false) {
            this.setState((state) => ({views: [...state.views, {}]}));
            this.setState({opened: true});
        }else{
            this.setState({opened: false});
            this.setState((state) => ({views: state.views.slice(0, -1)}));
        }
    };

    onPressRemoveView = () => {
        this.setState({opened: false});
        this.setState((state) => ({views: state.views.slice(0, -1)}));
    };

    onUpdate = (key,value) => {
        let template = _.find(this.props.templates, {name:value});
        if(key ==='state'){
           this.state.selected = value;
            reportInfo['template_id'] = template.template_id;
        }else{
            reportInfo[key] = value;
        }

    };

    onSave = () => {
        if(reportInfo.hasOwnProperty("template_id")){
            let info = {
                report_id: new Date().getTime(),
                organization_id: this.props.organization_id,
                user_id:this.props.user_id,
                name: reportInfo["name"],
                template_id: reportInfo["template_id"].toString(),
                agent: {},
                client: {},
                property: {},
                selected_subsections: [],
                data: [],
                isLocal: true
            };

            this.props.addReport(info)
                .then(()=>{
                    Alert.alert('Report saved successfully');

                    let queueInfo = {};
                    Object.assign(queueInfo, info);
                    delete queueInfo["isLocal"];
                    delete queueInfo["report_id"];

                    let obj = {
                        resource:'report',
                        primary_key:info.report_id,
                        data:queueInfo,
                        operation:'INSERT',
                        operation_id: new Date().getTime(),
                        record_timestamp: new Date()
                    };

                    this.props.setUpdatedData(obj)
                        .then(()=>{
                            console.log('report added')
                        })
                })
                .catch((err)=>{
                    Alert.alert('Something went wrong.')
                });
        }else{
            Alert.alert('Select Template')
        }
    };

    render(){
        views =
            this.state.views.map((view, i) =>
                <View key={i} style={style.outer}>
                    <View>
                        <Picker style={style.picker}
                                selectedValue={this.state.selected}
                                onValueChange={this.updateState}>
                            {
                                this.props.templates.map(function (state, index) {
                                    return <Picker.Item key={index} label={state.name} value={state.name}/>
                                })
                            }
                        </Picker>
                    </View>
                </View>
            );

        return(
            <View style={style.container}>
                <Header title='Create Report' onBackPressed={this.onBack} rightHeader={false}/>
                <View style={style.innercontainer}>
                <ScrollView showsVerticalScrollIndicator={false}>
                    <View style={{marginTop:10,flex:1}}>
                        <TextInputInfo placeholder="Report Name"
                                       keytext="name"
                                       text={reportInfo['name']}
                                       onUpdateData={this.onUpdate}/>
                        <View style={style.dateTimePickerView}>
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
                        <View style={style.dateTimePickerView}>
                            <DatePicker
                                style={{width: Const.width-40}}
                                date={this.state.time}
                                mode="time"
                                placeholder="Inspection time"
                                placeholderTextColor={Const.appblue}
                                format="h:mm a"
                                confirmBtnText="Confirm"
                                cancelBtnText="Cancel"
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
                        <View style={{paddingLeft:12,paddingRight:12}}>
                        <DropDown onSelectItem={this.onPressSelect}
                                  style={{backgroundColor:Const.darkgray}}
                                  title={this.state.selected}
                                  item={this.state.templateItem}
                                  selected={this.state.selected}
                                  onUpdateData={this.onUpdate}/>
                        </View>

                    </View>
                    <View style={{flex:1,paddingRight:20,marginTop:5,flexDirection:'row',alignItems:'flex-end',justifyContent:'flex-end'}}>
                        <TouchableHighlight onPress={() => this.props.navigation.goBack(null)} underlayColor='transparent'>
                            <View style={style.btn}>
                                <Text style={{color:'white'}}>
                                    Cancel
                                </Text>
                            </View>
                        </TouchableHighlight>
                        <TouchableHighlight onPress={() => this.onSave()} underlayColor='transparent'>
                            <View style={style.btn}>
                                <Text style={{color:'white'}}>
                                    Save Changes
                                </Text>
                            </View>
                        </TouchableHighlight>
                    </View>
                </ScrollView>
                <View style={style.viewContainer}>
                    {views}
                </View>
            </View>
            </View>
        );
    }
}

const mapStateToProps = state => {
    return {
        organization_id:state.userlogin.organization_id,
        user_id: state.userlogin.id,
        templates:state.appAllData.templates,
    };
};

export default connect(mapStateToProps, {
    addReport,
    getReportTemplate,
    setUpdatedData
})(CreateReport);


const style = StyleSheet.create({
    container: {
      flex:1
    },
    innercontainer: {
        flex:1,
        backgroundColor:'white',
        alignItems:'center'
    },
    textview: {
        width:Const.width-60,
        padding:15,
        margin: 10,
        borderRadius:25,
        backgroundColor:'rgba(231,231,231,1)'
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
    viewContainer: {
        flex: 1,
        flexDirection: 'row',
        flexWrap: 'wrap',
        position: 'absolute',
        marginTop:Const.height-230-65,
        backgroundColor: 'white'
    },
    outer:{
        flex:1,
        flexDirection:'column',
        marginBottom:70,
        justifyContent: 'flex-end'

    },
    picker:{
        marginBottom:0,
    },
    dateTimePickerView: {
        padding:5,
        paddingLeft:20,
        paddingRight:20
    },
    btn: {
        justifyContent:'center',
        alignItems:'center',
        backgroundColor:Const.appblue,
        borderRadius:18,
        height:36,
        width:120,
        margin:3
    }
});



