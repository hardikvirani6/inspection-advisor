import React,{ Component } from 'react';
import {
    StyleSheet,
    View,
    AsyncStorage
} from 'react-native';
import Cell from '../screens/component/settingCell';
import Const from '../helper/constant';
import FontSize from '../helper/fontsize';
import Header from '../screens/component/header';
import { connect } from 'react-redux';
import {
    setTouchId
} from '../actions/touchIdAction';

class Setting extends Component{


    static navigationOptions = {
        header: null,
    };

    constructor(props){
        super(props);
        this.state = {
            ischecked:this.props.istouchid
        };


        AsyncStorage.setItem('isFirst',"false",(res)=>{

        });
    }

    componentWillUnmount(){
        this.props.setTouchId(this.state.ischecked)
    }

    onBack = () => {
        this.props.navigation.goBack(null)
    };

    onSelect = (title,checked) => {
        if(title === "Profile/Account"){
            this.props.navigation.navigate('AccountSetting');
        }else if(title === "General"){
            this.props.navigation.navigate('GeneralSetting');
        }else if(title === "Enable Finger Print"){
            this.setState({
                ischecked:checked
            })

        }
    };


    render(){
        return (
            <View style={style.container}>
                <Header title="Settings" onBackPressed={this.onBack} rightHeader={false}/>
                <Cell title="Enable Finger Print" onPress={this.onSelect} checkbox={true} checked={this.state.ischecked}/>
                <Cell title="General" onPress={this.onSelect} checkbox={false} checked={false}/>
                <Cell title="Profile/Account" onPress={this.onSelect} checkbox={false} checked={false}/>
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
    setTouchId
})(Setting);

const style = StyleSheet.create({
    container: {
        flex:1,
        backgroundColor:'white'
    }

});