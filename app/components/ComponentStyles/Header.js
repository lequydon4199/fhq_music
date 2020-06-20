import {StyleSheet} from 'react-native';
import {device} from '../../config/ScreenDimensions'

export default StyleSheet.create({
  header: {
    flexDirection: 'row',
    alignItems: "center",
    height: device.height*0.08,
    width: device.width,
    backgroundColor: '#1976D2',
  },
  icon: {
    marginLeft: device.width*0.01,
    width: device.width*0.08,
  },
  centerTextContainer: {
    width: device.width-device.width*0.09*2,
    alignItems: 'center'
  },
  centerText: {
    color: '#fff',
    fontSize: device.width*0.06
  }
});