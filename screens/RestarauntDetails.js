import React from 'react'
import { Image } from 'react-native'
import { Dimensions } from 'react-native'
import { StyleSheet } from 'react-native'
import { Text } from 'react-native'
import { View } from 'react-native'

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

const RestaurantDetails = ({ navigation }) => {
  const category = navigation.getParam('category');
  const id = navigation.getParam('id');
  const item = RESTAURANTS_LIST[category].find(item => item.id === id);
  return (
    <View style={styles.restaurantItem}>
      <Image source={require('../assets/pancake.jpg')} style={styles.image} />
      <Text style={styles.text}>Title : {item.title}</Text>
      <Text style={styles.text}>{item.stars} Stars, {item.reviews} Reviews</Text>
    </View>
  )
}

const styles = StyleSheet.create({
  restaurantItem: {
    borderColor: '#000',
    borderBottomWidth: 1,
    marginVertical: 5,
    width: '100%',
    height: '50%',
    backgroundColor: 'green'
    
  },
  image: {
    width: '100%',
    height: '100%',
  },
  text: {
    textAlign: 'center',
    marginVertical: 10
  }

})

export default RestaurantDetails