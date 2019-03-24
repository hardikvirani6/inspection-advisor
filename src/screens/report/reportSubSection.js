import React,{ Component } from 'react';
import {
    StyleSheet,
    View,
    ScrollView,
    TouchableHighlight,
    TextInput,
    Text,
    TouchableOpacity,
    Alert,
} from 'react-native';
import ListComponent from '../component/listComponent';
import Const from '../../helper/constant';
import Header from '../../screens/component/header';
import Modal from 'react-native-modal';
import SendReportModal from '../component/sendReportModal';
import { connect } from 'react-redux';
import {
    getReportSubSection
} from '../../actions/reportSubSectionAction';
import {
    sendReportData
} from "../../actions/sendReportAction";
let _ = require('lodash');

class ReportSubSection extends Component{
    constructor(props){
        super(props);
        this.state = {
            visibleModal: null,
            email:'',
            isReportSent:false,
            validemail:true,
            subsectionId: props.navigation.state.params.subsectionId,
            reportSectionData:[],
        }
    }

    onBack = () => {
        this.props.navigation.goBack(null)
    };

    componentDidMount(){
        let selectedSubSections = _.find(this.props.selectedReport.template.sections, { section_id: this.props.navigation.state.params.sectionId });
        if(selectedSubSections !== undefined){
            if(selectedSubSections.subsections){
                this.setState({
                    reportSectionData:selectedSubSections.subsections,
                });
            }
        }
    }

    onSelectSubction = (objData) => {
        this.props.navigation.navigate('Form',{subsectionID: objData.subsection_id, name: objData.name,
            sectionId: this.props.navigation.state.params.sectionId});
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
            // let formdata = new FormData();
            // formdata.append("additional_contacts", this.state.email)
            // this.props.sendReportData(formdata,this.state.reportid)
            //     .then(() => {
            //         this.setState({ isReportSent: true })
            //     })
            //     .catch(() => {
            //         Alert.alert('something went wrong')
            //     })
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
                    <Text style={{marginBottom:10}}>Report successfully sent</Text>
                    {this.renderButton('OK', () => this.setState({visibleModal:null,isReportSent:false}))}
                </View>
                ||
                <View style={{alignItems:'center',justifyContent:'center'}}>
                    <SendReportModal limit={this.props.report_limit}
                                     client={this.props.email}/>

                    {
                        (this.state.addrecipients)
                        &&
                        <View style={{alignItems:'center'}}>
                            <TextInput
                                style={{height: 40, borderColor: (this.state.validemail) && 'gray'
                                || 'red', borderWidth: 1,width:300,margin:10,borderRadius:5}}
                                onChangeText={(text) => this.setState({
                                    validemail:this.validateEmail(text),
                                    email: text
                                })}
                                placeholder="joi@example.com,mia@example.com"
                                value={this.state.email}
                            />
                            <Text style={{fontSize:12,padding:5}}>
                                Add additional comma (,) separated email address
                            </Text>
                        </View>

                        ||

                        <TouchableHighlight onPress={() => {this.setState({addrecipients:true})}}
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
                <Header title={this.props.navigation.state.params.name} onBackPressed={this.onBack} rightHeader={true} onSend={this.onSendReport}/>
                <ScrollView style={{flex:1,marginBottom:5,marginTop:30}}
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
                        this.state.reportSectionData.map((data, index) => {

                            return(
                                <ListComponent key={index} data={data} onSelect={this.onSelectSubction}/>
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
    getReportSubSection,
    sendReportData
})(ReportSubSection);

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