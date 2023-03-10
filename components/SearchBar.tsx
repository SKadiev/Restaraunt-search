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
		<View style={styles.container}>
			<AutocompleteInput
				style={styles.autocompleteContainer}
				hideResults={hideResults}
				data={data?.result ?? []}
				value={query}
				onChangeText={(text: string) => {
					setSelectedItem({ query: text }), setHideResults(false);
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
					)
				}}
			/>
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
		flexDirection: 'row',
		backgroundColor: 'lightgray',
		borderRadius: 20
	},
	searchIcon: {
		alignSelf: 'center',
		marginHorizontal: 10,
		fontSize: 30
	},
	autocompleteContainer: {
		backgroundColor: 'lightgray'
	},
	itemText: {
		fontSize: 18,
		marginVertical: 10,
		textAlign: 'center',
		// alignSelf: 'center',
		borderWidth: 2,
		height: 50,
		backgroundColor: 'gray'
	},
	resultWrapper: {}
});

export default SearchBar;
