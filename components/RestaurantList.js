import React from 'react'
import { View } from 'react-native'
import RestaurantItem from './RestaurantItem'

const RestaurantList = ({ navigation }) => {

  const restarauntItems = {
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

  return (
    <View>
      <RestaurantItem navigation={navigation} listTitle="Cost Effective" items={restarauntItems['Cost Effective']} />
      <RestaurantItem navigation={navigation} listTitle="Bit Pricer" items={restarauntItems['Bit Pricer']} />
      <RestaurantItem navigation={navigation} listTitle="Big Spender" items={restarauntItems['Big Spender']} />
    </View>
  )
}

export default RestaurantList;