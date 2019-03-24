import React,{ Component } from 'react';
import {
    StyleSheet,
    View,
    Text
} from 'react-native';
import {RadioGroup, RadioButton} from 'react-native-flexi-radio-button'
import Const from '../../../helper/constant';
import FontSize from '../../../helper/fontsize';
import _ from 'lodash';

export default class Radio extends Component {

    constructor(props){
        super(props);
        let selectedIndex = null;

        if(props.selectedValue !== undefined){
            let tempobj = _.find(props.item,{"option_label":props.selectedValue.toString()});
            selectedIndex = props.item.indexOf(tempobj);
        }
        this.state = {
            text: '',
            title:props.title,
            radioButtonItem:props.item,
            selectedIndex:selectedIndex,
            key:props.keyText,
            selectedValue:props.selectedValue
        };
    }

    onSelect = (index, value) => {
        this.setState({
            selectedIndex:index
        });
        this.props.onUpdateData(this.state.key,value)
    };

    render(){
        return(
            <View style={style.container}>
                <View style = {{padding:10}}>
                    <Text style={{fontSize:FontSize.regFont}}>{this.state.title}</Text>
                </View>
                <RadioGroup
                    onSelect = {(index, value) => this.onSelect(index, value)}
                    style = {{flexDirection:'row',flexWrap:'wrap'}}
                    color = 'gray'
                    activeColor={Const.appblue}
                    selectedIndex={this.state.selectedIndex}

                >
                    {
                        this.state.radioButtonItem.map((data, index) => {
                            return(
                                <RadioButton key={index} value={data.option_label} color={Const.appblue}>
                                    <Text style={{color:Const.appblue,fontSize:FontSize.regFont}}>{data.option_label}</Text>
                                </RadioButton>
                            );
                        })
                    }

                </RadioGroup>

            </View>

        );

    }

}

const style = StyleSheet.create({

    container: {
        backgroundColor:'white',
        flex:1
    },
    text: {
        padding: 10,
        fontSize: 14,
    },

})

