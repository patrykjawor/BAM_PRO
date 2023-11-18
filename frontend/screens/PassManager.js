import { View, Text, Button, StyleSheet } from "react-native";
import { NavigationContainer } from '@react-navigation/native';
import { createDrawerNavigator } from '@react-navigation/drawer';
//import { Drawer } from 'react-native-drawer-layout'; MOŻNA DAC POTEM TAKI NA GESTY 
import ManageApp from './ManageApp';
import Settings from './Settings';
import AddService from "./AddService";
import Logout from "./Logout";
import EditService from "./EditService";

const Drawer = createDrawerNavigator();


export default function PassManager({navigation}){
    return(
        <Drawer.Navigator>
            <Drawer.Screen name="Manage Apps" component={ManageApp}></Drawer.Screen>
            <Drawer.Screen name="Add service" component={AddService}></Drawer.Screen>
            <Drawer.Screen name="Edit service" component={EditService}></Drawer.Screen>
            <Drawer.Screen name="Logout" component={Logout}></Drawer.Screen>
        </Drawer.Navigator>
    );
}

const style = StyleSheet.create({
    button:{
        marginBottom: 5,
    }
        
})



