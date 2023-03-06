import React from 'react'
import { TextInput } from 'react-native'
import { StyleSheet } from 'react-native'
import { View } from 'react-native'
import RestaurantList from '../components/RestaurantList'

const SearchScreen = () => {
  return (
    <View style={styles.container}>
      <TextInput style={styles.searchBar} placeholder='Search' />
      <RestaurantList />
    </View>
  )
}

const styles = StyleSheet.create({
  searchBar: {
    borderWidth: 1,
    height: 50,
    borderRadius: 20,
    alignItems: 'stretch',
    textAlign: 'center',
    backgroundColor: 'lightgray',
    marginBottom: 10
  },
  container: {
    alignItems: 'stretch',
    margin: 10
  }
});

export default SearchScreen;