import React, { useEffect, useState } from 'react';
import { TouchableOpacity, StyleSheet, Text } from 'react-native';
import { View } from 'react-native';
import { AutocompleteInput } from 'react-native-autocomplete-input';
import useSearchSuggestion from '../hooks/useSearchSuggestion';
import { SearchLocationData } from '../screens/SearchScreen';
import { MaterialIcons } from '@expo/vector-icons';

const SearchBar: React.FC<Props> = ({ onSearchChange }) => {
	const [selectedItem, setSelectedItem] = useState<{ query: string }>({
		query: ''
	});

	const { query } = selectedItem;
	const [hideResults, setHideResults] = useState<boolean>(false);

	const data = useSearchSuggestion(selectedItem);
	return (
		<View style={styles.container}>
			<View style={styles.searchBox}>
				<MaterialIcons name='search' size={20} style={styles.searchIcon} />
				<AutocompleteInput
					style={styles.autocompleteContainer}
					hideResults={hideResults}
					data={data?.result ?? []}
					value={query}
					placeholder='Search Restaurant near you'
					onSubmitEditing={() => {
						setHideResults(true);
					}}
					onChangeText={(text: string) => {
						setSelectedItem({ query: text });
						setHideResults(false);
					}}
					flatListProps={{
						keyExtractor: (_: SearchLocationData, idx: any) => idx,
						renderItem: ({ item }: { item: SearchLocationData }) => (
							<TouchableOpacity
								style={styles.resultWrapper}
								onPress={() => {
									onSearchChange(item);
									setSelectedItem({ query: item.name });
									setHideResults(true);
								}}
							>
								<Text style={styles.itemText}>{item.name}</Text>
							</TouchableOpacity>
						),
						style: [
							styles.flatListContainer,
							!hideResults && styles.showFlatListContainer
						]
					}}
				/>
			</View>
		</View>
	);
};

const styles = StyleSheet.create({
	searchBar: {
		flex: 1,
		fontSize: 18,
		marginVertical: 20
	},
	container: {
		marginVertical: 10,
		backgroundColor: '#F0F0F0',
		borderRadius: 10,
		height: 60,
		width: '100%',
		justifyContent: 'center',
		zIndex: 1
	},
	searchBox: {
		flexDirection: 'row',
		alignItems: 'center'
	},
	searchIcon: {
		color: 'gray',
		marginHorizontal: 10
	},
	autocompleteContainer: {
		backgroundColor: '#FFFFFF',
		borderRadius: 10,
		borderWidth: 0,
		paddingLeft: 10,
		zIndex: 999,
		width: '100%'
	},
	itemText: {
		fontSize: 18,
		marginTop: 10,
		textAlign: 'center'
	},
	flatListContainer: {
		maxHeight: '100%',
		width: '100%',
		position: 'absolute',
		top: 0,
		left: -10,
		right: 0,
		backgroundColor: '#FFFFFF',
		borderColor: '#D3D3D3',
		borderWidth: 1,
		borderRadius: 10,
		zIndex: 1000,
		overflow: 'hidden'
	},
	showFlatListContainer: {
		maxHeight: 'auto'
	},
	resultWrapper: {
		marginBottom: 5
	}
});

export default SearchBar;
