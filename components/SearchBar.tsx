import React, { useState } from 'react';
import { TouchableOpacity, StyleSheet, Text } from 'react-native';
import { View } from 'react-native';
import { AutocompleteInput } from 'react-native-autocomplete-input';
import useSearchSuggestion from '../hooks/useSearchSuggestion';
import { SearchLocationData } from '../screens/SearchScreen';

export type Props = {
	searchTerm: string;
	onSearchChange: (searchData: SearchLocationData) => void;
};

const SearchBar: React.FC<Props> = ({ searchTerm, onSearchChange }) => {
	const [selectedItem, setSelectedItem] = useState<{ query: string }>({
		query: ''
	});

	const data = useSearchSuggestion(selectedItem);

	return (
		<View style={styles.autocompleteContainer}>
			<AutocompleteInput
				data={data?.result ?? []}
				value={selectedItem?.query}
				onChangeText={(text: string) => setSelectedItem({ query: text })}
				flatListProps={{
					keyExtractor: (_: Ad, idx: any) => idx,
					renderItem: ({ item }: { item: SearchLocationData }) => (
						<TouchableOpacity>
							<Text
								onPress={() => {
									console.log(item);
									onSearchChange(item);
								}}
								style={styles.itemText}
							>
								{item.name}
							</Text>
						</TouchableOpacity>
					)
				}}
			/>
		</View>
	);
};

const styles = StyleSheet.create({
	searchBar: {
		flex: 1,
		fontSize: 18
	},
	container: {
		marginVertical: 10,
		flexDirection: 'row',
		backgroundColor: 'lightgray',
		borderRadius: 20,
		height: 50
	},
	searchIcon: {
		alignSelf: 'center',
		marginHorizontal: 10,
		fontSize: 30
	},
	autocompleteContainer: {
		flex: 1,
		left: 0,
		position: 'absolute',
		right: 0,
		top: 0,
		zIndex: 1
	},
	itemText: {
		fontSize: 15,
		margin: 2
	}
});

export default SearchBar;
