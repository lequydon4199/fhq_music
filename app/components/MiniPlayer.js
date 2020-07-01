import React from 'react';
import { View, Text, Image, TouchableOpacity } from 'react-native';
import { ProgressBar } from 'react-native-paper'
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import styles from "./ComponentStyles/MiniPlayer";
import { updateSongStatus } from '../actions/index';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import TrackPlayer from '../trackPlayer/index'
import  {ProgressComponent} from 'react-native-track-player';


console.disableYellowBox = true;

class MiniPlayer extends React.Component {
    
    constructor(props){
        super(props);
    }
    state = {
        AudioStatus: false,
    };
    componentDidMount() {
        // this.UpdateTrackUI();
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

    _togglePlayPause = async () => {
        if ((await TrackPlayer.getState()) === 2) {
            TrackPlayer.play();
          } else {
            TrackPlayer.pause(); 
          }
          this.UpdateTrackUI()
      
    }
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
    skipToNext = async () => {
        try {
          await TrackPlayer.skipToNext();
        } catch (error) {
          console.log(error);
          TrackPlayer.stop();
        }
        this.UpdateTrack();
        this.UpdateTrackUI();
    };

    UpdateTrack = async () => {
      var current_id = await TrackPlayer.getCurrentTrack();
      var track = await TrackPlayer.getTrack(current_id);
      // this.props.setSong(track.id, track.title, track.artist, track.artwork)
    };

    returnPlayer= () => {
        this.props.navigate('Player')
    }
    render(){ 
        
        if (!this.props.player){
            return <View></View>
        }else{
                return (
                    <TouchableOpacity onPress={() => this.returnPlayer()}>
                        <View style={styles.container}>
                        {/* <TrackStatus/> */}
                            <View style={{flexDirection: 'row'}}>
                                <Image style={styles.picture} source={{uri: this.props.player.artwork}}/>
                                <View style={{flex: 1}}>
                                    <Text style={styles.songTitle}>{this.props.player.title}</Text>
                                    <Text style={styles.singerName}>{this.props.player.artist}</Text>
                                </View>
                                <View style={styles.controlArea}>
                                    <TouchableOpacity onPress={() => this._togglePlayPause()}>
                                        <MaterialIcons name={this.state.AudioStatus ? 'play-arrow' : 'pause'} size={40}/>
                                    
                                    </TouchableOpacity>
                                    <TouchableOpacity onPress={() => this.skipToNext()}>
                                        <MaterialIcons name='skip-next' size={40}/>
                                    </TouchableOpacity>       
                                </View>
                            </View>
                        </View>
                    </TouchableOpacity>
                );
            }      
    }
}
class TrackStatus extends ProgressComponent {
    state = {
      duration: 0,
      isSeeking: false,
      SliderDisable: true,
    };

    getPosition = () =>{
        const value = this.state.position / this.state.duration
        return value
    }
    render() {
      return (
        <View>
            <ProgressBar style={styles.progressBar} progress={this.getPosition() } color='#1976D2'/>
        </View>
      );
    }
  }


const mapStateToProps = state => ({
    player: state.player,
});
  
const mapDispatchToProps = (dispatch) => ({
    updateSong: bindActionCreators(updateSongStatus, dispatch)
});
  
export default connect(mapStateToProps, mapDispatchToProps)(MiniPlayer);
