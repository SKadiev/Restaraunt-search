import React, { useState, useEffect } from 'react';
import { Text } from 'react-native';
import { StyleSheet } from 'react-native';
import { View } from 'react-native';
import RestaurantList from '../components/RestaurantList';
import SearchBar from '../components/SearchBar';
import useResult from '../hooks/useResult';

export type Props = {
	navigation: any;
};

export type SearchLocationData = {
	name: string;
	lat: string;
	lon: string;
};

const SearchScreen: React.FC<Props> = ({ navigation }) => {
	const [searchPlaceData, setSearchPlaceData] = useState<SearchLocationData>({
		name: 'Init',
		lat: '21.4316495',
		lon: '41.9960924'
	});

	const onSeachPlace = (searhPlaceData: SearchLocationData) => {
		setSearchPlaceData(searhPlaceData);
	};

	const { searchApi, resLength, restaurantsRadiusItems, isLoading } =
		useResult(searchPlaceData);

	return (
		<View style={styles.container}>
			<SearchBar onSearchChange={onSeachPlace} />
			{isLoading ? (
				<Text style={styles.loadingStyle}>Is loading</Text>
			) : (
				<RestaurantList
					navigation={navigation}
					restaurantsItems={restaurantsRadiusItems}
				/>
			)}
		</View>
	);
};

const styles = StyleSheet.create({
	container: {
		alignItems: 'center',
		justifyContent: 'flex-start',
		marginLeft: 10,
		flex: 1
	},
	loadingStyle: {
		alignSelf: 'center'
	}
});

export default SearchScreen;
