import React, { useEffect, useState } from 'react';
import { Image, StyleSheet } from 'react-native';
import { Text, View } from 'react-native';
import { MaterialIcons } from '@expo/vector-icons';
import MapView, { Marker } from 'react-native-maps';
import { LocationNavigateProps } from '../components/RestaurantItem';
import { loadSingleRestaurantData } from '../hooks/useResult';
import { useRoute } from '@react-navigation/native';
import Spinner from 'react-native-loading-spinner-overlay/lib';

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
		<View style={styles.container}>
			<View style={styles.card}>
				<Image source={require('../assets/pancake.jpg')} style={styles.image} />
				<View style={styles.details}>
					<Text style={styles.title}>{item.title}</Text>
					<Text style={styles.subtitle}>{item.street}</Text>
					<View style={styles.info}>
						{item.favorite ? (
							<MaterialIcons
								name='favorite'
								style={styles.favoriteIcon}
								size={20}
								color='#f2636e'
							/>
						) : (
							<MaterialIcons
								name='favorite-border'
								style={styles.favoriteIcon}
								size={20}
							/>
						)}
						<Text style={styles.rating}>
							{item.stars} Rating, {item.reviews} Reviews
						</Text>
					</View>
				</View>
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
			</View>
			<Spinner
				visible={isLoading}
				textContent={'Loading...'}
				textStyle={styles.spinnerTextStyle}
			/>
		</View>
	);
};

const styles = StyleSheet.create({
	container: {
		flex: 1
	},
	card: {
		marginHorizontal: 20,
		marginVertical: 10,
		backgroundColor: '#fff',
		borderRadius: 10,
		overflow: 'hidden'
	},
	image: {
		width: '100%',
		height: 200
	},
	details: {
		padding: 10
	},
	title: {
		fontSize: 22,
		fontWeight: 'bold',
		marginBottom: 5
	},
	subtitle: {
		fontSize: 16,
		color: 'gray'
	},
	info: {
		flexDirection: 'row',
		alignItems: 'center',
		marginTop: 10
	},
	favoriteIcon: {
		marginRight: 5
	},
	rating: {
		fontSize: 16
	},
	map: {
		width: '100%',
		height: 300
	},
	spinnerTextStyle: {
		color: '#FFF'
	}
});

export default RestaurantDetails;
