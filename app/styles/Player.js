import {StyleSheet, StatusBar} from 'react-native';
import {device} from '../config/ScreenDimensions'

export default StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#cce6ff',
        paddingTop: Platform.OS === "android" ? StatusBar.currentHeight : 0
      },
      header: {
        flexDirection: 'row'
      },
      downButton: {
        marginTop: device.height * 0.01,
        marginLeft: device.width * 0.02,
        width:30,
        height:30,
        color: 'white'
      },
      song: {
        marginTop: device.height * 0.012,
        marginLeft: device.width * 0.02,
        fontSize: device.height * 0.03,
        color: 'white',
        fontWeight: 'bold',
        fontSize: 24
      },
      singer: {
        marginLeft: device.width * 0.103,
      },
      nameSinger: {
        color: 'white',
        fontSize: device.height * 0.025,
        marginLeft:device.width * 0.019,
      }, 
      image: {
        alignContent: 'center',
        marginTop: device.height * 0.1,
        marginLeft: device.width * 0.13,
        justifyContent:'center',
        
      },
      imageSong: {
        marginTop: - device.height * 0.01,
        marginLeft: -device.width * 0.05,
        height: device.width * 0.85,
        width: device.width * 0.85,
        // borderTopLeftRadius:5,
        // borderTopRightRadius:5,
        // borderBottomLeftRadius:5,
        // borderBottomRightRadius:5,
        justifyContent:'center',
        borderRadius: device.height*0.85*0.5
        
        
      },
      taskBar: {
        marginTop: device.height * 0.03,
        flexDirection: 'row',
				marginLeft: device.width * 0.06
      },
      slider: {
        marginHorizontal: device.width * 0.08,
        marginVertical: device.height * 0.05
      },
      track: {
        height: device.height * 0.002,
      },
      favorite: {
        marginLeft: device.width * 0.26,
        width:45,
				height:45
      },
      download: {
        color: '#2e2d2b',
        marginLeft: device.width * 0.13,
      },
      list: {
        marginLeft: device.width * 0.13,
        width:45,
				height:45
      },
      control: {
        flexDirection: 'row',
				marginLeft: device.width * 0.127
      },
      random: {
        marginTop: device.height * 0.005,
        marginLeft: device.width * 0.075,
        color: '#2e2d2b',
      },
      backward: {
        marginLeft: device.width * 0.1,
       	width:45,
				height:45
      },
      pause: {
        marginLeft: device.width * 0.1,
        width:40,
				height:40
      },
      forward: {
        marginLeft: device.width * 0.1,
				width:45,
				height:45
      },
      repeat: {
        marginTop: device.height * 0.004,
        marginLeft: device.width * 0.1,
        color: '#2e2d2b',
      },
      commentContainer: {
        marginHorizontal: device.width * 0.02,
        marginTop: device.height * 0.03,
        backgroundColor: '#f4ece9',
        height: device.height * 0.2
      },
      comment: {
        marginLeft: device.width * 0.035,
        fontSize: device.height * 0.03
      }
});
