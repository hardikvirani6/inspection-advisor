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
import { connect } from 'react-redux';
import TextBox from '../../component/textInputInfo';
import Const from '../../../helper/constant';
import RadioButton from '../../component/radioInfo';
import Header from '../../component/header';
let data = ['no','yes'];
let invoice = {};

class Invoice extends Component{
    constructor(props){
        super(props);
    }

    onUpdate = (key,value) => {
        if(this.props.selectedReport){
            this.props.selectedReport[key] = value;
            invoice[key] = value;
        }else{
            invoice[key] = value;
        }
    };

    onBack = () => {
        this.props.navigation.goBack(null)
    };

    onSave = () => {
        this.props.updateReport(this.props.selectedReport.report_id,invoice)
            .then(()=>{
                Alert.alert('Invoice saved successfully')
            })
            .catch((err)=>{
                Alert.alert('Something went wrong.')
            });
    };

    render(){
        return(
            <View style={style.container}>
                <Header title='Invoice' onBackPressed={this.onBack} rightHeader={false}/>
                <View style={style.innercontainer}>
                    <ScrollView showsVerticalScrollIndicator={false} bounces={false}>
                        <TextBox placeholder="Inspection Fee"
                                 keytext="inspection_fee"
                                 text={(this.props.selectedReport) ? this.props.selectedReport.inspection_fee : invoice['inspection_fee']}
                                 onUpdateData={this.onUpdate}/>
                        <View style={{padding:10}}>
                            <RadioButton title="Has the inspection been paid?"
                                         item={data}
                                         keytext="inspection_fee_paid"
                                         selectedIndex={(this.props.selectedReport) ? this.props.selectedReport.inspection_fee_paid : null}
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
})(Invoice);

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