import React, { Component } from 'react';
import {
    StyleSheet,
    Text,
    View,
    Image,
    BackHandler,
    TouchableHighlight,
    NetInfo
} from 'react-native';
import BackgroundTimer from 'react-native-background-timer';
import Const from '../helper/constant';
import DashboardComponent from './component/dashboard/dashboardComponent'
import FontSize from '../helper/fontsize';
import Loader from '../helper/loader';
import { connect } from 'react-redux';
import {
    getAllData,
    setNetworkState
} from "../actions/getAllDataAction"
import {postUpdatedData} from '../actions/updatedAppDataAction';
import SplashScreen from "react-native-splash-screen";
const {height, width} = Const;
const aspectRatio = height/width;

const dashboardnonselectedimage = {
    scheduler:require('../assets/Schedulenoselected.png'),
    dashboard:require('../assets/Dashboard_noselected.png'),
    inspection:require('../assets/Inspection_Noselected.png'),
    documents:require('../assets/Documents_Noselected.png'),
    companydata:require('../assets/CompanyData_Noselected.png'),
    account:require('../assets/Account_Noselected.png')
};

const dashboardselectedimage = {
    scheduler:require('../assets/Schedule_selected.png'),
    dashboard:require('../assets/Dashboard_selected.png'),
    inspection:require('../assets/Inspection_Selected.png'),
    documents:require('../assets/Documents_Selected.png'),
    companydata:require('../assets/CompanyData_Selected.png'),
    account:require('../assets/Account_Selected.png')
};

class Dashboard extends Component {
    constructor(props){
        super(props);
        this.state = {
            image: {uri: props.profileImage}
        }
    }

    componentDidMount() {
        SplashScreen.hide();
        console.log('Did mount.........');

        const dispatchConnected = isConnected => {
            console.log('Dashboard did mount');
            if(Const.OS){
                console.log('Dashboard did mount ios');
                BackgroundTimer.runBackgroundTimer(() => {
                    console.log('Dashboard did mount ios background...');
                    if(isConnected) {
                        console.log('Dashboard did mount ios background connected');
                        this.props.postUpdatedData()
                            .then((resp) => {
                                if(resp) {
                                    console.log('data available');
                                } else {
                                    console.log('data not available');
                                }
                            })
                    }
                }, 5000);
            }
            else{
                const intervalId = BackgroundTimer.setInterval(() => {
                    console.log('Android - Running....');
                    if(isConnected) {
                        this.props.postUpdatedData()
                            .then((resp) => {
                                if(resp) {
                                    console.log('data available');
                                } else {
                                    console.log('data not available');
                                }
                            })
                    }
                }, 5000);
            }
            this.props.setNetworkState(isConnected)
        };

        NetInfo.isConnected.fetch().then().done(() => {
            NetInfo.isConnected.addEventListener('connectionChange', dispatchConnected);
        });

        BackHandler.addEventListener('hardwareBackPress', function() {
            return true
        });
    }

    onPress = (selected) => {
        if(selected === "INSPECTION"){
            this.props.navigation.navigate('ReportList');
        }
    };

    onSetting = () => {
        this.props.navigation.navigate('Setting');
    };

    render() {
        return (
            <View style={styles.container}>
                <View style={{
                    height:Const.height/2.5,
                    width:Const.width,
                    justifyContent:'center',
                    alignItems:'center'}}>
                    <Image style={styles.proPics}
                           source={{uri: this.props.profileImage ? this.props.profileImage : this.state.image}}
                           defaultSource={require('../assets/lane.jpeg')}
                           onError={(e) => {
                               this.setState({
                                   image: require('../assets/lane.jpeg')
                               })
                           }}
                           resizeMode={'cover'}/>

                    <View style={{
                        position:'absolute',
                        height:Const.height/2.5,
                        width:Const.width,
                        justifyContent:'center',
                        alignItems:'center',
                        backgroundColor:'rgba(16,31,50,0.9)',
                    }}>
                        <Image style={styles.profilePics}
                               source={{uri: this.props.profileImage ? this.props.profileImage : this.state.image}}
                               defaultSource={require('../assets/lane.jpeg')}
                               onError={(e) => {
                                   this.setState({
                                       image: require('../assets/lane.jpeg')
                                   })
                               }}
                               resizeMode={'cover'}
                        />
                        <Text style={{marginTop:20,color:'white',fontSize:FontSize.seventeen,fontWeight:'600',width:Const.width,textAlign:'center'}}>Welcome {this.props.username}</Text>
                        <Text style={{color:'white',fontSize:FontSize.twelve,fontWeight:'400', paddingTop:5}}>{this.props.email}</Text>
                    </View>

                </View>

                <View style={{flex:1,margin:2,backgroundColor:'white'}}>
                    <View style={{paddingTop:15,width:Const.width,flexDirection:'row',
                        justifyContent:'space-between',alignItems:'center',paddingLeft:10,paddingRight:10}}>
                        <TouchableHighlight onPress={()=> {this.onSetting()}} underlayColor='transparent'>
                            <Image style={{height:(aspectRatio > 1.6)?Const.width/8:Const.width/13,width:(aspectRatio > 1.6)?Const.width/8:Const.width/13}}
                                   source={require('../assets/setting.png')}
                                   resizeMode="contain"/>
                        </TouchableHighlight>
                        <Text style={{fontWeight:'600',flex:1,textAlign:'center',color:'black',fontSize:FontSize.sixteen}}>Home Screen</Text>
                        <Image style={{height:(aspectRatio > 1.6)?Const.width/10:Const.width/15,width:(aspectRatio > 1.6)?Const.width/10:Const.width/15}}
                               source={require('../assets/notification.png')}
                               resizeMode="contain"/>
                    </View>
                    <View style={{flex:1,justifyContent:'center',paddingBottom:5}}>
                        <View style={{flexWrap:'wrap',flexDirection:'row',justifyContent:'center',alignItems:'flex-end'}}>
                            <DashboardComponent image={dashboardnonselectedimage.scheduler}
                                                selectedimage={dashboardselectedimage.scheduler}
                                                title="SCHEDULER"
                                                onSelect={this.onPress}/>
                            <DashboardComponent image={dashboardnonselectedimage.dashboard}
                                                selectedimage={dashboardselectedimage.dashboard}
                                                title="DASHBOARD"
                                                onSelect={this.onPress}/>
                            <DashboardComponent image={dashboardnonselectedimage.inspection}
                                                selectedimage={dashboardselectedimage.inspection}
                                                title="INSPECTION"
                                                onSelect={this.onPress}/>
                            <DashboardComponent image={dashboardnonselectedimage.documents}
                                                selectedimage={dashboardselectedimage.documents}
                                                title="DOCUMENTS"
                                                onSelect={this.onPress}/>
                            <DashboardComponent image={dashboardnonselectedimage.companydata}
                                                selectedimage={dashboardselectedimage.companydata}
                                                title="COMPANY DATA"
                                                onSelect={this.onPress}/>
                            <DashboardComponent image={dashboardnonselectedimage.account}
                                                selectedimage={dashboardselectedimage.account}
                                                title="ACCOUNT PAYABLES"
                                                onSelect={this.onPress}/>
                        </View>
                    </View>
                </View>
                {
                    (!this.props.dataLoaded) && <Loader visible="true"/> || null
                }
            </View>
        );
    }
}

const mapStateToProps = state => {
    console.log('report data', state.appAllData.reports);
    return {
        email: state.userlogin.userdata.email || "",
        username: state.userlogin.userdata.username || "",
        profileImage: state.userlogin.userdata.optimized_img || "http://notavailableimage",
        dataLoaded:state.appAllData.dataLoaded,
        isNetwork:state.appAllData.isNetwork,
    };
};

export default connect(mapStateToProps, {
    getAllData,
    setNetworkState,
    postUpdatedData
})(Dashboard);


const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: 'rgb(17,19,50)'
    },
    profilePics:{
        height:Const.width/3,
        width:Const.width/3,
        borderRadius:Const.width/6,
        backgroundColor:'transparent',
        borderWidth:2,
        borderColor:'white'
    },
    proPics:{
        position:'absolute',
        height:Const.height/2.5,
        width:Const.width,
        backgroundColor:'rgb(16,31,50)',
        borderColor:'white'
    }
});



