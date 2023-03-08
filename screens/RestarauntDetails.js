import React, { useEffect, useState } from 'react'
import { Image } from 'react-native'
import { Dimensions } from 'react-native'
import { StyleSheet } from 'react-native'
import { Text } from 'react-native'
import { View } from 'react-native'
import { loadSingleRestaurant } from '../api/geoapify'

const RestaurantDetails = ({ navigation }) => {
  const location = navigation.getParam('location');
  const [item, setItem] = useState(null);
  useEffect(() => {
    const load = async () => {
      const item = await loadSingleRestaurant(location);
      console.log(item);
      setItem(item)
    }
    load();
  }, [])
  console.log(item);

  return (
    <View style={styles.restaurantItem}>
      {item &&
        <>
          <Image source={require('../assets/pancake.jpg')} style={styles.image} />
          <Text style={styles.text}>Title : {item.title}</Text>
          <Text style={styles.text}>{item.stars} Rating, {item.reviews} Reviews</Text>
        </>
      }
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