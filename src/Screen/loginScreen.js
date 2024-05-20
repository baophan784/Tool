import { StatusBar } from 'expo-status-bar';
import React, { useContext } from 'react';
import { TouchableOpacity, StyleSheet, Text, TextInput, View, Alert, ImageBackground } from 'react-native';
import { useState } from 'react';
import "../../firebaseConfig";
import { AuthContext } from '../Context/AuthContext';
import Spinner from 'react-native-loading-spinner-overlay';


const image = require('../../assets/background.jpg');

function LoginSreen({navigation}) {
    const [username, setUsername] = useState('');
    const [pass, setPass] = useState('');
    const {isLoading,login} = useContext(AuthContext)


    return (
        <View style={styles.container}>
        <Spinner visible={isLoading}/>
            <ImageBackground source={image} resizeMode="cover" style={styles.imageBackground}>
                <Text style={styles.title}>Tool Slot Vip 2024</Text>

                <TextInput
                    style={styles.input}
                    placeholder='Nhập tên tài khoản'
                    onChangeText={text => setUsername(text)}
                    value={username}
                    placeholderTextColor='#ddd'
                />
                <TextInput
                    style={styles.input}
                    placeholder='Nhập mật khẩu'
                    placeholderTextColor='#ddd'
                    onChangeText={pa => setPass(pa)}
                    value={pass}
                    secureTextEntry={true}
                />
                <TouchableOpacity
                    style={styles.loginButton}
                    onPress={() => login(username,pass,navigation)}
                >
                    <Text style={styles.buttonText}>Đăng nhập</Text>
                </TouchableOpacity>
                <StatusBar style="auto" />
            </ImageBackground>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#000',
        alignItems: 'center',
        justifyContent: 'center',
    },
    imageBackground: {
        flex: 1,
        width: '100%',
        alignItems: 'center',
        justifyContent: 'center',
    },
    title: {
        fontSize: 32,
        color: '#fff',
        fontWeight: 'bold',
        marginBottom: 40,
    },
    input: {
        width: '75%',
        borderRadius: 12,
        padding: 15,
        borderWidth: 1,
        marginVertical: 10,
        borderColor: '#ddd',
        color: '#fff',
    },
    loginButton: {
        backgroundColor: '#3b5998',
        borderRadius: 12,
        padding: 15,
        width: '75%',
        alignItems: 'center',
        marginTop: 20,
    },
    buttonText: {
        color: '#fff',
        fontSize: 18,
        fontWeight: 'bold',
    },
});

export default LoginSreen;
