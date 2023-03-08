import React, { useState, useEffect } from 'react'
import { Text } from 'react-native'
import { StyleSheet } from 'react-native'
import { View } from 'react-native'
import RestaurantList from '../components/RestaurantList'
import SearchBar from '../components/SearchBar';
import useResult from '../hooks/useResult';

const SearchScreen = ({ navigation }) => {


  const [searchTerm, setSearchTerm] = useState('');
  const searchChange = async (newTerm) => {
    setSearchTerm(newTerm)
  }
  const { searchApi, resLength, restaurantsRadiusItems, isLoading } = useResult(searchTerm);

  return (
    <View style={styles.container}>
      <SearchBar
        searchTerm={searchTerm}
        onSearchChange={searchChange}
        onTermSubmitted={searchApi}
      />
      <Text>We have found {resLength} results</Text>
      {isLoading ? <Text style={styles.loadingStyle}>Is loading</Text> : <RestaurantList navigation={navigation} restaurantsItems={restaurantsRadiusItems} />}
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    alignItems: 'stretch',
    justifyContent: 'flex-end',
    margin: 10
  },
  loadingStyle: {
    alignSelf: 'center',
  }
});

export default SearchScreen;