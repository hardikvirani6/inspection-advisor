import React,{Component} from 'react';
import {
    StyleSheet,
    View,
    WebView,
    Dimensions,
    AsyncStorage,
    Alert
} from 'react-native';
import Loader from '../../helper/loader';
import Header from '../../screens/component/header';

export default class Preview extends Component {

    constructor(props){
        super(props);
        this.state = {
            isLoding:false,
            reportId:props.navigation.state.params.reportId,
            token:"",
            headerTitle:props.navigation.state.params.sectionTitle
        }
    }

    componentWillMount(){
      AsyncStorage.getItem('user').then((value) => {
        let result = JSON.parse(value);
          this.setState({
              token: result.token
          });
      }).catch((err)=>{
          console.log("123")
      });
    }

    onBack = () => {
        this.props.navigation.goBack(null)
    };

    render(){
        return(
            <View style={style.container}>
                <Header title={this.state.headerTitle} onBackPressed={this.onBack} rightHeader={false} onSend={this.onSendReport}/>
                <WebView
                    onNavigationStateChange={this._onNavigationStateChange}
                    automaticallyAdjustContentInsets={false}
                    source={{uri: "https://staging-app.inspectionadvisor.com/api/v1/generatereport/web_html_preview/" + this.state.reportId + "?token=" + this.state.token}}
                    style={[style.webview,{height: this.state.webViewHeight}]}
                    onLoadStart={() => {
                        this.setState({
                            isLoding:true
                        })
                    }}
                    onLoadEnd={()=> {
                        this.setState({
                            isLoding:false
                        })
                    }}
                />
                <Loader visible={this.state.isLoding}/>
            </View>
        );
    }

}

const  style = StyleSheet.create({
    container: {
        flex:1
    },
    webview: {
        marginTop:0,
        flex:1,
        width: Dimensions.get('window').width
    }

});
