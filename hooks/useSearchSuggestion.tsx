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
	const { query } = searchData;

	useEffect(() => {
		const load = async () => {
			const res = await searchPlaces(query);
			setResult(res);
		};
		load();
	}, [query]);

	return {
		result
	};
};
