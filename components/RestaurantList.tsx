import React from 'react';
import { View, ScrollView, StyleSheet } from 'react-native';
import RestaurantItem, { RestaurantItem as ResType } from './RestaurantItem';

export type Props = {
	restaurantsItems: { [key: string]: ResType[] };
	filter500: boolean;
	filter5000: boolean;
	filter25000: boolean;
};

const RestaurantList: React.FC<Props> = ({
	restaurantsItems,
	filter500,
	filter5000,
	filter25000
}) => {
	return (
		<View style={styles.container}>
			<ScrollView>
				{filter500 && (
					<RestaurantItem
						listTitle='500m Radius Restaurant'
						items={restaurantsItems['500m']}
					/>
				)}
				{filter5000 && (
					<RestaurantItem
						listTitle='5000m Radius Restaurant'
						items={restaurantsItems['5000m']}
					/>
				)}
				{filter25000 && (
					<RestaurantItem
						listTitle='25000m Radius Restaurant'
						items={restaurantsItems['25000m']}
					/>
				)}
			</ScrollView>
		</View>
	);
};

const styles = StyleSheet.create({
	container: {
		marginTop: 10
	}
});

export default RestaurantList;
