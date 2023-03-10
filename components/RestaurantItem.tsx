import { Image, Text } from 'react-native';
import { TouchableOpacity } from 'react-native';
import { StyleSheet } from 'react-native';
import { View } from 'react-native';
import { FlatList, withNavigation } from 'react-navigation';

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
	distance: number;
};

export type Props = {
	listTitle: string;
	items: RestaurantItem[];
	navigation: any;
};

const RestaurantItem: React.FC<Props> = ({ listTitle, items, navigation }) => {
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
							<Text style={styles.title}>{item.title}</Text>
							<Text style={styles.review}>
								{item.stars} Stars, {item.reviews}
							</Text>
							<Text style={styles.review}>({item.distance} meters away)</Text>
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
	},
	review: {
		color: 'darkgray',
		alignSelf: 'center'
	}
});

export default withNavigation(RestaurantItem);
