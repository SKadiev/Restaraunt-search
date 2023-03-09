import { Image, Text } from 'react-native';
import { TouchableOpacity } from 'react-native';
import { StyleSheet } from 'react-native';
import { View } from 'react-native';
import { FlatList } from 'react-navigation';

export type RestaurantItem = {
	id: string;
	title: string;
	location: {
		latitude: string;
		longitude: string;
	};
	stars: number;
	reviews: number;
	image: string;
};

export type Props = {
	listTitle: string;
	items: RestaurantItem[];
	navigation: any;
};

const RestaurantItem: React.FC<Props> = ({ listTitle, items, navigation }) => {
	return (
		<View>
			<Text style={styles.title}>
				{listTitle} - Results({items.length})
			</Text>
			<FlatList
				horizontal
				showsHorizontalScrollIndicator={false}
				style={styles.container}
				data={items}
				keyExtractor={(item, index) => item.id}
				renderItem={({ item }) => {
					return (
						<TouchableOpacity
							onPress={() =>
								navigation.navigate('Details', { location: item.location })
							}
							style={styles.restaurantItem}
						>
							<Image
								source={require('../assets/pancake.jpg')}
								style={styles.image}
							/>
							<Text style={styles.title}>Title : {item.title}</Text>
							<Text style={styles.review}>
								{item.stars} Stars, {item.reviews} Reviews
							</Text>
						</TouchableOpacity>
					);
				}}
			/>
		</View>
	);
};

const styles = StyleSheet.create({
	container: {},
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
	},
	review: {
		color: 'darkgray',
		alignSelf: 'center'
	}
});

export default RestaurantItem;
