import React from 'react';
import { View, TouchableOpacity, Text, Dimensions } from 'react-native';
import {Icon} from 'react-native-elements';
import styles from './ComponentStyles/Header'
import {device} from '../config/ScreenDimensions'

export default class Header extends React.Component {
  render(){
    return(
      <View style={styles.header}>
        <TouchableOpacity
          onPress={this.props.pressLeftComponent}
          activeOpacity={0.5}
          style={styles.icon}
        >
          <Icon name='arrow-back' size={device.width*0.08} color="#fff"/>
        </TouchableOpacity>
        <View style={styles.centerTextContainer} >
          <Text style={styles.centerText}>{this.props.centerText}</Text>
        </View>
      </View>
    );
  }
}