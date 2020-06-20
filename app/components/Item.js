import React from 'react';
import { View, Text, Image, ScrollView, Keyboard,TouchableOpacity } from 'react-native';
import styles from './ComponentStyles/Item';
import PropTypes from 'prop-types';

export default class Item extends React.Component {
  constructor(props){
    super(props);
  }

  render(){
    return(  
      <View style={[styles.itemArea, this.props.itemAreaStyle]}>
        <Text style={[styles.titleText, this.props.titleTextStyle]}>{this.props.category}</Text>
        <TouchableOpacity
          activeOpacity={0.5}
        //   onPress={() => {
        //     this.playSong(index);
        //     item.latestListening = new Date().getTime();
        //     this.setState({dayOffset: ''});
        //   }}  
        >
        <ScrollView 
          horizontal={this.props.horizontal}
          onScroll={Keyboard.dismiss}
          scrollEventThrottle={0}
          pagingEnabled={true}
          scrollEnabled={this.props.scrollEnabled}
        >
          {this.props.data.map((item, index) => (
          <View key={index.toString()} style={[styles.item, this.props.itemStyle]}>
            <Image style={[styles.itemPicture, this.props.itemPictureStyle]} source={{
              uri: item.picture,
            }}/>
            <Text style={[styles.itemName, this.props.itemNameStyle]}>{item.name}</Text>
          </View>
          ))}
        </ScrollView>
        </TouchableOpacity>
      </View>     
    )
  }
}

Item.propTypes = {
  itemAreaStyle: PropTypes.object,
  titleTextStyle: PropTypes.object,
  category: PropTypes.string,
  horizontal: PropTypes.bool,
  scrollEnabled: PropTypes.bool,
  data: PropTypes.array.isRequired,
  itemStyle: PropTypes.object,
  itemPictureStyle: PropTypes.object,
  itemNameStyle: PropTypes.object
}

Item.defaultProps = {
  horizontal: false,
  scrollEnabled: true,
  data: [],
}
