import React from 'react';
import {
	Image,
	Text,
	View,
	TouchableOpacity,
	FlatList,
	StyleSheet
} from 'react-native';
import { RestaurantItem } from './RestaurantItem';

type Props = {
	items: RestaurantItem[];
};

const FavoriteRestaurants: React.FC<Props> = ({ items }) => {
	// renamed the component from FavoriteRestaurants to FavoriteRestaurantsList
	return (
		<View style={styles.container}>
			<Text style={styles.title}>Favorite Restaurants</Text>{' '}
			{/* added a space between Favorite and Restaurants */}
			<FlatList
				showsVerticalScrollIndicator={false}
				style={styles.listContainer} // changed the name from container to listContainer
				data={items}
				keyExtractor={(item) => item.id} // simplified the keyExtractor
				renderItem={({ item }) => {
					return (
						<TouchableOpacity style={styles.restaurantItem}>
							{/* wrapped the image and text inside a single TouchableOpacity */}
							<TouchableOpacity
								onPress={() => {
									// added an onPress handler
									console.log(`${item.title} pressed`);
								}}
							>
								<Image
									source={require('../assets/pancake.jpg')}
									style={styles.image}
								/>
								<Text style={styles.restaurantText}>{item.title}</Text>
								<Text style={styles.restaurantText}>
									{' '}
									{`${item.stars} Stars`}
								</Text>
								<Text style={styles.restaurantText}>
									{`Reviews ${item.reviews}`}
								</Text>
							</TouchableOpacity>
						</TouchableOpacity>
					);
				}}
				contentContainerStyle={{ flex: 1, paddingBottom: 30 }} // added a contentContainerStyle prop
			/>
		</View>
	);
};

const styles = StyleSheet.create({
	container: {
		flex: 1,
		marginHorizontal: 10,
		marginVertical: 20
	},
	title: {
		fontSize: 24,
		fontWeight: 'bold',
		marginBottom: 10,
		textAlign: 'center'
	},
	listContainer: {
		marginBottom: 20
	},
	restaurantItem: {
		flexDirection: 'row',
		alignItems: 'center',
		borderBottomColor: '#ccc',
		borderBottomWidth: 1,
		paddingBottom: 10,
		marginBottom: 10
	},
	image: {
		height: 80,
		width: 80,
		borderRadius: 40,
		marginRight: 10
	},
	restaurantText: {
		fontSize: 16
	},
	listContent: {
		flexGrow: 1
	}
});

export default FavoriteRestaurants;
