import React from 'react';
import { SafeAreaView, StatusBar, View } from 'react-native';
import ListSongs from '../components/ListSongs';
import styles from '../styles/SongList';
import Header from '../components/Header';
import MiniPlayer from '../components/MiniPlayer';

export default class SongList extends React.Component {
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
                <ListSongs type={routeParams.type} navigate={navigate}/>
              </View>
            </View>
            <MiniPlayer navigate={navigate}/>
          </View>
        </SafeAreaView>
      </React.Fragment>
    );
  }
}
