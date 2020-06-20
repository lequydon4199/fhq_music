import React from 'react';
import { View, Text, Image, TouchableOpacity } from 'react-native';
import { ProgressBar } from 'react-native-paper'
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import styles from "./ComponentStyles/MiniPlayer";
import { updateSongStatus } from '../actions/index';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import TrackPlayer, { ProgressComponent } from 'react-native-track-player';
import PropTypes from 'prop-types';



class MiniPlayer extends ProgressComponent {
    _togglePlayPause() {
        if(this.props.state == TrackPlayer.STATE_PAUSED) {
            TrackPlayer.play();
        } else {
            TrackPlayer.pause();
        }
    }
    render(){
        if(!this.props.track || this.props.state == TrackPlayer.STATE_NONE || this.props.state == TrackPlayer.STATE_STOPPED) {
            return <View />;
        

        }
            return (
                <TouchableOpacity onPress={() => this.props.navigate('Player')}>
                    <View style={styles.container}>
                        <View style={{flexDirection: 'row'}}>
                            <Image style={styles.picture} source={{uri: this.props.track.artwork}}/>
                            <View style={{flex: 1}}>
                                <Text style={styles.songTitle}>{this.props.track.title}</Text>
                                <Text style={styles.singerName}>{this.props.track.artist}</Text>
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

MiniPlayer.propTypes = {
    state: PropTypes.number,
    track: PropTypes.object
};

function mapStateToProps(state) {
    const currentTrack = state.playback.currentTrack;
    const tracks = state.library.tracks;

    return {
        state: state.playback.state,
        track: tracks ? tracks.find((track) => track.id == currentTrack) : null
    };
}

module.exports = connect(mapStateToProps)(MiniPlayer);