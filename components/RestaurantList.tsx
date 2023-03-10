import React from 'react';
import { View, ScrollView, StyleSheet } from 'react-native';
import RestaurantItem, { RestaurantItem as ResType } from './RestaurantItem';

export type Props = {
	navigation: any;
	restaurantsItems: { [key: string]: ResType[] };
};

const RestaurantList: React.FC<Props> = ({ navigation, restaurantsItems }) => {
	return (
		<View style={styles.container}>
			<ScrollView>
				<RestaurantItem
					navigation={navigation}
					listTitle='500m Radius Restaurant'
					items={restaurantsItems['500m']}
				/>
				<RestaurantItem
					navigation={navigation}
					listTitle='5000m Radius Restaurant'
					items={restaurantsItems['5000m']}
				/>
				<RestaurantItem
					navigation={navigation}
					listTitle='25000m Radius Restaurant'
					items={restaurantsItems['25000m']}
				/>
			</ScrollView>
		</View>
	);
};

const styles = StyleSheet.create({
	container: {
		marginTop: 40
	}
});

export default RestaurantList;
