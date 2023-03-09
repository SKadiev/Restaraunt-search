import React, { useEffect, useState } from 'react';
import { TouchableOpacity, StyleSheet, Text } from 'react-native';
import { View } from 'react-native';
import { AutocompleteInput } from 'react-native-autocomplete-input';
import useSearchSuggestion from '../hooks/useSearchSuggestion';
import { SearchLocationData } from '../screens/SearchScreen';

export type Props = {
	onSearchChange: (searchData: SearchLocationData) => void;
};

const SearchBar: React.FC<Props> = ({ onSearchChange }) => {
	const [selectedItem, setSelectedItem] = useState<{ query: string }>({
		query: ''
	});

	const { query } = selectedItem;
	const [hideResults, setHideResults] = useState<boolean>(false);

	const data = useSearchSuggestion(selectedItem);
	return (
		<View style={styles.autocompleteContainer}>
			<AutocompleteInput
				hideResults={hideResults}
				data={data?.result ?? []}
				value={query}
				onChangeText={(text: string) => {
					setSelectedItem({ query: text }), setHideResults(false);
				}}
				flatListProps={{
					keyExtractor: (_: Ad, idx: any) => idx,
					renderItem: ({ item }: { item: SearchLocationData }) => (
						<TouchableOpacity>
							<Text
								onPress={() => {
									onSearchChange(item);
									setSelectedItem({ query: item.name });
									setHideResults(true);
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
