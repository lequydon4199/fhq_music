import React from 'react';
import { View, Text, Image, TouchableOpacity } from 'react-native';
import { ProgressBar } from 'react-native-paper'
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import styles from "./ComponentStyles/MiniPlayer";
import { updateSongStatus } from '../actions/index';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import TrackPlayer from '../trackPlayer/index'
import PropTypes from 'prop-types';



class MiniPlayer extends React.Component {
    _togglePlayPause() {
        if(this.props.state == TrackPlayer.STATE_PAUSED) {
            TrackPlayer.play();
        } else {
            TrackPlayer.pause();
        }
    }
    render(){ 
        var current_id =  TrackPlayer.getCurrentTrack();
        var track =  TrackPlayer.getTrack(current_id);
        // if(TrackPlayer.getState() == 'STATE_NONE') {
        //     return <View></View>;
        // }
        // console.log(this.props.miniPlayerState.display)
            return (
                <TouchableOpacity onPress={() => this.props.navigate('Player')}>
                    <View style={styles.container}>
                        <View style={{flexDirection: 'row'}}>
                            <Image style={styles.picture} source={{uri: track.artwork}}/>
                            <View style={{flex: 1}}>
                                <Text style={styles.songTitle}>{track.title}</Text>
                                <Text style={styles.singerName}>{track.artist}</Text>
                            </View>
                            <View style={styles.controlArea}>
                                <TouchableOpacity onPress={() => this._togglePlayPause()}>
                                <Image source={ this.state.AudioStatus ? require('../icons/play.png'): require('../icons/pause.png') } style={styles.pause} activeOpacity={1} resizeMode='contain'/>
                                </TouchableOpacity>
                                {/* <TouchableOpacity onPress={() => this._onForwardPressed()}>
                                    <MaterialIcons name='skip-next' size={40}/>
                                </TouchableOpacity>        */}
                            </View>
                        </View>
                        {/* <ProgressBar style={styles.progressBar} progress={this._getSeekSliderPosition()} color='#1976D2'/> */}
                    </View>
                </TouchableOpacity>
            );
        
    }
}



// const mapStateToProps = state => ({
//     miniPlayerState: state.miniPlayerState,
//   });
//   //
//   const mapDispatchToProps = dispatch => ({
//     dispatch: dispatch
//   });
  
//   export default connect(mapStateToProps, mapDispatchToProps)(MiniPlayer);
  
  