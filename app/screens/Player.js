import React from 'react';
import { StyleSheet, Text, View, Image, Dimensions, StatusBar, TouchableOpacity, ScrollView} from 'react-native';
import Slider from 'react-native-slider';
import Moment from 'moment';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import Ionicons from 'react-native-vector-icons/Ionicons';
import Entypo from 'react-native-vector-icons/Entypo';
import styles from '../styles/Player';
import { Icon } from 'react-native-elements'
import PropTypes from 'prop-types';
import TrackPlayer, {ProgressComponent} from 'react-native-track-player';
import { connect } from 'react-redux';

TrackPlayer.setupPlayer();

export default class Player extends React.Component {
  constructor(props){
    super(props)
    // 
    this.playlist = this.props.route.params.playlist
    // this.index = this.props.route.params.index
    // this.isSeeking = false;
    // this.shouldPlayAtEndOfSeek = false;
    // this.continue = false;
    // this.status = this.props.route.params.status
  }
  state = {
        AudioStatus: true,
        CurrentPlayTitle : '',
        CurrentPlayArtist : '',
        CurrentPlayImage : '',
      };

  UNSAFE_componentWillMount() {
    this.UpdateTrack();
    // if(this.status == "Song"){
    //   TrackPlayer.destroy()
    //   TrackPlayer.add(this.playlist[this.index])
    //   TrackPlayer.play()
    // }
    // else{
      TrackPlayer.destroy()
      TrackPlayer.add(this.playlist)
      TrackPlayer.play()
    // }
  }

  
  async componentDidMount() {
    
    TrackPlayer.updateOptions({
      stopWithApp: false,
      capabilities: [
        TrackPlayer.CAPABILITY_PLAY,
        TrackPlayer.CAPABILITY_PAUSE,
        TrackPlayer.CAPABILITY_SKIP_TO_NEXT,
        TrackPlayer.CAPABILITY_SKIP_TO_PREVIOUS
      ],
    });
    this.UpdateTrackUI();
    this.onTrackChange = TrackPlayer.addEventListener('playback-track-changed', async (data) => {
      this.UpdateTrack();
  });
    this.onTrackChange = TrackPlayer.addEventListener('playback-state', async(data) => {
      this.UpdateTrackUI()
    })
  }
  _goBack = () => {
    this.props.navigation.goBack();
  }


  togglePlayback = async () => {
    // const currentTrack = await TrackPlayer.getCurrentTrack();
    // if (currentTrack == null) {
    //   TrackPlayer.reset();
    //   await TrackPlayer.add(this.playlist);
    //   TrackPlayer.play();
    // } else {
      if(await TrackPlayer.getState() === 2){
        TrackPlayer.play();
      }else{
        TrackPlayer.pause();
      }
    // }
    
    this.UpdateTrackUI();
    
  }
  
  skipToNext = async () => {
    try {
      await TrackPlayer.skipToNext();
    } catch (error) {
      console.log(error);
      TrackPlayer.stop();
    }
    this.UpdateTrack();
    this.UpdateTrackUI();
  }
    
  skipToPrevious = async () => {
    try {
      await TrackPlayer.skipToPrevious();
      this.UpdateTrack();
    } catch (error) {
      console.log(error);
    }
    this.UpdateTrack();
    this.UpdateTrackUI();
  }

  UpdateTrack = async () => {
    // if(this.status == "Playlist"){
        var current_id = await TrackPlayer.getCurrentTrack();
      if(current_id){
        var track = await TrackPlayer.getTrack(current_id);

        this.setState({
          CurrentPlayTitle : track.title,
          CurrentPlayArtist : track.artist,
          CurrentPlayImage : {uri: track.artwork},
        });
      }else{
        this.setState({
          CurrentPlayTitle : this.playlist.title,
          CurrentPlayArtist : this.playlist.artist,
          CurrentPlayImage : {uri: this.playlist.artwork}
        });
      }
    // }
    // else
    // {
    //   this.setState({
    //     CurrentPlayTitle : this.playlist[this.index].title,
    //     CurrentPlayArtist : this.playlist[this.index].artist,
    //     CurrentPlayImage : {uri: this.playlist[this.index].artwork}
    //   });
    // }
  }

  UpdateTrackUI = async () => {
    if(await TrackPlayer.getState() == 2){
      this.setState({
        AudioStatus: true
      });
    } else if(await TrackPlayer.getState() == 3){
      this.setState({
        AudioStatus: false
      });
    } else if(await TrackPlayer.getState() == 6){
      this.setState({
        AudioStatus: false
      });
    }
  }
  
  render() {
    // console.log(this.playlist)
    return (
      <View style={styles.container}>
        <StatusBar backgroundColor="#ded5d6"></StatusBar>
        <View style={styles.header}>
          <TouchableOpacity onPress={() => this._goBack()}>
                        <Image source={require('../icons/icon-jiantou.png')} style={styles.downButton} resizeMode='contain'/>
          </TouchableOpacity>
          <Text style={styles.song}>{this.state.CurrentPlayTitle}</Text>
        </View>
        <View style={styles.singer}>
          <Text style={styles.nameSinger}>{this.state.CurrentPlayArtist}</Text>
        </View>
        <View style={styles.image}>
          <Image source={this.state.CurrentPlayImage} style={styles.imageSong}></Image>
        </View>
        <View style={styles.taskBar}>
          <TouchableOpacity>
            <Image source={require('../icons/icon-like.png')} style={styles.favorite} resizeMode='contain'/>
          </TouchableOpacity>
          <TouchableOpacity>
            <Image source={require('../icons/Playlist.png')} style={styles.list} resizeMode='contain'/>
          </TouchableOpacity>
        </View>
       
        <View style={styles.slider}>
        <TrackStatus />
        </View>
        <View style={styles.control}>
          <TouchableOpacity>
          </TouchableOpacity>
          <TouchableOpacity onPress={() => this.skipToPrevious()}>
						<Image source={require('../icons/previous.png')} style={styles.backward} resizeMode='contain'/>
          </TouchableOpacity>
          <TouchableOpacity onPress={() => this.togglePlayback()}>
            <Image source={ this.state.AudioStatus ? require('../icons/play.png'): require('../icons/pause.png') } style={styles.pause} activeOpacity={1} resizeMode='contain'/>
          </TouchableOpacity>
          <TouchableOpacity onPress={() => this.skipToNext()}>
            <Image source={require('../icons/next.png')} style={styles.forward} resizeMode='contain'/>
          </TouchableOpacity>
        </View>

      </View>
    );

  }

} 

class TrackStatus extends ProgressComponent {

  state = {
    duration: 0,
    isSeeking: false,
    SliderDisable : true
  }
    formatTime(seconds) {
      if(this.state.SliderDisable){
        this.TrackSlider();
      }
      return seconds > 3600 
      ?
        [
          parseInt(seconds / 60 / 60),
          parseInt(seconds / 60 % 60),
          parseInt(seconds % 60)
        ].join(":").replace(/\b(\d)\b/g, "0$1")
      :
        [
          parseInt(seconds / 60 % 60),
          parseInt(seconds % 60)
        ].join(":").replace(/\b(\d)\b/g, "0$1")
    }
  
    
    TrackSlider = async () => {
      if(await TrackPlayer.getState() == 2){
        this.setState({
          SliderDisable: false
        });
      } else if(await TrackPlayer.getState() == 3){
        this.setState({
          SliderDisable: false
        });
      } else if(await TrackPlayer.getState() == 0){
        this.setState({
          SliderDisable: true
        });
      }
    }

    render () {
      return (
        
        <View>
          <Slider 
                      minimumValue          = {0}
                      maximumValue          = {this.state.duration}
                      thumbTintColor        = '#FFFFFF'
                      minimumTrackTintColor = '#000000'
                      maximumTrackTintColor = '#808080'
                      step                  = {1}
                      disabled              = {this.state.SliderDisable}
                          
                      onValueChange={ val=>{
                                            TrackPlayer.pause();
                                            this.seek = val;
                                            this.setState({isSeeking:true})
                                          }}
                      onSlidingComplete={ val=>{
                                            TrackPlayer.play();
                                            this.setState(()=> {
                                              TrackPlayer.seekTo(this.seek);
                                              this.position = this.seek;
                                            })
                                          }}
                        value={this.state.position}                
                      ></Slider>
                      <View style={{ marginTop: -12, flexDirection: "row", justifyContent: "space-between" }}>
                          <Text style={[styles.textLight, styles.timeStamp]}>{this.formatTime(this.state.position)}</Text>
                          <Text style={[styles.textLight, styles.timeStamp]}>{this.formatTime(this.state.duration)}</Text>
                      </View>
        </View>
      )
    }
  }

// const data = [
//     {
//       "id": "1111",
//       "url": "https://musicapp1509.000webhostapp.com/Nhac/[Audio]%20Ph%C6%B0%E1%BB%A3ng%20Bu%E1%BB%93n%20-%20H2K%20x%20Sli%20Petey.mp3",
//       "title": "Phượng Buồn",
//       "artist": "H2K ft Sli Petey",
//       "artwork": "https://musicapp1509.000webhostapp.com/Hinhanh/Bai_hat/Ph%C6%B0%E1%BB%A3ng%20Bu%E1%BB%93n.jpg"
//     },
//     {
//       "id": "2222",
//       "url": "https://musicapp1509.000webhostapp.com/Nhac/Anh%20Thanh%20Ni%C3%AAn%20-%20HuyR%20-%20OFFICIAL%20MV.mp3",
//       "title": "Anh Thanh Niên",
//       "artist": "HuyR",
//       "artwork": "https://musicapp1509.000webhostapp.com/Hinhanh/Bai_hat/Anh%20Thanh%20Ni%C3%AAn.jpg"
//     },
//     {
//       "id": "3333",
//       "url": "https://musicapp1509.000webhostapp.com/Nhac/[%20Vietsub%20]%20%C4%90%C3%A1p%20%C3%81n%20C%E1%BB%A7a%20B%E1%BA%A1n%20-%20A%20Nh%C5%A9ng%20--%20%E4%BD%A0%E7%9A%84%E7%AD%94%E6%A1%88%20-%20%E9%98%BF%E5%86%97.mp3",
//       "title": "Đáp Án Của Bạn",
//       "artist": "A Nhũng",
//       "artwork": "https://musicapp1509.000webhostapp.com/Hinhanh/Bai_hat/%C4%90%C3%A1p%20%C3%81n%20c%E1%BB%A7a%20B%E1%BA%A1n%20.jpg"
//     },
//     {
//       "id": "4444",
//       "url": "https://musicapp1509.000webhostapp.com/Nhac/Davichi,%20T-ara%20%E2%80%93%20We%20Were%20In%20Love.mp3",
//       "title": "We Were In Love",
//       "artist": "Tara - Davichi",
//       "artwork": "https://musicapp1509.000webhostapp.com/Hinhanh/Bai_hat/We%20Were%20In%20Love.jpg"
//     }
//   ]

// const data = this.props.route.params.playlist


  Player.propTypes = {
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
module.exports = connect(mapStateToProps)(Player);


//   MiniPlayer.propTypes = {
//     state: PropTypes.number,
//     track: PropTypes.object
// };

// function mapStateToProps(state) {
//     const currentTrack = state.playback.currentTrack;
//     const tracks = state.library.tracks;

//     return {
//         state: state.playback.state,
//         track: tracks ? tracks.find((track) => track.id == currentTrack) : null
//     };
// }

// module.exports = connect(mapStateToProps)(MiniPlayer);























// import React from 'react'
// import {View, Text, TouchableOpacity, Image, Slider, AppRegistry, StatusBar} from 'react-native'
// import TrackPlayer, {ProgressComponent} from 'react-native-track-player';
// TrackPlayer.setupPlayer();

// export default class Player extends React.Component{
  
//   state = {
//     AudioStatus: true,
//     CurrentPlayTitle : '',
//     CurrentPlayArtist : '',
//     CurrentPlayImage : ''
//   };

//   componentWillMount() {
//     this.UpdateTrack();
//   }
    
//   componentDidMount() {
//     TrackPlayer.updateOptions({
//       stopWithApp: false,
//       capabilities: [
//         TrackPlayer.CAPABILITY_PLAY,
//         TrackPlayer.CAPABILITY_PAUSE,
//         TrackPlayer.CAPABILITY_SKIP_TO_NEXT,
//         TrackPlayer.CAPABILITY_SKIP_TO_PREVIOUS,
//       ]
//     });
//     this.UpdateTrackUI();
//     this.onTrackChange = TrackPlayer.addEventListener('playback-track-changed', async (data) => {
//             this.UpdateTrack();
//         });
//           this.onTrackChange = TrackPlayer.addEventListener('playback-state', async(data) => {
//             this.UpdateTrackUI()
//           })
//   }

//   togglePlayback = async () => {
//     const currentTrack = await TrackPlayer.getCurrentTrack();
//     if (currentTrack == null) {
//       TrackPlayer.reset();
//       await TrackPlayer.add(data);
//       TrackPlayer.play();
//     } else {
//       if(await TrackPlayer.getState() === 2){
//         TrackPlayer.play();
//       }else{
//         TrackPlayer.pause();
//       }
//     }
//     this.UpdateTrackUI();
//   }
  
//   skipToNext = async () => {
//     try {
//       await TrackPlayer.skipToNext();
//     } catch (error) {
//       console.log(error);
//       TrackPlayer.stop();
//     }
//     this.UpdateTrack();
//     this.UpdateTrackUI();
//   }
    
//   skipToPrevious = async () => {
//     try {
//       await TrackPlayer.skipToPrevious();
//       this.UpdateTrack();
//     } catch (error) {
//       console.log(error);
//     }
//     this.UpdateTrack();
//     this.UpdateTrackUI();
//   }

//   UpdateTrack = async () => {
//     var current_id = await TrackPlayer.getCurrentTrack();
//     if(current_id){
//       var track = await TrackPlayer.getTrack(current_id);
//       this.setState({
//         CurrentPlayTitle : track.title,
//         CurrentPlayArtist : track.artist,
//         CurrentPlayImage : {uri: track.artwork},
//       });
//     }else{
//       this.setState({
//         CurrentPlayTitle : data[0].title,
//         CurrentPlayArtist : data[0].artist,
//         CurrentPlayImage : {uri: data[0].artwork},
//       });
//     }
//   }

//   UpdateTrackUI = async () => {
//     if(await TrackPlayer.getState() == 2){
//       this.setState({
//         AudioStatus: true
//       });
//     } else if(await TrackPlayer.getState() == 3){
//       this.setState({
//         AudioStatus: false
//       });
//     } else if(await TrackPlayer.getState() == 6){
//       this.setState({
//         AudioStatus: false
//       });
//     }
//   }

// 	render(){
// 		return(
// 		    <View style={{ flex: 1, justifyContent:'space-between', flexDirection:'column',  backgroundColor: '#03DAC5'}}>
//           <StatusBar backgroundColor='#03DAC5' barStyle="dark-content"/>
//           <View style={{flex: 8,}}>
//               <View style={{flex: 1, padding: 15}}>
//                   <Text style={{fontSize: 18, fontWeight: 'bold', color:'#000'}}>{this.state.CurrentPlayTitle}</Text>
//                   <Text>{this.state.CurrentPlayArtist}</Text>
//               </View>
//               <View style={{justifyContent:'center', alignItems:'center', flex: 9}}>
//                   <Image source={this.state.CurrentPlayImage} style={{width: '90%', height: 335}}/>
//               </View>
//           </View>
//           <View style={{justifyContent:'center', flex: 2, alignItems:'center'}}>
//             <TrackStatus />
//             <View style={{flexDirection: 'row', alignItems:'center'}}>
//                 <TouchableOpacity onPress={() => this.skipToPrevious()} style={{padding: 15}} activeOpacity={1}>
//                     <Image source={require('../icons/previous.png')} style={{width: 40, height: 40}} resizeMode='contain'/>
//                 </TouchableOpacity>
//                 <TouchableOpacity onPress={() => this.togglePlayback()} style={{padding: 15}} activeOpacity={1}>
//                     <Image source={this.state.AudioStatus ? require('../icons/play.png') : require('../icons/pause.png')} style={{width: 40, height: 40}} resizeMode='contain'/>
//                 </TouchableOpacity>
//                 <TouchableOpacity onPress={() => this.skipToNext()} style={{padding: 15}} activeOpacity={1}>
//                     <Image source={require('../icons/next.png')} style={{width: 40, height: 40}} resizeMode='contain'/>
//                 </TouchableOpacity>
//             </View>
//             <View style={{width: '100%', justifyContent:'center', alignItems:'center', flexDirection: 'row'}}>
//             </View>
//           </View>
//         </View>
// 		);
//   }
// }


// class TrackStatus extends ProgressComponent {

//   state = {
//     duration: 0,
//     isSeeking: false,
//     SliderDisable : true
//   }
//     formatTime(seconds) {
//       if(this.state.SliderDisable){
//         this.TrackSlider();
//       }
//       return seconds > 3600 
//       ?
//         [
//           parseInt(seconds / 60 / 60),
//           parseInt(seconds / 60 % 60),
//           parseInt(seconds % 60)
//         ].join(":").replace(/\b(\d)\b/g, "0$1")
//       :
//         [
//           parseInt(seconds / 60 % 60),
//           parseInt(seconds % 60)
//         ].join(":").replace(/\b(\d)\b/g, "0$1")
//     }
  
    
//     TrackSlider = async () => {
//       if(await TrackPlayer.getState() == 2){
//         this.setState({
//           SliderDisable: false
//         });
//       } else if(await TrackPlayer.getState() == 3){
//         this.setState({
//           SliderDisable: false
//         });
//       } else if(await TrackPlayer.getState() == 0){
//         this.setState({
//           SliderDisable: true
//         });
//       }
//     }

//     render () {
//       // TrackPlayer.getDuration().then(duration=>this.setState({duration}))

//       return (
        
//         <View>
//           <View style={{flexDirection:'row',paddingHorizontal: 10,alignItems:'center'}}>
//             <Text style={{color: 'black',backgroundColor:'transparent',width:40,textAlign:'center',fontSize:15}}>
//               {this.formatTime(this.state.position)}
//             </Text>
//             <Slider 
//               minimumValue          = {0}
//               maximumValue          = {this.state.duration}
//               thumbTintColor        = '#FFFFFF'
//               minimumTrackTintColor = '#000000'
//               maximumTrackTintColor = '#808080'
//               step                  = {1}
//               disabled              = {this.state.SliderDisable}
//               onValueChange ={ val=>{
//                 TrackPlayer.pause();
//                 this.seek = val;
//                 this.setState({isSeeking:true})
//               }}
//               onSlidingComplete={ val=>{
//                 TrackPlayer.play();
//                 this.setState(()=> {
//                   TrackPlayer.seekTo(this.seek);
//                   this.position = this.seek;
//                 })
//               }}
//               // value={this.state.isSeeking ? this.seek : this.state.position}
//               value={this.state.position}
//               style={{width: '75%'}}
//             />
//             <Text>{this.formatTime(this.state.duration)}</Text>
//           </View>
//         </View>
//       )
//     }
//   }
//   AppRegistry.registerComponent('Player', () => Player);

//   AppRegistry.registerHeadlessTask('TrackPlayer', () => 
//   module.exports = async (data) => {
//     if(data.type === 'playback-state') {
//         // Update the UI with the new state
//     } else if(data.type === 'remote-play') {
//         _player = false;
//         TrackPlayer.play();
//     } else if(data.type === 'remote-pause') {
//         TrackPlayer.pause();
//         _player = true;
//     } else if(data.type === 'remote-stop') {
//         TrackPlayer.stop();
//     } else if(data.type === 'remote-seek') {
//         console.warn(data.position);
//         TrackPlayer.seekTo(data.position);
//     } else if(data.type === 'remote-next') {
//         TrackPlayer.skipToNext();
//     } else if(data.type === 'remote-previous') {
//         TrackPlayer.skipToPrevious();
//     }
//   }
// );


// const data = [
//     {
//       "id": "1111",
//       "url": "https://musicapp1509.000webhostapp.com/Nhac/[Audio]%20Ph%C6%B0%E1%BB%A3ng%20Bu%E1%BB%93n%20-%20H2K%20x%20Sli%20Petey.mp3",
//       "title": "Phượng Buồn",
//       "artist": "H2K ft Sli Petey",
//       "artwork": "https://musicapp1509.000webhostapp.com/Hinhanh/Bai_hat/Ph%C6%B0%E1%BB%A3ng%20Bu%E1%BB%93n.jpg"
//     },
//     {
//       "id": "2222",
//       "url": "https://musicapp1509.000webhostapp.com/Nhac/Anh%20Thanh%20Ni%C3%AAn%20-%20HuyR%20-%20OFFICIAL%20MV.mp3",
//       "title": "Anh Thanh Niên",
//       "artist": "HuyR",
//       "artwork": "https://musicapp1509.000webhostapp.com/Hinhanh/Bai_hat/Anh%20Thanh%20Ni%C3%AAn.jpg"
//     },
//     {
//       "id": "3333",
//       "url": "https://musicapp1509.000webhostapp.com/Nhac/[%20Vietsub%20]%20%C4%90%C3%A1p%20%C3%81n%20C%E1%BB%A7a%20B%E1%BA%A1n%20-%20A%20Nh%C5%A9ng%20--%20%E4%BD%A0%E7%9A%84%E7%AD%94%E6%A1%88%20-%20%E9%98%BF%E5%86%97.mp3",
//       "title": "Đáp Án Của Bạn",
//       "artist": "A Nhũng",
//       "artwork": "https://musicapp1509.000webhostapp.com/Hinhanh/Bai_hat/%C4%90%C3%A1p%20%C3%81n%20c%E1%BB%A7a%20B%E1%BA%A1n%20.jpg"
//     },
//     {
//       "id": "4444",
//       "url": "https://musicapp1509.000webhostapp.com/Nhac/Davichi,%20T-ara%20%E2%80%93%20We%20Were%20In%20Love.mp3",
//       "title": "We Were In Love",
//       "artist": "Tara - Davichi",
//       "artwork": "https://musicapp1509.000webhostapp.com/Hinhanh/Bai_hat/We%20Were%20In%20Love.jpg"
//     }
//   ]
  