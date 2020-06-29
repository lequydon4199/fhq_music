import React, { Component } from 'react'
import { StyleSheet, Text, View, 
	TouchableWithoutFeedback, StatusBar,
	TextInput, SafeAreaView, Keyboard, TouchableOpacity,
	KeyboardAvoidingView, Item, Platform, ImageBackground, AsyncStorage } from 'react-native';
import { ListItem, Image } from 'react-native-elements';
import { user } from '../data/data';


const drawerCover = require("../icons/cover-personal.jpeg");


const list = [
    {
      title: 'Thông tin cá nhân',
      icon: 'person',
    },
    {
      title: 'Playlist của tôi',
      icon: 'queue-music',
    },
    {
      title: 'Gửi thông báo',
      icon: 'near-me',
	},
	{
		title: 'Đăng xuất',
		icon: 'exit-to-app',
	  },
  ];

export default class Personal extends Component {
	constructor(props) {
		super(props);

		this.state = {

		};

	}
	async UNSAFE_componentWillMount(){
		const user = await AsyncStorage.getItem('user');
		console.log(user)
	}


	render() {    

	if (this.state.isFetching){
		return (
		<SafeAreaView style={{flex: 1, justifyContent: 'center'}}>
		<ActivityIndicator size='large' color='#0D47A1' />
		</SafeAreaView>
		);
	}
  const {navigate} = this.props.navigation;
		// const {navigate} = this.props.navigation;
		return (
			<SafeAreaView style={{flex: 1, paddingTop: Platform.OS === "android" ? StatusBar.currentHeight : 0}}>
				<StatusBar barStyle="default" translucent/>
					<View style={styles.container}>
						
                    <ImageBackground source={drawerCover} style={styles.top}>

						<Image style={styles.imageStyle}
								source={{uri: 'https://cdn3.iconfinder.com/data/icons/vector-icons-6/96/256-512.png'}}>
						</Image>

						<Text style={styles.text}>Lê Quý Đôn</Text>

						<Text style={{fontSize: 16, marginHorizontal: 20, marginTop: 8, color: 'white'}}>lequydon4199@gmail.com</Text>

                    </ImageBackground>
					
					<View style={styles.mid}>
						
						{
							list.map((item, i) => (
							<ListItem
								key={i}
								title={item.title}
								leftIcon={{ name: item.icon }}
								bottomDivider
								chevron
							/>
							))
						}

					</View>

					</View>
			</SafeAreaView>
		)
	}
}
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
		// justifyContent: 'center',
        // alignItems: 'center',
        // backgroundColor: 'red',
        alignSelf: "stretch",
	},
	mid: {
		flex: 6,
		flexDirection: 'column',
		// justifyContent: 'flex-start',
		// alignItems: 'center',
	},
	text: {
		fontSize: 32,
		marginHorizontal: 20,
		marginTop: 8,
		color: 'white'
	},
	imageStyle: {
		width: 70, 
		height: 70,
		marginHorizontal: 20,
		marginTop: 90
	},
	
});
