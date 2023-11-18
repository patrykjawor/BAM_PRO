import React from "react";
import api from "../api";
import { useState } from "react";
import { View, Text, TextInput, Pressable, StyleSheet, Alert } from "react-native";
import { Picker } from '@react-native-picker/picker';
import DisplayIcon from "../components/DisplayIcon";


export default function AddService({navigation}){
    const[username, setUsername] = useState('')
    const[password, setPassword] = useState('')
    const[name, setName] = useState('')
    const[icon, setIcon] = useState()

    const saveService = () => {
        const form = new FormData();
        form.append('name', name)
        form.append('username', username)
        form.append('password', password)
        form.append('icon', icon)

        api.post('/main/service/add/', form, {
            headers:{
                'Content-Type': 'multipart/form-data',
            }
        })
        .then( response => {
            return response.data
        })
        .then(data => {
            Alert.alert(data.message)
        })
        .catch(error => {
            console.warn(error);
        })
    }

    return (
        <View style={style.container}>
            <Text style={style.header}>
                Add new credentials
            </Text>
            <View style={style.form}>
                <TextInput
                    placeholder="Service name"
                    onChangeText={(text) => setName(text)}
                    style={style.input}
                />
                <TextInput
                    placeholder="Service login"
                    onChangeText={(text) => setUsername(text)}
                    style={style.input}
                />
                <TextInput
                    placeholder="Service password"
                    secureTextEntry={true}
                    onChangeText={(text) => setPassword(text)}
                    style={style.input}
                />
                <View style={style.iconPicker}>
                
                    <Picker
                        style={style.input}
                        selectedValue={icon}
                        onValueChange={(value) => setIcon(value)}
                        
                        placeholder="Select icon"
                    >
                        <Picker.Item label="Default" value='{"type": "fa", "name": "globe"}'/>
                        <Picker.Item label="Facebook" value='{"type": "ad", "name":"facebook-square"}'/>
                        <Picker.Item label="X" value='{"type": "ad", "name":"twitter"}'/>
                        <Picker.Item label="LinkedIn" value='{"type": "fa", "name":"linkedin"}'/>
                    </Picker>
                    <View style={style.icon}>
                        <DisplayIcon iconString={icon} color="blue"/>
                    </View>
                </View>

                <Pressable style={style.submit} onPress={() => saveService()}><Text style={style.submitText}>Save</Text></Pressable>
            </View>
        </View>
    )
}

const style = StyleSheet.create({
    container:{
        flex: 1,
        alignItems: 'center'
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
        marginBottom: 15
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
    iconPicker:{
        width: '75%',
        flexDirection: 'row',
        alignItems: 'center'
    },
    icon: {
        backgroundColor: '#BCDEFA',
        width: 50,
        height: 50,
        borderRadius: 25,
        marginLeft: 15,
        marginBottom: 6,
        justifyContent: 'center',
        alignItems: 'center',
        shadowColor: 'black',
        shadowRadius: 5,
        shadowOffset: {width: -2, height: 4},
        elevation: 5
    }
})