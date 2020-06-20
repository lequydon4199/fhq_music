import {StyleSheet} from 'react-native';
import {device} from '../../config/ScreenDimensions';

export default StyleSheet.create({
    container: {
      height: 60,
      width: device.width,
      backgroundColor: '#ffffff',
      borderColor: 'gray',
      borderTopWidth: 0.3
    },
    picture: {
      height: 57,
      width: 57,
    },
    songTitle: {
      fontSize: 16,
      marginLeft: 5,
      marginTop: 3
    },
    singerName: {
      fontSize: 14,
      marginLeft: 5,
      color: 'gray'
    },
    controlArea: {
      flexDirection: 'row',
      alignSelf: 'flex-end',
      height: 57,
      alignItems: 'center',
    },
    progressBar: {
      height: 3,
      width: '100%'
    }
});