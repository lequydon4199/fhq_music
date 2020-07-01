import React, {Component} from 'react';
import {
  StyleSheet,
  Text,
  View,
  TouchableWithoutFeedback,
  StatusBar,
  TextInput,
  SafeAreaView,
  Keyboard,
  TouchableOpacity,
  KeyboardAvoidingView,
  Item,
  Platform,
  ImageBackground,
  AsyncStorage,
  ScrollView,
  ActivityIndicator,
  TouchableHighlight,
} from 'react-native';
import ListView from 'deprecated-react-native-listview';
import {ListItem, Image} from 'react-native-elements';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import {device} from '../config/ScreenDimensions';
import {SearchBar} from 'react-native-elements';
import {playlist} from '../data/data';
import TrackPlayer from '../trackPlayer/index';
import {setSong} from '../actions/index';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';

var ds = new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2});
class Search extends Component {
  constructor(props) {
    super(props);
    this.state = {
      searchedSong: [],
    };
  }

  _pressRow = (playlist) => {
    TrackPlayer.destroy();
    TrackPlayer.add(playlist);
    this.props.setSong(
      playlist.id,
      playlist.title,
      playlist.artist,
      playlist.artwork,
    );
    this.props.navigation.navigate('Player');
  };
  updateSearch = (searchText) => {
    this.setState({searchText});
  };
  searchedSong = (searchedText) => {
    var searchedSong = playlist.filter(function (playlist) {
      return (
        playlist.title.toLowerCase().indexOf(searchedText.toLowerCase()) > 0
      );
    });
    this.setState({searchedSong: searchedSong});
  };

  renderSong = (playlist) => {
    return (
      <View style={styles.song}>
        <TouchableOpacity
          activeOpacity={0.5}
          onPress={() => this._pressRow(playlist)}>
          <View style={styles.songContainer}>
            <Image source={{uri: playlist.artwork}} style={styles.songImage} />
            <View style={styles.songInfoContainer}>
              <View style={styles.songNameContainer}>
                <Text style={styles.songName}>{playlist.title}</Text>
              </View>
              <View style={styles.singerContainer}>
                <Text style={styles.singer}>{playlist.artist}</Text>
              </View>
            </View>
          </View>
        </TouchableOpacity>
      </View>
    );
  };

  _goBack = () => {
    this.props.navigation.goBack();
  };

  render() {
    const {navigate} = this.props.navigation;
    const {searchText} = this.state;
    return (
      <SafeAreaView
        style={{
          flex: 1,
          paddingTop: Platform.OS === 'android' ? StatusBar.currentHeight : 0,
        }}>
        <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
          <View style={styles.container}>
            <View style={styles.searchBarContainer}>
              <TouchableOpacity onPress={() => this._goBack()}>
                <MaterialIcons
                  name="arrow-back"
                  style={styles.back}
                  size={device.height * 0.038}></MaterialIcons>
              </TouchableOpacity>
              <View
                style={{
                  width: device.width * 0.8,
                  marginLeft: device.width * 0.05,
                  borderRadius: 100,
                  backgroundColor: '#e6e6e6',
                }}>
                <TextInput
                  searchIcon={{size: 24}}
                  placeholder="Nhập tên bài hát"
                  style={styles.searchInput}
                  onChangeText={this.searchedSong}
                />
              </View>
            </View>

            <ScrollView>
              <ListView
                dataSource={ds.cloneWithRows(this.state.searchedSong)}
                renderRow={this.renderSong}
                enableEmptySections={true}
                style={styles.contentdata}
              />
            </ScrollView>
          </View>
        </TouchableWithoutFeedback>
      </SafeAreaView>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'column',
    backgroundColor: 'white',
  },

  searchBarContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: device.height * 0.01,
  },
  contentdata: {
    flexDirection: 'column',
    // backgroundColor: '#e6e6e6',
    marginTop:device.height * 0.01,
  },
  searchIcon: {},
  searchInput: {
    fontSize: device.height * 0.025,
    paddingLeft: device.width * 0.05,
    height: device.height * 0.06,
  },
  profileImage: {},
  titletext: {},
  back: {
    marginTop: device.height * 0.005,
    color: 'black',
    marginLeft: device.width * 0.02,
  },
  song: {
    // backgroundColor: '#e6e6e6',
    marginTop: device.width * 0.04,
    marginLeft: device.width * 0.04,
  },
  songContainer: {
    backgroundColor: '#fff',
    flexDirection: 'row',
    // marginTop: device.width * 0.02,
  },
  songImage: {
    width: device.width * 0.17,
    height: device.width * 0.17,
    // marginVertical: device.width * 0.03,
    // marginHorizontal: device.width * 0.03,
    // borderRadius: 5,
  },
  songInfoContainer: {
    marginTop: device.width * 0.045,
    width: device.width * 0.6,
    marginLeft: device.width * 0.045,
  },
  songName: {
    fontSize: device.width * 0.05,
    marginTop: - device.width * 0.03,
  },
  singer: {
    color: 'gray',
    marginLeft: device.width * 0.02,
  },
});
const mapStateToProps = (state) => ({
  player: state.player,
});

const mapDispatchToProps = (dispatch) => ({
  setSong: bindActionCreators(setSong, dispatch),
});

export default connect(mapStateToProps, mapDispatchToProps)(Search);