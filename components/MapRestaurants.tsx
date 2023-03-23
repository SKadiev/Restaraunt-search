import React, { FC, useState } from 'react';
import { RestaurantItem } from './RestaurantItem';
import MapView, { Marker } from 'react-native-maps';
import { View, StyleSheet } from 'react-native';
import { SearchLocationData } from '../screens/SearchScreen';

type Props = {
	restaurantsItems: {
		'500m': RestaurantItem[];
		'5000m': RestaurantItem[];
		'25000m': RestaurantItem[];
	};
	searchPlaceData: SearchLocationData;
};

const MapRestaurants: FC<Props> = ({ restaurantsItems, searchPlaceData }) => {
	let mapData = {
		latitude: +searchPlaceData.lon,
		longitude: +searchPlaceData.lat,
		latitudeDelta: 0.0922,
		longitudeDelta: 0.0421
	};
	const [isMapReady, setIsMapReady] = useState(true);
	console.log(mapData, restaurantsItems);

	const onMapLayout = () => {
		setIsMapReady(true);
	};
	return (
		<View>
			{isMapReady && (
				<MapView
					style={styles.map}
					initialRegion={mapData}
					onMapReady={onMapLayout}
				>
					{restaurantsItems['500m'].map((marker: RestaurantItem) => (
						<Marker
							key={marker.location.latitude + ',' + marker.location.longitude}
							coordinate={{
								latitude: +marker.location.latitude,
								longitude: +marker.location.longitude
							}}
							title={marker.title}
							description={marker.title}
						/>
					))}
					{restaurantsItems['5000m'].map((marker: RestaurantItem) => (
						<Marker
							key={marker.location.latitude + ',' + marker.location.longitude}
							coordinate={{
								latitude: +marker.location.latitude,
								longitude: +marker.location.longitude
							}}
							title={marker.title}
							description={marker.title}
						/>
					))}
					{restaurantsItems['25000m'].map((marker: RestaurantItem) => (
						<Marker
							key={marker.location.latitude + ',' + marker.location.longitude}
							coordinate={{
								latitude: +marker.location.latitude,
								longitude: +marker.location.longitude
							}}
							title={marker.title}
							description={marker.title}
						/>
					))}
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
	map: {
		width: '100%',
		height: '50%'
		// minHeight: 100
		// flex: 1
	}
});

export default MapRestaurants;
