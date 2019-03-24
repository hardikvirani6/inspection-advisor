import React,{ Component } from 'react';
import {
    StyleSheet,
    View,
    Text,
    TouchableHighlight,
    Picker,
    ScrollView,
    Alert
} from 'react-native';
import Const from '../../../helper/constant';
import TextInputInfo from '../../component/textInputInfo';
import ImageUpload from '../../component/imageUpload/imageUploadComponent';
import DropDown from '../../component/infoDropDown';
import Header from '../../component/header';
import { connect } from 'react-redux';
import {
    addPropertyInformation,
    getPropertyInformation,
    updatePropertyInformation
} from '../../../actions/propertyAction';
import {
    setUpdatedData
} from '../../../actions/updatedAppDataAction';
import { getImage } from '../../../services/getImageVideoCall';
import { RNS3 } from 'react-native-aws3';
let views = null;
let propertyInfo = {};
let imageObj = {};
class PropertyInformation extends Component{

    constructor(props){
        super(props);
        this.state = {
            views:[],
            selected:'Select State',
            opened: false,
            isContainMetadata: false
        }
    }

    componentDidMount(){
        //Alert.alert(this.props.networkState.toString());
        propertyInfo = {};
        debugger
        if(Object.keys(this.props.selectedReport.property).length > 0){
            this.setState({
                property:this.props.selectedReport.property,
                id:this.props.selectedReport.property.id,
                selected:(this.props.selectedReport.property.state)?(this.props.selectedReport.property.state):'Select State',
                isContainMetadata: true,
                image:{uri : (!this.props.selectedReport.property) ? "http://notavailableimage" : this.props.selectedReport.property.image_path}
            })
        }else{
            this.setState({
                property:null,
                id:null,
                selected:'Select State',
                isContainMetadata: false,
                image:{uri : (!this.props.selectedReport.property) ? "http://notavailableimage" : this.props.selectedReport.property.image_path}
            })
        }

    }

    updateState = (state) => {
        this.setState({selected: state});
        this.onUpdate('state',state);
        this.onPressRemoveView()
    };

    onBack = () => {
        this.props.navigation.goBack(null)
    };

    onPressSelect = () => {
        if (this.state.opened === false) {
            this.setState((state) => ({views: [...state.views, {}]}));
            this.setState({opened: true});
        }else{
            this.setState({opened: false});
            this.setState((state) => ({views: state.views.slice(0, -1)}));
        }
    };

    onPressRemoveView = () => {
        this.setState({opened: false});
        this.setState((state) => ({views: state.views.slice(0, -1)}));
    };

    onImageSave = () => {
        if(this.state.image){
            let rand = Math.floor(1000000000000 + Math.random() * 9000000000000);

            const file = {
                uri: this.state.image.uri,
                name: `property_org_${rand}.jpg`,
                type: "image/png"
            };
            console.log('file:', file);

            const options = {
                keyPrefix: "orgId/020d8290-ecd5-49c6-84ee-9fdfd7af2f7a/inspections/reportId/" + this.state.reportid + "/section/" + this.state.id + "/",
                bucket: "in4staging",
                region: "us-west-1",
                accessKey: "AKIAIEIOEOULREVVNHUQ",
                secretKey: "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",
                successActionStatus: 201
            };

            RNS3.put(file, options)
                .then(response => {
                    if (response.status !== 201)
                        throw new Error("Failed to upload image to S3");
                    propertyInfo['image_path'] = response.body.postResponse.location;
                    this.onSave()
                })
                .progress((e) => console.log(e.loaded / e.total));
        }
        else{
            Alert.alert('Select Image')
        }
    };


    onPressSave = () => {
        /*if(this.state.imageUpdate)
        {
            this.onImageSave()
        }else{
            this.onSave()
        }*/
        this.onSave()
    };

    onUpdate = (key,value) => {
        if(key === 'state'){
            this.state.selected = value
        }
        if(this.state.property){
            let property = this.state.property;
            property[key] = value;
            this.setState({
                property: property
            });
            propertyInfo[key] = value;
        }else{
            propertyInfo[key] = value;
        }
    };

    onSave = () => {

        let obj = {};
        debugger

        if(this.state.isContainMetadata && this.state.property.isLocal){
            let tempProperty = Object.assign({},this.state.property);
            delete tempProperty['isLocal'];
            delete tempProperty['id'];
            obj = {
                resource:'property',
                primary_key:"" + this.props.selectedReport.report_id + "_" + this.state.property.id,
                report_id:this.props.selectedReport.report_id,
                data:tempProperty,
                operation:'INSERT',
                operation_id: new Date().getTime(),
                record_timestamp: new Date()
            };

        }else if(this.state.isContainMetadata){
            obj = {
                resource:'property',
                primary_key:"" + this.props.selectedReport.report_id + this.state.property.id,
                report_id:this.props.selectedReport.report_id,
                id:this.state.property.id,
                data:this.state.property,
                operation:'UPDATE',
                operation_id: new Date().getTime(),
                record_timestamp: new Date().getTime()
            };

        }else{

            let tempProperty = Object.assign({},propertyInfo);
            propertyInfo.id = new Date().getTime();
            propertyInfo.isLocal = true;

            obj = {
                resource:'property',
                primary_key:"" + this.props.selectedReport.report_id + propertyInfo.id,
                report_id:this.props.selectedReport.report_id,
                data:tempProperty,
                operation:'INSERT',
                operation_id: new Date().getTime(),
                record_timestamp: new Date()
            };
        }

        if(this.state.isContainMetadata){
            this.props.updatePropertyInformation(this.state.property,this.props.selectedReport.report_id)
                .then(()=>{
                    this.setState({
                        isContainMetadata:true,
                    });
                    Alert.alert('Property updated successfully');

                    this.props.setUpdatedData(obj)
                        .then(()=>{
                            console.log('added')
                        });

                    if(imageObj){
                        this.props.setUpdatedData(imageObj)
                            .then(()=>{
                                console.log('property image added')
                            })
                    }
                })
                .catch((err)=>{
                    Alert.alert(err.response.data.msg)
                });
        }else{

            propertyInfo.id = new Date().getTime();
            propertyInfo.isLocal = true;

            this.props.updatePropertyInformation(propertyInfo,this.props.selectedReport.report_id)
                .then(()=>{

                    this.setState({
                        isContainMetadata:true,
                    });
                    Alert.alert('Property saved successfully');
                    this.props.setUpdatedData(obj)
                        .then(()=>{
                            console.log('added')
                        })
                })
                .catch((err)=>{
                    Alert.alert(err.response.data.msg)
                });
        }
    };

    selectPhotoTapped = () => {
        getImage(this.state.isContainMetadata, (error, result) => {
            this.setState({
                imageUpdate:true
            });
            propertyInfo['image_path'] = Const.URIIMG.uri;
            this.setState({image:Const.URIIMG});
            this.state.property.image_path = Const.URIIMG.uri;

            imageObj = {
                resource: 'property_image',
                primary_key: "" + this.props.selectedReport.report_id + 1234567,
                report_id: this.props.selectedReport.report_id,
                id: this.state.property.id,
                data: {
                    image_path: Const.URIIMG.uri,
                },
                operation: 'UPDATE',
                operation_id: new Date().getTime(),
                record_timestamp: new Date(),
            };
        })
    };

    onImageDeleted = () => {
        propertyInfo['image_path'] = '';
        if(this.state.property !== null) {
            this.state.property.image_path ="";
        }
        this.setState({
            image: require('../../../assets/lane.jpeg')
        })
    };

    render(){
        views =
            this.state.views.map((view, i) =>
                <View key={i} style={style.outer}>
                    <View>
                        <Picker style={style.picker} selectedValue={this.state.selected} onValueChange={this.updateState}>

                            {
                                Const.states.map(function (state, index) {
                                    return <Picker.Item key={index} label={state} value={state}/>
                                })
                            }

                        </Picker>
                    </View>

                </View>

            );

        return(
            <View style={style.container}>
                <Header title='Property Information' onBackPressed={this.onBack} rightHeader={false}/>
                <View style={style.innercontainer}>
                    <ScrollView showsVerticalScrollIndicator={false}>
                        <View style={{marginTop:10,flex:1}}>
                            <TextInputInfo placeholder="Address"
                                           keytext="address"
                                           text={(this.state.property) ? this.state.property.address : propertyInfo['address']}
                                           onUpdateData={this.onUpdate}/>
                            <DropDown onSelectItem={this.onPressSelect}
                                      style={{backgroundColor:Const.darkgray}}
                                      title={this.state.selected}
                                      item={Const.states}
                                      selected={this.state.selected}
                                      onUpdateData={this.onUpdate}/>
                            <TextInputInfo placeholder="City"
                                           keytext="city"
                                           text={(this.state.property) ? this.state.property.city : propertyInfo['city']}
                                           onUpdateData={this.onUpdate}/>
                            <TextInputInfo placeholder="Zip"
                                           keytext="zip"
                                           text={(this.state.property) ? this.state.property.zip : propertyInfo['zip']}
                                           onUpdateData={this.onUpdate}/>

                            <ImageUpload onImageUpload={this.selectPhotoTapped} onImageDelete={this.onImageDeleted} images={this.state.image} />

                            <TouchableHighlight style={style.edit} underlayColor='transparent' onPress={() => {this.onPressSave()}}>
                                <View style={[style.btnview,{backgroundColor:Const.appblue}]}>
                                    <Text style={style.editText}>
                                        SAVE
                                    </Text>
                                </View>
                            </TouchableHighlight>
                        </View>
                    </ScrollView>
                    <View style={style.viewContainer}>
                        {views}
                    </View>
                </View>
            </View>
        );
    }

}

const mapStateToProps = state => {
    return {
        selectedReport: state.report.selectedReport.report,
        networkState: state.appAllData.isNetwork
    };
};

export default connect(mapStateToProps, {
    addPropertyInformation,
    getPropertyInformation,
    updatePropertyInformation,
    setUpdatedData
})(PropertyInformation);

const style = StyleSheet.create({
    container:{
        flex:1
    },
    innercontainer: {
        flex:1,
        backgroundColor:'white',
        alignItems:'center'
    },
    textview: {
        width:Const.width-60,
        padding:15,
        margin: 10,
        borderRadius:25,
        backgroundColor:'rgba(231,231,231,1)'
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
    viewContainer: {
        flex: 1,
        flexDirection: 'row',
        flexWrap: 'wrap',
        position: 'absolute',
        marginTop:Const.height-230-65,
        backgroundColor: 'white'
    },
    outer:{
        flex:1,
        flexDirection:'column',
        marginBottom:70,
        justifyContent: 'flex-end'

    },
    picker:{
        marginBottom:0,
    },

});