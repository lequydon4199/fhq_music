import { Dimensions } from 'react-native';

export const device = {
  height: (Dimensions.get('window').width/9)*16,
  width: Dimensions.get('window').width
}
