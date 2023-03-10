import React, { useEffect, useState } from 'react';
import { TouchableOpacity, StyleSheet, Text } from 'react-native';
import { View } from 'react-native';
import { AutocompleteInput } from 'react-native-autocomplete-input';
import useSearchSuggestion, {
	AddressResult
} from '../hooks/useSearchSuggestion';
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
		flex: 1,
		left: 0,
		position: 'absolute',
		right: 0,
		top: 0,
		zIndex: 2
	},
	itemText: {
		fontSize: 18,
		marginVertical: 10,
		top: 80,
		textAlign: 'center',
		borderWidth: 2,
		borderRadius: 10,
		backgroundColor: 'gray'
	},
	resultWrapper: {
		zIndex: 1
	}
});

export default SearchBar;
