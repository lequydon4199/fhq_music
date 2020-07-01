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
import TrackPlayer from '../trackPlayer/index'
import { setUser } from '../actions/index';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
// import { Alert } from 'react-native';

class ListSongs extends React.Component {
  constructor(props) {
    super(props);
  }
  
  state = {
    playlist: [],
  }

  playSong = index => {
    
    TrackPlayer.reset();
    TrackPlayer.add( this.state.playlist[index] )

    this.props.navigate("Player") 
  }
  
  addToPlaylist = index => {
    TrackPlayer.add( this.state.playlist[index] )
    Alert.alert("Thêm vào playlist thành công!",)
  }

  addToFavorite = async (index) =>{
    if (this.props.user.username == '' ){
      Alert.alert("Bạn chưa đăng nhập vui lòng đăng nhập!")
    }
    else{
      const response = await fetch(`https://fhq-music-app.herokuapp.com/addfavorite`,{
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({userId: this.props.user.id, songId: this.state.playlist[index].id})
        });
        const result = await response.json();
        console.log(result)
        if(result != 0){
          this.props.setUser(result)
          Alert.alert("Thêm vào danh sách yêu thích thành công!")
        }
        else{
          Alert.alert("Bài hát đã có trong danh sách yêu thích!")
        }

    }
  }
    deleteFavorite = async (index) =>{
      const response = await fetch(`https://fhq-music-app.herokuapp.com/deletefavorite`,{
              method: 'POST',
              headers: {
                  'Accept': 'application/json',
                  'Content-Type': 'application/json'
              },
              body: JSON.stringify({userId: this.props.user.id, songId: this.state.playlist[index].id})
          });
      const result = await response.json();
      this.props.setUser(result)
      
      Alert.alert("Xoá bài hát yêu thích thành công!")
      }



  renderItem = ({item, index}) => {
    console.log(this.props.favorite)
    return(
      <View>
        <TouchableOpacity
          activeOpacity={0.5}
          onPress={() => {
            this.playSong(index);

          }}  
        >
        <View style={styles.container}>
          <Image style={styles.image} source = {{uri: item.artwork}}/>
          <View style={styles.songInfoContainer}>
            <View style={styles.songNameContainer}>
              <Text style={styles.songName}>{item.title}</Text>
            </View>
            <View style={styles.singerContainer}>
              <Text style={styles.singer}>{item.artist}</Text>
            </View>
          </View>
          <View style={styles.optionIcon}>
          <Menu>
                <MenuTrigger>
                <Icon name="more-vert" size={30} />
                </MenuTrigger>
                <MenuOptions optionsContainerStyle={{width: 200, borderRadius: 5}}>
                {/* <MenuOption onSelect={() => this.addToFavorite(index)} style={styles.menuOption}>
                    <Icon name="favorite" color="red"/><Text> Yêu thích</Text>
                </MenuOption> */}
                
                {   
                          this.props.favorite? 
                          <MenuOption onSelect={() => this.deleteFavorite(index)} style={styles.menuOption}>
                            <Icon name="favorite-border" color="black"/><Text> Xóa yêu thích</Text>
                          </MenuOption>
                          :
                          <MenuOption onSelect={() => this.addToFavorite(index)} style={styles.menuOption}>
                            <Icon name="favorite" color="red"/><Text> Yêu thích</Text>
                          </MenuOption>
                            
                }
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
const mapStateToProps = state => ({
  user: state.user,
});

const mapDispatchToProps = (dispatch) => ({
  setUser: bindActionCreators(setUser, dispatch)
});

export default connect(mapStateToProps, mapDispatchToProps)(ListSongs);