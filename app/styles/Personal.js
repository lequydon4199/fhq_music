import {StyleSheet} from 'react-native';
import {device} from '../config/ScreenDimensions'

export default StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'column',
    justifyContent: 'space-between',
    backgroundColor: '#eeeeee'
  },
  titleTextContainer: {
    backgroundColor: '#42A5F5',
    height: device.height*0.05,
    justifyContent: 'center'
  },
  titleText: {
    fontSize: device.height*0.03,
    marginLeft: device.width*0.02,
  }
});
