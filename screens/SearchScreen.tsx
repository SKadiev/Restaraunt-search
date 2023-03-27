import React, { useEffect, useState } from 'react';
import { View, StyleSheet, Text, ScrollView } from 'react-native';
import Spinner from 'react-native-loading-spinner-overlay/lib';
import { useSelector } from 'react-redux';
import RestaurantList from '../components/RestaurantList';
import ResultFilter from '../components/ResultFilter';
import SearchBar from '../components/SearchBar';
import useResult from '../hooks/useResult';
import { RootResultState } from '../store/store';
import { MaterialCommunityIcons } from '@expo/vector-icons';

export type Props = {
	navigation: any;
};

import * as Location from 'expo-location';
import { TouchableOpacity } from 'react-native-gesture-handler';
import { getItemObject } from '../asyncStorage/getItemObject';
import { setFavoriteRestaurants } from '../store/favorites/favoriteRestaurants';
import { useDispatch } from 'react-redux';
import MapView, { Marker } from 'react-native-maps';
import { RestaurantItem } from '../components/RestaurantItem';

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
	const [mapOpen, setMapOpen] = useState(false);

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
		switchToListView();
	};

	let mapData = {
		latitude: +searchPlaceData.lon,
		longitude: +searchPlaceData.lat,
		latitudeDelta: 0.0922,
		longitudeDelta: 0.0421
	};

	const switchToListView = () => {
		if (mapOpen) {
			setMapOpen(false);
		}
	};
	const switchToMapView = () => {
		if (!mapOpen) {
			setMapOpen(true);
		}
	};

	return (
		<View style={styles.container}>
			<SearchBar onSearchChange={onSearchPlace} />
			<Text style={{ fontSize: 20 }}>Radius filters</Text>
			<ResultFilter
				filter500={filter500}
				filter5000={filter5000}
				filter25000={filter25000}
			/>
			<TouchableOpacity onPress={getYourLocation} style={styles.nearbyBtn}>
				<Text style={{ fontSize: 24, color: 'white', fontWeight: 'bold' }}>
					Get Restaurants Near you!
				</Text>
			</TouchableOpacity>
			<View style={styles.viewChoseContainer}>
				<TouchableOpacity
					onPress={switchToListView}
					style={{ flexDirection: 'row', alignItems: 'center' }}
				>
					<MaterialCommunityIcons
						name='format-list-bulleted-square'
						size={25}
					/>
					<Text style={{ fontSize: 22, marginLeft: 5 }}>List view</Text>
				</TouchableOpacity>
				<TouchableOpacity
					onPress={switchToMapView}
					style={{ flexDirection: 'row', alignItems: 'center' }}
				>
					<MaterialCommunityIcons name='google-maps' size={25} />
					<Text style={{ fontSize: 22, marginLeft: 5 }}>Map view</Text>
				</TouchableOpacity>
			</View>
			<Spinner
				visible={isLoading}
				textContent={'Loading...'}
				textStyle={styles.spinnerTextStyle}
			/>
			{!isLoading && (
				<ScrollView>
					{!mapOpen && (
						<RestaurantList
							filter500={filter500}
							filter5000={filter5000}
							filter25000={filter25000}
							restaurantsItems={restaurantsRadiusItems}
						/>
					)}
				</ScrollView>
			)}

			{mapOpen && (
				<MapView style={styles.map} initialRegion={mapData}>
					{restaurantsRadiusItems['500m'].map(
						(marker: RestaurantItem, index) => (
							<Marker
								key={marker.location.latitude + ',' + marker.location.longitude}
								coordinate={{
									latitude: +marker.location.latitude,
									longitude: +marker.location.longitude
								}}
								title={marker.title}
								description={marker.title}
							/>
						)
					)}
					{restaurantsRadiusItems['5000m'].map(
						(marker: RestaurantItem, index) => (
							<Marker
								key={marker.location.latitude + ',' + marker.location.longitude}
								coordinate={{
									latitude: +marker.location.latitude,
									longitude: +marker.location.longitude
								}}
								title={marker.title}
								description={marker.title}
							/>
						)
					)}
					{restaurantsRadiusItems['25000m'].map(
						(marker: RestaurantItem, index) => (
							<Marker
								key={marker.location.latitude + ',' + marker.location.longitude}
								coordinate={{
									latitude: +marker.location.latitude,
									longitude: +marker.location.longitude
								}}
								title={marker.title}
								description={marker.title}
							/>
						)
					)}
				</MapView>
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
		fontSize: 18,
		backgroundColor: 'red',
		padding: 10,
		borderRadius: 10
	},
	nearbyBtnText: {
		fontSize: 22
	},
	map: {
		width: '100%',
		height: '100%'
	},
	viewChoseContainer: {
		flexDirection: 'row',
		justifyContent: 'space-around',
		width: '100%',
		marginTop: 20
	}
});

export default SearchScreen;
