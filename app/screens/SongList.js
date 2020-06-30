import React from 'react';
import { SafeAreaView, StatusBar, View } from 'react-native';
import ListSongs from '../components/ListSongs';
import styles from '../styles/SongList';
import Header from '../components/Header';
import MiniPlayer from '../components/MiniPlayer';
import { setUser } from '../actions/index';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

class SongList extends React.Component {
  constructor(props) {
    super(props);
}

// state = {
//     data: this.props.route.params.data,
//     favorite: this.props.route.params.favorite
// }
  render(){

    const routeParams = this.props.route.params;
    const {navigate} = this.props.navigation;
    return(
      <React.Fragment>
        <SafeAreaView style={{backgroundColor: '#0D47A1', paddingTop: Platform.OS === "android" ? StatusBar.currentHeight : 0}}/>
        <SafeAreaView style={{flex: 1, backgroundColor: '#eeeeee'}}>
          <View style={styles.container}>
            <View style={{flex: 1}}>
              <StatusBar barStyle='default' translucent/>
              <Header 
                pressLeftComponent={() => navigate('TabNavigator')}
                centerText={routeParams.title}
              />
              <View style={styles.songContainer}>
                <ListSongs data = {this.props.user.favorite} favorite = {true} type={routeParams.type} navigate={navigate}/>
              </View>
            </View>
            {/* <MiniPlayer navigate={navigate}/> */}
          </View>
        </SafeAreaView>
      </React.Fragment>
    );
  }
}
const mapStateToProps = state => ({
  user: state.user,
});

const mapDispatchToProps = (dispatch) => ({
  setUser: bindActionCreators(setUser, dispatch)
});

export default connect(mapStateToProps, mapDispatchToProps)(SongList);