import React, { useEffect, useState } from 'react';
import { Image } from 'react-native';
import { StyleSheet } from 'react-native';
import { Text } from 'react-native';
import { View } from 'react-native';
import Spinner from 'react-native-loading-spinner-overlay/lib';
import { LocationNavigateProps } from '../components/RestaurantItem';
import { loadSingleRestaurantData } from '../hooks/useResult';
import { useRoute } from '@react-navigation/native';
import { MaterialIcons } from '@expo/vector-icons';
import MapView, { Marker } from 'react-native-maps';

const RestaurantDetails: React.FC = () => {
	const route = useRoute<LocationNavigateProps>();
	const location = route.params.location;
	const item = route.params.item;
	const [isLoading, setIsLoading] = useState(true);

	useEffect(() => {
		const id = setTimeout(() => {
			setIsLoading(false);
		}, 300);

		return () => {
			clearTimeout(id);
		};
	}, []);

	return (
		<View style={styles.restaurantItem}>
			{!isLoading ? (
				<>
					<Image
						source={require('../assets/pancake.jpg')}
						style={styles.image}
					/>
					<Text style={styles.text}>
						{item.title}, {item.street}
					</Text>
					<Text style={styles.text}>
						{item.favorite ? (
							<MaterialIcons
								name='favorite'
								style={styles.favoriteIcon}
								size={30}
								color='#f2636e'
							/>
						) : (
							<MaterialIcons
								name='favorite-border'
								style={styles.favoriteIcon}
								size={30}
							/>
						)}{' '}
						{item.stars} Rating, {item.reviews} Reviews
					</Text>
					<MapView
						style={styles.map}
						initialRegion={{
							latitude: +item.location.latitude,
							longitude: +item.location.longitude,
							latitudeDelta: 0.0922,
							longitudeDelta: 0.0421
						}}
					>
						<Marker
							key={item.location.latitude + ',' + item.location.longitude}
							coordinate={{
								latitude: +item.location.latitude,
								longitude: +item.location.longitude
							}}
							title={item.title}
							description={item.title}
						/>
					</MapView>
				</>
			) : (
				<Spinner
					visible={isLoading}
					textContent={'Loading...'}
					textStyle={styles.spinnerTextStyle}
				/>
			)}
		</View>
	);
};

const styles = StyleSheet.create({
	restaurantItem: {
		borderColor: '#000',
		borderBottomWidth: 1,
		marginVertical: 5,
		width: '100%',
		height: '30%',
		borderRadius: 10,
		margin: 10
		// zIndex: 1
	},
	image: {
		width: '100%',
		height: '100%'
	},
	text: {
		textAlign: 'center',
		marginVertical: 10
	},
	spinnerTextStyle: {
		color: '#FFF'
	},
	favoriteIcon: {
		// alignSelf: 'stretch',
		paddingTop: 3
	},
	map: {
		width: '100%',
		height: '80%',
		zIndex: 200,
		backgroundColor: 'red'
	}
});

export default RestaurantDetails;
