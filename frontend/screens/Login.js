import React from 'react';
import { useState, useEffect } from 'react';
import { loginUser } from '../api';
import api from '../api';
import { TextInput, Button, Alert, StyleSheet, View, Text } from 'react-native';
import * as LocalAuthentication from 'expo-local-authentication'



export default function Login({ navigation }) {

    const [username, setUserName] = useState('');
    const [password, setPassword] = useState('');
    const [isBiometricSupported, setIsBiometricSupported] = React.useState(false);

    const handleBiometricAuth = async () => {
        try {
            const { success, error } = await LocalAuthentication.authenticateAsync({
                promptMessage: 'Please authenticate yourself'
            });
            if(success)
                console.info(success)
                console.info("Success");
        }
        catch(error){
            console.error(error);
        }
    }


    useEffect(() => {
        (async () => {
            const compatible = await LocalAuthentication.hasHardwareAsync();
            setIsBiometricSupported(compatible);
        })();
        handleBiometricAuth();
    },[]);

    const formDataLogin = new FormData();
    formDataLogin.append('username', username);
    formDataLogin.append('password', password);

    const handleLogin = async () => {
        const response = await loginUser(formDataLogin);
        if (response) {
            if (response.status === 200) {
                console.log(username, password)
                Alert.alert('Login successful', response.message);
                navigation.navigate('Authenticate', { usernameParam: username, passParam : password});
                
            } else if (response.status === 400) {
                Alert.alert('Wrong username or password!', response.error);
            } else {
                Alert.alert('Login Failed!', 'Unexpected response from the server');
            }
        };
    }
    return (
        <View style={styles.container}>
            <View style={styles.form}>
            <TextInput
                placeholder="username"
                value={username}
                onChangeText={(text) => setUserName(text)}
                style={styles.input}
            />

            <TextInput
                secureTextEntry={true}
                placeholder="password"
                value={password}
                onChangeText={(text) => setPassword(text)}
                style={styles.input}
            />

            <Button 
            title="Login" 
            onPress={handleLogin}
            style={styles.submit} />
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    container:{
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center'

    },
    header: {
        fontSize: 20,
        fontWeight: '500',
        marginTop: 5,
        marginBottom: 5
    },
    form:{
        alignItems: 'center',
        width: '100%',
    },
    input:{
        backgroundColor: '#BCDEFA',
        shadowColor: 'black',
        paddingLeft: 4,
        shadowOffset: {width: -2, height: 4},
        shadowRadius: 5,
        borderRadius: 4,
        elevation: 5,
        width: '75%',
        minHeight: 40,
        marginBottom: 15,
        textAlign:'center'
    },
    submit:{
        width: '75%',
        minHeight: 40,
        backgroundColor: '#519FE0',
        borderRadius: 5,
        justifyContent: 'center'
    },
    submitText: {
        textAlign: 'center',
    },
})