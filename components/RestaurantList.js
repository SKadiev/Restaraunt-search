import React from 'react'
import { View } from 'react-native'
import RestaurantItem from './RestaurantItem'

const RestaurantList = ({ navigation, restaurantsItems }) => {
  return (
    <View>
      <RestaurantItem navigation={navigation} listTitle="Cost Effective" items={restaurantsItems['Cost Effective']} />
      <RestaurantItem navigation={navigation} listTitle="Bit Pricer" items={restaurantsItems['Bit Pricer']} />
      <RestaurantItem navigation={navigation} listTitle="Big Spender" items={restaurantsItems['Big Spender']} />
    </View>
  )
}

export default RestaurantList;