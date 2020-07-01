import React from 'react';
import { Icon } from 'react-native-elements';
import { View, TextInput, Dimensions, TouchableOpacity, Image, Text, ScrollView, TouchableHighlight } from 'react-native'
import styles from './ComponentStyles/SearchBar';
import { playlist } from '../data/data';
const screenHeight = Dimensions.get('window').height;
import ListView from "deprecated-react-native-listview";

var ds = new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2});

export default class SearchBar extends React.Component {
  constructor(props){
    super(props)
    this.state={
      searchedSong: []
    }
  }
  // _pressRow = () => {
  //   console.log("clicked")
  // }
  // updateSearch = searchText => {
  //   this.setState({searchText})
  // }
  // searchedSong = (searchedText) => {
  //   var searchedSong = playlist.filter(function(playlist) {
  //     return playlist.title.toLowerCase().indexOf(searchedText.toLowerCase()) > -1;
  //   });
  //   this.setState({searchedSong: searchedSong});
  // };

    renderSong = (playlist) => {
    return (
      <View>
      <TouchableHighlight onPress={() => this._pressRow()}>
        <View>
          <Text>{playlist.title}, {playlist.artist}</Text>
        </View>
      </TouchableHighlight>
      </View>
    );
  };
  render(){
    // const {searchText} = this.state;
    // console.log(this.state.searchedSong)
    return(
      <View style={styles.container}>
        <View style={[styles.searchBarContainer, this.props.style]}>
            {/* <Icon  containerStyle={styles.searchIcon} name="search" size={screenHeight*0.04} color="gray"/> */}
            {/* <TextInput
              placeholder="Nhập tên bài hát"
              style={styles.searchInput}
              onChangeText={this.searchedSong}
              // value={searchText}
            />  */}
            <Text style={styles.titletext}>FHQ Music</Text>
              {/* <ScrollView scrollsToTop={false}>
              <ListView
                    dataSource={ds.cloneWithRows(this.state.searchedSong)}
                    renderRow={this.renderSong} 
                    enableEmptySections={true}/>
            </ScrollView> */}
  
            
        </View>
        <TouchableOpacity onPress={() => this.props.navigation.navigate("Search")} style = {{backgroundColor:'#e6e6e6', borderRadius: 100}}>
          <View>
          <Icon  containerStyle={styles.searchIcon} name="search" size={screenHeight*0.04} color="gray"/>
          </View>
        </TouchableOpacity>
      </View>
    )
  }
}
