import React from 'react';
import { FlatList, View, Text, Image, TouchableOpacity } from 'react-native';
import  * as Animatable from 'react-native-animatable';
import styles from './ComponentStyles/ListSongs';
import SongOption from './SongOption';
import { Alert } from 'react-native';
import {
  Menu,
  MenuOptions,
  MenuOption,
  MenuTrigger,
} from 'react-native-popup-menu';
import { Icon } from 'react-native-elements';
import { device } from '../config/ScreenDimensions';
// import { songs } from '../data/data';
import TrackPlayer from '../trackPlayer/index'
export default class ListSongs extends React.Component {
  state = {
    playlist: [],
    // songs : this.props.route.params.data
  }

  // getDayOffset = time => {
  //   const timeOffset = ((Date.now()) - time)/1000;
  //   if (timeOffset < 86400) {
  //     return 'Hôm nay';
  //   } else if (timeOffset < 172800){
  //     return 'Hôm qua';
  //   } else if (timeOffset < 259200){
  //     return 'Hôm kia';
  //   } else if (timeOffset < 604800){
  //     return `${Math.floor(timeOffset/86400)} ngày trước`
  //   } else if (timeOffset < 2592000){
  //     return `${Math.floor(timeOffset/604800)} tuần trước`
  //   } else return new Date(time).toLocaleString();
  // }

  playSong = index => {
    // this.props.navigate("Player", {playlist: this.state.playlist[index] , continue: "false"})
    TrackPlayer.reset();
    TrackPlayer.add( this.state.playlist[index] )

    this.props.navigate("Player") 
  }
  
  addToPlaylist = index => {
    // this.props.navigate("Player", {playlist: this.state.playlist[index] , continue: "false"})
    // TrackPlayer.reset();
    TrackPlayer.add( this.state.playlist[index] )
    Alert.alert("Thêm vào playlist thành công!")
    // this.props.navigate("Player") //, index: index, status: "Song"});
  }
  renderItem = ({item, index}) => {
    // let itemDayOffset = this.getDayOffset(item.latestListening);
    // let showDayOffset = false;
    // if ((this.props.type==='history')&&(itemDayOffset!==this.state.dayOffset)){
    //   showDayOffset = true;
    //   this.state.dayOffset = itemDayOffset;
    // }
    
    return(
      <View>
        {/* {showDayOffset ?
        <View style={styles.dayOffsetContainer}>
          <Text style={styles.dayOffset}>{itemDayOffset}</Text>
        </View> : 
        null } */}
        <TouchableOpacity
          activeOpacity={0.5}
          onPress={() => {
            this.playSong(index);
            // item.latestListening = new Date().getTime();
            // this.setState({dayOffset: ''});
          }}  
        >
        <View style={styles.container}>
          <Image style={styles.image} source = {{uri: item.artwork}}/>
          <View style={styles.songInfoContainer}>
            <View style={styles.songNameContainer}>
              <Text style={styles.songName}>{item.title}</Text>
            </View>
            {/* {item.artist.map((item, index) => ( */}
            <View style={styles.singerContainer}>
              <Text style={styles.singer}>{item.artist}</Text>
            </View>
            {/* ))} */}
            {/* {this.props.type==='favorite' ? 
            <View style={styles.favoriteIcon}>
              <Icon name="favorite" size={device.width*0.08} color='#D50000'/>
            </View> : 
            null} */}
          </View>
          <View style={styles.optionIcon}>
          <Menu>
                <MenuTrigger>
                <Icon name="more-vert" size={30} />
                </MenuTrigger>
                <MenuOptions optionsContainerStyle={{width: 200, borderRadius: 5}}>
                <MenuOption onSelect={() => this.addToFavorite()} style={styles.menuOption}>
                    <Icon name="favorite" color="red"/><Text> Yêu thích</Text>
                </MenuOption>
                <MenuOption onSelect={() => this.addToPlaylist(index)} style={styles.menuOption}>
                    <Icon name="playlist-add" /><Text> Thêm vào playlist</Text>
                </MenuOption>
                </MenuOptions>
            </Menu>
          </View>
        </View>
        </TouchableOpacity>
      </View>
    );
  }

  render(){
    // if (this.props.type === 'songs'){
    //   this.state.playlist = songs.sort((a, b) => {
    //     let nameA = a.title.toUpperCase();
    //     let nameB = b.title.toUpperCase();
    //     return nameA.localeCompare(nameB);
    //   });
    // } else if (this.props.type === 'favorite') {
    //   this.state.playlist = songs.filter(item => item.favorite==1)
    // } else if (this.props.type === 'history') {
    //   this.state.playlist = songs.sort((a, b) => b.latestListening - a.latestListening);
    // }
    this.state.playlist = this.props.data
    
    return (
      <FlatList
        data = {this.props.data}
        keyExtractor={(item, index) => index.toString()}
        renderItem={this.renderItem}
        style={styles.flatList}
      />
    )
  }
}
