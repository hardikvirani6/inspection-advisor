import React from 'react';
import {
    StyleSheet,
    TouchableHighlight,
    Text,
    Image,
    View,
    Dimensions
} from 'react-native';
import Const from '../../../helper/constant';
import FontSize from '../../../helper/fontsize';
const {height, width} = Dimensions.get('window');
const aspectRatio = height/width;

export default DashboardComponent = (props) => {
    return (
        <TouchableHighlight onPress = {() => props.onSelect(props.title)} underlayColor = 'transparent'>
            <View style={styles.componentView}>
                <Image source={props.image} resizeMode="cover"/>
                <Text style={styles.dashboardTitle}>{props.title}</Text>
            </View>
        </TouchableHighlight>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#F5FCFF',
    },
    componentView: {
        width:(aspectRatio > 1.6)?Const.width/3.2:Const.width/3.2,
        height:(aspectRatio > 1.6)?Const.width/3:Const.width/3,
        padding:1,
        justifyContent:'space-around',
        alignItems:'center'
    },
    dashboardTitle: {
        fontSize:FontSize.thirteen,
        color:Const.appblue,
        textAlign:'center'
    }

});

