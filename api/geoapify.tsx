import axios from 'axios';
import { RestaurantItem } from '../components/RestaurantItem';

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
	longitude: string = '41.9960924'
) => {
	const radius500Res = await geoapify.get(
		`/places?categories=catering.restaurant&filter=circle:${latitude},${longitude},${radius}&bias=proximity:${latitude},${longitude}&lang=en&limit=500&apiKey=34f01aa367cc4fcb96f56acdb24d79c6`
	);
	const radiusRestaurantData = radius500Res.data.features.map(
		(restaurant: any, index: number) => {
			return {
				id: restaurant.properties.name + restaurant.properties.street,
				title: restaurant.properties.name,
				location: {
					latitude: restaurant.properties.lat,
					longitude: restaurant.properties.lon
				},
				stars: 4.5,
				reviews: 100,
				image: ''
			};
		}
	);

	return radiusRestaurantData.filter(
		(restaurant) => restaurant.title !== undefined
	);
};

export const loadSingleRestaurant = async ({
	location: { longitude, latitude }
}: LocationType) => {
	const restaurantData = await axios.get(
		`https://api.geoapify.com/v1/geocode/reverse?lat=${latitude}&lon=${longitude}&format=json&apiKey=34f01aa367cc4fcb96f56acdb24d79c6`
	);
	const restaurant = restaurantData.data.results[0];

	return {
		id: restaurant.name + restaurant.street,
		title: restaurant.name,
		location: {
			latitude: restaurant.lat,
			longitude: restaurant.lon
		},
		stars: 4.5,
		reviews: 100,
		image: ''
	};
};

export const searchPlaces = async (searchText) => {
	try {
		const placesData = await axios.get(
			`https://api.geoapify.com/v1/geocode/autocomplete?text=${searchText}&format=json&apiKey=34f01aa367cc4fcb96f56acdb24d79c6`
		);
		const places = placesData.data.results.map((place) => ({
			name: place['formatted'],
			lat: place.lon,
			lon: place.lat
		}));
		return places;
	} catch (error) {
		console.log(error);
	}
};
