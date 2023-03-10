import React, { useState } from 'react';
import { View, StyleSheet, Text, ScrollView } from 'react-native';
import Spinner from 'react-native-loading-spinner-overlay/lib';
import { NavigationProvider } from 'react-navigation';
import { useSelector } from 'react-redux';
import RestaurantList from '../components/RestaurantList';
import ResultFilter from '../components/ResultFilter';
import SearchBar from '../components/SearchBar';
import useResult from '../hooks/useResult';
import { RootResultFilterState, store } from '../store/store';
export type Props = {
	navigation: any;
};

export type SearchLocationData = {
	name: string;
	lat: string;
	lon: string;
};

const SearchScreen: React.FC<Props> = ({ navigation }) => {
	const [searchPlaceData, setSearchPlaceData] = useState<SearchLocationData>({
		name: 'Init',
		lat: '21.4316495',
		lon: '41.9960924'
	});

	const onSeachPlace = (searhPlaceData: SearchLocationData) => {
		setSearchPlaceData(searhPlaceData);
	};

	const filter500 = useSelector(
		(state: RootResultFilterState) => state.resultFilter.filter500
	);
	const filter5000 = useSelector(
		(state: RootResultFilterState) => state.resultFilter.filter5000
	);
	const filter25000 = useSelector(
		(state: RootResultFilterState) => state.resultFilter.filter25000
	);

	const { restaurantsRadiusItems, isLoading } = useResult(
		searchPlaceData,
		filter500,
		filter5000,
		filter25000
	);

	return (
		<View style={styles.container}>
			<SearchBar onSearchChange={onSeachPlace} />
			<Text>Radius filters</Text>
			<ResultFilter
				filter500={filter500}
				filter5000={filter5000}
				filter25000={filter25000}
			/>
			<Spinner
				visible={isLoading}
				textContent={'Loading...'}
				textStyle={styles.spinnerTextStyle}
			/>
			{!isLoading && (
				<ScrollView>
					<RestaurantList
						filter500={filter500}
						filter5000={filter5000}
						filter25000={filter25000}
						restaurantsItems={restaurantsRadiusItems}
					/>
				</ScrollView>
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
	loadingStyle: {
		alignSelf: 'center'
	},
	spinnerTextStyle: {
		color: '#FFF'
	},
	checkBoxContainer: {
		flexDirection: 'row'
	}
});

export default SearchScreen;
