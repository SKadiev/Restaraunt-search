import React from 'react';
import { Image } from 'react-native';
import { StyleSheet } from 'react-native';
import { Text } from 'react-native';
import { View } from 'react-native';
import Spinner from 'react-native-loading-spinner-overlay/lib';
import { LocationNavigateProps } from '../components/RestaurantItem';
import { loadSingleRestaurantData } from '../hooks/useResult';
import { useRoute } from '@react-navigation/native';

const RestaurantDetails: React.FC = () => {
	const route = useRoute<LocationNavigateProps>();
	console.log(route);
	const location = route.params.location;

	const { item, isLoading } = loadSingleRestaurantData({ location: location });

	return (
		<View style={styles.restaurantItem}>
			{item ? (
				<>
					<Image
						source={require('../assets/pancake.jpg')}
						style={styles.image}
					/>
					<Text style={styles.text}>
						{item.title}, {item.street}
					</Text>
					<Text style={styles.text}>
						{item.stars} Rating, {item.reviews} Reviews
					</Text>
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
		height: '50%',
		borderRadius: 10,
		// padding: 10,
		margin: 10
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
	}
});

export default RestaurantDetails;
