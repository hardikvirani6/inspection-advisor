import React, { Component } from 'react';
import {
    AsyncStorage,
    View
} from 'react-native';
import SplashScreen from 'react-native-splash-screen';
import Login from './login';
import Authentication from './authentication';
import Loader from '../helper/loader';
import Dashboard from './dashboard';
import { connect } from 'react-redux';
let logging = false;

let pageName = "login";

class Main extends Component {
    static isFirst = true;

    constructor(props){
        super(props);
        this.state={
            isLoading:true,
            //isTouchId:this.props.istouchid,
            isFirst:true
        };
        AsyncStorage.setItem('isFirst',"true");
    }


    componentWillReceiveProps(nextProps) {
        this.setState ({
            isTouchId:nextProps.istouchid
        })
    }

    componentWillMount(){
        SplashScreen.hide();
        AsyncStorage.getItem('user').then((value) => {
            if(value) {
                pageName = "Dashboard";
            }else{
                pageName = "LogIn";
            }
            return Promise.reject(true);
        }).catch((err)=>{
            this.setState({
                isLoading:false
            });
            // this.props.navigation.navigate(pageName);
        });
    }

    render() {
        return(
            <View style={{flex:1}}>
                {
                    (this.state.isLoading) &&
                    <Loader visible="true"/>
                    ||(this.props.istouchid) &&
                    <Authentication {...this.props}/>
                    || (pageName === "Dashboard") &&
                    <Dashboard {...this.props}/>
                    || <Login {...this.props}/>
                }

            </View>
        )
    }

}

const mapStateToProps = state => {
    return {
        istouchid: state.touchId.touchid
    };
};

export default connect(mapStateToProps, {

})(Main);