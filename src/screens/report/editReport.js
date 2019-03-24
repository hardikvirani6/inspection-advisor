import React,{ Component } from 'react';
import {
    StyleSheet,
    View,
    ScrollView,
    TouchableHighlight,
    Text,
    TouchableOpacity,
    TextInput,
    Alert
} from 'react-native';
import ListHeader from'../component/listHeader';
import ListComponent from '../component/listComponent';
import Const from '../../helper/constant';
import Header from '../../screens/component/header';
import Modal from 'react-native-modal';
import SendReportModal from '../component/sendReportModal';
import { connect } from 'react-redux';

let sectionDetail = [{"Information":[{"name":"Property Information"},
    {"name":"Client Information"},{"name":"Agent Information"},{"name":"Inspection Report Options"},
    {"name":"Invoice"}]}];

class ReportSection extends Component{
    constructor(props){
        super(props);
        this.state = {
            isSubSection:false,
            visibleModal: null,
            email:'',
            sendreportId:0,
            isReportSent:false,
            validemail:true,
            sectionDetail: sectionDetail,
        }
    }

    componentWillMount(){
        sectionDetail = [{"Information":[{"name":"Property Information"},
            {"name":"Client Information"},{"name":"Agent Information"},{"name":"Inspection Report Options"},
            {"name":"Invoice"}]}];
    }

    componentDidMount(){
        if(this.props.selectedReport.template.sections){
            let sections = this.props.selectedReport.template.sections;
            sectionDetail.push({Inspection: sections});
            this.setState({
                sectionDetail: sectionDetail
            });
        }
    }

    componentWillReceiveProps(nextProps) {
        if(nextProps.selectedReport.template.sections){
            let sections = nextProps.selectedReport.template.sections;
            sectionDetail.push({Inspection: sections});
            this.setState({
                sectionDetail: sectionDetail
            });
        }
    }

    onSelect = (objData) => {
        if(objData.name === 'Property Information'){
            this.props.navigation.navigate('PropertyInfo');
        }else if(objData.name === 'Client Information'){
            this.props.navigation.navigate('ClientInfo');
        }else if(objData.name === 'Agent Information'){
            this.props.navigation.navigate('AgentInfo');
        }else if(objData.name === 'Inspection Report Options'){
            this.props.navigation.navigate('InspectionReport');
        }else if(objData.name === 'Invoice'){
            this.props.navigation.navigate('Invoice');
        }else{
            if(objData.subsections.length > 0){
                this.props.navigation.navigate('ReportSubSection',{ sectionId: objData.section_id, name: objData.name });
            }else{
                Alert.alert('No Data found.')
            }
        }
    };

    onBack = () => {
        this.props.navigation.goBack()
    };

    onSendReport = () => {
        this.setState({ visibleModal: 1 })
    };

    validateEmail = (email) => {
        let re = /^((([^<>()\[\]\\.,;:\s@â€œ]+(\.[^<>()\[\]\\.,;:\s@â€œ]+)*)|(â€œ.+â€œ))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,})+([\\,]?)))*$/g;
        return re.test(email);
    };

    onSendReportOk = () => {
        if(this.state.validemail){
            let formdata = new FormData();
            formdata.append("additional_contacts", this.state.email);
           /* this.props.sendReportData(formdata,this.props.selectedReport.report.report_id)
                .then(() => {
                    this.setState({ isReportSent: true })
                })
                .catch(() => {
                    Alert.alert('something went wrong')
                })*/
            Alert.alert('To be Completed')
        }else{
            Alert.alert('Enter Valid Email')
        }
    };

    renderButton = (text, onPress) => (
        <TouchableOpacity onPress={onPress}>
            <View style={style.button}>
                <Text style={{color:'white'}}>{text}</Text>
            </View>
        </TouchableOpacity>
    );

    renderModalContent = () => (
        <View style={style.modalContent}>
            {
                (this.state.isReportSent)
                &&
                <View style={{alignItems:'center',justifyContent:'center'}}>
                    <Text style={{marginBottom:10}}>Report successfully sent!</Text>
                    {this.renderButton('OK', () => this.setState({visibleModal:null,isReportSent:false}))}
                </View>
                ||
                <View style={{alignItems:'center',justifyContent:'center'}}>
                    <SendReportModal limit={this.props.report_limit}
                                     client={this.props.email}/>

                    {
                        (this.state.addRecipients)
                        &&
                        <View style={{alignItems:'center'}}>
                            <TextInput
                                style={{height: 40, borderColor: (this.state.validemail) && 'gray' || 'red', borderWidth: 1,width:300,margin:10,borderRadius:5}}
                                onChangeText={(text) => this.setState({
                                    validemail:this.validateEmail(text),
                                    email:text
                                })}
                                placeholder="joi@example.com,mia@example.com"
                                value={this.state.email}
                            />
                            <Text style={{fontSize:12,padding:5}}>
                                Add additional comma (,) separated email address
                            </Text>
                        </View>
                        ||
                        <TouchableHighlight onPress={() => {this.setState({addRecipients: true})}}
                                            underlayColor="transparent">
                            <Text style={{color:Const.appblue,padding:10}}>Add More Recipients?</Text>
                        </TouchableHighlight>
                    }

                    <View style={{flexDirection:'row'}}>
                        {this.renderButton('Cancel', () => this.setState({ visibleModal: null }))}
                        {this.renderButton('OK', () => this.onSendReportOk())}
                    </View>
                </View>
            }
        </View>
    );

    render(){
        return(
            <View style={style.container}>
                <Header title={this.props.selectedReport.report.name} onBackPressed={this.onBack} rightHeader={true} onSend={this.onSendReport}/>
                <ScrollView style={{flex:1,marginBottom:5,marginTop:10}}
                            bounces={false}
                            horizontal={false}
                            showsVerticalScrollIndicator={false}
                            scrollEnabled={true}
                            ref="mainScroll">
                    <Modal isVisible={this.state.visibleModal === 1}
                           animationIn={'zoomIn'}
                           animationOut={'zoomOut'}
                           animationInTiming={500}
                           animationOutTiming={500}
                           backdropTransitionInTiming={5}
                           backdropTransitionOutTiming={5}
                           avoidKeyboard={false}>{this.renderModalContent()}</Modal>
                    {
                        this.state.sectionDetail.map((data, index) => {
                            let keyStr = Object.keys(data);
                            return(
                                <View key={index}>
                                    <ListHeader key={index} title={keyStr[0]}/>
                                    {
                                        data[keyStr[0]].map((obj, i) => {
                                            return(
                                                <ListComponent key={i} data={obj} onSelect={this.onSelect}/>
                                            );
                                        })
                                    }
                                </View>
                            );
                        })
                    }
                </ScrollView>

            </View>
        );
    }
}

const mapStateToProps = state => {
    return {
        selectedReport: state.report.selectedReport,
        report_limit: state.userlogin.userdata.organization_setting.report_limit || "",
        email: state.userlogin.userdata.email || "",
    };
};

export default connect(mapStateToProps, {
    //getReportSection,
    //sendReportData
})(ReportSection);

const style = StyleSheet.create({
    container: {
        flex:1,
        backgroundColor:'white'
    },
    modalContent: {
        backgroundColor: 'white',
        padding: 22,
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 4,
        borderColor: 'rgba(0, 0, 0, 0.1)',
    },
    button: {
        backgroundColor: Const.appblue,
        padding: 12,
        margin: 3,
        height:35,
        width:100,
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 15,
        borderColor: 'rgba(0, 0, 0, 0.1)',
    },
});
