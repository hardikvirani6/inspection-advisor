import React,{ Component } from 'react';
import {
    StyleSheet,
    View
} from 'react-native';
import { NavigationActions } from 'react-navigation';
import Cell from '../screens/component/settingCell';
import Const from '../helper/constant';
import FontSize from '../helper/fontsize';
import Header from '../screens/component/header';
import {connect} from "react-redux";
import {setUserLogout} from '../actions/loginAction';

class Setting extends Component{

    static navigationOptions = props => {
        return {
            title: 'Setting',
            headerStyle: {backgroundColor: Const.lbgray},
            headerTitleStyle: {color: 'white',textAlign: 'center', alignSelf: 'center', fontWeight: '400', fontSize: FontSize.header},
            headerTintColor: 'white',
            headerBackTitle: null,
        }
    }

    constructor(props){
        super(props);
    }

    onBack = () => {
        this.props.navigation.goBack(null);
    }

    onSelect = (title) => {
        if(title == "Log Out"){
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
        }
        else if(title == "Update Profile"){
            this.props.navigation.navigate('UpdateProfile');
        }
    };

    render(){
        return(
            <View style={style.container}>
                <Header title="Account Settings" onBackPressed={this.onBack}/>
                <Cell title="Update Profile" onPress={this.onSelect}/>
                <Cell title="Log Out" onPress={this.onSelect}/>


            </View>
        );
    }
}

const mapStateToProps = state => {
    return {
        isNetwork:state.appAllData.isNetwork,
    };
};

export default connect(mapStateToProps, {
    setUserLogout
})(Setting);

const style = StyleSheet.create({
    container: {
        flex:1,
        backgroundColor:'white'
    }

});