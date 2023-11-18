import { View, Text, Button, StyleSheet } from "react-native";

export default function Home({navigation}){
    return(
        <View style={style.container}>
            <View style={style.button}>
                <Button title="Login" onPress={() => navigation.navigate("Login")}> Login </Button>
            </View>
            <View style={style.button}>
                <Button title="Register" onPress = {() => navigation.navigate("Register")}> Register</Button>
            </View>
        </View>
    )
}

const style = StyleSheet.create({
    button:{
        marginBottom: 5,
        padding:5,
    },
    container:{
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
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
    submit:{
        width: '75%',
        minHeight: 40,
        backgroundColor: '#519FE0',
        borderRadius: 5,
        justifyContent: 'center'
    },  
})