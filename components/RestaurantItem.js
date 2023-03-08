import { Image, Text } from 'react-native'
import { TouchableOpacity } from 'react-native'
import { StyleSheet } from 'react-native'
import { View } from 'react-native'
import { FlatList } from 'react-navigation'

const RestaurantItem = ({ listTitle, items, navigation }) => {
  return (
    <View>
      <Text>{listTitle}</Text>
      <FlatList horizontal style={styles.container} data={items} keyExtractor={(item, index) => item.id} renderItem={({ item }) => {
        return <TouchableOpacity onPress={() => navigation.navigate('Details', { location: item.location })} style={styles.restaurantItem}>
          <Image source={require('../assets/pancake.jpg')} style={styles.image} />
          <Text style={styles.title}>Title : {item.title}</Text>
          <Text style={styles.review}>{item.stars} Stars, {item.reviews} Reviews</Text>
        </TouchableOpacity>
      }} />
    </View>
  )
}

const styles = StyleSheet.create({
  container: {

  },
  restaurantItem: {
    borderColor: 'lightgray',
    borderBottomWidth: 1,
    marginVertical: 5,
    width: 200,
    marginRight: 20

  },
  image: {
    height: 120,
    width: 250,
    borderRadius: 8,
    width: '100%'
  },
  title: {
    fontWeight: 'bold'
  },
  review: {
    color: 'darkgray',

  }
})

export default RestaurantItem