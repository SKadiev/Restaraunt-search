import React from 'react'
import { View } from 'react-native'
import RestaurantItem from './RestaurantItem'

const RestaurantList = ({ navigation, restaurantsItems }) => {
  return (
    <View>
      <RestaurantItem navigation={navigation} listTitle="500m Radius Restaraunt" items={restaurantsItems['500m']} />
      <RestaurantItem navigation={navigation} listTitle="5000m Radius Restaraunt" items={restaurantsItems['5000m']} />
      <RestaurantItem navigation={navigation} listTitle="25000m Radius Restaurant" items={restaurantsItems['25000m']} />
    </View>
  )
}

export default RestaurantList;