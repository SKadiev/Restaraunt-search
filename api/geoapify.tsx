import axios from 'axios';
import { useSelector } from 'react-redux';
import { RestaurantItem } from '../components/RestaurantItem';
import { RootResultState } from '../store/store';

export const geoapify = axios.create({
	baseURL: 'https://api.geoapify.com/v2',
	headers: {}
});

export type LocationType = {
	location: {
		latitude: string;
		longitude: string;
	};
};

export const loadRadiusRestaurants = async (
	radius = 500,
	latitude: string = '21.4316495',
	longitude: string = '41.9960924',
	favorites: RestaurantItem[] = []
) => {
	const radius500Res = await geoapify.get(
		`/places?categories=catering.restaurant&filter=circle:${latitude},${longitude},${radius}&bias=proximity:${latitude},${longitude}&lang=en&limit=500&apiKey=34f01aa367cc4fcb96f56acdb24d79c6`
	);

	const radiusRestaurantData = radius500Res.data.features.map(
		(restaurant: any, index: number) => {
			// console.log(favorites[0]);
			const isFavorite = favorites.find(
				(favoriteRestaurant) =>
					favoriteRestaurant.id ===
					restaurant.properties.lat + ',' + restaurant.properties.lon
			);
			return {
				id: restaurant.properties.lat + ',' + restaurant.properties.lon,
				title: restaurant.properties.name,
				location: {
					latitude: restaurant.properties.lat,
					longitude: restaurant.properties.lon
				},
				stars: 4.5,
				reviews: 100,
				image: '',
				street: restaurant.properties.street,
				distance: restaurant.properties.distance,
				favorite: isFavorite ? true : false
			};
		}
	);

	return radiusRestaurantData.filter(
		(restaurant: RestaurantItem) => restaurant.title !== undefined
	);
};

export const loadSingleRestaurant = async (
	{ location: { latitude, longitude } }: LocationType,
	favorites: RestaurantItem[]
) => {
	const restaurantData = await axios.get(
		`https://api.geoapify.com/v1/geocode/reverse?lat=${latitude}&lon=${longitude}&format=json&apiKey=34f01aa367cc4fcb96f56acdb24d79c6`
	);
	const restaurant = restaurantData.data.results[0];
	const isFavorite = favorites.find(
		(favoriteRestaurant) =>
			favoriteRestaurant.id === restaurant.lat + ',' + restaurant.lon
	);
	console.log(isFavorite);
	return {
		id: restaurant.lat + ',' + restaurant.lon,
		title: restaurant.name,
		location: {
			latitude: restaurant.lat,
			longitude: restaurant.lon
		},
		stars: 4.5,
		reviews: 100,
		image: '',
		street: restaurant.street,
		favorite: isFavorite
	};
};

export const searchPlaces = async (searchText: string) => {
	try {
		const placesData = await axios.get(
			`https://api.geoapify.com/v1/geocode/autocomplete?text=${searchText}&format=json&apiKey=34f01aa367cc4fcb96f56acdb24d79c6`
		);
		const places = placesData.data.results.map((place: any) => ({
			name: place['formatted'],
			lat: place.lon,
			lon: place.lat
		}));
		return places;
	} catch (error) {
		console.log(error);
	}
};
