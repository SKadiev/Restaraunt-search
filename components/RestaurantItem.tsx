import { Image, Text, TouchableOpacity, FlatList } from 'react-native';
import {} from 'react-native';
import { StyleSheet } from 'react-native';
import { View } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import RestaurantDetails from './RestaurantDetatils';
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
	street: string;
	distance?: string;
};

export type LocationNavigateProps = {
	name: string;
	path: string;
	key: string;
	params: {
		location: {
			latitude: string;
			longitude: string;
		};
	};
};

export type Props = {
	listTitle: string;
	items: RestaurantItem[];
};

const RestaurantItem: React.FC<Props> = ({ listTitle, items }) => {
	const navigation = useNavigation<LocationNavigateProps>();
	return (
		<View style={styles.container}>
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
						<TouchableOpacity style={styles.restaurantItem}>
							<TouchableOpacity
								onPress={() =>
									navigation.navigate('Details', { location: item.location })
								}
							>
								<Image
									source={require('../assets/pancake.jpg')}
									style={styles.image}
								/>
								<RestaurantDetails key={item.id} item={item} />
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
	}
});

export default RestaurantItem;
