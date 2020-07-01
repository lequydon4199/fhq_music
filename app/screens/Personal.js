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
  AsyncStorage
} from 'react-native';
import {ListItem, Image} from 'react-native-elements';
import { defaultUser } from '../data/data';
import { setUser } from '../actions/index';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import MiniPlayer from '../components/MiniPlayer';

const drawerCover = require('../icons/cover-personal.jpeg');

const list = [
  {
    title: 'Danh sách yêu thích',
    icon: 'queue-music',
  },
  {
    title: 'Đăng xuất',
    icon: 'exit-to-app',
  },
];

class Personal extends Component {
  constructor(props) {
    super(props);

    this.state = {
      isFetching: true,
      activeUser:[],
      data: []
    };
  }
  
logout = async () =>{
  AsyncStorage.removeItem('user');
  this.props.navigation.navigate("TabNavigator");
  this.props.setUser(defaultUser);
  this.setState({
    isFetching: false,
  }
    
  )
}


favorite = async () => {
  this.props.navigation.navigate('SongList'
  ,{    
    title: list[0].title,
    type: list[0].type
    // data: this.props.user.favorite,
    // favorite: true
  }
  );
}

  render() {
    const {navigate} = this.props.navigation;
    if (this.props.user.username != '' ) {
      return (
        <SafeAreaView
          style={{
            flex: 1,
            paddingTop: Platform.OS === 'android' ? StatusBar.currentHeight : 0,
          }}>
          <StatusBar barStyle="default" translucent />
          <View style={styles.container}>
            <ImageBackground source={drawerCover} style={styles.top}>
              <Text
                style={{
                  fontSize: 32,
                  marginHorizontal: 20,
                  marginTop: 130,
                  color: 'white',
                }}>
                {this.props.user.username}
              </Text>

              <Text
                style={{
                  fontSize: 16,
                  marginHorizontal: 20,
                  marginTop: 8,
                  color: 'white',
                }}>
                {this.props.user.username}
              </Text>
            </ImageBackground>

            <View style={styles.mid}>
              <View>
                <TouchableOpacity
                  onPress={() =>
                    this.favorite()
                  }
                  activeOpacity={0.3}>
                  <ListItem
                    title={list[0].title}
                    leftIcon={{name: list[0].icon}}
                    bottomDivider
                    chevron
                  />
                </TouchableOpacity>
              </View>
              <View>
                <TouchableOpacity
                  onPress={() =>
                    this.logout()
                    
                  }
                  activeOpacity={0.3}>
                  <ListItem
                    title={list[1].title}
                    leftIcon={{name: list[1].icon}}
                    bottomDivider
                    chevron
                  />
                </TouchableOpacity>
              </View>
            </View>
            <MiniPlayer navigate={this.props.navigation.navigate} />
          </View>
        </SafeAreaView>
      );
    } else {
      return (
        <SafeAreaView
          style={{
            flex: 1,
            paddingTop: Platform.OS === 'android' ? StatusBar.currentHeight : 0,
          }}>
          <StatusBar barStyle="default" translucent />
          <View style={styles.container}>
            <ImageBackground source={drawerCover} style={styles.top}>
            </ImageBackground>

            <View
              style={{
                flex: 6,
                flexDirection: 'column',
                justifyContent: 'flex-start',
                alignItems: 'center',
              }}>
              <Text
                style={{
                  fontSize: 18,
                  marginTop: 30,
                  justifyContent: 'center',
                  alignItems: 'center',
                  textAlign: 'center',
                }}>
                Bạn chưa đăng nhập. Xin vui lòng đăng nhập
              </Text>
              <TouchableOpacity
                style={styles.buttonContainer}
                onPress={() => navigate('Login')}>
                <Text style={styles.buttonText}>Đăng Nhập</Text>
              </TouchableOpacity>
            </View>
            <MiniPlayer navigate={this.props.navigation.navigate}/>
          </View>
        </SafeAreaView>
      );
    }
  }
}

const mapStateToProps = state => ({
  user: state.user,
});

const mapDispatchToProps = (dispatch) => ({
  setUser: bindActionCreators(setUser, dispatch)
});

export default connect(mapStateToProps, mapDispatchToProps)(Personal);

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'stretch',
  },
  top: {
    flex: 3,
    flexDirection: 'column',
    alignSelf: 'stretch',
  },
  mid: {
    flex: 6,
    flexDirection: 'column',
  },
  text: {
    fontSize: 32,
    marginHorizontal: 20,
    marginTop: 8,
    color: 'white',
  },
  imageStyle: {
    width: 70,
    height: 70,
    marginHorizontal: 20,
    marginTop: 90,
  },
  buttonContainer: {
    backgroundColor: 'rgb(221,97,97)',
    width: 140,
    height: 55,
    borderRadius: 6,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 20,
  },
  buttonText: {
    textAlign: 'center',
    color: 'black',
    fontWeight: 'bold',
    fontSize: 20,
  },
});
