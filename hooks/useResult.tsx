import { useEffect, useState } from 'react';
import {
	loadRadiusRestaurants,
	loadSingleRestaurant,
	LocationType
} from '../api/geoapify';
import { SearchLocationData } from '../screens/SearchScreen';
import { RestaurantItem as ResType } from '../components/RestaurantItem';

const RADIUS_RESTAURANTS: { '500m': []; '5000m': []; '25000m': [] } = {
	'500m': [],
	'5000m': [],
	'25000m': []
};

export default (searchData: SearchLocationData) => {
	const [restaurantsRadiusItems, setRestaurantRadiusItems] =
		useState(RADIUS_RESTAURANTS);
	const [isLoading, setIsLoading] = useState(false);

	const { lat, lon } = searchData;
	const searchApi2 = () => {
		const filterResultInit = restaurantsRadiusItems;
		for (const category in filterResultInit) {
			const elementCategory: [] = filterResultInit[category];
		}
	};

	const resLength =
		restaurantsRadiusItems['500m'].length +
		restaurantsRadiusItems['5000m'].length +
		restaurantsRadiusItems['25000m'].length;

	useEffect(() => {
		const load = async () => {
			setIsLoading(true);
			const radius500 = await loadRadiusRestaurants(500, lat, lon);
			const radius5000 = await loadRadiusRestaurants(5000, lat, lon);
			const radius25000 = await loadRadiusRestaurants(25000, lat, lon);
			const newStateRadiusRestaraunt = { ...RADIUS_RESTAURANTS };
			newStateRadiusRestaraunt['500m'] = radius500;
			newStateRadiusRestaraunt['5000m'] = radius5000;
			newStateRadiusRestaraunt['25000m'] = radius25000;
			setRestaurantRadiusItems(newStateRadiusRestaraunt);
			setIsLoading(false);
		};

		load();
		searchApi2();
	}, [lat, lon]);

	return {
		restaurantsRadiusItems,
		searchApi2,
		resLength,
		isLoading
	};
};

export const loadSingleRestaurantData = (locationData: LocationType) => {
	const [item, setItem] = useState<ResType | null>(null);
	const [isLoading, setIsLoading] = useState(false);
	const { latitude, longitude } = locationData.location;

	useEffect(() => {
		setIsLoading(true);
		const load = async () => {
			const item = await loadSingleRestaurant(locationData);
			setItem(item);
			setIsLoading(false);
		};
		load();
	}, [latitude, longitude]);

	return {
		item,
		isLoading
	};
};
