import { Dimensions } from 'react-native';
const {height, width} = Dimensions.get('window');
const aspectRatio = height/width;

module.exports = {
    //FONT
    header: (aspectRatio > 1.6)?18:28,
    regFont: (aspectRatio > 1.6)?14:22,
    small:(aspectRatio > 1.6)?12:20,
    seventeen:(aspectRatio > 1.6)?17:25,
    twelve:(aspectRatio > 1.6)?12:20,
    sixteen:(aspectRatio > 1.6)?16:24,
    thirteen:(aspectRatio > 1.6)?13:21,
    fifteen:(aspectRatio > 1.6)?15:23,
    eighteen:(aspectRatio > 1.6)?18:26,
    twentyFive:(aspectRatio > 1.6)?25:33,


};
