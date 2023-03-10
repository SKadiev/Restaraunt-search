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

export default (
	searchData: SearchLocationData,
	filter500: boolean,
	filter5000: boolean,
	filter25000: boolean
) => {
	const [restaurantsRadiusItems, setRestaurantRadiusItems] =
		useState(RADIUS_RESTAURANTS);
	const [isLoading, setIsLoading] = useState(false);

	const { lat, lon } = searchData;

	const resLength =
		restaurantsRadiusItems['500m'].length +
		restaurantsRadiusItems['5000m'].length +
		restaurantsRadiusItems['25000m'].length;

	useEffect(() => {
		const load = async () => {
			setIsLoading(true);

			let radius500, radius5000, radius25000;

			if (filter500) {
				radius500 = await loadRadiusRestaurants(500, lat, lon);
			} else {
				radius500 = [];
			}
			if (filter5000) {
				radius5000 = await loadRadiusRestaurants(5000, lat, lon);
			} else {
				radius5000 = [];
			}
			if (filter25000) {
				radius25000 = await loadRadiusRestaurants(25000, lat, lon);
			} else {
				radius25000 = [];
			}

			const newStateRadiusRestaraunt = { ...RADIUS_RESTAURANTS };
			newStateRadiusRestaraunt['500m'] = radius500;
			newStateRadiusRestaraunt['5000m'] = radius5000;
			newStateRadiusRestaraunt['25000m'] = radius25000;
			setRestaurantRadiusItems(newStateRadiusRestaraunt);
			setIsLoading(false);
		};

		load();
	}, [lat, lon, filter500, filter5000, filter25000]);

	return {
		restaurantsRadiusItems,
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
