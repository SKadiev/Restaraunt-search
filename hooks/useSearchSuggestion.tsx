import { useEffect, useState, useCallback } from 'react';
import { searchPlaces } from '../api/geoapify';
import { SearchLocationData } from '../screens/SearchScreen';
export type AddressResult = {
	name: string;
	lat: string;
	lot: string;
};
export default (searchData: { query: string }) => {
	const [result, setResult] = useState<SearchLocationData[]>([]);
	const [isLoading, setIsLoading] = useState<boolean>(false);
	const { query } = searchData;

	useEffect(() => {
		const load = async () => {
			setIsLoading(true);
			const res = await searchPlaces(query);
			setIsLoading(false);
			setResult(res);
		};
		load();
	}, [query]);

	return {
		result,
		isLoading
	};
};
