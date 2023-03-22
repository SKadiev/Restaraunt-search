import {
	Image,
	Text,
	View,
	TouchableOpacity,
	FlatList,
	StyleSheet
} from 'react-native';
import RestaurantDetails from './RestaurantDetatils';
import { RestaurantItem } from './RestaurantItem';

type Props = {
	items: RestaurantItem[];
};

const FavoriteRestaurants: React.FC<Props> = ({ items }) => {
	return (
		<View style={styles.container}>
			<Text>FavoriteRestaurants</Text>
			<FlatList
				// horizontal
				showsVerticalScrollIndicator={false}
				style={styles.container}
				data={items}
				keyExtractor={(item, index) => item.id}
				renderItem={({ item }) => {
					return (
						<TouchableOpacity style={styles.restaurantItem}>
							<TouchableOpacity>
								<Image
									source={require('../assets/pancake.jpg')}
									style={styles.image}
								/>
								<Text style={{ ...styles.title, ...styles.favoriteText }}>
									{item.title + '\n'}
									{item.stars} Stars {'\n' + 'Reviews ' + item.reviews + '\n'} (
									{item.distance} meters away)
								</Text>
							</TouchableOpacity>
						</TouchableOpacity>
					);
				}}
			/>
		</View>
	);
};

const styles = StyleSheet.create({
	container: {
		marginVertical: 10
	},
	restaurantItem: {
		borderColor: 'lightgray',
		borderBottomWidth: 1,
		marginVertical: 5,
		width: 200,
		marginRight: 20
	},
	image: {
		height: 120,
		borderRadius: 8,
		width: '100%'
	},
	title: {
		fontWeight: 'bold',
		alignSelf: 'center'
		// color: 'blue'
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
		marginLeft: 5,
		// alignSelf: 'center',
		textAlign: 'center'
	}
});
export default FavoriteRestaurants;
