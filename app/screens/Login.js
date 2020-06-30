import React, { Component, useState } from 'react'
import { StyleSheet, Text, View, Image, 
	TouchableWithoutFeedback, StatusBar,
	TextInput, SafeAreaView, Keyboard, TouchableOpacity,
	KeyboardAvoidingView, Item, Platform,AsyncStorage } from 'react-native';
import CheckBox from '@react-native-community/checkbox';
import { Alert } from 'react-native';
import { setUser } from '../actions/index';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';




class Login extends Component {
	constructor(props) {
		super(props);

		this.state = {
			username: "",
			password: "",
			isChecked: false,
			check : 0
		};

		}
	
	setSelection = (value)=> {
		// console.log(value)
		this.setState({isChecked: !value})
	} 

	login = async () => {
		if(this.state.username == '' || this.state.password == ''){
			Alert.alert("Vui lòng điền thông tin đăng nhập!")
		}
		else{
			const response = await fetch(`https://fhq-music-app.herokuapp.com/login`,{
				method: 'POST',
				headers: {
					'Accept': 'application/json',
					'Content-Type': 'application/json'
				},
				body: JSON.stringify({username: this.state.username, password: this.state.password})
			});
			const data = await response.json();
			// console.log(data)
			if(data != 0){
				await AsyncStorage.setItem('user', this.state.username);
				this.props.setUser(data);
				this.props.navigation.navigate("TabNavigator")
			}
			else{
				Alert.alert("Thông tin tài khoản chưa chính xác!!!")
			}
		}
			

		
	}
	
	
	render() {
		const {navigate} = this.props.navigation;
		return (
			<SafeAreaView style={styles.container}>
				<StatusBar barStyle="default" translucent/>
				<TouchableWithoutFeedback onPress={Keyboard.dismiss}>
					<View style={styles.container}>
						<View style={styles.top}>
							<Text style={styles.title}>FHQ Music</Text>
							<Text style={{color: "white"}}>Free and High Quality</Text>
						</View>

						<View style={styles.mid}>
							<View style={styles.infoContainer}>
								<TextInput 
									style={styles.input}
									placeholder="Enter your username/email"
									placeholderTextColor='rgba(0,0,0,0.8)'
									textContentType='emailAddress'
									keyboardType='email-address'
									returnKeyType='next'
									onChangeText={(value) => this.setState({username: value }) }>
								</TextInput>
							</View>

							<View style={styles.infoContainer}>
								<TextInput 
									style={styles.input}
									placeholder="Enter your password"
									placeholderTextColor='rgba(0,0,0,0.8)'
									returnKeyType='go'
									secureTextEntry={true}
									ref={"txtPassword"}
									onChangeText={(value) => this.setState({password: value }) }>
								</TextInput>
							</View>

							<View style={styles.checkboxContainer}>
								<CheckBox
									checked={this.state.isChecked}
									onPress={() => this.setSelection(this.state.isChecked)}
          							style={styles.checkbox}
									
								/>
							<Text style={styles.label}>Nhớ Tài Khoản ?</Text>
								
							</View>

							<TouchableOpacity style={styles.buttonContainer} onPress={() => this.login()}>
								<Text style={styles.buttonText}>Đăng Nhập</Text>
							</TouchableOpacity>
							

						</View>

						<TouchableOpacity style={styles.bot} onPress={()=> navigate('Register')}>
							<Text style={styles.textbot}>Chưa có tài khoản? Đăng ký tại đây</Text>
						</TouchableOpacity>
						

					</View>

				</TouchableWithoutFeedback>
			</SafeAreaView>
		)
	}
}

const mapDispatchToProps = (dispatch) => ({
	setUser: bindActionCreators(setUser, dispatch)
  });
  
  export default connect(null, mapDispatchToProps)(Login);

const styles = StyleSheet.create({
	container: {
		flex: 1,
		flexDirection: 'column',
		justifyContent: 'center',
		alignItems: 'stretch',
		backgroundColor: '#33AFFF'		
	},
	top: {
		flex: 3,
		flexDirection: 'column',
		justifyContent: 'center',
		alignItems: 'center',

	},
	mid: {
		flex: 5,
		flexDirection: 'column',
		justifyContent: 'flex-start',
		alignItems: 'center'
	},
	bot: {
		flex: 2,
		flexDirection: 'column',
		justifyContent: 'flex-start',
		alignItems: 'center'
	},
	title: {
		color: 'white',
		fontSize: 36,
		textAlign: 'center',
		paddingTop: 110,
	}, 
	infoContainer: {
		paddingHorizontal: 10,
		borderRadius: 10,
		marginTop: 20,
		backgroundColor: 'white'//a = alpha = opacity
	},
	input: {
		width: 280,
		height: 45,
	},
	buttonContainer: { 
		backgroundColor: 'rgb(221,97,97)',
		width: 120,
		height: 45,
		borderRadius:6,
		justifyContent:'center',
		alignItems: 'center',
		marginTop: 20,

	},
	buttonText: {
		textAlign: 'center',
		color: 'white',
		fontWeight: 'bold',
		fontSize: 18,
	},
	checkboxContainer: {
		flexDirection: "row",
		marginRight: 160,
	},
	checkbox: {
		alignSelf: "center",
	},
	label: {
		color: "white",
		marginTop: 7,
		marginLeft: -0
	},
	textbot: {
		color: "white",
		margin: 50,
	}

	
});
