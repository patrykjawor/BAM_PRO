import React from "react";
import { useNavigation } from '@react-navigation/native';
import { View, StyleSheet, TouchableOpacity } from "react-native";
import AntDesign from '@expo/vector-icons/AntDesign';


export default function NewService(){
    const navigation = useNavigation();
    return(
        <TouchableOpacity onPress={() => navigation.navigate("Add service")}>
            <View style={style.default}>
                <AntDesign name="plus" size={32} color="blue"/>
            </View>
        </TouchableOpacity>
    )
}

const style = StyleSheet.create({
    default:{
        backgroundColor: '#ABADAE',
        width: 40,
        height: 40,
        borderRadius: 20,
        justifyContent: 'center',
        padding: 4,
    }
})