import React,{ Component } from 'react';
import {
    StyleSheet,
    View,
    Text,
    TouchableHighlight,
    Picker,
    Image,
    ScrollView,
    Alert
} from 'react-native';
import Const from '../../../helper/constant';
import TextInputInfo from '../../component/textInputInfo';
import DropDown from '../../component/infoDropDown';
import ImageUpload from '../../component/imageUpload/imageUploadComponent';
import Header from '../../component/header';
import { RNS3 } from 'react-native-aws3';
import { connect } from 'react-redux';
import {
    addClientInformation,
    getClientInformation,
    updateClientInformation
} from '../../../actions/clientAction';
import {
    setUpdatedData
} from '../../../actions/updatedAppDataAction';
import { getImage } from '../../../services/getImageVideoCall';
let views = null;
let imageObj = {};
let clientInfo = {};

/*
{
	"resource":"client",
    "report_id":308,
    "client_id": 39,
    "data":{
		"name": "rakib",
    	"address": "asdfa sdf"
    },
    "operation":"UPDATE",
    "operation_id": new Date().getTime(),
    "record_timestamp": "2018-01-12 11:14:54am"
}
 */

class ClientInformation extends Component{

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
        clientInfo = {};
        console.log(this.props.selectedReport)
        if(Object.keys(this.props.selectedReport.client).length > 0){
            this.setState({
                client:this.props.selectedReport.client,
                id:this.props.selectedReport.client.id,
                selected:(this.props.selectedReport.client.state)?(this.props.selectedReport.client.state):'Select State',
                isContainMetadata:true,
                image:{uri : (!this.props.selectedReport.client) ? "http://notavailableimage" : this.props.selectedReport.client.image_path}
            })
        }else{
            this.setState({
                client:null,
                id:null,
                selected:'Select State',
                isContainMetadata: false,
                image:{uri : (!this.props.selectedReport.client) ? "http://notavailableimage" : this.props.selectedReport.client.image_path}
            })
        }
    }

    onBack = () => {
        this.props.navigation.goBack(null)
    };

    updateState = (state) => {
        this.setState({selected: state});
        this.onUpdate('state',state);
        this.onPressRemoveView()
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

    onUpdate = (key,value) => {
        if(key === 'state'){
            this.state.selected = value
        }
        if(this.state.client){
            let client = this.state.client;
            client[key] = value;
            this.setState({
                client: client
            });
            clientInfo[key] = value;
        }else{
            clientInfo[key] = value;
        }
    };


    onImageSave = () => {
        if(this.state.image){
            let rand = Math.floor(1000000000000 + Math.random() * 9000000000000);

            const file = {
                uri: this.state.image.uri,
                name: `agent_org_${rand}.jpg`,
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
                    clientInfo['image_path'] = response.body.postResponse.location;
                    this.onSave()
                })
                .progress((e) => console.log(e.loaded / e.total));
        }
        else{
            Alert.alert('Select Image')
        }
    };

    onSave = () => {
        let obj = {};

        if(this.state.isContainMetadata && this.state.client.isLocal){
            let tempClient = Object.assign({},this.state.client);
            delete tempClient['isLocal'];
            delete tempClient['id'];
            obj = {
                resource:'client',
                primary_key:"" + this.props.selectedReport.report_id + "_" + this.state.client.id,
                report_id:this.props.selectedReport.report_id,
                data:tempClient,
                operation:'INSERT',
                operation_id: new Date().getTime(),
                record_timestamp: new Date()
            };

        }else if(this.state.isContainMetadata){
            obj = {
                resource:'client',
                primary_key:"" + this.props.selectedReport.report_id + this.state.client.id,
                report_id:this.props.selectedReport.report_id,
                id:this.state.client.id,
                data:this.state.client,
                operation:'UPDATE',
                operation_id: new Date().getTime(),
                record_timestamp: new Date().getTime()
            };

        }else{
            let tempClient = Object.assign({},clientInfo);
            clientInfo.id = new Date().getTime();
            clientInfo.isLocal = true;

            obj = {
                resource:'client',
                primary_key:"" + this.props.selectedReport.report_id + clientInfo.id,
                report_id:this.props.selectedReport.report_id,
                data:tempClient,
                operation:'INSERT',
                operation_id: new Date().getTime(),
                record_timestamp: new Date()
            };
        }




        if(this.state.isContainMetadata){
            this.props.updateClientInformation(this.state.client,this.props.selectedReport.report_id)
                .then(()=>{
                    this.setState({
                        isContainMetadata:true,
                    });
                    Alert.alert('Client updated successfully');

                    this.props.setUpdatedData(obj)
                        .then(()=>{
                            console.log('added')
                        });

                    if(imageObj){
                        this.props.setUpdatedData(imageObj)
                            .then(()=>{
                                console.log('client added')
                            })
                    }
                })
                .catch((err)=>{
                    Alert.alert(err.response.data.msg)
                });
        }else{

            clientInfo.id = new Date().getTime();
            clientInfo.isLocal = true;

            this.props.updateClientInformation(clientInfo,this.props.selectedReport.report_id)
                .then(()=>{
                    this.setState({
                        isContainMetadata:true,
                    });
                    Alert.alert('Client saved successfully');
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

    onPressSave = () => {
        /*if(this.state.imageUpdate)
        {
            this.onImageSave()
        }else{
            this.onSave()
        }*/
        this.onSave();
    };

    selectPhotoTapped = () => {
        getImage(this.state.isContainMetadata, (error, result) => {
            this.setState({
                imageUpdate:true
            });
            clientInfo['image_path'] = Const.URIIMG.uri;
            this.setState({image:Const.URIIMG});
            this.state.client.image_path = Const.URIIMG.uri;

            imageObj = {
                resource: 'client_image',
                primary_key: "" + this.props.selectedReport.report_id + 12345678,
                report_id: this.props.selectedReport.report_id,
                id: this.state.client.id,
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
        clientInfo['image_path'] = '';
        if(this.state.client !== null) {
            this.state.client.image_path ="";
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
                <Header title='Client Information' onBackPressed={this.onBack} rightHeader={false}/>
                <View style={style.innercontainer}>
                    <ScrollView showsVerticalScrollIndicator={false}>
                        <View style={{marginTop:10,flex:1}}>
                            <TextInputInfo placeholder="Clients Full Name"
                                           keytext="name"
                                           text={(this.state.client) ? this.state.client.name : clientInfo['name']}
                                           onUpdateData={this.onUpdate}/>
                            <TextInputInfo placeholder="Email"
                                           keytext="email"
                                           text={(this.state.client) ? this.state.client.email : clientInfo['email']}
                                           onUpdateData={this.onUpdate}/>
                            <TextInputInfo placeholder="Main Phone"
                                           keytext="phone"
                                           text={(this.state.client) ? this.state.client.phone : clientInfo['phone']}
                                           onUpdateData={this.onUpdate}/>
                            <TextInputInfo placeholder="Cell"
                                           keytext="cell"
                                           text={(this.state.client) ? this.state.client.cell : clientInfo['cell']}
                                           onUpdateData={this.onUpdate}/>
                            <TextInputInfo placeholder="Fax"
                                           keytext="fax"
                                           text={(this.state.client) ? this.state.client.fax : clientInfo['fax']}
                                           onUpdateData={this.onUpdate}/>
                            <TextInputInfo placeholder="Address"
                                           keytext="address"
                                           text={(this.state.client) ? this.state.client.address : clientInfo['address']}
                                           onUpdateData={this.onUpdate}/>
                            <TextInputInfo placeholder="City"
                                           keytext="city"
                                           text={(this.state.client) ? this.state.client.city : clientInfo['city']}
                                           onUpdateData={this.onUpdate}/>
                            <DropDown onSelectItem={this.onPressSelect}
                                      style={{backgroundColor:Const.darkgray}}
                                      title={this.state.selected}
                                      item={Const.states}
                                      selected={this.state.selected}
                                      onUpdateData={this.onUpdate}/>

                            <TextInputInfo placeholder="Zip"
                                           keytext="zip"
                                           text={(this.state.client) ? this.state.client.zip : clientInfo['zip']}
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
    addClientInformation,
    getClientInformation,
    updateClientInformation,
    setUpdatedData
})(ClientInformation);

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