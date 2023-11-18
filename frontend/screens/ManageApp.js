import React from 'react';
import { View, Text, FlatList, StyleSheet, Pressable } from 'react-native';
import NewService from '../components/NewService';
import Service from '../components/Service';
import { useState, useEffect } from 'react';
import api from '../api';
import EditService from './EditService';

const ManageApp = (navigation) => {
  const [services, setServices] = useState(null);
  useEffect(() => {
    api.get('/main/services/list/')
    .then(response => {
      return response.data
    })
    .then(data => {
      setServices(data.services)
    })
    .catch(error => {
      console.error(error)
    })
  }, [])

  const handleLongPress = (item) => {
    console.log('Long Pressed item:', item);
  };

  const handlePress = (item) => {
    //navigation.navigate(EditService, { serviceDetails: item }); Nie działa jak narazie pomyśleć
    console.log('Pressed item:', item);
  };

  
  return (
    <View style={style.container}>
      <Text style={style.title}>Your saved data</Text>
      <View style={style.list}>
      <FlatList 
        data={services}
        renderItem={({item}) => (
          <Pressable
           delayLongPress={1000}
           onPress={() => handlePress(item)}
           onLongPress={() => handleLongPress(item)}>
           <Service details={item} key={item.name}/>
          </Pressable>)}/>
      </View>
      <NewService/>
    </View>
  );
};

export default ManageApp;

const style = StyleSheet.create({
  container:{
    flex: 1,
    alignItems: 'center', 
  },
  list:{
    width: '100%',       
  },
  title:{
    fontSize: 16,
    fontWeight: 'bold',
    marginTop: 10,
    marginBottom: 10,
  }
})