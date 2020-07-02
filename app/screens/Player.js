import React from 'react';
import {
  StyleSheet,
  Text,
  View,
  Image,
  Dimensions,
  StatusBar,
  TouchableOpacity,
  ScrollView,
  SafeAreaView,
  ImageBackground,
  AsyncStorage
} from 'react-native';
import Slider from 'react-native-slider';
import Moment from 'moment';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import Ionicons from 'react-native-vector-icons/Ionicons';
import Entypo from 'react-native-vector-icons/Entypo';
import styles from '../styles/Player';
import {Icon} from 'react-native-elements';
import PropTypes from 'prop-types';
import TrackPlayer, {ProgressComponent} from 'react-native-track-player';
import AnimationArtWork from '../components/AnimationArtwork';
import { setUser, setSong } from '../actions/index';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { Alert } from 'react-native';
TrackPlayer.setupPlayer();

class Player extends React.Component {
  constructor(props) {
    super(props);
  }
  state = {
    AudioStatus: false,
    favorite: false
  };

  UNSAFE_componentWillMount() {
      this.UpdateTrack();  
      TrackPlayer.play();
  }

  componentDidMount() {
    this.onTrackChange = TrackPlayer.addEventListener(
      'playback-track-changed',
      async (data) => {
        this.UpdateTrack();
      },
    );
    this.onTrackChange = TrackPlayer.addEventListener(
      'playback-state',
      async (data) => {
        this.UpdateTrackUI();
      },
    );
  }

  _goBack = () => {
    this.props.navigation.goBack();
  };

  togglePlayback = async () => {

    if ((await TrackPlayer.getState()) === 2) {
      TrackPlayer.play();
    } else {
      TrackPlayer.pause();
    }

    this.UpdateTrackUI();
  };

  skipToNext = async () => {
    try {
      await TrackPlayer.skipToNext();
    } catch (error) {
      console.log(error);
      TrackPlayer.stop();
    }
    
    this.UpdateTrack();
    // this.UpdateTrackUI();
  };

  skipToPrevious = async () => {
    try {
      await TrackPlayer.skipToPrevious();
      this.UpdateTrack();
    } catch (error) {
      console.log(error);
    }
    this.UpdateTrack();
    // this.UpdateTrackUI();
  };

  UpdateTrack = async () => {
    var current_id = await TrackPlayer.getCurrentTrack();

    var track = await TrackPlayer.getTrack(current_id);
    // console.log(track.id)
    this.setState({
      favorite: false
    })
    if (this.props.user.username != '' ){
      for (var i = 0; i < this.props.user.favorite.length; i++){
        if (this.props.user.favorite[i].id == this.props.player.id){
          this.setState({
            favorite: true
          })
        }
      }
    }
    // var track = await TrackPlayer.getTrack(current_id);

      this.setState({
        CurrentPlayTitle: track.title,
        CurrentPlayArtist: track.artist,
        CurrentPlayImage: {uri: track.artwork},
        CurrentPlayID: track.id
      });
    

  };

  UpdateTrackUI = async () => {
    if ((await TrackPlayer.getState()) == 2) {
      this.setState({
        AudioStatus: true,
      });
    } else if ((await TrackPlayer.getState()) == 3) {
      this.setState({
        AudioStatus: false,
      });
    } else if ((await TrackPlayer.getState()) == 6) {
      this.setState({
        AudioStatus: false,
      });
    }
  };

  addToFavorite = async () =>{
    
    if (this.props.user.username == '' ){
      Alert.alert("Bạn chưa đăng nhập vui lòng đăng nhập!")
    }
    else{
      if (this.state.favorite == false){
        this.setState({
          favorite: true
        })
        const response = await fetch(`https://fhq-music-app.herokuapp.com/addfavorite`,{
          method: 'POST',
          headers: {
              'Accept': 'application/json',
              'Content-Type': 'application/json'
          },
          body: JSON.stringify({userId: this.props.user.id, songId: this.state.CurrentPlayID})
      });
      const result = await response.json();
      if(result != 0){
          this.props.setUser(result)
      } 
      }
      else{
        this.setState({
          favorite: false
        })
        const response = await fetch(`https://fhq-music-app.herokuapp.com/deletefavorite`,{
              method: 'POST',
              headers: {
                  'Accept': 'application/json',
                  'Content-Type': 'application/json'
              },
              body: JSON.stringify({userId: this.props.user.id, songId: this.state.CurrentPlayID})
          });
        const result = await response.json();
        this.props.setUser(result)
      }
      
    }
  }
  render() {
   
    return (
      
      <SafeAreaView
        style={{
          flex: 1,
        }}>
        <StatusBar backgroundColor="#ded5d6"></StatusBar>
        <ImageBackground
          source={this.state.CurrentPlayImage}
          style={styles.container}
          blurRadius={22}>
          <View style={styles.header}>
            <TouchableOpacity onPress={() => this._goBack()}>
              <Ionicons style={styles.downButton} name="ios-arrow-down" size={35}></Ionicons>
            </TouchableOpacity>
            <Text style={styles.song}>{this.state.CurrentPlayTitle}</Text>
          </View>
          <View style={styles.singer}>
            <Text style={styles.nameSinger}>
              {this.state.CurrentPlayArtist}
            </Text>
          </View>
          <View style={styles.image}>

            <AnimationArtWork CurrentPlayImage={this.state.CurrentPlayImage} styles={styles.imageSong} playing={this.state.AudioStatus} />
          </View>
          <View style={styles.taskBar}>
            <TouchableOpacity onPress = {() => this.addToFavorite()}>
              <Image
                source={
                  this.state.favorite
                    ? require('../icons/icon-like-pink.png')
                    : require('../icons/icon-like.png')
                }
                
                style={styles.favorite}
                resizeMode="contain"
              />
            </TouchableOpacity>
            <TouchableOpacity>
              <Image
                source={require('../icons/Playlist.png')}
                style={styles.list}
                resizeMode="contain"
              />
            </TouchableOpacity>
          </View>

          <View style={styles.slider}>
            <TrackStatus />
          </View>
          <View style={styles.control}>
            <TouchableOpacity></TouchableOpacity>
            <TouchableOpacity onPress={() => this.skipToPrevious()}>
              <Image
                source={require('../icons/previous.png')}
                style={styles.backward}
                resizeMode="contain"
              />
            </TouchableOpacity>
            <TouchableOpacity onPress={() => this.togglePlayback()}>
              <Image
                source={
                  this.state.AudioStatus
                    ? require('../icons/play.png')
                    : require('../icons/pause.png')
                }
                style={styles.pause}
                activeOpacity={1}
                resizeMode="contain"
              />
            </TouchableOpacity>
            <TouchableOpacity onPress={() => this.skipToNext()}>
              <Image
                source={require('../icons/next.png')}
                style={styles.forward}
                resizeMode="contain"
              />
            </TouchableOpacity>
          </View>
        </ImageBackground>
      </SafeAreaView>
    );
  }
}

class TrackStatus extends ProgressComponent {
  state = {
    duration: 0,
    isSeeking: false,
    SliderDisable: true,
  };
  formatTime(seconds) {
    if (this.state.SliderDisable) {
      this.TrackSlider();
    }
    return seconds > 3600
      ? [
          parseInt(seconds / 60 / 60),
          parseInt((seconds / 60) % 60),
          parseInt(seconds % 60),
        ]
          .join(':')
          .replace(/\b(\d)\b/g, '0$1')
      : [parseInt((seconds / 60) % 60), parseInt(seconds % 60)]
          .join(':')
          .replace(/\b(\d)\b/g, '0$1');
  }

  TrackSlider = async () => {
    if ((await TrackPlayer.getState()) == 2) {
      this.setState({
        SliderDisable: false,
      });
    } else if ((await TrackPlayer.getState()) == 3) {
      this.setState({
        SliderDisable: false,
      });
    } else if ((await TrackPlayer.getState()) == 0) {
      this.setState({
        SliderDisable: true,
      });
    }
  };

  render() {
    return (
      <View>
        <Slider
          minimumValue={0}
          maximumValue={this.state.duration}
          thumbTintColor="#FFFFFF"
          minimumTrackTintColor="#000000"
          maximumTrackTintColor="#808080"
          step={1}
          disabled={this.state.SliderDisable}
          onValueChange={(val) => {
            TrackPlayer.pause();
            this.seek = val;
            this.setState({isSeeking: true});
          }}
          onSlidingComplete={(val) => {
            TrackPlayer.play();
            this.setState(() => {
              TrackPlayer.seekTo(this.seek);
              this.position = this.seek;
            });
          }}
          value={this.state.position}></Slider>
        <View
          style={{
            marginTop: -12,
            flexDirection: 'row',
            justifyContent: 'space-between',
          }}>
          <Text style={[styles.textLight, styles.timeStamp]}>
            {this.formatTime(this.state.position)}
          </Text>
          <Text style={[styles.textLight, styles.timeStamp]}>
            {this.formatTime(this.state.duration)}
          </Text>
        </View>
      </View>
    );
  }
}
const mapStateToProps = state => ({
  user: state.user,
  // player: state.player,
});

const mapDispatchToProps = (dispatch) => ({
  setUser: bindActionCreators(setUser, dispatch),
  // setSong: bindActionCreators(setSong, dispatch)
});

export default connect(mapStateToProps, mapDispatchToProps)(Player);