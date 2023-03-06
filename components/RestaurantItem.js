import { Image, Text } from 'react-native'
import { StyleSheet } from 'react-native'
import { View } from 'react-native'
import { FlatList } from 'react-navigation'

const RestaurantItem = ({ listTitle, items, navigation }) => {
  console.log(navigation);
  return (
    <View>
      <Text>{listTitle}</Text>
      <FlatList horizontal style={styles.container} data={items} keyExtractor={(item, index) => item.id} renderItem={({ item }) => {
        console.log(item);
        return <View onPress={() => { navigation.navigate('Details') }} style={styles.restaurantItem}>
          <Image source={require('../assets/pancake.jpg')} style={styles.image} />
          <Text>Title : {item.title}</Text>
          <Text>{item.stars} Stars, {item.reviews} Reviews</Text>
        </View>
      }} />
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    // flexDirection: 'row',
  },
  restaurantItem: {
    borderColor: '#000',
    borderBottomWidth: 1,
    marginVertical: 5,
    width: 200,
    // height: 200

  },
  image: {
    height: 150,
    width: 150
  }
})

export default RestaurantItem