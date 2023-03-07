import axios from 'axios'
import React, { useState } from 'react'
import { TextInput } from 'react-native'
import { Text } from 'react-native'
import { StyleSheet } from 'react-native'
import { View } from 'react-native'
import RestaurantList from '../components/RestaurantList'
import SearchBar from '../components/SearchBar';

const RESTAURANTS_LIST = {
  'Cost Effective': [
    {
      id: 1,
      title: 'Effective Cost 1',
      stars: 4.5,
      reviews: 100,
      image: ''
    },
    {
      id: 2,
      title: 'Effective Cost 2',
      stars: 3.5,
      reviews: 200,
      image: ''
    }
  ],

  'Bit Pricer': [
    {
      id: 1,
      title: 'Bit Cost 1',
      stars: 4.5,
      reviews: 100,
      image: ''
    },
    {
      id: 2,
      title: 'Bit Cost 2',
      stars: 3.5,
      reviews: 200,
      image: ''
    },
    {
      id: 3,
      title: 'Bit Cost 2',
      stars: 3.5,
      reviews: 200,
      image: ''
    },
    {
      id: 4,
      title: 'Bit Cost 2',
      stars: 3.5,
      reviews: 200,
      image: ''
    },
    {
      id: 5,
      title: 'Bit Cost 2',
      stars: 3.5,
      reviews: 200,
      image: ''
    },
    {
      id: 6,
      title: 'Bit Cost 2',
      stars: 3.5,
      reviews: 200,
      image: ''
    },


  ],


  'Big Spender': [
    {
      id: 1,
      title: 'Spender Cost 1',
      stars: 4.5,
      reviews: 100,
      image: ''
    },
    {
      id: 2,
      title: 'Spender Cost 2',
      stars: 3.5,
      reviews: 200,
      image: ''
    }
  ],
}


const SearchScreen = ({navigation}) => {

  const [searchTerm, setSearchTerm] = useState('');
  const [restaurantsItems, setRestaurantItems] = useState(RESTAURANTS_LIST)



  const searchChange = async (newTerm) => {
    setSearchTerm(newTerm)
  }

  const searchApi = () => {
    const filterResultInit = { 'Cost Effective': [], 'Bit Pricer': [], 'Big Spender': [] };
    for (const category in restaurantsItems) {
      const elementCategory = restaurantsItems[category];
      elementCategory.forEach(restaurantData => {
        if (restaurantData.title.indexOf(searchTerm) > -1) {
          console.log(restaurantData.title, 'asdasd');
          filterResultInit[category].push(restaurantData);
        }
      })

    }
    if (searchTerm === '') {
      setRestaurantItems(RESTAURANTS_LIST)
    } else {

      setRestaurantItems(filterResultInit)
    }
  }

  const resLength = 
    restaurantsItems['Big Spender'].length +
    restaurantsItems['Bit Pricer'].length + 
    restaurantsItems['Cost Effective'].length ;
  return (
    <View style={styles.container}>
      <SearchBar
        searchTerm={searchTerm}
        onSearchChange={searchChange}
        onTermSubmitted={searchApi}
      />
      <Text>We have found {resLength} results</Text>
      <RestaurantList navigation={navigation} restaurantsItems={restaurantsItems} />
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    alignItems: 'stretch',
    margin: 10
  }
});

export default SearchScreen;