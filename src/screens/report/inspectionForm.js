import React, {Component} from 'react';
import {
    StyleSheet,
    View,
    ScrollView,
    StatusBar,
    Text,
    TouchableHighlight,
    Alert,
    Platform,
    ListView,
    Image,
    TextInput,
    ToastAndroid
} from 'react-native';
import RNImageTools from "react-native-image-tools";
import RNFS from 'react-native-fs';
import Modal from 'react-native-modal';
import findIndex from 'lodash/findIndex';
import MediaModal from '../component/mediaModal';
import Checkbox from '../component/checkbox/checkboxView';
import TextBox from '../component/textview/textbox';
import RadioButton from '../component/radiobutton/radiobuttonView';
import DropDown from '../component/dropDown/dropDownView';
import PickerView from "../component/dropDown/pickerViewComponent";
import Const from '../../helper/constant';
import FontSize from '../../helper/fontsize';
import Loader from '../../helper/loader';
import Header from '../../screens/component/header';
import {connect} from 'react-redux';
import {
    getFormElement
} from '../../actions/formElementAction';
import {
    loginUser
} from '../../actions/loginAction';
import {
    getReportData,
    addReportData,
    updateReportData,
    addReportImages,
    getReportImages,
    addReportVideo,
    getReportVideo,
    deleteReportImage,
    deleteReportVideo,
    updateReportImage,
    updateReportVideoUrl
} from '../../actions/reportFormDataAction';
import {
    getComment,
    addComment,
    filterComment,
    deleteComment
} from '../../actions/commentAction';
import {
    setUpdatedData
} from '../../actions/updatedAppDataAction';
import MultipleImageUpload from '../../screens/component/imageUpload/multipleImageUpload';
import MultipleVideoUpload from '../../screens/component/videoUpload/multipleVideoUpload';
import { getImage, getVideo } from '../../services/getImageVideoCall';
import { RNS3 } from 'react-native-aws3';
import TextEditor from '../../screens/component/textEditor'

let views = null;
let form_data = {};
let reportformdata = {};
let deleteimg;
import _ from 'lodash';
import Moment from 'moment';


/*var blitline = require('blitline-s3')({
    APPLICATION_ID: '4hByCYytnIuKUcvkLLldQig', // Your Blitline Application ID
    BUCKET: 'in4staging', // Your Amazon S3 Bucket Name
    NAME_PREFIX: 'uploads/' // Prefix for New Images Created By Blitline
});*/

const datas = [{'comment':'Searching'}];
const ds = new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2});

class InspectionForm extends Component {

    constructor(props) {
        super(props);
        this.state = {
            formdata: [],
            sectionID:props.navigation.state.params.sectionId,
            subsectionID: props.navigation.state.params.subsectionID,
            isLoading: false,
            views: [],
            image: props.image,
            video: props.video,
            imageAWS: [],
            videoAWS: [],
            imgArr: [],
            thumbnails: [],
            elements:[],
            opened: false,
            progress:0,
            visibleModal: null,
            onComment:false,
            commentData:null,
            dataSource:ds.cloneWithRows([]),
            selectedItem: 'select one option',
            isSearch:false,
            isCommentData:false,
            newComment:'',
            isSearchComment:false,
            searchComment:'',
            userInfo:this.props.userInfo,
            paused:true,
            indexed: null,
            videoProgress: 0
        };
        this.checkRole();
        this._openEditor = this._openEditor.bind(this);

    }

    componentDidMount() {
        let sections = _.find(this.props.selectedReport.template.sections, {section_id:this.props.navigation.state.params.sectionId});
        let subSection = _.find(sections.subsections, {subsection_id:this.props.navigation.state.params.subsectionID});
        let key ='subsection_' + this.props.navigation.state.params.subsectionID;

        // key exist in data
        if(this.props.selectedReport.report.data[key]){
            this.setState({
                elements: subSection.form.form_elements,
                formdataid: this.props.selectedReport.report.data[key].filedata.id,
                formdata: this.props.selectedReport.report.data[key].filedata.form_data,
                commentData: this.props.selectedReport.report.data[key].filedata.comments,
                image: this.props.selectedReport.report.data[key].images,
                video: this.props.selectedReport.report.data[key].videos
            });
            form_data = this.props.selectedReport.report.data[key].filedata.form_data;
        } else //key do not exist in data
        {
            this.setState({
                elements: subSection.form.form_elements,
                formdataid: null,
                formdata: [],
                commentData: "",
                image: [],
                video: []
            });
        }

        if (Platform.OS === 'ios') {
            RNImageTools.authorize(
                "f76019cd3cac4779b73273a6bd382e6b",
                "d6e620a1-37dd-4573-9703-fda11e8d1a9e",
                "ams+d21ef0327c71d4d9b67ed1b29cacf0d172a5a7e2://adobeid/f76019cd3cac4779b73273a6bd382e6b"
            );
        } else {
            RNImageTools.authorize(
                "0f422a10a7b6402ba57385aafc1c57b3",
                "40093c0e-d2ce-4f41-8b9d-3f341fc38f89",
                "ams+39c7f83963f692c4e7a5cccbc3dc1a461481169e://adobeid/0f422a10a7b6402ba57385aafc1c57b3"
            );
        }
    }

    onBack = () => {
        this.props.navigation.goBack(null)
    };

    onSendReport = () => {
        this.setState({ visibleModal: 1 })
    };

    getComments = () => {
        this.setState({
            isSearchComment:true
        });

        let key ='subsection_' + this.props.navigation.state.params.subsectionID;

        if(this.props.comments.hasOwnProperty(key) && this.props.comments[key].length > 0){
            let newDataSource = ds.cloneWithRows(this.props.comments[key]);
            this.setState({
                dataSource:newDataSource,
                isCommentData: true,
                isSearch:true
            });
        }else{
            this.setState({
                isCommentData: false,
                isSearch:true
            });
        }
    };

    filterComments = (commentText) => {

        this.setState({searchComment:commentText});

        let key ='subsection_' + this.props.navigation.state.params.subsectionID;
        console.log(this.props.comments[key]);

        let tempArr = [];

        this.props.comments[key].map((obj) => {
            if(obj.comment.includes(commentText)){
                tempArr.push(obj);
            }
        });
        if(tempArr.length > 0){
            let newDataSource = ds.cloneWithRows(tempArr);
            this.setState({
                dataSource:newDataSource,
                isCommentData: true,
                isSearch:true
            });
        }else{
            this.setState({
                isCommentData: false,
                isSearch:true
            });
        }
    };


    addNewComment = (commentText) => {

        if(commentText !== ""){
            this.setState({
                commentData:this.state.newComment,
            });
            reportformdata['comments'] = commentText;
            this.clearComments();
            let data = {
                id: new Date().getTime(),
                report_subsection_id: this.props.navigation.state.params.subsectionID,
                available_for_org: 1,
                comment: commentText,
                color: "#FF0000",
                type: "comment",
                isLocal: true
            };

            this.props.addComment(data,this.props.navigation.state.params.subsectionID)
                .then((response) => {
                    console.log(response)
                })
                .catch((err) => {
                    Alert.alert(err)
                })
        }

    };


    deleteComments = (commentId) => {
        this.props.deleteComment(commentId,this.props.navigation.state.params.subsectionID)
            .then((res) => {
                let key ='subsection_' + this.props.navigation.state.params.subsectionID;

                if(this.props.comments.hasOwnProperty(key) && this.props.comments[key].length > 0){
                    let newDataSource = ds.cloneWithRows(this.props.comments[key]);
                    this.setState({
                        dataSource:newDataSource,
                        isCommentData: true,
                        isSearch:true
                    });
                }else{
                    this.setState({
                        isCommentData: false,
                        isSearch:true
                    });
                }
            })
            .catch((err) => {
                Alert.alert(err)
            })
    };

    clearComments = () => {
        this.setState({
            visibleModal:0,
            onComment:false,
            isCommentData:false,
            isSearch:false,
            isSearchComment:false,
            searchComment:'',
            newComment:''
        })
    };

    onSelectComment = (comment) => {
        this.onCommentUpdate(comment);
        this.setState({
            commentData:comment,
            visibleModal:0,
            onComment:false,
            isSearchComment:false,
            searchComment:'',
        })

    };

    checkRole = () => {
        for(let i = 0; i < this.props.userInfo.roles.length; i++){
            if(this.props.userInfo.roles[i].name === 'owner' || this.props.userInfo.roles[i].name === 'admin'){
                deleteimg = require('../../assets/delete1.png');
                return
            }else{
                deleteimg = null
            }
        }
    };

    renderFilterRow = (data) => {
        return(
            <View style={{flex:1,backgroundColor:'white',flexDirection:'row'}}>
                <View style={{flex:1}}>
                    <TouchableHighlight onPress={() => this.onSelectComment(data.comment) } underlayColor="transparent">
                        <View style={{flex:1,padding:10,backgroundColor:'white',alignItems:'flex-start'}}>
                            <Text style={{textAlign:'center',flex:1}}>{data.comment}</Text>
                        </View>

                    </TouchableHighlight>
                </View>
                <View style={{alignItems:'flex-end',justifyContent:'center',width:30,padding:5}}>
                    <TouchableHighlight
                        onPress={() => this.deleteComments(data.id)}
                        underlayColor='transparent'>
                        <Image source={deleteimg} style={{width:15, height:18}} />
                    </TouchableHighlight>
                </View>
            </View>
        );
    };

    renderModalContent = () => (
        <View>
            {
                (this.state.onComment)
                &&
                <View style={{backgroundColor:'white',borderRadius:5}}>
                    <View style={{ alignItems:'flex-end', justifyContent:'flex-end',marginTop:3,marginRight:3}}>
                        <TouchableHighlight onPress={() => this.clearComments()} underlayColor='transparent'>
                            <Image source={require('../../assets/cancel.png')} style={{tintColor:'#000', width:15, height:15}} />
                        </TouchableHighlight>
                    </View>
                    <View style={{padding:20,backgroundColor:'white',borderRadius:5}}>

                        <TouchableHighlight
                            onPress={() => this.getComments()}
                            underlayColor='transparent'>
                            <View style={{padding:10,borderColor:'lightgray',borderWidth:1,borderRadius:2}}>
                                <Text>Select Existing Comments</Text>
                            </View>
                        </TouchableHighlight>
                        {
                            (this.state.isSearchComment)
                            &&
                            <View style={style.commentRow}>
                                <TextInput
                                    underlineColorAndroid='transparent'
                                    style={style.searchinput}
                                    value={this.state.searchComment}
                                    onChangeText={(text) => this.filterComments(text)}
                                    placeholder='Search'
                                />

                                {


                                    (this.state.isSearch && this.state.isCommentData)
                                    &&
                                    <View style={{backgroundColor: 'white', borderRadius: 5}}>


                                        <View>
                                            <ListView
                                                scrollEnabled={false}
                                                dataSource={this.state.dataSource}
                                                renderRow={(rowData) => this.renderFilterRow(rowData)}
                                                enableEmptySections={true}
                                            />
                                        </View>
                                    </View>
                                    ||

                                    (this.state.isSearch)
                                    &&
                                    <View style={{borderColor: 'lightgray', borderWidth: 1}}>
                                        <TextInput
                                            ref="2"
                                            onChangeText={(text) =>
                                                this.setState({
                                                    newComment: text
                                                })
                                            }
                                            style={{
                                                borderRadius: 2,
                                                fontSize: FontSize.regFont,
                                                height: 40,
                                                backgroundColor: 'transparent',
                                                borderColor: 'blue',
                                                borderWidth: 1,
                                                margin: 5,
                                            }}
                                            underlineColorAndroid="transparent"
                                            secureTextEntry={false}
                                            value={this.state.newComment}/>
                                        <View style={{flexDirection: 'row'}}>
                                            <View>
                                                <TouchableHighlight
                                                    onPress={() => this.addNewComment(this.state.newComment)}
                                                    underlayColor='transparent'>
                                                    <View style={{
                                                        backgroundColor: 'rgb(92,184,93)',
                                                        borderRadius: 2,
                                                        padding: 10,
                                                        marginLeft: 5,
                                                        marginBottom: 5,
                                                        width: 60,
                                                        justifyContent: 'center',
                                                        alignItems: 'center'
                                                    }}>
                                                        <Text style={{color: 'white'}}>
                                                            Add
                                                        </Text>
                                                    </View>
                                                </TouchableHighlight>
                                            </View>
                                            <View
                                                style={{flex: 1, justifyContent: 'center', marginLeft: 2, marginBottom: 5}}>
                                                <Text style={{flexWrap: 'wrap', color: Const.appblue}}>
                                                    No Result Found,Create new Comment with Search Term?
                                                </Text>
                                            </View>
                                        </View>
                                    </View>
                                    ||
                                    null

                                    ||
                                    <View>
                                        <Text style={{margin: 5}}>Searching...</Text>
                                    </View>
                                }
                            </View>
                            ||
                            null
                        }


                    </View>
                </View>

                ||

                <View style={style.modalContent}>
                    <View style={{alignItems:'center',justifyContent:'center'}}>
                        <MediaModal progress={this.state.progress} textSms={this.state.textSms} />

                        <View style={{alignItems:'center'}}>
                            <Text style={{fontSize:12,padding:5}}>
                            </Text>
                        </View>
                    </View>
                </View>
            }
        </View>


    );


    onPresSelect = ({ element_id, options }) => {
        if (!this.state.opened) {
            this.setState((state) => {
                return ({ views: [...state.views, { element_id, options }] })
            });
            this.setState({opened: true});
        } else {
            this.setState({opened: false});
            this.setState((state) => {
                return ({views: state.views.slice(0, -1)})
            });
        }
    };

    onPressRemoveView = (selectedItem, element_id,key) => {
        form_data[key] = selectedItem;
        const {elements} = this.state;
        const elementIndex = findIndex(elements, {element_id});
        elements[elementIndex].selectedItem = selectedItem;
        this.setState({
            opened: false,
            elements
        });
        this.setState((state) => ({views: state.views.slice(0, -1)}));
    };

    selectPhotoTapped = () => {
        getImage(true, (error, result) => {
            let rand = Math.floor(1000000000000 + Math.random() * 9000000000000);

            let id = "" + this.props.selectedReport.report.report_id + this.props.navigation.state.params.subsectionID + new Date().getTime();
            let imgObj = {
                "id": id,
                "report_id": this.props.selectedReport.report.report_id,
                "report_subsection_id": this.props.navigation.state.params.subsectionID,
                "alt": "conditions",
                "title": `${this.props.navigation.state.params.name}${rand}.png`,
                "aws_key": "",
                "image_public_id": "",
                "original": Const.URIIMG.uri,
                "thumb": "",
                "small": "",
                "medium": "",
                "large": "",
                "annotated_image": "",
                "isLocal": true
            };

            let arrayvar = this.state.image.slice();
            arrayvar.push(imgObj);
            this.setState({ image: arrayvar });
            console.log("IMG-STATE:", this.state.image);


            let imageObj = {
                report_id: this.props.selectedReport.report.report_id,
                report_subsection_id: this.props.navigation.state.params.subsectionID,
                alt: this.props.navigation.state.params.name,
                title: this.props.navigation.state.params.name,
                original: Const.URIIMG.uri,
            };

            let obj = {
                resource: 'images',
                primary_key:id,
                report_id: this.props.selectedReport.report.report_id,
                subsection_id: this.props.navigation.state.params.subsectionID,
                data: imageObj,
                operation: 'INSERT',
                operation_id: new Date().getTime()
            };
            this.props.setUpdatedData(obj)
                .then(()=>{
                    console.log('added')
                });


            if(this.state.formdata.length === 0) {
                reportformdata['form_data'] = Object.assign({}, reportformdata['form_data'], form_data);

                let key = 'subsection_' + this.props.navigation.state.params.subsectionID;
                let data = {};
                data[key] = {
                    id: new Date().getTime(),
                    report_id: this.props.selectedReport.report.report_id,
                    images: this.state.image,
                    videos: this.state.video,
                    comments: "",
                    filedata: {
                        id: new Date().getTime(),
                        report_id: this.props.selectedReport.report.report_id,
                        report_subsection_id: this.props.navigation.state.params.subsectionID,
                        form_data: {},
                        comments: "",
                        created_at: Moment(new Date(), "DD_MM_YYYY hh:mm a").format("YYYY-MM-DD HH:mm:ss"),
                        updated_at: Moment(new Date(), "DD_MM_YYYY hh:mm a").format("YYYY-MM-DD HH:mm:ss")
                    },
                    isLocal: true
                };

                this.props.updateReportData(data, this.props.selectedReport.report.report_id)
                    .then((response) => {
                        Alert.alert('Image saved successfully');
                        imgObj = {};
                        reportformdata = {}
                    })
                    .catch(() => {
                        Alert.alert('something went wrong.')
                    })
            }
            else{
                this.props.updateReportImage(imgObj,this.props.selectedReport.report.report_id,
                    this.props.navigation.state.params.subsectionID)
                    .then(() => {
                        imgObj = {};
                        Alert.alert('Image saved successfully');
                    })
                    .catch((err)=>{
                        Alert.alert("Something went wrong")
                    });
            }

            //this.onImageSave();
        })
    };

    selectPhotoDelete = (e, id) => {
        Alert.alert(
            'Are you sure?',
            'This will permanently delete this file selected!',
            [
                {text: 'Cancel', onPress: () => console.log('Cancel Pressed'), style: 'cancel'},
                {text: 'Yes, delete it!', onPress: () => {
                    this.props.deleteReportImage(e, this.props.selectedReport.report.report_id,
                        this.props.navigation.state.params.subsectionID)
                        .then((response) => {
                            let array = this.state.image;
                            array.splice(e, 1);
                            this.setState({image: array });


                            let obj = {
                                resource: 'images',
                                id:id,
                                report_id: this.props.selectedReport.report.report_id,
                                subsection_id: this.props.navigation.state.params.subsectionID,
                                operation: 'DELETE',
                                operation_id: new Date().getTime()
                            };
                            this.props.setUpdatedData(obj)
                                .then(()=>{
                                    console.log('added')
                                });


                            Alert.alert("Image Deleted")
                        })
                        .catch(() => {
                            Alert.alert('something went wrong.')
                        })
                }},
            ]
        );

        console.log("DELETE-IMG-STATE:", this.state.image)
    };

    onImageSave = () => {
        this.setState({visibleModal:1});

        let co = this.state.image.length;
        if(co !== 0){
            let rand = Math.floor(1000000000000 + Math.random() * 9000000000000);
            console.log('ONE BY ONE:', this.state.image[co-1].original);
            const file = {
                uri: this.state.image[co-1].original,
                name: `${this.props.navigation.state.params.name}${rand}.png`,
                type: "image/png"
            };
            console.log('File : ', file);

            const options = {
                keyPrefix: "orgId/" + this.state.organizationID + "/inspections/reportId/" + this.state.reportID + "/section/" +
                this.state.sectionID + "/subsection/" + this.state.subsectionID + "/" + this.props.navigation.state.params.name + "/",
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

                    let arrayvar = this.state.imageAWS.slice();
                    const arr = {uri: response.body.postResponse.location};
                    arrayvar.push(arr);
                    this.setState({ imageAWS: arrayvar });
                    console.log("AWS-IMG-STATE:", this.state.imageAWS);

                    this.imageSent(response.body.postResponse.location, response.body.postResponse.key);

                    console.log('response from aws s3 img:', response.body);
                })
                .progress((e) => {
                    this.setState({progress:e.loaded / e.total});
                    if(e.loaded / e.total === 1 ){
                        this.setState({progress:0, textSms:'Media uploading...! '});
                    };
                    console.log(e.loaded / e.total);
                });
        }
        else{
            Alert.alert('Select Image')
        }
    };

    imageSent = (uri, key) => {
        const imgData = {
            report_id: this.state.reportID,
            report_subsection_id: this.state.subsectionID,
            alt: 'alt',
            title: this.props.navigation.state.params.name,
            original: uri,
            aws_key: key,
            annotated_image: ''
        };
        this.props.addReportImages(imgData)
            .then((response) => {
                this.setState({visibleModal:null});

                this.props.getReportImages(this.state.subsectionID, this.state.reportID)
                    .then((response) => {
                        this.setState({image: response.images, isLoading:false,txtSms:''})
                    })
                    .catch(() => {

                    })

            })
            .catch(() => {
                Alert.alert('something went wrong.')
            })
    };

    selectPhotoEdit = (e, imgID,  url) => {
        /*this.setState({isLoading:true});
        this._openEditor(imgID, url);*/
    };

    async _openEditor(imgID, url) {
        try {
            const uri = await RNImageTools.openEditor({
                imageUri: url,
                outputFormat: 'JPEG',
                quality: parseInt(70, 10),
                preserveMetadata: true,
                saveTo: './img'
            });

            console.log("edited uri", uri);

            if (!uri) {
                this.setState({isLoading:false});
                console.log("editing cancelled");
            } else {
                this.sentInAmazon(imgID, uri);
                console.log("editing url : ", uri);
            }
        } catch (e) {
            console.warn("error", e);
        }
    }

    sentInAmazon = (imgID, url) => {
        this.setState({visibleModal:1});

        let rand = Math.floor(1000000000000 + Math.random() * 9000000000000);

        const file = {
            uri: url,
            name: `${this.props.navigation.state.params.name}${rand}.png`,
            type: "image/png"
        };
        console.log('File : ', file);

        const options = {
            keyPrefix: "orgId/" + this.state.organizationID + "/inspections/reportId/" + this.state.reportID + "/section/" +
            this.state.sectionID + "/subsection/" + this.state.subsectionID + "/" + this.props.navigation.state.params.name + "/",
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

                this.updateSelectedImage(imgID, response.body.postResponse.location);

                console.log('response from aws s3 img:', response.body);
            })
            .progress((e) => {
                this.setState({progress:e.loaded / e.total});
                if(e.loaded / e.total === 1 ){
                    this.setState({progress:0});
                };
                console.log(e.loaded / e.total);
            });
    };

    updateSelectedImage = (imgID, url) => {
        let arr = {
            annotated_image: url,
        };

        this.props.updateReportImage(imgID, arr)
            .then((response) => {
                this.setState({visibleModal:null});


                this.props.getReportImages(this.state.subsectionID, this.state.reportID)
                    .then((response) => {
                        this.setState({image: response.images, isLoading:false})
                    })
                    .catch(() => {

                    })
            })
            .catch(() => {
                Alert.alert('something went wrong.')
            })
    };

    selectVideoTapped = () => {
        getVideo(true, (error, result) => {
            //this.onVideoSave();

            let rand = Math.floor(1000000000000 + Math.random() * 9000000000000);

            let id = "" + this.props.selectedReport.report.report_id + this.props.navigation.state.params.subsectionID + new Date().getTime();
            let videoObj = {
                "id": id,
                "report_id": this.props.selectedReport.report.report_id,
                "report_subsection_id": this.props.navigation.state.params.subsectionID,
                "organization_id":  null,
                "title": `${this.props.navigation.state.params.name}${rand}.mp4`,
                //"src_url": Const.URIVIDEO,
                "src_url": "https://in4staging.s3.amazonaws.com/orgId%2F020d8290-ecd5-49c6-84ee-9fdfd7af2f7a%2Finspections%2FreportId%2F139%2Fsection%2F134%2Fsubsection%2F1030%2FRoof+Style%2FRoof+Style6593778072246.mp4",
                "local_url": null,
                "aws_key": "",
                "deleted_at": null,
                "created_at": null,
                "updated_at": null,
                "isLocal": true
            };

            let arrayvar = this.state.video.slice();
            arrayvar.push(videoObj);
            this.setState({ video: arrayvar });
            console.log("VIDEO-STATE:", this.state.video);


            let videoObjct = {
                report_id: this.props.selectedReport.report.report_id,
                report_subsection_id: this.props.navigation.state.params.subsectionID,
                title: this.props.navigation.state.params.name,
                src_url: Const.URIVIDEO.uri,
                local_url: Const.URIVIDEO.uri,
            };

            let obj = {
                resource: 'videos',
                primary_key:id,
                report_id: this.props.selectedReport.report.report_id,
                subsection_id: this.props.navigation.state.params.subsectionID,
                data: videoObjct,
                operation: 'INSERT',
                operation_id: new Date().getTime()
            };

            this.props.setUpdatedData(obj)
                .then(()=>{
                    console.log('added')
                });


            if(this.state.formdata.length === 0) {
                reportformdata['form_data'] = Object.assign({}, reportformdata['form_data'], form_data);

                let key = 'subsection_' + this.props.navigation.state.params.subsectionID;
                let data = {};
                data[key] = {
                    id: new Date().getTime(),
                    report_id: this.props.selectedReport.report.report_id,
                    images: this.state.image,
                    videos: this.state.video,
                    comments: "",
                    filedata: {
                        id: new Date().getTime(),
                        report_id: this.props.selectedReport.report.report_id,
                        report_subsection_id: this.props.navigation.state.params.subsectionID,
                        form_data: {},
                        comments: "",
                        created_at: Moment(new Date(), "DD_MM_YYYY hh:mm a").format("YYYY-MM-DD HH:mm:ss"),
                        updated_at: Moment(new Date(), "DD_MM_YYYY hh:mm a").format("YYYY-MM-DD HH:mm:ss")
                    },
                    isLocal: true
                };

                this.props.updateReportData(data, this.props.selectedReport.report.report_id)
                    .then(() => {
                        videoObj = {};
                        reportformdata = {};
                        Alert.alert('Video saved successfully');
                    })
                    .catch((err)=>{
                        Alert.alert("Something went wrong")
                    });
            }
            else {
                this.props.addReportVideo(videoObj,this.props.selectedReport.report.report_id,
                    this.props.navigation.state.params.subsectionID)
                    .then(() => {
                        videoObj = {};
                        Alert.alert('Video saved successfully');
                    })
                    .catch((err)=>{
                        Alert.alert("Something went wrong")
                    });
            }
        })
    };

    selectedVideo = (e, id, f) => {
        if(f){
            this.setState({
                paused: this.state.indexed === e ? !this.state.paused : false,
                indexed: e
            });
        }
        else{
            if(this.props.isNetwork){
                this.setState({
                    indexed: e
                });
                this.videoDownload(e)
            }
            else{
                if(Const.OS) {
                    Alert.alert('',"Internet Connection is Required.",[{text: 'OK', onPress: () => console.log('OK Pressed')},],{ cancelable: false })
                }else{
                    ToastAndroid.show("Internet Connection is Required.", ToastAndroid.SHORT);
                }
            }
        }
    };

    videoDownload = (e) => {
        let dirs = '';
        if (Const.OS) {
            dirs = RNFS.DocumentDirectoryPath
        } else {
            dirs = RNFS.ExternalDirectoryPath
        }

        RNFS.mkdir(dirs+'/videos').then((res) => {
            let background = true;
            const progress = data => {
                const percentage = ((100 * data.bytesWritten) / data.contentLength) | 0;
                const text = `Progress ${percentage}%`;
                console.log("Progress : **** : ",percentage + "" + text);
                this.setState({
                    videoProgress: percentage
                });
            };

            const begin = res => {
                console.log("Download Begin : **** : ")
            };

            const progressDivider = 5;
            let rand = Math.floor(1000000000000 + Math.random() * 9000000000000);
            const downloadDest = `${dirs}/videos/inspectionVideo${rand}.mp4`;
            const ret = RNFS.downloadFile({
                //fromUrl: this.state.video[e].src_url,
                fromUrl: "https://in4staging.s3.amazonaws.com/orgId%2F020d8290-ecd5-49c6-84ee-9fdfd7af2f7a%2Finspections%2FreportId%2F139%2Fsection%2F134%2Fsubsection%2F1030%2FRoof+Style%2FRoof+Style6593778072246.mp4",
                toFile: downloadDest, begin, progress, background, progressDivider
            });
            let jobId = ret.jobId;

            ret.promise.then(res => {
                console.log('download then:::');



                this.state.video[e].local_url = 'file://' + downloadDest;
                let videoObj = this.state.video[e];
                this.props.updateReportVideoUrl(e, videoObj, this.props.selectedReport.report.report_id,
                    this.props.navigation.state.params.subsectionID,)
                    .then(() => {
                        this.setState({
                            paused: this.state.indexed === e ? !this.state.paused : false,
                            videoProgress: 0,
                        });
                    });



            }).catch(err => {
                console.log('Error while Downloading: ', err);
            });

        }).catch((err) => {
            console.log('Error in path creating : ', err);
        })
    };

    selectVideoDelete = (e, id) => {
        Alert.alert(
            'Are you sure?',
            'This will permanently delete this file selected!',
            [
                {text: 'Cancel', onPress: () => console.log('Cancel Pressed'), style: 'cancel'},
                {text: 'Yes, delete it!', onPress: () => {
                    this.props.deleteReportVideo(e,  this.props.selectedReport.report.report_id,
                        this.props.navigation.state.params.subsectionID)
                        .then((response) => {
                            let array = this.state.video;
                            array.splice(e, 1);
                            this.setState({video: array });


                            let obj = {
                                resource: 'videos',
                                id:id,
                                report_id: this.props.selectedReport.report.report_id,
                                subsection_id: this.props.navigation.state.params.subsectionID,
                                operation: 'DELETE',
                                operation_id: new Date().getTime()
                            };
                            this.props.setUpdatedData(obj)
                                .then(()=>{
                                    console.log('added')
                                });


                            Alert.alert("Video Deleted");
                        })
                        .catch(() => {
                            Alert.alert('something went wrong.')
                        })
                }},
            ]
        );

        console.log("DELETE-VIDEO-STATE:", this.state.video)
    };

    onVideoSave = () => {
        this.setState({visibleModal:1});

        let co = this.state.video.length;
        if(co !== 0){
            let rand = Math.floor(1000000000000 + Math.random() * 9000000000000);
            console.log('ONE BY ONE:', this.state.video[co-1].original);

            const file = {
                uri: this.state.video[co-1].original,
                name: `${this.props.navigation.state.params.name}${rand}.mp4`,
                type: "video/mp4"
            };
            console.log('File : ', file);

            const options = {
                keyPrefix: "orgId/" + this.state.organizationID + "/inspections/reportId/" + this.state.reportID + "/section/" +
                this.state.sectionID + "/subsection/" + this.state.subsectionID + "/" + this.props.navigation.state.params.name + "/",
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

                    let arrayvar = this.state.videoAWS.slice();
                    const arr = {uri: response.body.postResponse.location};
                    arrayvar.push(arr);
                    this.setState({ videoAWS: arrayvar });
                    console.log("AWS-VIDEO-STATE:", this.state.videoAWS);

                    this.videoSent(response.body.postResponse.location, response.body.postResponse.key);

                    console.log('response from aws s3 video:', response.body);
                })
                .progress((e) => {
                    this.setState({progress:e.loaded / e.total});
                    if(e.loaded / e.total === 1 ){
                        this.setState({progress:0, textSms:'Media uploading..!'});
                    };
                    console.log(e.loaded / e.total);
                });
        }
        else{
            Alert.alert('Select Image')
        }
    };

    videoSent = (uri, key) => {
        const imgData = {
            report_id: this.state.reportID,
            report_subsection_id: this.state.subsectionID,
            title: this.props.navigation.state.params.name,
            src_url: uri,
            aws_key: key
        };

        this.props.addReportVideo(imgData)
            .then((response) => {
                this.setState({visibleModal:null});

                this.props.getReportVideo(this.state.subsectionID, this.state.reportID)
                    .then((response) => {
                        this.setState({video: response.videos, isLoading:false})
                    })
                    .catch(() => {

                    })

            })
            .catch(() => {
                Alert.alert('something went wrong.')
            })
    };


    onUpdate = (key,value) => {
        if(this.state.filedataid){
            this.state.filedataid[key] = value;
            form_data[key] = value;
        }else{
            form_data[key] = value;
        }
    };

    onUpdateCheckBox = (data,key,status) => {
        if(Object.keys(data).length === 0){
            delete form_data[key];
        }else if(!status){
            delete form_data[key];
        }
        reportformdata['form_data'] = data;
    };

    onCommentUpdate = (comment) => {
        reportformdata['comments'] = comment;
    };


    onSave = () => {
        reportformdata['form_data'] = Object.assign({},  reportformdata['form_data'], form_data);

        let key ='subsection_' + this.props.navigation.state.params.subsectionID;
        let data = {};
        data[key] = {
            id: this.props.navigation.state.params.subsectionID,
            report_id: this.props.selectedReport.report.report_id,
            images: this.state.image,
            videos: this.state.video,
            comments: (reportformdata['comments'])?reportformdata['comments']:this.state.commentData,
            filedata: {
                id: this.state.formdata.length !== 0 ? this.state.formdataid : new Date().getTime(),
                report_id: this.props.selectedReport.report.report_id,
                report_subsection_id: this.props.navigation.state.params.subsectionID,
                form_data: reportformdata.form_data,
                comments: (reportformdata['comments'])?reportformdata['comments']:this.state.commentData,
                created_at: Moment(new Date(), "DD_MM_YYYY hh:mm a").format("YYYY-MM-DD HH:mm:ss"),
                updated_at: Moment(new Date(), "DD_MM_YYYY hh:mm a").format("YYYY-MM-DD HH:mm:ss")
            },
            isLocal: (this.props.selectedReport.report.data[key]) ? false : true
        };

        if(this.state.formdata.length === 0) {
            this.props.updateReportData(data,this.props.selectedReport.report.report_id)
                .then((response) => {
                    Alert.alert('data updated successfully');
                    let obj = {
                        resource:'formData',
                        primary_key:"" + this.props.selectedReport.report.report_id + this.props.navigation.state.params.subsectionID,
                        report_id:this.props.selectedReport.report.report_id,
                        data:{
                            organization_id: this.props.organization_id,
                            report_subsection_id:this.props.navigation.state.params.subsectionID,
                            form_data:reportformdata['form_data'],
                            comments:(reportformdata['comments'])?reportformdata['comments']:this.state.commentData,
                        },
                        operation:'INSERT',
                        operation_id:new Date().getTime(),
                        record_timestamp: new Date()
                    };
                    this.props.setUpdatedData(obj)
                        .then(()=>{
                            console.log('added')
                        });
                })
                .catch(() => {
                    Alert.alert('something went wrong.')
                })
        }
        else{
            this.props.updateReportData(data,this.props.selectedReport.report.report_id)
                .then((response) => {
                    Alert.alert('data updated successfully');
                    let obj = {
                        resource:'formData',
                        primary_key:"" + this.props.selectedReport.report.report_id + this.props.navigation.state.params.subsectionID,
                        report_id:this.props.selectedReport.report.report_id,
                        id: this.state.formdataid,
                        data:{
                            organization_id: this.props.organization_id,
                            report_subsection_id:this.props.navigation.state.params.subsectionID,
                            form_data:reportformdata['form_data'],
                            comments:(reportformdata['comments'])?reportformdata['comments']:this.state.commentData,
                        },
                        operation:'UPDATE',
                        operation_id:new Date().getTime(),
                        record_timestamp: new Date()
                    };
                    this.props.setUpdatedData(obj)
                        .then(()=>{
                            console.log('added')
                        });
                })
                .catch(() => {
                    Alert.alert('something went wrong.')
                })
        }
    };


    onCommentPress = () => {
        this.setState({
            visibleModal: 1,
            onComment:true
        })
    };

    render() {
        if(this.state.isLoading){
            return(
                <View style={{backgroundColor:'white',flex:1}}>
                    <Header title={this.props.navigation.state.params.name} onBackPressed={this.onBack} rightHeader={false} onSend={this.onSendReport}/>
                    <Loader visible="true"/>
                </View>
            );

        }else{
            return (
                <View style={{backgroundColor: 'white', flex: 1}}>
                    <Header title={this.props.navigation.state.params.name} onBackPressed={this.onBack} rightHeader={false} onSend={this.onSendReport}/>
                    {this.state.isLoading && <Loader visible="true"/> ||
                    <ScrollView style={{flex: 1, marginBottom: 5}}
                                bounces={false}
                                horizontal={false}
                                showsVerticalScrollIndicator={false}
                                scrollEnabled={true}
                                ref="mainScroll">
                        <Modal isVisible={this.state.visibleModal === 1}
                               animationIn={'zoomIn'}
                               animationOut={'zoomOut'}
                               animationInTiming={500}
                               animationOutTiming={500}
                               backdropTransitionInTiming={5}
                               backdropTransitionOutTiming={5}
                               avoidKeyboard={false}>{this.renderModalContent()}</Modal>
                        <View style={{padding: 10}}>
                            {
                                this.state.elements.map((data, index) => {
                                    if (data.input_type === 'checkbox') {
                                        return (
                                            <Checkbox key={index}
                                                      title={data.main_label}
                                                      item={data.options}
                                                      keyText={index.toString()}
                                                      selectedValue={(this.state.formdata) ? this.state.formdata : form_data}
                                                      onUpdateData={this.onUpdateCheckBox}/>
                                        );
                                    } else if (data.input_type === 'text') {
                                        return (

                                            <TextBox key={index}
                                                     title={data.main_label}
                                                     keyText={data.guid}
                                                     text={(this.state.formdata) ? this.state.formdata[data.guid] : form_data[data.guid]}
                                                     onUpdateData={this.onUpdate}/>
                                        );
                                    } else if (data.input_type === 'radio') {
                                        return (
                                            <RadioButton key={index}
                                                         title={data.main_label}
                                                         item={data.options}
                                                         selectedIndex={null}
                                                         keyText={data.guid}
                                                         selectedValue={(this.state.formdata) ? this.state.formdata[data.guid] : form_data[data.guid]}
                                                         onUpdateData={this.onUpdate}/>
                                        );
                                    } else if (data.input_type === 'select') {

                                        if (Const.OS) {
                                            views =
                                                this.state.views.map((view, i) =>
                                                    <PickerView key={i}
                                                                item={view.options}
                                                                index={i}
                                                                view={view}
                                                                keyText={data.guid}
                                                                selectedValue={(this.state.formdata) ? this.state.formdata : form_data}
                                                                onRemove={(value) => this.onPressRemoveView(value, view.element_id,data.guid)}/>
                                                )
                                        }
                                        return (
                                            <DropDown key={index}
                                                      title={data.main_label}
                                                      item={data.options}
                                                      onSelectItem={() => this.onPresSelect(data)}
                                                      selected={data.selectedItem || ((this.state.formdata) ? this.state.formdata[data.guid] : 'select one option')}/>
                                        );
                                    }

                                })
                            }

                        </View>


                        <TextEditor style={{height:200,margin:4,borderRadius:5,borderColor:'gray',borderWidth:1}}
                                    onComment={this.onCommentPress}
                                    comment={this.state.commentData}
                                    onUpdateData={this.onCommentUpdate}/>


                        <View style={style.btnOuterView}>
                            <TouchableHighlight onPress={() => {this.onSave()}} style={{flex:1,width:'30%'}} underlayColor='transparent'>
                                <View style={style.btnView}>
                                    <Text style={{color:'white',fontSize:FontSize.regFont, alignItems:'center'}}>SAVE</Text>
                                </View>
                            </TouchableHighlight>
                        </View>

                        <View style={style.separatorSaveView}>
                        </View>


                        <View style={style.btnOuterView}>
                            <TouchableHighlight onPress={() => {this.selectPhotoTapped()}} style={{flex:1,width:'100%'}} underlayColor='transparent'>
                                <View style={style.btnView}>
                                    <Text style={{color:'white',fontSize:FontSize.regFont}}>Add Image</Text>
                                </View>

                            </TouchableHighlight>
                        </View>


                        <MultipleImageUpload onImageUpload={this.selectPhotoTapped} onImageDelete={(e, id) => this.selectPhotoDelete(e, id)}
                                             onImageEdit={(id, e, imgID, url) => this.selectPhotoEdit(id, e, imgID, url)} images={this.state.image} />

                        <View style={style.separatorView}>
                        </View>

                        <View style={style.btnOuterView}>
                            <TouchableHighlight onPress={() => {this.selectVideoTapped()}} style={{flex:1,width:'100%'}} underlayColor='transparent'>
                                <View style={style.btnView}>
                                    <Text style={{color:'white',fontSize:FontSize.regFont}}>Add Video</Text>
                                </View>
                            </TouchableHighlight>
                        </View>


                        <MultipleVideoUpload onVideoUpload={this.selectVideoTapped} onVideoDelete={(e, id) => this.selectVideoDelete(e, id)}
                                             paused={this.state.paused} indexed={this.state.indexed}
                                             setInitialData={() => this.seInitialValue}
                                             videoProgress={this.state.videoProgress}
                                             onVideoTapped={(e, id, f) => this.selectedVideo(e, id, f)} video={this.state.video} />


                    </ScrollView>
                    }
                    <View style={style.viewContainer}>
                        {views}
                    </View>
                </View>
            );
        }
    }

    seInitialValue = () => {
        this.setState({indexed: null, paused: true})
    }
}

const mapStateToProps = state => {
    return {
        elements: state.formelement.elements,
        formdata: state.reportformdata.formdata,
        image: state.reportformdata.image,
        video: state.reportformdata.video,
        userInfo:state.userlogin.userdata,
        comments:state.appAllData.comments,
        selectedReport: state.report.selectedReport,
        isNetwork:state.appAllData.isNetwork,
        organization_id:state.userlogin.organization_id,
    };
};

export default connect(mapStateToProps, {
    getFormElement,
    getReportData,
    addReportData,
    updateReportData,
    addReportImages,
    getReportImages,
    addReportVideo,
    getReportVideo,
    deleteReportImage,
    deleteReportVideo,
    updateReportImage,
    getComment,
    addComment,
    filterComment,
    loginUser,
    deleteComment,
    setUpdatedData,
    updateReportVideoUrl
})(InspectionForm);


const style = StyleSheet.create({
    btnOuterView: {
        flex:1,
        justifyContent:'flex-end',
        alignItems:'flex-end',
        padding:15,
        height:70
    },
    btnView: {
        backgroundColor:Const.appblue,
        flex:1,
        borderRadius:20,
        alignItems:'center',
        justifyContent:'center'
    },
    separatorView: {
        width: Const.width,
        height:1,
        backgroundColor:'lightgray'
    },
    separatorSaveView: {
        width: Const.width,
        height:1,
        backgroundColor:'red',
        opacity:0.2
    },
    modalContent: {
        backgroundColor: 'white',
        padding: 30,
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
    commentRow:{
        backgroundColor: 'white',
        justifyContent: 'center',
        borderRadius: 1,
        borderColor: 'rgba(0,0,0,0.1)',
        borderWidth:1
    },
    searchinput: {
        margin:3,
        minHeight: 30,
        borderColor: Const.darkgray,
        borderWidth: 1,
        borderRadius:3,
        backgroundColor:'rgba(0,0,0,0.1)',
        fontSize:FontSize.regFont,
        padding:5
    }

});


