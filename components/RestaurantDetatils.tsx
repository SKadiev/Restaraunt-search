import React, { FC, useEffect, useState } from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { MaterialIcons } from '@expo/vector-icons';
import { RestaurantItem } from './RestaurantItem';
import { toggleFavoriteRestaurant } from '../store/favorites/favoriteRestaurants';
import { useDispatch } from 'react-redux';

type Props = {
	item: RestaurantItem;
};

const RestaurantDetails: FC<Props> = ({ item }) => {
	const dispatch = useDispatch();
	const { favorite: isFavorite } = item;

	const toggleFavorite = () => {
		dispatch(toggleFavoriteRestaurant(item));
	};

	return (
		<>
			<View style={styles.favoriteIconWrapper}>
				{isFavorite ? (
					<MaterialIcons
						name='favorite'
						style={styles.favoriteIcon}
						size={30}
						onPress={toggleFavorite}
						color='#f2636e'
					/>
				) : (
					<MaterialIcons
						name='favorite-border'
						style={styles.favoriteIcon}
						size={30}
						onPress={toggleFavorite}
					/>
				)}
				<Text style={{ ...styles.title, ...styles.favoriteText }}>
					{item.title + '\n'}
					{item.stars} Stars {'\n' + 'Reviews ' + item.reviews + '\n'} (
					{item.distance} meters away)
				</Text>
			</View>
			{/* <Text style={styles.review}>
				{item.stars} Stars, {item.reviews} ({item.distance} meters away)
			</Text> */}
		</>
	);
};

const styles = StyleSheet.create({
	title: {
		fontWeight: 'bold'
		// alignSelf: 'center'
	},
	review: {
		color: 'darkgray',
		alignSelf: 'center'
	},
	favoriteIconWrapper: {
		flexDirection: 'row',
		alignItems: 'baseline',
		flex: 1,
		marginTop: 5,
		borderRadius: 8
	},
	favoriteIcon: {
		alignSelf: 'stretch',
		paddingTop: 3
	},
	favoriteText: {
		flex: 2,
		marginLeft: 5,
		// alignSelf: 'center',
		textAlign: 'center'
	}
});
export default RestaurantDetails;
