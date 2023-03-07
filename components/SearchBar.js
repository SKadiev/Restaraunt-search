import React from 'react';
import { TextInput } from 'react-native';
import { StyleSheet } from 'react-native';
import { View } from 'react-native';
import { Feather } from '@expo/vector-icons';

const SearchBar = ({ searchTerm, onSearchChange, onTermSubmitted }) => {
  return (
    <View style={styles.container}>
      <Feather name='search' style={styles.searchIcon} />
      <TextInput
        value={searchTerm}
        onChangeText={onSearchChange}
        onEndEditing={onTermSubmitted}
        style={styles.searchBar}
        placeholder='Search'
        autoCapitalize="none"
        autoCorrect={false}
      />
    </View>
  )
}

const styles = StyleSheet.create({
  searchBar: {
    flex: 1,
    fontSize: 18
  },
  container: {
    flexDirection: 'row',
    backgroundColor: 'lightgray',
    borderRadius: 20,
    height: 50,
  },
  searchIcon: {
    alignSelf: 'center',
    marginHorizontal: 10,
    fontSize: 30
  }
});

export default SearchBar