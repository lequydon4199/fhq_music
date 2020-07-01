import {StyleSheet} from 'react-native';
import {device} from '../../config/ScreenDimensions'

export default StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: "center",
    height: device.height*0.075,
    width: device.width,
  }, 
  searchBarContainer: {
    flexDirection: 'row',
    borderRadius: device.height*0.06*0.35,
    height: device.height*0.06,
    width: device.width*0.8,
    alignItems: "center",
    marginLeft: device.width*0.03,
  },
  searchIcon: {
    height: device.height*0.06,
    justifyContent: 'center',
    marginLeft: device.width*0.015,
    marginRight: device.width*0.015,
  },
  searchInput: {
    flex: 1,
    borderColor: '#1976D2',
    borderLeftWidth: 1,
    width: device.width*0.5,
    fontSize: device.height*0.025,
    paddingLeft: device.width*0.01,
    height: device.height*0.06,
  },
  profileImage: {
    borderRadius: device.height*0.07*0.5,
    height: device.height*0.07,
    width: device.height*0.07,
    marginLeft: (device.width - (device.width*0.8 + device.width*0.03 + device.height*0.07))/2,
    backgroundColor: '#fff'
  },
  titletext: {
    fontSize: 29,
    fontWeight: 'bold',
    color: '#1da1f2'
  }
});