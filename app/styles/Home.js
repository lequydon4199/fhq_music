import {StyleSheet} from 'react-native';
import {device} from '../config/ScreenDimensions'

export default StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'column',
    justifyContent: 'space-between',
    backgroundColor: '#eeeeee' 
  },
  scrollView: {
    height: device.height*0.75,
    backgroundColor: '#E0E0E0'
  },
  suggestArea: {
    marginTop: device.height*0.001,
    height: device.height*0.38,
    width: device.width,
    backgroundColor: 'white'
  },
  suggestPicture: {
    height: device.height*0.32,
    width: device.width,
  },
  suggestText: {
    height: 0,
    width: 0,
  },
  singerPictureStyle: {
    height: device.height*0.13,
    width: device.height*0.13,
    borderRadius: device.height*0.13*0.5
  },
  singerStyle: {
    marginLeft: (device.width-device.height*0.13*3)/4,
  },
  suggestStyle: {
   marginLeft: 0 
  },
  singerName: {
    paddingTop: 3,
    width: device.height*0.13,
    textAlign: 'center'
    
  }
});
