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
				<Text style={styles.title}>
					{item.title + '\n'}
					{item.stars} Stars {'\n' + 'Reviews ' + item.reviews + '\n'} (
					{item.distance} meters away)
				</Text>
			</View>
		</>
	);
};

const styles = StyleSheet.create({
	title: {
		fontWeight: 'bold',
		textAlign: 'center',
		fontSize: 20,
		marginTop: 10,
		marginBottom: 10
	},
	favoriteIconWrapper: {
		flexDirection: 'row',
		alignItems: 'center',
		marginTop: 5,
		borderRadius: 8,
		padding: 10,
		backgroundColor: '#FFF'
	},
	favoriteIcon: {
		paddingTop: 3
	}
});

export default RestaurantDetails;
