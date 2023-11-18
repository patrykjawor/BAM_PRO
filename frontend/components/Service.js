import { View, Text, StyleSheet, Pressable } from "react-native";
import { useState } from "react";
import DisplayIcon from "./DisplayIcon";
import { FontAwesome } from '@expo/vector-icons';

export default function Service({details}) {
    const [visible, setVisible] = useState(false);
    return(
        <View style={style.container}>
            <View style={style.iconContainer}>
                <DisplayIcon iconString={details.icon} color="blue"/>
            </View>
            <Text>{details.name}</Text>
            <View style={style.details}>
                <Text>Username: {details.username}</Text>
                <Text style={{alignContent: 'center'}}>Password: {visible ? details.password : "⬤".repeat(details.password.length)}</Text>
            </View>
            <Pressable style={style.switch} onPress={() => setVisible(!visible)}><FontAwesome name={visible ? "eye-slash": "eye"} size={24} color="black"/></Pressable>
        </View>
    )
}

const style = StyleSheet.create({
    container:{
        width: '100%',
        minHeight: 40,
        backgroundColor: '#BCDEFA',
        shadowColor: 'black',
        shadowOpacity: 2,
        shadowRadius: 5,
        elevation: 5,
        paddingLeft: 2,
        paddingRight: 2,
        paddingTop: 5,
        paddingBottom: 5,
        marginBottom: 10,
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center'
    },
    iconContainer:{
        margin: 3,
        flex: 1,
    },
    details:{
        flexDirection: 'column',
        marginLeft: 10,
        flex: 8,
    },
    switch:{
        flex: 1,
    }
})