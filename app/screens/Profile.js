import React from 'react';
import { View, Text, Image, SafeAreaView, StatusBar, StyleSheet, TouchableOpacity } from 'react-native';
import { Icon } from 'react-native-elements'
import { device } from '../config/ScreenDimensions'

export default class Profile extends React.Component {

    logout = () => {
        this.props.navigation.navigate("Login")
    }
    render() {
        const {navigate} = this.props.navigation;
        return (
            <SafeAreaView style={styles.container}>
                <View style={styles.header}>
                    <View style={styles.headcontainer}>
                        <View style={styles.back}>
                            <TouchableOpacity onPress={()=> navigate('TabNavigator')}>
                                <Icon name='arrow-back' size={30} color="white"></Icon>
                            </TouchableOpacity>
                        </View>
                        <View style={styles.mid}>
                            <View style={styles.titleText}>
                                <Text style={{color: "white", fontSize: 30}}>FHQ Music{'\n'}</Text>
                            </View>
                        <Image
                            style={styles.image}
                            source={{
                                uri: 'https://i.ya-webdesign.com/images/profile-avatar-png-6.png',
                                width: 80, height: 80,
                            }}
                        />
                        <View>
                            <Text>{'\n \n'}Nguyen Van A</Text>
                        </View>
                    </View>
                            <View style={styles.blank}></View>
                    </View>
                    <View style={styles.hor}></View>

                </View>

                <View style={styles.middle}>
                    <View style={styles.blank}></View>
                    <View style={styles.midcontainer}>
                        <View style={styles.items}>
                            <Icon name='star' type='font-awesome'></Icon>
                            <Text>{'   '}Đánh giá ứng dụng</Text>
                            <Text>{'\n\n'}</Text>
                        </View>

                        <View style={styles.items}>
                            <Icon name='info-circle' type='font-awesome'></Icon>
                            <Text>{'   '}Thông tin ứng dụng</Text>
                            <Text>{'\n\n'}</Text>
                        </View>

                        <View style={styles.items}>
                            <Icon name='question-circle' type='font-awesome'></Icon>
                            <Text>{'   '}Hướng dẫn sử dụng</Text>
                            <Text>{'\n\n'}</Text>
                        </View>
                        <TouchableOpacity onPress={() => this.logout()}>
                            <View style={styles.items}>
                                <Icon name='sign-out' type='font-awesome'></Icon>
                                <Text>{'   '}Đăng xuất</Text>
                                <Text>{'\n\n'}</Text>
                            </View>
                        </TouchableOpacity>
                    </View>
                </View>

            </SafeAreaView>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        flexDirection: 'column',
        backgroundColor: '#33AFFF',
    },
    header: {
        flex: 3,
        flexDirection: 'column',
    },

    middle: {
        flex: 7,
        flexDirection: 'column',

    },

    titleText: {
        paddingTop: 50,
        color: 'black',
        textAlign: 'center',
        fontSize: 30,

    },
    hor: {
        borderBottomColor: 'black',
        borderBottomWidth: 1,
        flex: 1,
        flexDirection: 'column',
        marginBottom: -50,
    },
    headcontainer: {
        flex: 6,
        flexDirection: 'row',
        alignItems: 'center',
    },
    blank: {
        flex: 1,
        flexDirection: 'column',
    },
    midcontainer: {
        flex: 8,
        flexDirection: 'column',
        alignItems: 'stretch',
        marginLeft: device.width* 0.3,
        marginTop: device.height* 0.05,
    },
    items: {
        flexDirection: 'row',
        fontSize: 26,
        alignItems: 'stretch'
    },
    back: {
      flex: 1,
      flexDirection: 'row',
      marginBottom: 100,
      marginLeft: 10,
    },
    icons: {
        
    }
});

