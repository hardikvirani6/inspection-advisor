import React,{Component} from 'react';
import {
    StyleSheet,
    View,
    ScrollView,
    Text,
    StatusBar,
    Image,
    ListView,
    TextInput,
    TouchableHighlight,
    TouchableOpacity,
    Animated,
    Easing,
    AsyncStorage, Alert,
    FlatList
} from 'react-native';
import { NavigationActions } from 'react-navigation'
import ReportListComponent from '../component/report/reportListComponent';
import Loader from '../../helper/loader'
import Const from '../../helper/constant';
import FontSize from '../../helper/fontsize';
import SwipeButton from '../component/report/swipeButton';
import SendReportModal from '../component/sendReportModal';
import Header from '../component/reportHeader';
import { connect } from 'react-redux';
import { SwipeListView, SwipeRow } from 'react-native-swipe-list-view';
let datafile = require('../../services/data.json');
import Modal from 'react-native-modal';
import {
    getReportList,
    deleteReportList
} from "../../actions/reportListAction";
import {
    sendReportData
} from "../../actions/sendReportAction";
import { Dimensions } from 'react-native';
import {reportListServices} from '../../realmServices/reportListServices';
const {height, width} = Dimensions.get('window');
const aspectRatio = height/width;
const swipeimage = {
    edit:require('../../assets/Edit.png'),
    preview:require('../../assets/Preview.png'),
    delete:require('../../assets/delete.png'),
};
let that;
let isHidden = true;
let _ = require('lodash');

const navigateAction = NavigationActions.navigate({
    routeName: 'Main',
    params: {},

    // navigate can have a nested navigate action that will be run inside the child router
    action: NavigationActions.navigate({ routeName: 'Main',direction:'back'})
});

class ReportList extends Component{

    constructor(props){
        super(props);
        this.state = {
            isLoading:!(this.props.reports),
            position:'relative',
            visibleModal: null,
            addrecipients:false,
            email:'',
            userdata:this.props.userdata,
            sendreportId:0,
            isReportSent:false,
            validemail:true,
        };
        this.animatedvalue = new Animated.Value(0);
        StatusBar.setHidden(false)
    }

    componentWillMount(){
    }

    componentDidMount(){
    }

    componentWillReceiveProps(nextProps) {
        if (nextProps.reports.length > 0) {
            this.setState({
                isLoading: false
            })
        }
    }

    onEdit = (reportid,name, tid) => {
        if(tid === null){
            this.props.navigation.navigate('EditReport',{reportId:reportid,sectionTitle:name,externalID:true})
        }
        else{
            this.props.navigation.navigate('EditReport',{reportId:reportid,sectionTitle:name,externalID:true, templateId: tid})
        }

    };

    onPreview = (id,name) => {
        this.props.navigation.navigate('Preview',{reportId:id,sectionTitle:name})
    };

    onDelete = (id) => {

        Alert.alert(
            'Warning',
            'Do you want to delete?',
            [
                {text: 'Cancel', onPress: () => console.log('Cancel Pressed'), style: 'cancel'},
                {text: 'OK', onPress: () => {
                    this.props.deleteReportList(id)
                        .then((res)=>{
                            Alert.alert("Deleted Successfully.")
                        })
                        .catch((err)=>{
                            Alert.alert("Something went wrong.")
                        });
                }},
            ]
        )


    };

    onAdd = () => {
        this.props.navigation.navigate('CreateReport')
    }

    onPress = (id,name) => {
        this.props.navigation.navigate('ReportDetail',{reportId:id,sectionTitle:name})
    };

    onSendReport = (reportid) => {
        this.setState({
            visibleModal: 1 ,
            sendreportId:reportid
        })
    }

    onSendReportOk = () => {
        if(this.state.validemail){
            let formdata = new FormData();
            formdata.append("additional_contacts", this.state.email)
            this.props.sendReportData(formdata,this.state.sendreportId)
                .then(() => {
                    this.setState({ isReportSent: true })
                })
                .catch(() => {
                    Alert.alert('something went wrong')
                })
        }else{
            Alert.alert('Enter Valid Email')
        }

    }

    validateEmail = (email) => {
        this.setState({email:email})
        let re = /^((([^<>()\[\]\\.,;:\s@â€œ]+(\.[^<>()\[\]\\.,;:\s@â€œ]+)*)|(â€œ.+â€œ))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,})+([\\,]?)))*$/g;
        return re.test(email);
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
                        (this.state.addrecipients)
                        &&
                        <View style={{alignItems:'center'}}>
                            <TextInput
                                style={{height: 40, borderColor: (this.state.validemail) && 'gray' || 'red', borderWidth: 1,width:300,margin:10,borderRadius:5}}
                                onChangeText={(text) => this.setState({
                                    validemail:this.validateEmail(text)
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


    onLogOut = () => {

        AsyncStorage.removeItem('user').then(res=>{
            return AsyncStorage.removeItem('user');
        }).then(res=>{
            return AsyncStorage.removeItem('user');
        }).catch(err=>{

        });

        AsyncStorage.removeItem('user', (err) => {
            this.props.navigation.dispatch(navigateAction);
            return Promise.resolve(true)
        });
    };


    renderRow = (rowData) => {
        return(
            <ReportListComponent key={rowData.id}
                                 reportdata={rowData}
                                 onPress={this.onPress}/>
        );
    };

    setOpenedCell = (reportId) => {
        this.setState({
            openedCell: reportId,
            reportdata: _.cloneDeep(this.props.reportdata)

        })
    };

    renderFlatListRow = ({item}) => (
        <ReportListComponent key={item.id}
                             reportdata={item}
                             onPress={this.onPress}
                             isOpened={(this.state.openedCell && this.state.openedCell === item.report_id)}
                             setOpenedCell={this.setOpenedCell}
                             onEdit={this.onEdit}
                             onPreview={this.onPreview}
                             onSend={this.onSendReport}
                             onDelete={this.onDelete}/>
    );

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

            <View style={style.container}>
                <Header title='Inspection' onMenuPressed={this.animate} rightHeader={true} onUserPressed={this.animate}/>
                <View style={{backgroundColor:'white',flex:1,alignItems:'center'}}>

                    <View>
                        <Text style={style.search}>Search Reports</Text>
                        <View style={style.line}/>
                    </View>
                    <Modal isVisible={this.state.visibleModal === 1}
                           animationIn={'zoomIn'}
                           animationOut={'zoomOut'}
                           animationInTiming={500}
                           animationOutTiming={500}
                           backdropTransitionInTiming={5}
                           backdropTransitionOutTiming={5}>{this.renderModalContent()}</Modal>

                    <FlatList
                        data={this.props.reports}
                        renderItem={this.renderFlatListRow}
                        showsVerticalScrollIndicator={false}/>
                    <View style={{justifyContent:'flex-end',alignItems:'center',position:'absolute',flex:1,marginTop:(aspectRatio > 1.6)?Const.height-160:Const.height-200}}>
                        <TouchableHighlight onPress={() => this.onAdd()} underlayColor="transparent">
                            <Image style={{height:(aspectRatio > 1.6)?45:70,width:(aspectRatio > 1.6)?45:70}} source={require('../../assets/add.png')}/>
                        </TouchableHighlight>
                    </View>

                    <Animated.View style={{width:150,height:viewHeight,position:this.state.position,backgroundColor:'rgb(235,235,235)',marginTop:5,marginLeft:Const.width-160,borderRadius:5}}>

                        <TouchableHighlight onPress={()=>{this.onLogOut()}} underlayColor="transparent">
                            <Text style={{marginTop:2,padding:10}}>Log Out</Text>
                        </TouchableHighlight>

                    </Animated.View>
                    {
                        this.state.isLoading && <Loader visible="true"/> || null
                    }

                </View>
            </View>
        );
    }
}

const mapStateToProps = state => {
    return {
        reports: state.appAllData.reports,
        report_limit: state.userlogin.userdata.organization_setting.report_limit || "",
        email: state.userlogin.userdata.email || "",
    };
};

export default connect(mapStateToProps, {
   // getReportList,
   // deleteReportList,
    //sendReportData
})(ReportList);


const style = StyleSheet.create({
    container: {
        flex:1
    },
    search: {
        marginLeft:15,
        marginTop:10,
        fontSize:FontSize.regFont,
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
        margin:10
    },
    standaloneRowFront: {
        alignItems: 'center',
        backgroundColor: '#CCC',
        justifyContent: 'center',
        height: 50,
    },
    standaloneRowBack: {
        alignItems: 'center',
        backgroundColor: 'transparent',
        flex: 1,
        flexDirection: 'row',
        justifyContent: 'flex-end',
        padding: 15
    },
    hiddenRowComponent: {
        width:60,
        flexDirection:'column'
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