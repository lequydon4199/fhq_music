import React from 'react';
import { SafeAreaView, View, Text, StatusBar, Image, TouchableOpacity, Platform } from 'react-native';
import { ListItem, Button } from 'react-native-elements'
import styles from '../styles/Personal';
import { list, user, songs } from '../data/data';
import MiniPlayer from '../components/MiniPlayer';
import ListSongs from '../components/ListSongs';
import TrackPlayer, {ProgressComponent} from 'react-native-track-player';




export default class Personal extends React.Component {
  logout(){
    AsyncStorage.removeItem('user');
    this.props.setUser(defaultUser);

    TrackPlayer.destroy()
    this.props.navigation.navigate("Login")
  }
  render(){
    const {navigate} = this.props.navigation;
    return(
      <SafeAreaView style={{flex: 1, backgroundColor: '#0D47A1', paddingTop: Platform.OS === "android" ? StatusBar.currentHeight : 0}}>
        <View style={styles.container}>
          <View style={{flex: 1}}>
            <StatusBar barStyle="default" translucent/>
            <View style={styles.titleTextContainer}>
              <Text style={styles.titleText}>Cá nhân</Text>
            </View>
            <View style={{flexDirection: 'row', backgroundColor: 'white', marginBottom: 10}}>
              {/* <SearchBar navigation={this.props.navigation}/> */}
              <View>
                <Image style={{height: 80, width: 80, margin: 15, borderRadius: 40}} source={{uri: user.avatar}}/>
              </View>
              <View style={{justifyContent: "center"}}>
                <Text style={{fontSize: 18, fontWeight: 'bold'}}>Username: {user.username}</Text>
                <Text style={{marginVertical: 3}}>Nickname: {user.nickname}</Text>
                <Button 
                  containerStyle={{marginTop: 5}}
                  titleStyle={{fontSize: 14}}
                  buttonStyle={{padding: 5, width: 80, borderRadius: 5}}
                  title='Đăng xuất' 
                  onPress={() => this.logout()} 
                />
              </View>
            </View>
            <View style={{backgroundColor: 'white', marginBottom: 10}}>
            {list.map((item, i) => {
              return (
                <View key={i} >
                  <TouchableOpacity 
                    onPress={()=> navigate('Player', {playlist: TrackPlayer.getQueue() , continue: "true"})}
                    activeOpacity={0.3}
                  >
                    <ListItem
                      key={i}
                      title={item.title}
                      leftIcon={{ name: item.icon }}
                      bottomDivider
                      chevron
                    />
                  </TouchableOpacity>
                </View>  
              )
            })}
            </View>
            <View style={{backgroundColor: 'white', flex: 1}}>
              <ListItem
                title='Lịch sử'
                leftIcon={{name: 'history'}}
              />
              <View style={{flex: 1}}>
                <ListSongs type="history" navigate={navigate}/>
              </View>
            </View>
          </View>
        </View>
      </SafeAreaView>
    );
  }
}

