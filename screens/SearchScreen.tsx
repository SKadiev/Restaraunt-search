import React, { useEffect, useState } from 'react';
import { View, StyleSheet, Text, ScrollView } from 'react-native';
import Spinner from 'react-native-loading-spinner-overlay/lib';
import { useSelector } from 'react-redux';
import RestaurantList from '../components/RestaurantList';
import ResultFilter from '../components/ResultFilter';
import SearchBar from '../components/SearchBar';
import useResult from '../hooks/useResult';
import { RootResultState } from '../store/store';
export type Props = {
	navigation: any;
};
import * as Location from 'expo-location';
import { TouchableOpacity } from 'react-native-gesture-handler';
import { getItemObject } from '../asyncStorage/getItemObject';
import { setFavoriteRestaurants } from '../store/favorites/favoriteRestaurants';
import { useDispatch } from 'react-redux';
export type SearchLocationData = {
	name: string;
	lat: string;
	lon: string;
};

const SearchScreen: React.FC<Props> = ({ navigation }) => {
	const dispatch = useDispatch();
	const [searchPlaceData, setSearchPlaceData] = useState<SearchLocationData>({
		name: 'Init',
		lat: '21.4316495',
		lon: '41.9960924'
	});
	// const [location, setLocation] = useState<null | LocationObject>(null);
	const [errorMsg, setErrorMsg] = useState<string | null>(null);

	useEffect(() => {
		const loadFavoriteStorage = async () => {
			let favoriteRestaurantsStorage = await getItemObject(
				'favoriteRestaurants'
			);
			if (favoriteRestaurantsStorage === null)
				[(favoriteRestaurantsStorage = [])];

			dispatch(setFavoriteRestaurants(favoriteRestaurantsStorage));
		};
		loadFavoriteStorage();
	}, []);

	const onSearchPlace = (searhPlaceData: SearchLocationData) => {
		setSearchPlaceData(searhPlaceData);
	};

	const filter500 = useSelector(
		(state: RootResultState) => state.resultFilter.filter500
	);
	const filter5000 = useSelector(
		(state: RootResultState) => state.resultFilter.filter5000
	);
	const filter25000 = useSelector(
		(state: RootResultState) => state.resultFilter.filter25000
	);

	const { restaurantsRadiusItems, isLoading } = useResult(
		searchPlaceData,
		filter500,
		filter5000,
		filter25000
	);

	const getYourLocation = async () => {
		let { status } = await Location.requestForegroundPermissionsAsync();
		if (status !== 'granted') {
			setErrorMsg('Permission to access location was denied');
			return;
		}

		let location = await Location.getCurrentPositionAsync({});
		setSearchPlaceData({
			name: 'Your place',
			lat: location.coords.longitude.toString(),
			lon: location.coords.latitude.toString()
		});
	};

	return (
		<View style={styles.container}>
			<SearchBar onSearchChange={onSearchPlace} />
			<Text>Radius filters</Text>
			<ResultFilter
				filter500={filter500}
				filter5000={filter5000}
				filter25000={filter25000}
			/>
			<TouchableOpacity onPress={getYourLocation} style={styles.nearbyBtn}>
				<Text style={styles.nearbyBtnText}>Get Restaurants Near you!</Text>
			</TouchableOpacity>
			<Spinner
				visible={isLoading}
				textContent={'Loading...'}
				textStyle={styles.spinnerTextStyle}
			/>
			{!isLoading && (
				<ScrollView>
					<RestaurantList
						filter500={filter500}
						filter5000={filter5000}
						filter25000={filter25000}
						restaurantsItems={restaurantsRadiusItems}
					/>
				</ScrollView>
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
	},
	spinnerTextStyle: {
		color: '#FFF'
	},
	checkBoxContainer: {
		flexDirection: 'row'
	},
	nearbyBtn: {
		marginTop: 30,
		height: 50,
		fontSize: 22,
		backgroundColor: 'red',
		padding: 10,
		borderRadius: 10
	},
	nearbyBtnText: {
		fontSize: 22
	}
});

export default SearchScreen;
